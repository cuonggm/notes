import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import {logoutThunk} from "../../store/authSlice";
import {useDispatch, useSelector} from "react-redux";

const HeaderPage = (props) => {

    // Slices
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    return <HeaderComponent links={props.links}/>
}

export default HeaderPage;