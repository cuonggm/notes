export const currentDateTime = () => {
    const now = new Date();
    return (
        now.getFullYear() +
        "-" +
        now.getMonth() +
        "-" +
        now.getDate() +
        " " +
        now.getHours() +
        ":" +
        now.getMinutes() +
        ":" +
        now.getSeconds()
    );
};

export const calculateRemainTime = (futureTime) => {
    const now = new Date();
    const remainTime = Math.floor((futureTime - now.getTime()) / 1000);
    console.log("REMAIN: " + remainTime);
    return Math.floor(remainTime);
}