import { IconViewProps } from "./IconView.props";
import styles from "./IconView.module.scss";

export const IconView: React.FC<IconViewProps> = (props) => {
  const { nameIcon } = props;

  let text;

  switch (nameIcon[0]) {
    case "HotWaterAreaMeter":
      text = "ГВС";
      break;
    case "ColdWaterAreaMeter":
      text = "ХВС";
      break;
    case "ElectroAreaMeter":
      text = "ЭЛТД";
      break;
    case "HotAreaMeter":
      text = "ТПЛ";
      break;
    default:
      text = "Не указан тип счетчика";
  }

  return (
    <div className={styles["icon-container"]}>
      <img src={`${nameIcon[0]}.svg`}></img>
      <p>{text}</p>
    </div>
  );
};
