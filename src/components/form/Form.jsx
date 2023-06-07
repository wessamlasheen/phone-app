import { Component, useEffect, useRef, useState } from "react";
import styles from "./form.module.css";
import { Button, Input, Label, Overlay } from "../index";

import formImg from "../../imgs/formImg.png";

const initialState = {
  name: "",
  phone: "",
  mail: "",
};

function Form(props) {
let ref = useRef();
useEffect(()=>{
  ref.current.focus()
},[])

  let id = Math.floor(Math.random() * 300);
  const [userObj, setUserObj] = useState({ id, ...initialState });
  let userDataHandler = (e) => {
    let myKey = e.name;
    let val = e.value;
    setUserObj((prev) => {
      return { ...prev, [myKey]: val };
    });
  };

  let subMitHandler = (e) => {
    e.preventDefault();
   
    if ((userObj.name && userObj.phone && userObj.mail) !== "") {
      props.recieveInputData(userObj);
      setUserObj({ id, ...initialState });
    } else {
      alert("all fields should enter");
    }
  };

  useEffect(() => {
    if (props.selectUserRef) {
      setUserObj({ id, ...props.selectUserRef });
      // console.log(props.selectUserRef);
    }
  }, [props.selectUserRef]);
  // let closeBtn = () => {
  //   props.isOpened(false);
  // };

  useEffect(()=>{
    if(props.user){
      setUserObj(props.user)
    }
  },[props.user])

  return (
    <Overlay center="true" onClick={props.isOpened}>
      <div className={styles.formContainer}>
        <img src={formImg} alt="form img" className={styles.formImg} />

        <Button.Icon
          icon="X"
          styles={{
            position: "absolute",
            top: "-10px",
            left: "0",
            fontSize: "10px",
          }}
          closeBtn={props.isOpened}
        />

        <form
          onSubmit={(e) => {
            subMitHandler(e);
          }}
        >
          <Label labelTitle="User Name" />
          <Input
            type="text"
            name="name"
            placeholder="enter your name" 
            value={userObj.name}
            onChange={userDataHandler}
            ref={ref}
          />
          <Label labelTitle="User Mail" />
          <Input
            type="mail"
            name="mail"
            placeholder="enter your mail"
            value={userObj.mail}
            onChange={userDataHandler}
          />
          <Label labelTitle="User Phone" />
          <Input
            type="number"
            name="phone"
            placeholder="enter your phone"
           value={userObj.phone}
            onChange={userDataHandler}
            
          />
          <Button
            btnTitle="Submit"
            classes="btn btnGreen display-flex align-items justify-content gap-5"
          >
            <Button.Icon icon="+" />
          </Button>
        </form>
      </div>
    </Overlay>
  );
}

export default Form;
