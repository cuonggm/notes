import CreateNoteComponent from "../components/CreateNoteComponent";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createNote} from "../api/note-api";
import {Spin} from "antd";
import {notificationActions, notifyMessage} from "../../../store/notificationSlice";

const CreateNotePage = (props) => {
    const [isLoading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const [note, setNote] = useState(null);

    // Submit Button Clicked
    const onSubmit = (noteObject) => {

        setLoading(true);
        createNote(noteObject, auth.localId, auth.idToken).then(data => {
            setLoading(false);
            setNote(noteObject);
            notifyMessage("Error", "Created Note with ID: " + data.name, "success", dispatch);
        }).catch(error => {
            setLoading(false);
            notifyMessage("Error", "Something wrong", "error", dispatch);
        })

    };

    return <div>
        <Spin spinning={isLoading} size={"large"}>
            <CreateNoteComponent note={note} setNote={setNote} onSubmit={onSubmit}/>
        </Spin>
    </div>
};

export default CreateNotePage;
