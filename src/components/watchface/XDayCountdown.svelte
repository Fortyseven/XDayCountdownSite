<script>
    import { onMount } from "svelte";
    import { getTime } from "../common";

    let time = "";

    /*------------------------------------------------------*/
    const updateClock = () => {
        time = getTime();
    };

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
