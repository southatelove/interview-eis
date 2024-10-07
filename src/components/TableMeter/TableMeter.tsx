import React from "react";

import styles from "./TableMeter.module.scss";
import cn from "classnames";
import dayjs from "dayjs";

import { Header } from "@/components/Header";
import { IconView } from "@/components/IconView";
import { Button } from "@/components/Button";
import { Loader } from "@/components/Loader";

import { MeterStore } from "src/stores/MeterStore";
import { observer } from "mobx-react";

const store = MeterStore.create();

export const TableMeter: React.FC = observer(() => {
  React.useEffect(() => {
    store.fetchMeters();
  }, []);

  React.useEffect(() => {
    store.toggleLoader();
  }, [store.changePage]);

  const deleteMeter = async (meterId: string) => {
    await store.removeMeter(meterId);
    store.fetchMeters();
  };

  const changePage = (pageNumber: number) => {
    store.changePage(pageNumber);
  };

  if (store.isLoading) {
    return (
      <div className={styles["pageLoader"]}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles["tableMeter"]}>
      <Header />
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
            {store.meterInfo.map((meter, index) => (
              <tr key={meter.id} className={cn(styles["table-row"])}>
                <td className={styles["nums"]}>{store.offset + index}</td>
                <td>
                  <IconView typeIcon={meter._type} />
                </td>
                <td>{dayjs(meter.installation_date).format("DD.MM.YYYY")}</td>
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
      <div className={cn(styles["tfoot-block"], {})}>
        <div>
          <div className={styles["pagination"]}>
            <Button size="small" onClick={() => changePage(0)}>
              1
            </Button>
            <Button onClick={() => changePage(1)} size="small">
              2
            </Button>
            <Button size="small" onClick={() => changePage(2)}>
              3
            </Button>
            <Button>...</Button>
            <Button size="small" onClick={() => changePage(3)}>
              4
            </Button>
            <Button size="small" onClick={() => changePage(4)}>
              5
            </Button>
            <Button size="small" onClick={() => changePage(5)}>
              6
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});
