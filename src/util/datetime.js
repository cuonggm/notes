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
    return Math.floor(remainTime);
}

export const dateToString = (timestamp) => {
    return new Date(timestamp).toLocaleString();
}

export const getDateFromMoment = (moment) => {
    const date = moment.toDate();
    console.log(typeof(date))
    console.log(date);
}

export const getTimeFromMoment = (moment) => {
    return moment.toDate();
}
