import dayjs from "dayjs";

/*------------------------------------------------------*/
const getClockyBits = () => {
    return dayjs(new Date()).format("h:mm:ss");
};

/*------------------------------------------------------*/
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

/*------------------------------------------------------*/
const getTime = () => {
    // let today = new Date(2021, 7, 4);
    let today = new Date();
    let cur_year = today.getFullYear();

    let isAfterXDay = dayjs(today).isAfter(dayjs(`${cur_year}-07-05 07:00`));
    let xDayYear = cur_year + (isAfterXDay ? 1 : 0);

    let xday = `${xDayYear}-07-05 07:00`;

    let days;
    let hours;
    let minutes;
    let seconds;

    if (isAfterXDay) {
        days = dayjs(xday).diff(today, "days");
        hours = dayjs(xday).diff(today, "hours") % 24;
        minutes = dayjs(xday).diff(today, "minutes") % 60;
        seconds = dayjs(xday).diff(today, "seconds") % 60;
        console.log("today is AFTER xday", xday);
    } else {
        days = dayjs(xday).diff(today, "days");
        hours = dayjs(xday).diff(today, "hours") % 24;
        minutes = dayjs(xday).diff(today, "minutes") % 60;
        seconds = dayjs(xday).diff(today, "seconds") % 60;
        console.log("today is BEFORE xday", xday);
    }

    let output = [];

    if (days) {
        output.push(`${days} Days`);
    }
    if (hours) {
        output.push(`${hours} Hours`);
    }
    if (minutes) {
        output.push(`${minutes} Minutes`);
    }
    if (seconds) {
        output.push(`${seconds % 60} Seconds`);
    }

    output.push("Until X-Day!");

    return output.join("<br/>");
};

export { getTime, getClockyBits };
