export interface Meter {
  area: { id: string };
  areaAddress?: string;
  brand_name?: undefined | null;
  communication?: string;
  description: string;
  id: string;
  initial_values: number;
  installation_date: string;
  is_automatic: boolean | null;
  model_name: null | string;
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
