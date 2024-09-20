import { YemotRouter } from "yemot-router2";
import turnOn from "../remoteControl/controller";
const router = YemotRouter();

router.get("/remoteControl", async (call) => {
  await turnOn(call);
});

export default router;
