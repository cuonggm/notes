export const createList = async (name, userId, userToken) => {
    const requestData = {name: name};
    const url = `https://notes-cuonggm-com-default-rtdb.firebaseio.com/users/${userId}/lists.json?auth=${userToken}`;
    const res = await fetch(url, {method: "POST", body: JSON.stringify(requestData)});
    if (res.ok) {
        const data = await res.json();
        // update listId to list
        const url = `https://notes-cuonggm-com-default-rtdb.firebaseio.com/users/${userId}/lists/${data.name}.json?auth=${userToken}`;
        const requestData = {
            id: data.name
        };
        const res2 = await fetch(url, {
            method: "PATCH",
            body: JSON.stringify(requestData)
        })
        if (res2.ok) {
            return data;
        } else {
            throw "Error: Update list id to body";
        }
    } else {
        throw "Error: Create list";
    }
}

export const getLists = async (userId, userToken) => {
    const url = `https://notes-cuonggm-com-default-rtdb.firebaseio.com/users/${userId}/lists.json?auth=${userToken}`;
    const res = await fetch(url);
    if (res.ok) {
        const data = await res.json();
        const results = [];
        for (let key in data) {
            results.push({
                id: key,
                name: data[key].name
            })
        }
        return results;
    }
}

export const getList = async (listId, userId, userToken) => {
    const url = `https://notes-cuonggm-com-default-rtdb.firebaseio.com/users/${userId}/lists/${listId}.json?auth=${userToken}`;
    const res = await fetch(url);
    if(res.ok) {
        const data = await res.json();
        console.log(data);
        return data;
    } else {
        throw "Error: getList of" + listId;
    }
}

export const deleteList = async (listId, userId, userToken) => {
    const url = `https://notes-cuonggm-com-default-rtdb.firebaseio.com/users/${userId}/lists/${listId}.json?auth=${userToken}`;
    console.log("Delete url: " + url);
    const res = await fetch(url, {
        method: "DELETE",
    });
    if(res.ok) {
        const data = await res.json();
        console.log(data);
        return data;
    } else {
        throw "Error: deleteList of" + listId;
    }
}