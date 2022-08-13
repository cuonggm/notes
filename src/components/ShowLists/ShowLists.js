import {Col, Row} from "antd";
import {Link} from "react-router-dom";

const ShowLists = (props) => {
    const items = props.items;
    return <Row key={items.id}>
        <Link style={{width: "100%"}} to="/createList">Create list</Link>
        <div>Lists:</div>
        {items.map(item => {
            return <Col key={item.id} style={{width: "100%"}}>
                <Link to={`/users/${props.localId}/lists/${item.id}`}>{item.name}</Link>
            </Col>
        })}

    </Row>
}

export default ShowLists;