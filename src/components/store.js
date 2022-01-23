import { writable } from "svelte/store";

export default {
    isItXDay: writable(true), // for later; it's after 7am but still "xday"
};
