function Button(props) {
  return (
    <button
      className={props.classes}
      onClick={() => {
        props.addBtnHandler && props.addBtnHandler(props.data);
      }}
    >
      {props.children}
      {props.btnTitle}
    </button>
  );
}

Button.Icon = (props) => {
  return (
    <span className="green-icon" style={props.styles} onClick={props.closeBtn}>
      {props.icon}
    </span>
  );
};
export default Button;
