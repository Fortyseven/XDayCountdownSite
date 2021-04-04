<script>
    import Clock from "../Clock.svelte";
    import XDayCountdown from "../XDayCountdown.svelte";

    const MODE_TIME = 0;
    const MODE_COUNTDOWN = 1;

    let cur_mode = MODE_COUNTDOWN;

    function toggleMode() {
        cur_mode++;
        if (cur_mode > MODE_COUNTDOWN) cur_mode = MODE_TIME;
    }
</script>

<span
    class="background"
    class:countdown={cur_mode === MODE_COUNTDOWN}
    on:click={toggleMode}
>
    {#if cur_mode == MODE_TIME}
        <Clock />
    {:else}
        <XDayCountdown />
    {/if}
</span>

<style>
    .background {
        background: url("../assets/images/dobbsface-normal.png");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        width: 400px;
        height: 400px;
        margin: auto;
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        cursor: pointer;
        box-shadow: 0 0 30px black;
    }
    .countdown {
        background-image: url("../assets/images/dobbsface-faded.png");
    }
</style>
