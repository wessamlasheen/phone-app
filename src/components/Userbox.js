import { memo, useState } from "react";
import styles from "./userbox.module.css";
function Userbox({
  user: { id, name, phone, mail },
  deleteHandler,
  showUserData,
}) {
  console.log("test");

  let classes = [styles["user-box"], styles.active];
  return (
    <div
      className={classes.join(" ")}
      onClick={(e) => {
        e.stopPropagation();
        showUserData({ id, name, phone, mail });
      }}
    >
      <span
        className={styles.delete}
        onClick={(e) => {
          e.stopPropagation();
          deleteHandler(id);
        }}
      >
        x
      </span>
      <ul>
        <li>name : {name}</li>
        <li>phone : {phone}</li>
        <li>mail : {mail}</li>
      </ul>
    </div>
  );
}
export default memo(Userbox);
