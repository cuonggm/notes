import styles from "./AppHeader.module.css";
import { Link } from "react-router-dom";
import { Layout } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../../store/authSlice";
import { Fragment } from "react";
import "./AppHeader.css";
import { showThunk } from "../../components/HeaderComponent/sidedrawerSlice";

const { Header } = Layout;

const AppHeader = (props) => {
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  // event handlers
  const onLogoutHandler = (event) => {
    dispatch(logoutThunk());
  };

  const onClickShowMoreButton = (event) => {
    event.preventDefault();
    dispatch(showThunk());
  };

  return (
    <Fragment>
      <Header className={styles.header}>
        <div className={styles.leftContainer}>
          <Link to="/" className={styles.logo}>
            Notes
          </Link>
        </div>
        <div className={styles.rightContainer}>
          {auth.isLoggedIn && (
            <Link
              to="/createList"
              className={`${styles.headerMainItem} ${styles.autoDisplay}`}
            >
              Create List
            </Link>
          )}

          {!auth.isLoggedIn && (
            <Link
              to="/login"
              className={`${styles.headerAccentItem} ${styles.autoDisplay}`}
            >
              Login
            </Link>
          )}

          {auth.isLoggedIn && (
            <Link
              to="#"
              className={`${styles.headerMainItem}  ${styles.autoDisplay}`}
            >
              {auth.email}
            </Link>
          )}

          {auth.isLoggedIn && (
            <Link
              to="#"
              className={`${styles.headerAccentItem} ${styles.autoDisplay}`}
              onClick={onLogoutHandler}
            >
              Logout
            </Link>
          )}

          <Link
            to="#"
            onClick={onClickShowMoreButton}
            className={`${styles.moreButton} ${styles.headerDarkItem} moreButton`}
          >
            More
          </Link>
        </div>
      </Header>
    </Fragment>
  );
};

export default AppHeader;
