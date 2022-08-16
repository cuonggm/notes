export const breakTags = (string) => {
    let tagsString = string.trim();
    while(tagsString.indexOf("  ") !== -1) {
        tagsString = tagsString.replace("  ", " ");
    }
    let tagList = tagsString.split(" ").filter(function(item,i,allItems){
        return i===allItems.indexOf(item);
    }).join(" ");

    return tagList.split(" ");
}