import "../styles/Button.scss";

const Button = ({ title, customBtnStyle, onClick, type = "" }) => {
  return (
    <button className={customBtnStyle} onClick={onClick} type={type}>
      {title}
    </button>
  );
};

export default Button;
