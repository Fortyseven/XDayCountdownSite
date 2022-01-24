import { writable } from "svelte/store";

export default {
    isItXDay: writable(false), // is it XDay, after 7am?
    isItXDayAllDay: writable(false), // is it XDay at all?
};
