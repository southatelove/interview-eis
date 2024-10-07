import { types, flow } from "mobx-state-tree";

import { getAllAreas, getMeters, removeMeterById } from "src/helpers/API";

import { MeterData, MeterDataAddreses } from "@/types/index";

const Meter = types.model({
  area: types.model({
    id: types.string,
  }),
  areaAddress: types.string,
  brand_name: types.union(types.string, types.null),
  communication: types.string,
  description: types.string,
  id: types.identifier,
  initial_values: types.array(types.number),
  installation_date: types.string,
  is_automatic: types.union(types.string, types.null, types.boolean),
  model_name: types.union(types.string, types.null),
  _type: types.array(types.string),
  serial_number: types.string,
});

const MeterStore = types
  .model("MeterStore", {
    meterInfo: types.array(Meter),
    currentPage: 1,
    offset: 1,
    limit: 20,
    isLoading: true,
  })
  .actions((self) => {
    const fetchMeters = flow(function* () {
      self.isLoading = true;
      try {
        // Получение всех данных
        const metersData: MeterData[] = yield getMeters(
          self.limit,
          self.offset
        );

        // Вытаскиваем все ID для дальнейшего запроса Адреса
        const areaIds = metersData.map((meter) => meter.area.id);

        // Параллельное получение всех адресов с помощью Promise.all
        const metersAddreses: MeterDataAddreses[] = yield getAllAreas(areaIds);

        // Чтобы убрать обертку в виде массива используем flatMap
        const areaData = metersAddreses.flatMap((item) =>
          Array.isArray(item) ? item : [item]
        );

        areaData.forEach((area) => {
          areaData[
            area.id
          ] = `${area.house.address}, ${area.number}, ${area.str_number_full}`;
        });

        const completeMeters = metersData.map((meter) => ({
          ...meter,
          areaAddress: areaData[meter.area.id as unknown as number],
        }));
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        self.meterInfo = completeMeters;
      } catch (error) {
        console.error(`${error} to fetch a data (Meter)`);
      } finally {
        self.isLoading = false;
      }
    });

    const removeMeter = removeMeterById;

    const changePage = (pageNumber: number) => {
      self.currentPage = pageNumber;
      self.offset = pageNumber * self.limit ? pageNumber * self.limit + 1 : 1;
      fetchMeters();
    };

    const toggleLoader = () => {
      self.isLoading = !self.isLoading;
    };

    return { fetchMeters, removeMeter, changePage, toggleLoader };
  });

export { MeterStore };
