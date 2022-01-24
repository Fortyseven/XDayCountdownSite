import { get } from "svelte/store";
import dayjs from "dayjs";
import pluralize from "pluralize";

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
 * Returns whether it's any time from 0000 to 2359 on 7/5
 */
function isItXDayAllDay() {
    const today = new Date();
    const cur_year = today.getFullYear();
    const res = dayjs(today).isSame(`${cur_year}-07-05`, "day");

    return res;
}

/**
 * Returns whether it's past 0700-2359 on 7/5, but before midnight.
 */
function getIsItXDay(date) {
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

    let output = [];

    if (days) {
        output.push(`${days} ${pluralize("Day", days)}`);
    }
    if (hours) {
        output.push(`${hours} ${pluralize("Hour", hours)}`);
    }
    if (minutes) {
        output.push(`${minutes} ${pluralize("Minute", minutes)}`);
    }
    if (seconds) {
        output.push(`${seconds % 60} ${pluralize("Second", seconds)}`);
    }

    if (output.length) {
        let xdayNum = cur_year - 1997;
        if (isAfterXDay) xdayNum++;
        output.push(`Until ${xdayNum} X-Day!`);
    } else {
        output.push("Damn it, Stang!");
    }

    return output.join("<br/>");
}

export { getTimeString, getClockyBits, isItXDayAllDay };
