import { Call, Msg } from "yemot-router2";
import {
  selectRoom,
  selectAction,
  turnOnOff,
  userIdentification,
  getStatus,
  setParameter,
} from "./callControl";
import { Actions } from "../remoteControl/types";

export const callProgress = async (call: Call) => {
  const apiKey = await userIdentification(call);

  const roomId: string = await selectRoom(call, apiKey);
  const action: Actions = await selectAction(call);
  switch (action) {
    case "active":
      await turnOnOff(call, apiKey, roomId);
      break;
    case "getStatus":
      await getStatus(call, apiKey, roomId)
      break;
    case "setParameter":
      await setParameter(call, apiKey, roomId)
      break;
    case "setParameters":
      break;
    default:
      break;
  }
};
