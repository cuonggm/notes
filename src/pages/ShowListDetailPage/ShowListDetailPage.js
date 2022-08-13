import ShowListDetail from "../../components/ShowListDetail/ShowListDetail";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getList} from "../../api/ListApi/ListApi";
import {useSelector} from "react-redux";
import {createNewWord} from "../../api/ListApi/word-api";

const ShowListDetailPage = (props) => {
    const auth = useSelector(state => state.auth);

    const {userId, listId} = useParams();

    const [list, setList] = useState({id: "", name: ""})

    const [word, setWord] = useState({
        content: "",
        hiragana: "",
        imi: "",
        kanji: "",
    });

    const onCreateWord = async () => {
        console.log(word.content);
        console.log(word.hiragana);
        console.log(word.imi);
        console.log(word.kanji);
        return await createNewWord(auth.idToken, auth.localId, listId, word.content, word.hiragana, word.imi, word.kanji);
    }

    useEffect(() => {
        getList(listId, userId, auth.idToken).then(data => {
            setList(state => {
                return {
                    id: data.id,
                    name: data.name
                }
            })
        });
    }, [auth.idToken, listId, userId])
    console.log("render parent");
    return <ShowListDetail listId={list.id} listName={list.name} userId={userId} word={word} setWord={setWord}
                           onCreateWord={onCreateWord}/>
}

export default ShowListDetailPage;