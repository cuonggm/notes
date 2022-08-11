import ShowListDetail from "../../components/ShowListDetail/ShowListDetail";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getList} from "../../api/ListApi/ListApi";
import {useSelector} from "react-redux";

const ShowListDetailPage = (props) => {
    const auth = useSelector(state => state.auth);

    const {userId, listId} = useParams();

    const [list, setList] = useState({id: "", name: ""})

    useEffect(() => {
        getList(listId, userId, auth.idToken).then(data => {
            setList(state => {
                return {
                    id: data.id,
                    name: data.name
                }
            })
        });
    }, [])

    return <ShowListDetail listId={list.id} listName={list.name} userId={userId}/>
}

export default ShowListDetailPage;