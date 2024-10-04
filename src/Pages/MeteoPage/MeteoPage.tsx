import { TableMeteo } from "@/components/TableMeteo";
import styles from "./MeteoPage.module.scss";

export const MeteoPage = () => {
  return (
    <div className={styles["container"]}>
      <TableMeteo />
    </div>
  );
};
