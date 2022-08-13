import {Button, Table} from "antd";
import {Link} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import {deleteList} from "../../api/ListApi/ListApi";


const ShowLists = (props) => {
    // auth props
    const auth = props.auth;

    // Table define
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
        },
        {
            title: 'List Name',
            dataIndex: 'listName',
            render: (text, record, _) => <Link to={record.link}>{text}</Link>,
        },
        {
            title: "Actions",
            dataIndex: "delete",
            render: (text, record, _) => <Button type="primary" onClick={record.onDelete}>Delete</Button>,
        },
    ]

    let items = [...props.items];

    items = items.map(item => {
        return {
            key: items.indexOf(item) + 1,
            id: item.id,
            link: `/users/${auth.localId}/lists/${item.id}`,
            listName: item.name,
            onDelete: (event) => {
                props.onDeleteItem(auth.localId, item.id, auth.idToken);
            }
        };
    });

    console.log("itemsState");
    console.log(items)

    return <Fragment>
        <h1>Lists</h1>
        <Table size="middle" dataSource={items} columns={columns}></Table>
    </Fragment>
}

export default ShowLists;