import { Layout } from "antd";
import { useSelector } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./antd-theme/antd-customized.css";
import "./App.css";
import AppHeader from "./pages/AppHeader/AppHeader";
import Login from "./pages/Login/Login";

// Do not import. Just get from Layout
const { Content } = Layout;

function App() {
  const auth = useSelector((state) => state.auth);

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
                {auth.isLoggedIn && <Redirect to="/" />}
                {!auth.isLoggedIn && <Login />}{" "}
              </Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
