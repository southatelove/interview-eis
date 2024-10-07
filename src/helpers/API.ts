import axios from "axios";

export const BACKEND_URL = "http://showroom.eis24.me/api/v4/test";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getMeters = async (limit: number, offset: number) => {
  const response = await axios.get(`${BACKEND_URL}/meters/`, {
    params: {
      limit: 20,
      offset,
    },
  });
  return response.data.results;
};

export const getAreaById = async (id: string) => {
  const { data } = await axios.get(`${BACKEND_URL}/areas`, {
    params: {
      id__in: id,
    },
  });

  return data.results;
};

export const getAllAreas = async (ids: string[]) => {
  const response = await Promise.all(ids.map((id) => getAreaById(id)));

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

export const removeMeterById = async (meterId: string) => {
  await axios.delete(`${BACKEND_URL}/meters/${meterId}/`);
};
