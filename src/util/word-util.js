// convert from words object to list object
export const parseWordList = (wordsObject) => {
    const items = [];
    for (const key in wordsObject) {
        const item = wordsObject[key];
        items.push({
            id: key,
            createdAt: item.createdAt,
            content: item.content,
            hiragana: item["hiragana"],
            imi: item.imi,
            kanji: item.kanji,
        });
    }
    return items;
}