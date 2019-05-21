<template>
    <div class="w-100 h-100 background p-5 d-flex justify-content-center align-items-center text-white flex-column overflow-hidden">
        <transition name="flash">
            <div v-if="flash && $store.state.currentGame.lastResult == 'success'" class="flash success"></div>
            <div v-if="flash && $store.state.currentGame.lastResult == 'failed'" class="flash failed"></div>
        </transition>
        <action-icon class="zindex icon" :type="$store.state.currentGame.currentAction.action"/>
        <div class="title zindex">{{$store.state.currentGame.currentAction.title}}</div>

    </div>
</template>

<script>
    import ActionIcon from "./ActionIcon";

    export default {
        name: "ActionPreview",
        components: {ActionIcon},
        data() {
            return {
                flash: false
            }
        },
        computed: {},
        mounted() {
            this.unwatch = this.$store.watch(
                state => {
                    return state.currentGame.currentAction;
                },
                val => {
                    this.flash = true;
                    setTimeout(() => {
                        this.flash = false;
                    }, 150);
                },
                {
                    deep: true
                }
            );
        },
        beforeDestroy() {
            this.unwatch();
        }

    }
</script>

<style scoped>


    .background {
        background-color: #282828;
    }

    .flash {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .failed {
        background-color: #FE767C;
    }

    .success {
        background-color: #9DEDB2;
    }

    .title {
        margin-top: -5rem;
        font-size: 3rem;
    }

    .icon {
        width: 90%;
        padding: 5rem;
        max-height: 800px;
    }

    @media (max-width: 992px) {
        .icon {
            height: 130%;
            margin-top: -2rem;
        }

        .title {
            margin-top: -6rem;
        }
    }

    .zindex {
        z-index: 1;
    }

    @media (max-height: 900px) and (max-width: 1000px ) {
        .title {
            /*margin-top: -6rem;*/
            font-size: 2rem;
        }
    }

</style>
