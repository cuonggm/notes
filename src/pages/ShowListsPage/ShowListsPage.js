import ShowLists from "../../components/ShowLists/ShowLists";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getLists} from "../../api/ListApi/ListApi";

const ShowListsPage = (props) => {
    const auth = useSelector(state => state.auth);

    const [items, setItems] = useState([]);

    useEffect(() => {
        getLists(auth.localId, auth.idToken).then(data => {
            setItems(data);
        })
    }, [auth])

    return <ShowLists items={items} localId={auth.localId}/>;
}

export default ShowListsPage;