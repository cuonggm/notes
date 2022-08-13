import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import {logoutThunk} from "../../store/authSlice";
import {useDispatch, useSelector} from "react-redux";

const HeaderPage = (props) => {

    // Slices
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    // Event Handlers
    const onLogoutHandler = (event) => {
        dispatch(logoutThunk());
    }

    // Define Header Links
    const links = [
        {
            to: "/showLists",
            label: "Lists",
            type: "primary",
            display: auth.isLoggedIn ? true : false
        },
        {
            to: "/login",
            label: "Login",
            type: "secondary",
            display: !auth.isLoggedIn ? true : false
        },
        {
            to: "/logout",
            label: "Logout",
            type: "secondary",
            display: auth.isLoggedIn ? true : false,
            onClick: onLogoutHandler
        }];
    return <HeaderComponent links={links}/>
}

export default HeaderPage;