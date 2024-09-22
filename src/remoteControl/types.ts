type Modes = "cool" | "heat" | "fan" | "auto" | "dry";

type Swings = "stopped" | "rangeful";

type FanLevels = "low" | "medium" | "high" | "auto";

export interface AcState {

    on: boolean;
    mode: Modes;
    fanLevel: FanLevels;
    targetTemperature: number;
    temperatureUnit?: "C" | "F";
    swing?: Swings;

}

export interface ResData {
  status: string;
  result: {
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
  }[];
}
