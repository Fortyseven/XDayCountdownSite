import { get } from "svelte/store";
import dayjs from "dayjs";

import store from "./store";

const isItXDay = store.isItXDay;

/*------------------------------------------------------*/
function getClockyBits({ no_secs = false } = {}) {
    if (no_secs) {
        return dayjs(new Date()).format("h:mm");
    }
    return dayjs(new Date()).format("h:mm:ss");
}

/**
 * Returns whether it's past 7am on XDay, but before midnight.
 */
function getIsItXDayAllDay(date) {
    const cur_year = date.getFullYear();

    const isAfterXDay = dayjs(date).isAfter(`${cur_year}-07-05 07:00:00`);
    const isBeforeNextDay = dayjs(date).isBefore(`${cur_year}-07-06 00:00:00`);

    return isAfterXDay && isBeforeNextDay;
}

/*------------------------------------------------------*/
function getTimeString() {
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
    } else {
        days = dayjs(xday).diff(today, "days");
        hours = dayjs(xday).diff(today, "hours") % 24;
        minutes = dayjs(xday).diff(today, "minutes") % 60;
        seconds = dayjs(xday).diff(today, "seconds") % 60;
    }

    store.isItXDay.set(getIsItXDayAllDay(today));

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

    if (output.length) {
        output.push("Until X-Day!");
    } else {
        output.push("Damn it, Stang!");
    }

    return output.join("<br/>");
}

export { getTimeString, getClockyBits };
