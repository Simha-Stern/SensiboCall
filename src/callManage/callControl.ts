import { Call, Msg, TapOptions } from "yemot-router2";
import controller from "../remoteControl/controller";
import { Actions, oneParameter, ResData } from "../remoteControl/types";
import { text } from "express";
import { selectFan, selectMode, selectTemp } from "./callHelpers";

export const userIdentification = async (call: Call): Promise<string> => {
  const apiKey = call.values.apiKey;
  if (!apiKey) {
    call.id_list_message(
      [{ type: "text", data: "לא הגדרת את המפתח במעכת שלך" }],
      {
        prependToNextAction: true,
      }
    );
    call.hangup();
  }
  return apiKey;
};

export const selectRoom = async (
  call: Call,
  apiKey: string
): Promise<string> => {
  const devices = await controller.getAllDevices(apiKey);
  const messages: Msg[] = [];

  devices.result.forEach((device, index) => {
    messages.push({
      type: "text",
      data: `${device.room.name} הקש ${index + 1}`.replace(/['"]/g, ""),
    });
  });

  const checkRoom = await call.read(messages, "tap", {
    digits_allowed: devices.result.map((_, index) => index + 1),
    max_digits: devices.result.length < 10 ? 1 : 2,
  });

  return devices.result[Number(checkRoom) - 1].id;
};

export const selectAction = async (call: Call): Promise<Actions> => {
  const messages: Msg[] = [
    {
      type: "text",
      data: "להפעלה או כיבוי הקש 1",
    },
    {
      type: "text",
      data: "לשמיעת מצב המזגן הקש 2",
    },
    {
      type: "text",
      data: "לשינוי פרמטר בודד הקש 3",
    },
    // {
    //   type: "text",
    //   data: "לשינוי פרמטרים מרובים הקש 4",
    // },
  ];

  const options: Record<string, Actions> = {
    1: "active",
    2: "getStatus",
    3: "setParameter",
    4: "setParameters",
  };

  const checkOption: string = await call.read(messages, "tap", {
    digits_allowed: [1, 2, 3, 4],
    max_digits: 1,
  });

  return options[checkOption];
};

export const turnOnOff = async (
  call: Call,
  apiKey: string,
  deviceId: string
): Promise<void> => {
  const acStatus: ResData = await controller.getDeviceInfo(apiKey, deviceId);
  await controller
    .setACProperty(apiKey, deviceId, "on", !acStatus.result.acState.on)
    .then(() =>
      call.id_list_message([{ type: "text", data: "הפעולה בוצעה בהצלחה" }])
    )
    .catch(() =>
      call.id_list_message([
        { type: "text", data: "קרתה שגיאה אנא נסה מאוחר יותר" },
      ])
    );
  return;
};

export const getStatus = async (
  call: Call,
  apiKey: string,
  deviceId: string
) => {
  const acStatus: ResData = await controller.getDeviceInfo(apiKey, deviceId);
  const messages: Msg[] = [
    {
      type: "text",
      data: `המזגן כעת ${acStatus.result.acState.on ? "פועל" : "כבוי"}`,
    },
    {
      type: "text",
      data: `מצב פעילות ${
        acStatus.result.acState.mode === "cool"
          ? "קירור"
          : acStatus.result.acState.mode === "heat"
          ? "חימום"
          : acStatus.result.acState.mode === "dry"
          ? "ייבוש"
          : acStatus.result.acState.mode === "fan"
          ? "אוורור"
          : "אוטוטי"
      }`,
    },
    {
      type: "text",
      data: `עוצמה ${
        acStatus.result.acState.fanLevel === "high"
          ? "גבוה"
          : acStatus.result.acState.fanLevel === "medium"
          ? "בינוני"
          : acStatus.result.acState.fanLevel === "low"
          ? "נמוך"
          : "אוטומטי"
      }`,
    },
    {
      type: "text",
      data: `מעלות ${acStatus.result.acState.targetTemperature.toString()} ${
        acStatus.result.acState.temperatureUnit === "C" ? "צלזיוס" : "פרונהייט"
      } `,
    },
  ];
  call.id_list_message(messages);
};

export const setParameter = async (
  call: Call,
  apiKey: string,
  deviceId: string
) => {
  const messages: Msg[] = [
    {
      type: "text",
      data: "לשינוי טמפרטורה הקש 1",
    },
    {
      type: "text",
      data: "לשינוי עוצמת מאוורר הקש 2",
    },
    {
      type: "text",
      data: "לשינוי מצב קירור או חימום הקש 3",
    },
  ];

  const property = await call.read(messages, "tap", {
    digits_allowed: [1, 2, 3],
    max_digits: 1,
  });

  const options: Record<string, oneParameter> = {
    1: "targetTemperature",
    2: "fanLevel",
    3: "mode",
  };

  const value: string | number =
    options[property] === "targetTemperature"
      ? Number(await selectTemp(call))
      : options[property] === "fanLevel"
      ? await selectFan(call)
      : await selectMode(call);

  await controller.setACProperty(apiKey, deviceId, options[property], value);
  return
};
