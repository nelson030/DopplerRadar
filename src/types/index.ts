export interface ApiResponse {
  version: string;
  generated: number;
  host: string;
  radar: AllRadarData;
}

interface AllRadarData {
  past: SingleRadarData[];
  nowcast: SingleRadarData[];
}

export interface SingleRadarData {
  time: number;
  path: string;
}
