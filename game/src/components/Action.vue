<template>
    <div class="w-100 h-100 p-1 d-flex justify-content-center align-items-center text-white no-wrap font-size-0_75 flex-column overflow-hidden">
        <div :class="state">{{title}}</div>
        <action-icon v-if="!capturedImage" :type="icon" class="icon" :state="state"/>
        <div v-if="capturedImage" class="capture"><img :src="capturedImage"/></div>
    </div>
</template>

<script>
    import ActionIcon from "./ActionIcon";

    export default {
        name: "Action",
        components: {ActionIcon},
        props: ['title', 'icon', 'capture', 'level'],
        data() {
            return {
                state: 'preview'
            }
        },
        computed: {
            capturedImage() {
                return this.$store.state.currentGame[this.level].results[this.capture];
            }
        },
        methods: {
            setState(state) {
                this.state = state;
            }
        }
    }
</script>

<style scoped>

    .capture {
        overflow: hidden;
        width: 12vw;
        height: 12vw;
        margin-top: 5px;
        min-width: 40px;
        min-height: 40px;
        max-width: 115px;
        max-height: 115px;

    }
    img {
        width: 100%;
    }

    .icon {
        width: 100%;
        height: 8vh;
        margin-top: 0.25rem;
    }

    .active {
        color: #1FD4D2;
    }

    .active::after {
        content: "/";
    }

    .success {
        color: #9DEDB2
    }

    .success::before {
        content: "<";
    }

    .success::after {
        content: ">";
    }

    .failed {
        color: #FE767C;
        text-decoration: line-through;
    }

    .preview {
        color: white;
    }

</style>
