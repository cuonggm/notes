import {Button, Table} from "antd";
import {dateToString} from "../../util/datetime";

const WordListComponent = (props) => {
    const words = props.words;
    const onDeleteWord = props.onDeleteWord;

    // Convert words to displayItems
    let displayItems = words.map(item => {
        return {
            key: words.indexOf(item),
            id: item.id,
            content: item.content,
            hiragana: item.hiragana,
            imi: item.imi,
            kanji: item.kanji,
            createdAt: dateToString(item.createdAt),
            onDelete: (event) => {
                onDeleteWord(item.id);
            },
        }
    });

    // Sort displayItems
    displayItems = displayItems.sort((a, b) => {
        return b.id.localeCompare(a.id);
    })

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
        },
        {
            title: "Word",
            dataIndex: "content",
        },
        {
            title: "Hiragana",
            dataIndex: "hiragana"
        },
        {
            title: "Meaning",
            dataIndex: "imi",
        },
        {
            title: "Kanji",
            dataIndex: "kanji",
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            render: (_, record, ) => {
                return <Button type="primary" onClick={record.onDelete}>Delete</Button>
            }
        },
    ];

    return <div>
        <h1>Word List</h1>
        <Table columns={columns} dataSource={displayItems}/>
    </div>
};

export default WordListComponent;