export interface MeterData {
  area: { id: string };
  areaAddress: string;
  brand_name: null;
  communication: string;
  description: string;
  id: string;
  initial_values: number;
  installation_date: string;
  is_automatic: null;
  model_name: null;
  serial_number: string;
  _type: [
    (
      | "HotAreaMeter"
      | "ColdWaterAreaMeter"
      | "ElectroAreaMeter"
      | "HotWaterAreaMeter"
    ) &
      "AreaMeter"
  ];
}

type MeterHouse = {
  address: string;
  fias_addrobjs: string[];
  id: string;
};
export interface MeterDataAddreses {
  house: MeterHouse;
  id: string;
  number: number;
  str_number: string;
  str_number_full: string;
}
