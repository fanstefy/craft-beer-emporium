import "../styles/Button.scss";

const Button = ({ title, customBtnStyle, buyProduct }) => {
  return (
    <button className={customBtnStyle} onClick={buyProduct}>
      {title}
    </button>
  );
};

export default Button;
