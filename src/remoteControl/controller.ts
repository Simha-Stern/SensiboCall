import { Request, Response } from "express";
import service from "./service";
import { AcState, ResData } from "./types";

// Example usage for a generic Express route handler
const getAllDevices = async () => {
  try {
    const devices: ResData = await service.getAllDevices();
    return devices;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getDeviceInfo = async (deviceId: string) => {
  try {
    const deviceInfo = await service.getDeviceInfo(deviceId);
    return deviceInfo;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const getACStates = async (deviceId: string) => {
  try {
    const acStates = await service.getACStates(deviceId);
    return acStates;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const setACState = async (deviceId: string, state: AcState) => {
  try {
    const response = await service.setACState(deviceId, state);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const setACProperty = async (
  deviceId: string,
  property: keyof AcState,
  value: string| boolean | number
) => {
  try {
    const response = await service.setACProperty(deviceId, property, value);
    return response;
  } catch (error) {
    console.error(error);
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
