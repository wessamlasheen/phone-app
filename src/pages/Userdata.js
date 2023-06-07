import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./userData.module.css";
import { Container, Userbox, Form, Button, Input } from "../components/index";

function Userdata() {
  //start intial state user data
  let [usersData, setUserData] = useState([
    { id: 1, name: "ahmed", phone: "0102565858", mail: "ahmed@gmail.com" },
    { id: 2, name: "ali", phone: "01225580456", mail: "ali@gmail.com" },
    { id: 3, name: "nehal", phone: "0102565858", mail: "nehal@gmail.com" },
  ]);

  const ref = useRef(null);
  useEffect(() => {
    ref.current.focus();
  }, []);

  let selectUserRef = useRef("");

  let deleteHandler = useCallback(
    (eleId) => {
      setUserData(
        usersData.filter((ele) => {
          return ele.id !== eleId;
        })
      );
    },
    [usersData]
  );

  // start isOpenBox to add new user

  let [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    if (!isOpened) {
      userFormRef.current = null;
    }
  }, [isOpened]);

  let isOpenedHandler = useCallback(() => {
    setIsOpened((prev) => !prev);
  }, []);

  // filter of search input
  let [filter, setFilter] = useState("");
  function filterSearch(val) {
    setFilter(val.value);
  }

  function Search(val) {
    if (filter) {
      return usersData.filter((ele) => ele.name.includes(filter));
    }
    return usersData;
  }

  let res = Search();

  useEffect(() => {
    Search();
  }, [filter]);

  // recieve input Data from form to add new user
  let recieveInputData = (userObj) => {
    let checked = usersData.filter((ele) => ele.id === userObj.id);

    if (checked) {
      let updates = usersData.map((ele) => {
        if (ele.id === userObj.id) {
          return { ...userObj };
        } else {
          return ele;
        }
      });
      setUserData(updates);
      userFormRef.current = null;
    } else {
      setUserData((prev) => {
        return [...prev, userObj];
      });
    }
    isOpenedHandler();
  };

  // start esc btn to remove isOpen box
  useEffect(() => {
    if (isOpened === true) {
      window.onkeydown = (e) => {
        if (e.code === "Escape") {
          isOpenedHandler();
        }
      };
    }
  }, [isOpened, isOpenedHandler]);

  // show user data when click on userbox

  let userFormRef = useRef();

  let showUserData = useCallback(
    (user) => {
      userFormRef.current = user;
      isOpenedHandler();
    },
    [isOpenedHandler]
  );

  let userBox = res.map((user) => {
    return (
      <Userbox
        key={user.id}
        user={user}
        deleteHandler={deleteHandler}
        showUserData={showUserData}
      />
    );
  });

  return (
    <div className={styles["user-data"]}>
      {isOpened ? (
        <Form
          recieveInputData={recieveInputData}
          isOpened={isOpenedHandler}
          selectUserRef={selectUserRef.current}
          user={userFormRef.current}
        />
      ) : null}

      <Container>
        <Input
          type="search"
          name="filter name"
          placeholder="search by name"
          value={filter}
          onChange={filterSearch}
          ref={ref}
        />
        <Button
          type="notSubmit"
          btnTitle="Add New User"
          classes="btn btnGreen display-flex align-items justify-content"
          addBtnHandler={isOpenedHandler}
        />
        {userBox}
      </Container>
    </div>
  );
}
export default Userdata;
