import { Meter } from "@/types/types";
import axios from "axios";

export const BACKEND_URL = "http://showroom.eis24.me/api/v4/test";

export const fetchMeters = async (offset: number): Promise<Meter[]> => {
  const response = await axios.get(`${BACKEND_URL}/meters/`, {
    params: {
      limit: 20,
      offset,
    },
  });
  return response.data.results;
};

export const getAreas = async (id: string) => {
  const { data } = await axios.get(`${BACKEND_URL}/areas`, {
    params: {
      id__in: id,
    },
  });

  return data.results;
};

export const fetchAreas = async (ids: string[]) => {
  const response = await Promise.all(ids.map((id) => getAreas(id)));

  const areaData = response.flatMap((item) =>
    Array.isArray(item) ? item : [item]
  );

  areaData.forEach((area) => {
    areaData[
      area.id
    ] = `${area.house.address}, ${area.number}, ${area.str_number_full}`;
  });
  return areaData;
};
