import { forwardRef ,useImperativeHandle, useRef } from "react";


let Input =forwardRef(({ onChange,showData, ...rest },ref)=> {
  const inputRef = useRef("");

  useImperativeHandle(ref, () => {
    return {
      focus() {
        inputRef.current.focus();
      },
      scrollIntoView() {
        inputRef.current.scrollIntoView();
      }
    };
  }, []);

  return (
    <input
      {...rest}
     
      onChange={(e) => {
        onChange(e.target);
      }}
      ref={inputRef}
    />
  );
}) 
export default Input;
