export interface acState {
  on: boolean;
  mode: string;
  fanLevel: string;
  targetTemperature: number;
  temperatureUnit?: string; // Optional property
  swing?: string; // Optional property
}
