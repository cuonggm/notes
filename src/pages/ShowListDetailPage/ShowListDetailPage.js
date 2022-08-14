import ShowListDetail from "../../components/ShowListDetail/ShowListDetail";
import {Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getList} from "../../api/ListApi/ListApi";
import {useSelector} from "react-redux";
import {createNewWord, deleteWord, getWord, getWords} from "../../api/ListApi/word-api";
import WordListComponent from "../../components/WordListComponent";
import {parseWordList} from "../../util/word-util";
import {Spin} from "antd";

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

    const [isWordListLoading, setWordListLoading] = useState(false);

    const onCreateWord = async () => {
        const data = await createNewWord(auth.idToken, auth.localId, listId, word.content, word.hiragana, word.imi, word.kanji);
        const newItem = await getWord(auth.localId, listId, data.name, auth.idToken);
        console.log(newItem);
        setWords(state => {
            return [newItem, ...state];
        })
        return data;
    }

    const onDeleteWord = async (wordId) => {
        setWordListLoading(true);
        await deleteWord(auth.localId, listId, wordId, auth.idToken);
        const newWords = words.filter(item => {
            return item.id !== wordId;
        });
        setWords(newWords);
        setWordListLoading(false);
    }

    // Get A List Info
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

    const [words, setWords] = useState([]);
    // Get Word List inside
    useEffect(() => {
        getWords(auth.localId, listId, auth.idToken)
            .then(data => {
                console.log("ShowListDetailPage->useEffect->getWords");
                console.log(data);
                const wordItems = parseWordList(data);
                console.log("After parse")
                console.log(wordItems);
                setWords(wordItems);
            })
            .catch(error => {
                console.log(error);
            });

    }, [auth.idToken, auth.localId, listId]);

    return <Fragment>
        <ShowListDetail listId={list.id} listName={list.name} userId={userId} word={word} setWord={setWord}
                        onCreateWord={onCreateWord}/>
        <Spin spinning={isWordListLoading}>
            <WordListComponent words={words} onDeleteWord={onDeleteWord}/>
        </Spin>

    </Fragment>

}

export default ShowListDetailPage;