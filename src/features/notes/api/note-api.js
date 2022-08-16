import {apiRootUrl} from "../../../const/const";

export const createNote = async (note, userId, userToken) => {
    const url = `${apiRootUrl}/users/${userId}/notes.json?auth=${userToken}`;
    console.log(url);
    const res = fetch(url, {
        method: "POST",
        body: JSON.stringify(userToken),
    });
    const data = await res.json();
    console.log(data);
    if (!res.ok) {
        throw new Error("createNote: Error");
    }
    return data;
}