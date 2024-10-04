import { TrashIcon } from "@/assets/Icons";
import styles from "./Button.module.scss";
import { ButtonProps } from "./Button.props";
import cn from "classnames";

export const Button = ({
  children,
  isActive,
  className,
  size = "small",
  ...props
}: ButtonProps) => {
  return (
    <>
      <button
        className={cn(styles["button"], className, {
          [styles["small"]]: size === "small",
          [styles["big"]]: size === "big",
          [styles["active-btn"]]: isActive === "active",
          [styles["disable-btn"]]: isActive === "disable",
        })}
        {...props}
      >
        {children}
        {isActive && (
          <div>
            <TrashIcon className={cn(styles[`${isActive}`])} />
          </div>
        )}
      </button>
    </>
  );
};
