import axios from "./axios";
import { acState } from "./interfaces";

const getAllDavices = async ():Promise<any>  => {
  axios
    .get("/users/me/pods")
    .then((response) => {
        console.log("🚀 ~ .then ~ response.data:", response.data)
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

// Get specific device info
const getDeviceInfo = async (device_id: string) => {
  axios
    .get(`/pods/${device_id}}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

// Get current and previous AC states
// get /pods/{device_id}/acStates
const getACStates = async (device_id: string) => {
  axios
    .get(`/pods/${device_id}/acStates`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
}

// Set the AC state
// post /pods/{device_id}/acStates
const setACState = async (device_id: string, state: acState) => {
  axios
    .post(`/pods/${device_id}/acStates`, { state })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
}

export default { getAllDavices, getDeviceInfo, getACStates, setACState };
