import ShowLists from "../../components/ShowLists/ShowLists";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {deleteList, getLists} from "../../api/ListApi/ListApi";

const ShowListsPage = (props) => {
    const auth = useSelector(state => state.auth);

    const [items, setItems] = useState([]);

    useEffect(() => {
        getLists(auth.localId, auth.idToken).then(data => {
            setItems(data);
        })
    }, [auth])

    const onDeleteItem = (userId, listId, userToken) => {
        deleteList(listId, userId, userToken).then(data => {
            console.log("Delete list " + listId + " - result: " + data);
            const newItems = items.filter(item => {
                return item.id !== listId;
            });
            console.log("newItems");
            console.log(newItems);
            setItems(state => {
                return newItems;
            })
        });
    }

    return <ShowLists auth={auth} items={items} localId={auth.localId} onDeleteItem={onDeleteItem}/>;
}

export default ShowListsPage;