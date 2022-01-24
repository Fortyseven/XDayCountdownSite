<script>
    import { onMount } from "svelte";

    import Dobbsface from "./components/Dobbsface.svelte";
    import Fullscreen from "./components/Fullscreen.svelte";
    import Banner from "./components/fullscreen/Banner.svelte";

    import { isItXDayAllDay } from "./common";

    // import timemachine from "timemachine";
    // timemachine.config({
    //     // dateString: "2022-07-05 6:59:33", // just before xday
    //     // dateString: "2022-07-05 12:00:33", // noon
    //     // dateString: "2022-12-31 23:59:58", // just before new years
    //     tick: true,
    // });

    let showBanner = false;

    onMount(() => {
        // FIXME: if we roll-over from 7/4 to 7/5, the banner won't show
        if (isItXDayAllDay()) {
            showBanner = true;
        }
    });

    function onClick() {
        showBanner = false;
    }
</script>

<main on:click={onClick}>
    <!-- <Dobbsface /> -->
    <Fullscreen />
    {#if showBanner}
        <Banner on:pageClick />
    {/if}
</main>

<style>
</style>
