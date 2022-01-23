<script>
    import { onMount } from "svelte";
    import dayjs from "dayjs";

    var time = "";

    const getTime = () => {
        return dayjs(new Date()).format("h:mm");
    };

    const updateClock = () => {
        time = getTime();
    };

    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    onMount(() => {
        window.setInterval(updateClock, 1000);
    });

    updateClock();
</script>

<span class="time">{time}</span>

<style>
    .time {
        width: 100%;
        display: inline-block;
        max-width: var(--face-width);
        max-height: var(--face-height);
        color: var(--clock-color);
        position: relative;
        top: 50px;
        font-size: 2.5em;
        text-align: center;
        text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.35);
        user-select: none;
    }
</style>
