import {useParams} from "react-router-dom";

const ShowListDetail = (props) => {
    return <div>
        <h1>ShowListDetail</h1>
        <div>List ID: {props.listId}</div>
        <div>List Name: {props.listName}</div>
        <div>User ID: {props.userId}</div>
    </div>
}

export default ShowListDetail;