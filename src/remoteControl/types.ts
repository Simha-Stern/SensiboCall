export type Modes = "cool" | "heat" | "fan" | "auto" | "dry";

export type Swings = "stopped" | "rangeful";

export type FanLevels = "low" | "medium" | "high" | "auto";

export type Actions = "active" | "getStatus" | "setParameter" | "setParameters";

export type oneParameter = "targetTemperature" | "fanLevel" | "mode"

export interface AcState {
  on: boolean;
  mode: Modes;
  fanLevel: FanLevels;
  targetTemperature: number;
  temperatureUnit?: "C" | "F";
  swing?: Swings;
}

interface Result {
  id: string;
  room: {
    uid: string;
    name: string;
    icon: string;
    pureBoostConfig: null;
  };
  acState: {
    timestamp: {
      time: string;
      secondsAgo: number;
    };
    on: boolean;
    mode: Modes;
    targetTemperature: number;
    temperatureUnit: "C" | "F";
    fanLevel: FanLevels | null | undefined;
    swing: Swings | null | undefined;
  };
}

export interface ResData {
  status: string;
  result: Result;
}

export interface ResManyData {
  status: string;
  result: Result[];
}
