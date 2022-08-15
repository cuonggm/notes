import NoteListComponent from "../components/NoteListComponent";
import {Link} from "react-router-dom";

const MainPage = (props) => {
    return <div>
        <Link to="/createNote">Create Note</Link>
        <NoteListComponent/>
    </div>
};

export default MainPage;
