<script>
    import { onMount } from "svelte";
    import dayjs from "dayjs";

    let time = "";

    /*------------------------------------------------------*/
    const getTime = () => {
        // let today = new Date(2021, 7, 4);
        let today = new Date();
        let cur_year = today.getFullYear();

        let isAfterXDay = dayjs(today).isAfter(
            dayjs(`${cur_year}-07-05 07:00`)
        );
        let xDayYear = cur_year + (isAfterXDay ? 1 : 0);

        let xday = `${xDayYear}-07-05 07:00`;

        let days;
        let hours;
        let minutes;
        let seconds;

        if (isAfterXDay) {
            days = dayjs(today).diff(xday, "days");
            hours = dayjs(today).diff(xday, "hours") % 24;
            minutes = dayjs(today).diff(xday, "minutes") % 60;
            seconds = dayjs(today).diff(xday, "seconds") % 60;
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

    /*------------------------------------------------------*/
    const updateClock = () => {
        time = getTime();
    };

    /*------------------------------------------------------*/
    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    /*------------------------------------------------------*/
    onMount(() => {
        window.setInterval(updateClock, 1000);
    });

    updateClock();
</script>

<span class="time">{@html time}</span>

<style>
    .time {
        width: 100%;
        display: inline-block;
        max-width: var(--face-width);
        max-height: var(--face-height);
        color: var(--xday-color);
        position: relative;
        top: 50px;
        font-size: 2em;
        line-height: 0.9em;
        text-align: center;
        text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.75);
        user-select: none;
        transform: translateY(-50%);
        top: 50%;
    }
</style>
