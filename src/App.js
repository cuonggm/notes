import {Layout, notification} from "antd";
import {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, Redirect, Route, Switch} from "react-router-dom";
import "./antd-theme/antd-customized.css";
import "./App.css";
import AppHeader from "./pages/AppHeader/AppHeader";
import Login from "./pages/Login/Login";
import {authActions, logoutThunk} from "./store/authSlice";
import styles from "./App.module.css";
import appHeaderStyles from "./pages/AppHeader/AppHeader.module.css";
import {hideThunk} from "./pages/AppHeader/sidedrawerSlice";
import "./pages/CreateListPage/CreateListPage";
import CreateListPage from "./pages/CreateListPage/CreateListPage";
import ShowListsPage from "./pages/ShowListsPage/ShowListsPage";

// Do not import. Just get from Layout
const {Content} = Layout;

// For Notification
const showNotification = (type, message, description) => {
    let targetNotification = () => {
    };
    if (type === "success") {
        targetNotification = notification.success;
    }
    if (type === "error") {
        targetNotification = notification.error;
    }
    targetNotification({
        message: message,
        description: description,
    });
};

function App() {
    const auth = useSelector((state) => state.auth);
    const notificationSlice = useSelector((state) => state.notification);

    // const location = useLocation();
    // console.log(location);

    const dispatch = useDispatch();
    const sidedrawer = useSelector((state) => state.sidedrawer);

    // states
    const [isFirstTime, setIsFirstTime] = useState(true);

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
    }, [dispatch, isFirstTime]);

    // check if there is notification
    useEffect(() => {
        if (!isFirstTime) {
            showNotification(
                notificationSlice.type,
                notificationSlice.message,
                notificationSlice.description
            );
        } else {
            setIsFirstTime((state) => {
                return !state;
            });
        }
    }, [notificationSlice, isFirstTime]);

    return (
        <Fragment>
            <AppHeader/>
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
                        </Switch>
                    </Content>
                </Layout>
            </Layout>

            {sidedrawer.isSidedrawerShow && (
                <aside id="moreSideDrawer">
                    <Link
                        to="#"
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
        </Fragment>
    );
}

export default App;
