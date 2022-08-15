import CreateNoteComponent from "../components/CreateNoteComponent";
import {useEffect} from "react";
import {notifyMessage} from "../../../store/notificationSlice";
import {useDispatch} from "react-redux";

const CreateNotePage = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Run notifyMessage");
        notifyMessage("Ahihi do ngoc", "Dung la do ngoc that", "success", dispatch);
    }, [dispatch]);

    return <div>
        <CreateNoteComponent/>
    </div>
};

export default CreateNotePage;
