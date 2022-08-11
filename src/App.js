import {Layout, notification} from "antd";
import {Fragment, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";
import "./antd-theme/antd-customized.css";
import "./App.css";
import Login from "./pages/Login/Login";
import {authActions, clearUserInfoFromLocalStorage} from "./store/authSlice";
import styles from "./App.module.css";
import "./pages/CreateListPage/CreateListPage";
import CreateListPage from "./pages/CreateListPage/CreateListPage";
import ShowListsPage from "./pages/ShowListsPage/ShowListsPage";
import ShowListDetailPage from "./pages/ShowListDetailPage/ShowListDetailPage";
import HeaderPage from "./pages/HeaderPage/HeaderPage";

// Do not import. Just get from Layout
const {Content} = Layout;

// For Notification
const showNotification = (type, message, description) => {

    let targetNotification = undefined;

    switch (type) {
        case "success":
            targetNotification = notification.success;
            break;
        case "error":
            targetNotification = notification.error;
            break;
        case "warn":
            targetNotification = notification.warn;
            break;
        case "info":
            targetNotification = notification.info;
            break;
        default:
            targetNotification = notification.error;
            break;
    }

    targetNotification({
        message: message,
        description: description,
    });

};

function App() {
    // Dispatch
    const dispatch = useDispatch();

    // Slices
    const auth = useSelector((state) => state.auth);
    const notificationSlice = useSelector((state) => state.notification);

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
            clearUserInfoFromLocalStorage();
        }
    }, [dispatch]);

    // check if there is notification
    useEffect(() => {
        if (notificationSlice.message !== "" ) {
            showNotification(
                notificationSlice.type,
                notificationSlice.message,
                notificationSlice.description
            );
        }
    }, [notificationSlice]);

    return (
        <Fragment>
            <HeaderPage/>
            <Layout className={styles.mainLayout}>
                <Layout>
                    <Content className={styles.mainContentLayout}>
                        <Switch>
                            <Route path="/login">
                                {auth.isLoggedIn === true && <Redirect to="/"/>}
                                {auth.isLoggedIn === false && <Login/>}
                            </Route>
                            <Route path="/createList">
                                {auth.isLoggedIn === true && <CreateListPage/>}
                            </Route>
                            <Route path="/showLists">
                                {auth.isLoggedIn === true && <ShowListsPage/>}
                            </Route>
                            <Route path="/users/:userId/lists/:listId">
                                {auth.isLoggedIn === true && <ShowListDetailPage/>}
                            </Route>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </Fragment>
    );
}

export default App;
