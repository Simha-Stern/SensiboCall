import { Call } from "yemot-router2";
import { FanLevels, Modes } from "../remoteControl/types";

export const selectTemp = async (call: Call) => {
  return await call.read([{ type: "text", data: "הקש טמפרטורה" }], "tap", {
    min_digits: 2,
    max_digits: 2,
  });
};
export const selectFan = async (call: Call): Promise<FanLevels> => {
  const level = await call.read(
    [
      { type: "text", data: "לעוצמה חזקה הקש 1" },
      { type: "text", data: "לעוצמה בינונית הקש 2" },
      { type: "text", data: "לעוצמה נמוכה הקש 3" },
      { type: "text", data: "לעוצמה אוטומטית הקש 4" },
    ],
    "tap",
    {
      max_digits: 1,
    }
  );
  return level === "1"
    ? "high"
    : level === "2"
    ? "medium"
    : level === "3"
    ? "low"
    : "auto";
};
export const selectMode = async (call: Call): Promise<Modes> => {
  const mode = await call.read(
    [
      { type: "text", data: "לקירור הקש 1" },
      { type: "text", data: "לחימום הקש 2" },
      { type: "text", data: "לאוורור הקש 3" },
      { type: "text", data: "לייבוש הקש 4" },
      { type: "text", data: "לאוטומטי הקש 5" },
    ],
    "tap",
    {
      digits_allowed: [1, 2, 3, 4, 5],
      max_digits: 1,
    }
  );
  return mode === "1"
    ? "cool"
    : mode === "2"
    ? "heat"
    : mode === "3"
    ? "fan"
    : mode === "4"
    ? "dry"
    : "auto";
};
