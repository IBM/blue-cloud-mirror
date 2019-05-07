<template>
    <div class="w-100 h-100 background p-5 d-flex justify-content-center align-items-center text-white flex-column overflow-hidden">
        <transition name="flash">
            <div v-if="flash" class="flash w-100 h-100"></div>
        </transition>
        <action-icon class="zindex" :type="$store.state.currentGame.currentAction.action"/>
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
        background-color: #1FD4D2;
    }

    .title {
        margin-top: -2rem;
        font-size: 3rem;
    }

    .zindex {
        z-index: 1;
    }

    @media (max-height: 900px) and (max-width: 1000px ) {
        .title {
            margin-top: -3rem;
            font-size: 2rem;
        }
    }

</style>
