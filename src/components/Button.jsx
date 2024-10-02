import "../styles/Button.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({
  title,
  customBtnStyle,
  onClick,
  type = "",
  iconLeft,
  iconRight,
}) => {
  return (
    <button className={customBtnStyle} onClick={onClick} type={type}>
      {iconLeft && <FontAwesomeIcon icon={iconLeft} className="icon-left" />}{" "}
      {title}
      {iconRight && (
        <FontAwesomeIcon icon={iconRight} className="icon-right" />
      )}{" "}
    </button>
  );
};

export default Button;
