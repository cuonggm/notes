import {Col, Row} from "antd";
import {Link} from "react-router-dom";

const ShowLists = (props) => {
    const items = props.items;
    return <Row key={items.id}>

        {items.map(item => {
            return <Col key={item.id} style={{width: "100%"}}>
                <Link to={`/users/${props.localId}/lists/${item.id}`}>{item.name}</Link>
            </Col>
        })}

    </Row>
}

export default ShowLists;