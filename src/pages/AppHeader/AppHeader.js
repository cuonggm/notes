import styles from "./AppHeader.module.css";
import { Link } from "react-router-dom";
import { Layout } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../../store/authSlice";

const { Header } = Layout;

const AppHeader = (props) => {
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const onLogoutHandler = (event) => {
    dispatch(logoutThunk());
  };

  return (
    <Header className={styles.header}>
      <div className={styles.leftContainer}>
        <Link to="/" className={styles.headerItem}>
          Home
        </Link>
      </div>
      <div className={styles.rightContainer}>
        {!auth.isLoggedIn && (
          <Link to="/login" className={styles.headerItem}>
            Login
          </Link>
        )}

        {auth.isLoggedIn && (
          <Link
            to="#"
            className={styles.headerItem}
            style={{ backgroundColor: "cyan" }}
          >
            {auth.email}
          </Link>
        )}

        {auth.isLoggedIn && (
          <Link
            to="#"
            className={styles.headerItem}
            style={{ backgroundColor: "red" }}
            onClick={onLogoutHandler}
          >
            Logout
          </Link>
        )}
      </div>
    </Header>
  );
};

export default AppHeader;
