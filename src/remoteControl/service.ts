import axios from "./axios";
import { AcState, ResData, ResManyData } from "./types";

const getAllDevices = async (apiKey: string): Promise<ResManyData> => {
  try {
    const response = await axios.get("/users/me/pods?fields=id,room,acState", {
      params: { apiKey },
    });
    return response.data as ResManyData;
  } catch (error) {
    console.error("Error fetching devices:", error);
    throw error;
  }
};

// Get specific device info
const getDeviceInfo = async (
  apiKey: string,
  device_id: string
): Promise<ResData> => {
  try {
    const response = await axios.get(
      `/pods/${device_id}?fields=id,room,acState`,
      {
        params: { apiKey },
      }
    );
    return response.data as ResData;
  } catch (error) {
    console.error("Error fetching device info:", error);
    throw error;
  }
};

const getACStates = async (apiKey: string, device_id: string) => {
  try {
    const response = await axios.get(`/pods/${device_id}/acStates`, {
      params: { apiKey },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching device info:", error);
    return error;
  }
};

const setACState = async (
  apiKey: string,
  device_id: string,
  state: AcState
) => {
  try {
    // add status in body
    const response = await axios.post(
      `/pods/${device_id}/acStates`,
      {
        acState: state,
      },
      {
        params: { apiKey },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching device info:", error);
    return error;
  }
};

const setACProperty = async (
  apiKey: string,
  device_id: string,
  property: string,
  value: string | boolean | number
) => {
  try {
    const response = await axios.patch(
      `/pods/${device_id}/acStates/${property}`,
      { newValue: value },
      {
        params: { apiKey },
      }
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
