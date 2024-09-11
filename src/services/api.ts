import axios from "axios";
import { z } from "zod";
import { ApiResponse } from "../types";

const apiUrl = "https://api.rainviewer.com/public/weather-maps.json";

const apiResponseSchema = z.object({
  version: z.string(),
  generated: z.number(),
  host: z.string(),
  radar: z.object({
    past: z.array(
      z.object({
        time: z.number(),
        path: z.string(),
      })
    ),
    nowcast: z.array(
      z.object({
        time: z.number(),
        path: z.string(),
      })
    ),
  }),
});

export const getRadarData = async (): Promise<ApiResponse> => {
  let { data } = await axios.get<{ data: ApiResponse }>(apiUrl);
  return apiResponseSchema.parse(data);
};
