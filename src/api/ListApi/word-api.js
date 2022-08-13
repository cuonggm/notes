const urlPrefix = "https://notes-cuonggm-com-default-rtdb.firebaseio.com";

export const createNewWord = async (userToken, userId, listId, wordContent, hiragana, imi, kanji) => {
    const url = `${urlPrefix}/users/${userId}/lists/${listId}/words.json?auth=${userToken}`;
    const timestamp = (new Date()).getTime();
    const requestBody = {
        content: wordContent,
        hiragara: hiragana,
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