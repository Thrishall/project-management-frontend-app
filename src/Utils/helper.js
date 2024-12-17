import { month } from "../Constant/currDate";

export const beautifyDate = (date) => {
    const [day, monthNumber] = date.split("/");

    return `${month[monthNumber-1][0].toUpperCase() + month[monthNumber-1].slice(1)} ${day}`
}

export const compareDates = (date1, date2 = new Date()) => {
    const initalDate1Part = date1?.split("/");

    const initalDate1 = new Date(`${initalDate1Part?.[1]}/${initalDate1Part?.[0]}/${initalDate1Part?.[2]}`);
    initalDate1.setHours(0, 0, 0, 0);

    date2.setHours(0, 0, 0, 0);

    return initalDate1?.getTime() < date2?.getTime();
}

export const defaultDateFormat = (date = new Date()) => {
    date.setHours(0, 0, 0, 0);

    const currDate = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : (date.getMonth() + 1);
    const year = date.getFullYear();

    return `${month}/${currDate}/${year}`;
}