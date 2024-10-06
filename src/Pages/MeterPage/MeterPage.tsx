import { TableMeter } from "@/components/TableMeter";
import styles from "./MeterPage.module.scss";

export const MeterPage = () => {
  return (
    <div className={styles["container"]}>
      <TableMeter />
    </div>
  );
};
