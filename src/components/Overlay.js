import { useRef } from "react";
import styles from "./overlay.module.css";
function Overlay({ children, ...props }) {
  let overLayRef = useRef("");

  let { overlay, flexCenter } = styles;

  let onHide = (e) => {
    if (e.target === overLayRef.current) {
      props.onClick();
    }
  };

  return (
    <div
      ref={overLayRef}
      className={`${overlay} ${props.center === "true" ? flexCenter : null}`}
      onClick={(e) => onHide(e)}
    >
      {children}
    </div>
  );
}
export default Overlay;
