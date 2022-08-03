import { Layout } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./antd-theme/antd-customized.css";
import "./App.css";
import AppHeader from "./pages/AppHeader/AppHeader";
import Login from "./pages/Login/Login";
import { authActions, logoutThunk } from "./store/authSlice";

// Do not import. Just get from Layout
const { Content } = Layout;

function App() {
  const auth = useSelector((state) => state.auth);

  console.log(auth);

  const dispatch = useDispatch();

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
      <Layout style={{ height: "100vh" }}>
        <Layout>
          <Content
            style={{
              paddingLeft: "12px",
              paddingTop: "8px",
              paddingRight: "12px",
              paddingBottom: "8px",
              backgroundColor: "white",
            }}
          >
            <Switch>
              <Route path="/login">
                {auth.isLoggedIn === true && <Redirect to="/" />}
                {auth.isLoggedIn === false && <Login />}
              </Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
