import {apiRootUrl} from "../../const/const";

const urlPrefix = apiRootUrl;

export const createNewWord = async (userToken, userId, listId, wordContent, hiragana, imi, kanji) => {
    const url = `${urlPrefix}/users/${userId}/lists/${listId}/words.json?auth=${userToken}`;
    const timestamp = (new Date()).getTime();
    const requestBody = {
        content: wordContent,
        hiragana: hiragana,
        imi: imi,
        kanji: kanji,
        createdAt: timestamp,
    };
    const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(requestBody),
    })
    const data = await res.json();
    console.log("word-api res.json()");
    console.log(data);
    if (res.ok) {
        return data;
    } else {
        throw new Error(data.toString())
    }
}

export const getWords = async (userId, listId, userToken) => {
    const url = `${apiRootUrl}/users/${userId}/lists/${listId}/words.json?auth=${userToken}`;
    const res = await fetch(url);
    const data = await res.json();
    if (res.ok) {
    } else {
        throw new Error("Could not fetch from url: " + url);
    }
    return data;
};

export const getWord = async (userId, listId, wordId, userToken) => {
    const url = `${apiRootUrl}/users/${userId}/lists/${listId}/words/${wordId}.json?auth=${userToken}`;
    const res = await fetch(url);
    const data = await res.json();
    if (res.ok) {
        data.id = wordId;
    } else {
        throw new Error("Could not fetch from url: " + url);
    }
    return data;
}

export const deleteWord = async (userId, listId, wordId, userToken) => {
    const url = `${apiRootUrl}/users/${userId}/lists/${listId}/words/${wordId}.json?auth=${userToken}`;
    const res = await fetch(url, {method: "DELETE"});
    const data = await res.json();
    if (res.ok) {
    } else {
        throw new Error("Could not fetch from url: " + url);
    }
    return data;
}