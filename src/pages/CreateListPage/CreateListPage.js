import {Spin} from "antd";
import {useState} from "react";
import {useSelector} from "react-redux";
import "../../components/CreateList/CreateList";
import CreateList from "../../components/CreateList/CreateList";
import {createList} from "../../api/ListApi/ListApi";

const CreateListPage = (props) => {

    // get Slice
    const auth = useSelector((state) => state.auth);

    // State
    const [loading, setLoading] = useState(false);
    const [listName, setListName] = useState("");

    // Event handlers
    const onSubmit = async () => {
        setLoading(true);
        await createList(listName, auth.localId, auth.idToken);
        setLoading(false);
        setListName(state => {
            return "";
        })
    };

    return (
        <Spin spinning={loading} size="large">
            <CreateList
                onSubmit={onSubmit}
                listNameProp={{listName, setListName}}
            />
        </Spin>
    );
};

export default CreateListPage;
