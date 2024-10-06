import cn from "classnames";
import styles from "./Loader.module.scss";
import { LoaderProps } from "./Loader.props";

export const Loader = (props: LoaderProps) => {
  const { className } = props;

  return (
    <div className={cn(styles["lds-ellipsis"], {}, [className])}>
      <div className={styles["loadingio-spinner-eclipse-nq4q5u6dq7r"]}>
        <div className={styles["ldio-x2uulkbinbj"]}>
          <div></div>
        </div>
      </div>
    </div>
  );
};
