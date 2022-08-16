import NoteListComponent from "../components/NoteListComponent";
import {Link} from "react-router-dom";
import {PlusCircleOutlined} from "@ant-design/icons";

const MainPage = (props) => {
    return <div>
        <NoteListComponent/>
        <Link to="/createNote"><PlusCircleOutlined /> <span>Create Note</span></Link>
    </div>
};

export default MainPage;
