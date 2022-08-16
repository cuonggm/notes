import moment from "moment";

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
    return moment.toDate();
}

export const getTimeFromMoment = (moment) => {
    return moment.toDate();
}

export const toDate = (date, time) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDay(), time.getHours(), time.getMinutes(), time.getSeconds());
}

export const diffMins = (remainSec) => {
    const now = new Date();
    const millisecs = now.getTime() + remainSec * 1000;
    const futureDate = new Date(millisecs);
    const mins = moment.duration(moment(futureDate).diff(moment(now))).asMinutes();
    return mins
}