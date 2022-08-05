import { Button, Layout } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Redirect, Route, Switch } from "react-router-dom";
import "./antd-theme/antd-customized.css";
import "./App.css";
import AppHeader from "./pages/AppHeader/AppHeader";
import Login from "./pages/Login/Login";
import { authActions, logoutThunk } from "./store/authSlice";
import styles from "./App.module.css";
import appHeaderStyles from "./pages/AppHeader/AppHeader.module.css";
import { hideThunk } from "./pages/AppHeader/sidedrawerSlice";

// Do not import. Just get from Layout
const { Content } = Layout;

function App() {
  const auth = useSelector((state) => state.auth);

  console.log(auth);

  const dispatch = useDispatch();
  const sidedrawer = useSelector((state) => state.sidedrawer);

  // event handlers
  const onHideSidedrawer = (event) => {
    dispatch(hideThunk());
  };

  const onLogoutHandler = (event) => {
    dispatch(logoutThunk());
    dispatch(hideThunk());
  };

  const onClickHideMoreButton = (event) => {
    event.preventDefault();
    dispatch(hideThunk());
  };

  // Check if logged after F5 (one time)
  useEffect(() => {
    if (localStorage.getItem("idToken") !== null) {
      const data = {
        displayName: localStorage.getItem("displayName"),
        refreshToken: localStorage.getItem("refreshToken"),
        registered: localStorage.getItem("registered"),
        idToken: localStorage.getItem("idToken"),
        expiresIn: localStorage.getItem("expiresIn"),
        email: localStorage.getItem("email"),
        kind: localStorage.getItem("kind"),
        localId: localStorage.getItem("localId"),
      };
      dispatch(authActions.updateUserInfoStatus(data));
    } else {
      dispatch(logoutThunk());
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <AppHeader />
      <Layout style={{ height: "100vh" }} className={styles.mainLayout}>
        <Layout>
          <Content className={styles.mainLayout}>
            <Switch>
              <Route path="/login">
                {auth.isLoggedIn === true && <Redirect to="/" />}
                {auth.isLoggedIn === false && <Login />}
              </Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>

      {sidedrawer.isSidedrawerShow && (
        <aside id="moreSideDrawer">
          <Link
            onClick={onClickHideMoreButton}
            className={`${appHeaderStyles.moreButton} ${appHeaderStyles.sideDrawerItemDark} moreButton`}
          >
            Close
          </Link>

          {!auth.isLoggedIn && (
            <Link
              to="/login"
              onClick={onHideSidedrawer}
              className={`${appHeaderStyles.sideDrawerItemAccent}`}
            >
              Login
            </Link>
          )}

          {auth.isLoggedIn && (
            <Link
              to="#"
              onClick={onHideSidedrawer}
              className={`${appHeaderStyles.sideDrawerItemMain}`}
            >
              {auth.email}
            </Link>
          )}

          {auth.isLoggedIn && (
            <Link
              to="#"
              className={`${appHeaderStyles.sideDrawerItemAccent}`}
              onClick={onLogoutHandler}
            >
              Logout
            </Link>
          )}
        </aside>
      )}
    </BrowserRouter>
  );
}

export default App;
