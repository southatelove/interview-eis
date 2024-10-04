import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <div className={styles["header"]}>
      <h1 className={styles["header-title"]}>Список счётчиков</h1>
    </div>
  );
};
