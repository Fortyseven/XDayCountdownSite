<script>
    import { onMount } from "svelte";
    import { getTimeString, getClockyBits } from "../common";

    let clock = "";
    let countdown = "";

    /*------------------------------------------------------*/

    /*------------------------------------------------------*/
    const updateClock = () => {
        clock = getClockyBits();
        countdown = getTimeString();
    };

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
