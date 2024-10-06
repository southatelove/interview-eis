import React from "react";
import axios from "axios";

import styles from "./TableMeter.module.scss";
import cn from "classnames";

import { BACKEND_URL, fetchAreas, fetchMeters } from "src/helpers/API";

import { Header } from "@/components/Header";
import { IconView } from "@/components/IconView";
import { Button } from "@/components/Button";
import { Loader } from "@/components/Loader";

import { Meter } from "@/types/index";

export const TableMeter = () => {
  const [meters, setMeters] = React.useState<Meter[]>([]);
  const [offset, setOffset] = React.useState(1);
  const [loading, setLoading] = React.useState(true);

  const loadMeters = async () => {
    setLoading(true);

    const meterData = await fetchMeters(offset); // загрузка данных по offset
    const areaIds = meterData.map((meter) => meter.area.id); // вытаскивание area.id для загрузки адреса
    const areaAddresses = await fetchAreas(areaIds); // загрузка адреса

    setMeters(
      meterData.map((meter) => ({
        ...meter,
        areaAddress: areaAddresses[meter.area.id as unknown as number],
      }))
    );
    setLoading(false);
  };

  React.useEffect(() => {
    loadMeters();
  }, [offset]);

  const deleteMeter = async (meterId: string) => {
    await axios.delete(`${BACKEND_URL}/meters/${meterId}/`);
    loadMeters();
  };

  return (
    <div className={styles["container"]}>
      <Header />
      {loading ? (
        <div className={styles["loader"]}>
          <Loader />
        </div>
      ) : (
        <>
          <div className={styles["table-container"]}>
            <table className={styles["table"]}>
              <thead>
                <tr className={styles["tags"]}>
                  <th>№</th>
                  <th>Тип</th>
                  <th>Дата установки</th>
                  <th>Автоматический</th>
                  <th>Значение</th>
                  <th>Адрес</th>
                  <th>Примечание</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {meters.map((meter, index) => (
                  <tr key={meter.id} className={cn(styles["table-row"])}>
                    <td className={styles["nums"]}>{offset + index}</td>
                    <td>
                      <IconView nameIcon={meter._type} />
                    </td>
                    <td>
                      {new Date(meter.installation_date).toLocaleDateString(
                        "ru-RU"
                      )}
                    </td>
                    <td>{meter.is_automatic ? "Да" : "Нет"}</td>
                    <td>{meter.initial_values}</td>
                    <td>{meter.areaAddress}</td>
                    <td>{meter.description}</td>
                    <td>
                      <Button
                        onClick={() => deleteMeter(meter.id)}
                        size="big"
                        isActive="active"
                        className={styles["btn-column"]}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles["pagination"]}>
            <Button size="small" onClick={() => setOffset(1)}>
              1
            </Button>
            <Button onClick={() => setOffset(21)} size="small">
              2
            </Button>
            <Button size="small" onClick={() => setOffset(41)}>
              3
            </Button>
            <Button>...</Button>
            <Button size="small" onClick={() => setOffset(61)}>
              4
            </Button>
            <Button size="small" onClick={() => setOffset(81)}>
              5
            </Button>
            <Button size="small" onClick={() => setOffset(101)}>
              6
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

{
  /* <button
        onClick={() => setOffset((prev) => Math.max(prev - 20, 0))}
        disabled={offset === 0}
      >
        Предыдущие
      </button>
      <button onClick={() => setOffset((prev) => prev + 20)}>Следующие</button> */
}
