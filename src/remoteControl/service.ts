import axios from "./axios";
import { AcState, ResData } from "./types";

const getAllDevices = async (): Promise<any> => {
  try {
    const response = await axios.get("/users/me/pods?fields=id,room,acState");
    return response.data as ResData;
  } catch (error) {
    console.error("Error fetching devices:", error);
    return error;
  }
};

// Get specific device info
const getDeviceInfo = async (device_id: string) => {
  try {
    const response = await axios.get(`/pods/${device_id}?fields=*`);
    return response.data;
  } catch (error) {
    console.error("Error fetching device info:", error);
    return error;
  }
};

const getACStates = async (device_id: string) => {
  try {
    const response = await axios.get(`/pods/${device_id}/acStates`);
    return response.data;
  } catch (error) {
    console.error("Error fetching device info:", error);
    return error;
  }
};

const setACState = async (device_id: string, state:  AcState) => {
  try {
    // add status in body
    const response = await axios.post(`/pods/${device_id}/acStates`, {acState: state});
    return response.data;
  } catch (error) {
    console.error("Error fetching device info:", error);
    return error;
  }
};

const setACProperty = async (
  device_id: string,
  property: string,
  value: string | boolean | number
) => {
  try {
    const response = await axios.patch(
      `/pods/${device_id}/acStates/${property}`,
      { newValue: value }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching device info:", error);
    return error;
  }
};
export default {
  getAllDevices,
  getDeviceInfo,
  getACStates,
  setACState,
  setACProperty,
};
