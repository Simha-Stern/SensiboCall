import { Call, Msg } from "yemot-router2";
import controller from "./controller";

export const callController = async (call: Call) => {

  const devices = await controller.getAllDevices();

  const messages: Msg[] = [];

  devices.result.forEach((device, index) => {
    messages.push({
      type: "text",
      data: `${device.room.name} הקש ${index + 1}`.replace(/['"]/g, ''),
    });
  });
  
  const checkRomm = await call.read(messages, "tap");

await controller.setACProperty(devices.result[Number(checkRomm) - 1].id, "on", devices.result[Number(checkRomm) - 1].acState.on ? false : true);

};

