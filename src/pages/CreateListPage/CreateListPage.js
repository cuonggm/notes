import { Spin } from "antd";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../components/CreateList/CreateList";
import CreateList from "../../components/CreateList/CreateList";
import { loadingActions } from "../../store/loadingSlice";

const CreateListPage = (props) => {
  const dispatch = useDispatch();

  const loadingSlice = useSelector((state) => state.loadingSlice);

  const [listName, setListName] = useState("");
  const auth = useSelector((state) => state.auth);
  const onCreateListButtonClick = (event) => {
    if (listName === "") {
      return;
    }
    console.log(auth);
    console.log(listName);
    const requestData = {};
    requestData[listName] = { listName: listName };
    const url = `https://notes-cuonggm-com-default-rtdb.firebaseio.com/users/${auth.localId}/lists.json?auth=${auth.idToken}`;
    console.log(url);
    dispatch(loadingActions.setLoad({ isLoading: true }));
    fetch(url, { method: "PATCH", body: JSON.stringify(requestData) })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        dispatch(loadingActions.setLoad({ isLoading: false }));
      })
      .catch((error) => {
        console.log(error);
        dispatch(loadingActions.setLoad({ isLoading: false }));
      });
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
