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
        <Link to="/" className={styles.logo}>
          Notes
        </Link>
      </div>
      <div className={styles.rightContainer}>
        {!auth.isLoggedIn && (
          <Link to="/login" className={styles.headerAccentItem}>
            Login
          </Link>
        )}

        {auth.isLoggedIn && (
          <Link to="#" className={styles.headerMainItem}>
            {auth.email}
          </Link>
        )}

        {auth.isLoggedIn && (
          <Link
            to="#"
            className={styles.headerAccentItem}
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
