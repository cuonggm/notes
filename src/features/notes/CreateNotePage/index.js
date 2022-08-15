import CreateNoteComponent from "../components/CreateNoteComponent";
import {useState} from "react";
import {useDispatch} from "react-redux";

const initNote = {
    title: "",
    note: "",
    date: "",
    time: "",
    tags: "",
    location: "",
    flag: false,
    priority: "medium",
    url: "",
};

const CreateNotePage = (props) => {
    const dispatch = useDispatch();

    const [note, setNote] = useState(initNote);

    return <div>
        <CreateNoteComponent setNote={setNote}/>
    </div>
};

export default CreateNotePage;
