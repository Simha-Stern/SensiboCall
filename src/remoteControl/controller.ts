import { Request, Response } from "express";
import service from "./service";
import { AcState, ResData, ResManyData } from "./types";

// Example usage for a generic Express route handler
const getAllDevices = async (apiKey: string) => {
  try {
    const devices: ResManyData = await service.getAllDevices(apiKey);
    return devices;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getDeviceInfo = async (apiKey: string, deviceId: string): Promise<ResData>  => {
  try {
    const deviceInfo = await service.getDeviceInfo(apiKey, deviceId);
    return deviceInfo;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getACStates = async (apiKey: string, deviceId: string) => {
  try {
    const acStates = await service.getACStates(apiKey, deviceId);
    return acStates;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const setACState = async (apiKey: string, deviceId: string, state: AcState) => {
  try {
    const response = await service.setACState(apiKey, deviceId, state);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const setACProperty = async (
  apiKey: string, 
  deviceId: string,
  property: keyof AcState,
  value: string | boolean | number
) => {
  try {
    const response = await service.setACProperty(apiKey, deviceId, property, value);
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
