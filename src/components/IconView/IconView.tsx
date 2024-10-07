import { IconViewProps } from "./IconView.props";
import styles from "./IconView.module.scss";

export const IconView: React.FC<IconViewProps> = (props) => {
  const { typeIcon } = props;

  let text;

  switch (typeIcon[0]) {
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
      <img src={`${typeIcon[0]}.svg`}></img>
      <p>{text}</p>
    </div>
  );
};
