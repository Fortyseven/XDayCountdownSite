<script>
    // import YouTube from "svelte-youtube";
    import { Audio } from "svelte-audio-video";

    let date = new Date().toLocaleString();
    const options = {
        height: "390",
        width: "640",
        //  see https://developers.google.com/youtube/player_parameters
        playerVars: {
            autoplay: 1,
        },
    };
</script>

<div>
    <!-- <h1>IT IS AN X-DAY.</h1> -->
    <Audio controls={true}>
        <source src="/assets/media/countdown.mp3" type="audio/mp3" />
    </Audio>
</div>

<!-- <YouTube videoId="w0xbP83McGk" {options} /> -->
<style>
    h1 {
        color: green;
        line-height: normal;
        font-weight: normal;
        font-family: Arial, Helvetica, sans-serif;
    }
</style>
