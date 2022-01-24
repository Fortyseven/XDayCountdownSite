<script>
    import { onMount } from "svelte";

    import store from "../../store";
    import { getTimeString, getClockyBits } from "../../common";

    import Special from "./Special.svelte";
    import dayjs from "dayjs";
    import isBetween from "dayjs/plugin/isBetween";

    dayjs.extend(isBetween);

    let clock = "";
    let countdown = "";

    let isItXDay;
    let executeSpecial = false;

    store.isItXDay.subscribe((value) => (isItXDay = value));

    /*------------------------------------------------------*/
    const updateClock = () => {
        clock = getClockyBits();
        countdown = getTimeString();
        if (dayjs(new Date()).isSame("2022-07-05 06:59:35", "second")) {
            executeSpecial = true;
        }
    };

    /*------------------------------------------------------*/
    onMount(() => {
        window.setInterval(updateClock, 1000);
    });

    updateClock();
</script>

<div class="countdown">
    {#if executeSpecial}
        <Special />
    {/if}
    {#if isItXDay}
        <h1>It is an X-Day.</h1>
    {:else}
        <div class="clock">{@html clock}</div>
        {@html countdown}
    {/if}
</div>

<style>
    .countdown {
        width: 100%;
        color: var(--xday-color);
        position: absolute;
        font-size: 12pt;
        line-height: 0.9em;
        text-align: center;
        text-shadow: 2px 2px 1px #000000bf;
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
            font-size: 15vw;
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
