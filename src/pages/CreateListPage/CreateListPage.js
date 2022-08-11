import {Spin} from "antd";
import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import "../../components/CreateList/CreateList";
import CreateList from "../../components/CreateList/CreateList";
import {loadingActions} from "../../store/loadingSlice";

const CreateListPage = (props) => {
    const dispatch = useDispatch();

    const loadingSlice = useSelector((state) => state.loadingSlice);

    const [listName, setListName] = useState("");
    const auth = useSelector((state) => state.auth);
    const onCreateListButtonClick = async (event) => {
        if (listName === "") {
            return;
        }
        console.log(auth);
        console.log(listName);
        const requestData = {name: listName};
        const url = `https://notes-cuonggm-com-default-rtdb.firebaseio.com/users/${auth.localId}/lists.json?auth=${auth.idToken}`;
        console.log(url);
        dispatch(loadingActions.setLoad({isLoading: true}));
        const res = await fetch(url, {method: "POST", body: JSON.stringify(requestData)});
        if (res.ok) {
            console.log("Success")
            const data = await res.json();
            console.log(data.name);
            // update listId to list
            const url = `https://notes-cuonggm-com-default-rtdb.firebaseio.com/users/${auth.localId}/lists/${data.name}.json?auth=${auth.idToken}`;
            const requestData = {
                id: data.name
            };
            const res2 = await fetch(url, {
                method: "PATCH",
                body: JSON.stringify(requestData)
            })
            if (res2.ok) {
                const data = await res2.json();
                console.log("Update key");
                console.log(data);
            } else {
                console.log(res2.status);
            }
            dispatch(loadingActions.setLoad({isLoading: false}));
        } else {
            console.log("Error");
            console.log(res.status);
            dispatch(loadingActions.setLoad({isLoading: false}));
        }
    };

    return (
        <Spin spinning={loadingSlice.isLoading} size="large">
            <CreateList
                listName={listName}
                setListName={setListName}
                onCreateListButtonClick={onCreateListButtonClick}
            />
        </Spin>
    );
};

export default CreateListPage;
