<script>
    import { onMount } from "svelte";
    import dayjs from "dayjs";

    let clock = "";
    let countdown = "";

    /*------------------------------------------------------*/
    const getClockyBits = () => {
        return dayjs(new Date()).format("h:mm:ss");
    };

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

    /*------------------------------------------------------*/
    const updateClock = () => {
        clock = getClockyBits();
        countdown = getTime();
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

<div class="countdown">
    <div class="clock">{@html clock}</div>
    {@html countdown}
</div>

<style>
    .countdown {
        width: 100%;
        color: var(--xday-color);
        position: absolute;
        font-size: 12pt;
        line-height: 0.9em;
        text-align: center;
        text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.75);
        user-select: none;
        transform: translateY(-50%);
        top: 50%;
    }

    @media (max-width: 767px) {
        .countdown {
            font-size: 16vw;
        }
    }
    @media (min-width: 768px) {
        .countdown {
            font-size: 12vw;
        }
    }
    @media (min-width: 1024px) {
        .countdown {
            font-size: 17vw;
        }
    }
    @media (min-width: 1024px) {
        .countdown {
            font-size: 17vw;
        }
    }
    @media (min-width: 1440px) {
        .countdown {
            font-size: 9vw;
        }
    }
    @media (min-width: 2880px) {
        .countdown {
            font-size: 6vw;
        }
    }
    @media (max-height: 1024px) and (orientation: landscape) {
        .countdown {
            font-size: 15vh;
        }
    }

    .clock {
        color: black;
        margin-bottom: 0.25em;
    }
</style>
