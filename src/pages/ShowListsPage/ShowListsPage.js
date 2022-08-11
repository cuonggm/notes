import ShowLists from "../../components/ShowLists/ShowLists";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

const loadLists = async (auth) => {

    const url = `https://notes-cuonggm-com-default-rtdb.firebaseio.com/users/${auth.localId}/lists.json?auth=${auth.idToken}`;
    const res = await fetch(url);
    if (res.ok) {
        const data = await res.json();
        const results = [];
        for (let key in data) {
            console.log("Key: " + key + " | Id: " + data[key].id + " | Name: " + data[key].name);
            results.push({
                id: key,
                name: data[key].name
            })
        }
        return results;
    }
}

const ShowListsPage = (props) => {
    const auth = useSelector(state => state.auth);

    const [items, setItems] = useState([]);

    useEffect(() => {
        loadLists(auth, setItems).then(result => {
            console.log("Results:");
            console.log(result);
            setItems(result);
        })
    }, [auth])

    return <ShowLists items={items} localId={auth.localId}/>;
}

export default ShowListsPage;