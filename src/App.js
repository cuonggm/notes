import {Layout, notification} from "antd";
import {Fragment, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";
import "./antd-theme/antd-customized.css";
import "./App.css";
import Login from "./pages/Login/Login";
import {authActions, autoLogout, clearUserInfoFromLocalStorage} from "./store/authSlice";
import styles from "./App.module.css";
import "./pages/CreateListPage/CreateListPage";
import CreateListPage from "./pages/CreateListPage/CreateListPage";
import ShowListsPage from "./pages/ShowListsPage/ShowListsPage";
import ShowListDetailPage from "./pages/ShowListDetailPage/ShowListDetailPage";
import HeaderPage from "./pages/HeaderPage/HeaderPage";
import {calculateRemainTime} from "./util/datetime";
import {timeActions} from "./components/TimeComponent/timeSlice";

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

    // TimeComponent

    // Check if logged after F5 (one time)
    useEffect(() => {
        if (localStorage.getItem("idToken") !== null) {
            const data = {
                displayName: localStorage.getItem("displayName"),
                refreshToken: localStorage.getItem("refreshToken"),
                registered: localStorage.getItem("registered"),
                idToken: localStorage.getItem("idToken"),
                expiresIn: localStorage.getItem("expiresIn"),
                expireTime: localStorage.getItem("expireTime"),
                email: localStorage.getItem("email"),
                kind: localStorage.getItem("kind"),
                localId: localStorage.getItem("localId"),
            };
            dispatch(authActions.updateUserInfoStatus(data));

            console.log("Remaining time:");
            const remainTime = calculateRemainTime(parseInt(data.expireTime, 10));
            console.log("REMAIN: " + remainTime);
            dispatch(timeActions.setTimeRemain({timeRemain: remainTime}));
            dispatch(timeActions.setRunning({isRunning: true}));
        } else {
            clearUserInfoFromLocalStorage();
        }
    }, [dispatch]);

    // auto logout after refresh f5
    useEffect(() => {
        if (localStorage.getItem("expireTime") !== null) {
            let logoutTime = parseInt(localStorage.getItem("expireTime"));
            const now = new Date();
            let remainMilisec = logoutTime - now.getTime();
            autoLogout(remainMilisec, dispatch);
        }
    }, [dispatch])

    // check if there is notification
    useEffect(() => {
        if (notificationSlice.message !== "") {
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
