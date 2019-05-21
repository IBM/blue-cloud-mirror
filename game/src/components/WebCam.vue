<template>
    <div ref="container" class="w-100 h-100 video-container">
        <video
                ref="video"
                id="video"
                v-on:play="onPlay"
                muted
                playsinline
                width="101%"
                height="100%"
                style=" -moz-transform: scaleX(-1);
            -o-transform: scaleX(-1);
            -webkit-transform: scaleX(-1);
            transform: scaleX(-1);
            "
        ></video>
        <canvas
                ref="capturecanvas"
                id="capturecanvas"
                :width="this.$store.state.webcam.width"
                :height="this.$store.state.webcam.height"
        ></canvas>
    </div>

</template>

<script>
    export default {
        name: "webcam",
        components: {},
        data() {
            return {};
        },
        computed: {},
        mounted() {
            this.video = this.$refs.video;

            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({video: {}})
                    .then(stream => {
                        this.video.srcObject = stream;
                        this.video.play();
                    })
                    .catch((e)=> {
                        console.log(e);
                    });


            }
            window.addEventListener('resize', this.onResize);
        },
        destroyed() {
            window.removeEventListener('resize', this.onResize);
        },
        methods: {
            onResize() {
                this.updateVideoDimensions();
            },
            updateVideoDimensions() {
                this.$store.commit('updateVideoDimensions', {width: this.video.clientWidth, height: this.video.clientHeight});
            },
            onPlay(event) {
                if (this.video.paused || this.video.ended)
                    return setTimeout(() => this.onPlay());

                this.capturecanvas = this.$refs.capturecanvas;
                let capturecanvas = this.capturecanvas
                    .getContext("2d")
                    .drawImage(
                        this.video,
                        0,
                        0,
                        520,
                        440
                    );

                if ((this.$store.state.currentGame.emotions.ongoing == true) || (this.$store.state.currentGame.poses.ongoing == true)) {
                    this.$store.commit("updateLastImage", this.capturecanvas.toDataURL("image/png"));
                }

                setTimeout(() => this.onPlay(), this.$store.state.webcam.delay);
            }
        }
    };
</script>

<style scoped>
    video {
        object-fit: cover;
    }

    .video-container {
        overflow: hidden;
        background: black;
    }

    #capturecanvas {
        display: none;
    }
</style>
