import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../reducers/user";
import { removeAllBookmark } from "../reducers/bookmarks";
import { removeAllHidden } from "../reducers/hiddenArticles";
import styles from "../styles/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faXmark, faEye } from "@fortawesome/free-solid-svg-icons";
import Moment from "react-moment";
import { Modal } from "antd";
import Link from "next/link";
import { Tooltip } from "antd";

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [date, setDate] = useState("2050-11-22T23:59:59");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  useEffect(() => {
    setDate(new Date());
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    // fetch("http://localhost:3000/users/signup", {
    fetch("https://morning-news-backend-five.vercel.app/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signUpUsername,
        password: signUpPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ username: signUpUsername, token: data.token }));
          setSignUpUsername("");
          setSignUpPassword("");
          setIsModalVisible(false);
        }
      });
  };

  const handleConnection = (e) => {
    e.preventDefault();
    // fetch("http://localhost:3000/users/signin", {
    fetch("https://morning-news-backend-five.vercel.app/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signInUsername,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ username: signInUsername, token: data.token }));
          setSignInUsername("");
          setSignInPassword("");
          setIsModalVisible(false);
        }
      });
  };
  // console.log(user);
  const handleLogout = () => {
    dispatch(logout());
    dispatch(removeAllBookmark());
    dispatch(removeAllHidden());
  };

  const handleEyePoke = () => {
    dispatch(removeAllHidden());
  };

  const showModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  let modalContent;
  if (!user.token) {
    modalContent = (
      <div className={styles.registerContainer}>
        <form
          className={styles.registerSection}
          onSubmit={(e) => handleRegister(e)}
        >
          <p>Sign-up</p>
          <input
            type="text"
            placeholder="Username"
            id="signUpUsername"
            onChange={(e) => setSignUpUsername(e.target.value)}
            value={signUpUsername}
          />
          <input
            type="password"
            placeholder="Password"
            id="signUpPassword"
            onChange={(e) => setSignUpPassword(e.target.value)}
            value={signUpPassword}
          />
          <button id="register" type="submit">
            Register
          </button>
        </form>
        <form
          className={styles.registerSection}
          onSubmit={(e) => handleConnection(e)}
        >
          <p>Sign-in</p>
          <input
            type="text"
            placeholder="Username"
            id="signInUsername"
            onChange={(e) => setSignInUsername(e.target.value)}
            value={signInUsername}
          />
          <input
            type="password"
            placeholder="Password"
            id="signInPassword"
            onChange={(e) => setSignInPassword(e.target.value)}
            value={signInPassword}
          />
          <button id="connection" type="submit">
            Connect
          </button>
        </form>
      </div>
    );
  }

  let userSection;
  if (user.token) {
    userSection = (
      <div className={styles.logoutSection}>
        <p>Welcome {user.username} / </p>
        <button onClick={() => handleLogout()}>Logout</button>
      </div>
    );
  } else {
    if (isModalVisible) {
      userSection = (
        <FontAwesomeIcon
          icon={faXmark}
          onClick={() => showModal()}
          className={styles.userSection}
        />
      );
    } else {
      userSection = (
        <>
          <Tooltip
            title="Sign In or Sign Up"
            color="#f2b936"
            placement="bottom"
          >
            <FontAwesomeIcon
              icon={faUser}
              onClick={() => showModal()}
              className={styles.userSection}
            />
          </Tooltip>
        </>
      );
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Moment className={styles.date} date={date} format="MMM Do YYYY" />
        <h1 className={styles.title}>Morning News</h1>
        <div className={styles.headerRight}>
          {userSection}
          <Tooltip title="Unhide articles" color="#f2b936" placement="bottom">
            <FontAwesomeIcon
              icon={faEye}
              onClick={() => handleEyePoke()}
              className={styles.eyeIcon}
            />
          </Tooltip>
        </div>
      </div>

      <div className={styles.linkContainer}>
        <Link href="/">
          <span className={styles.link}>Articles</span>
        </Link>
        <Link href="/bookmarks">
          <span className={styles.link}>Bookmarks</span>
        </Link>
      </div>

      {isModalVisible && (
        <div id="react-modals">
          <Modal
            getContainer="#react-modals"
            className={styles.modal}
            open={isModalVisible}
            closable={true}
            onCancel={handleCloseModal}
            footer={null}
          >
            {modalContent}
          </Modal>
        </div>
      )}
    </header>
  );
}

export default Header;
