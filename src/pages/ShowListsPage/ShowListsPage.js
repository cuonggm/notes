import ShowLists from "../../components/ShowLists/ShowLists";
import {useSelector} from "react-redux";
import {Fragment, useEffect, useState} from "react";
import {createList, deleteList, getList, getLists} from "../../api/ListApi/ListApi";
import CreateList from "../../components/CreateList/CreateList";

const ShowListsPage = (props) => {
    const auth = useSelector(state => state.auth);

    const [listName, setListName] = useState("");
    const [items, setItems] = useState([]);

    useEffect(() => {
        getLists(auth.localId, auth.idToken).then(data => {
            console.log("first init");
            console.log(data);
            setItems(data);
        })
    }, [auth])

    const onSubmit = async () => {
        const newList = await createList(listName, auth.localId, auth.idToken);
        const listId = newList.name;
        console.log("ListID: " + listId);
        const list = await getList(listId, auth.localId, auth.idToken);
        console.log(list);
        const newItems = [...items, {id: list.id, name: list.name}];
        setItems(state => {
            return newItems;
        })
        return newList;
    }

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

    return <Fragment>
        <CreateList listNameProp={{listName, setListName}} onSubmit={onSubmit}/>
        <ShowLists auth={auth} items={items} localId={auth.localId} onDeleteItem={onDeleteItem}/>
    </Fragment>

}

export default ShowListsPage;