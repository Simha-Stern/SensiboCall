import { YemotRouter } from "yemot-router2";
// import controller from "../remoteControl/controller";
import { callProgress } from "../callManage/callProgress";
const yemotRouter = YemotRouter({
  // timeout after 30 minutes
  // timeout: 30 * 60 * 1000,
  printLog: true,
  uncaughtErrorHandler: (error, call) => {
    console.trace(
      `Uncaught error in ${call.req.path} from ${call.phone}. error stack: ${error.stack}`
    );
    return call.id_list_message([{ type: "text", data: "אירעה שגיאה" }]);
  },
});

yemotRouter.all("/", async (call) => {
  await callProgress(call);
});

// router.all("/api", async (call) => {
//   const devices = await controller.getAllDevices();
// });

export default yemotRouter;
