import { Call } from "yemot-router2";



const turnOn = async(call: Call) => {
    call.id_list_message([
        {
          type: "text",
          data: "שלום עולם",
        },
      ]);
}

export default turnOn