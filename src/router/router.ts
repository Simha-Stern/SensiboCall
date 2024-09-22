import { YemotRouter } from "yemot-router2";
import controller from "../remoteControl/controller";
import {callController} from "../remoteControl/callControl";
const router = YemotRouter({
  // timeout after 30 minutes
  // timeout: 30 * 60 * 1000,
  printLog: true,
  uncaughtErrorHandler: (error, call) => {
      console.trace(`Uncaught error in ${call.req.path} from ${call.phone}. error stack: ${error.stack}`);
      // do something with the error - like send email to developer, print details log, etc.
      return call.id_list_message([{ type: 'text', data: 'אירעה שגיאה' }]); // play nice error message to the caller
  }
});

router.all("/", async (call) => {
  console.log(1);
  
  await callController(call);
})

// router.all("/api", async (call) => {
//   const devices = await controller.getAllDevices();
// });


export default router;
