<template>
    <div class="w-100 h-100 p-1 d-flex justify-content-center align-items-center text-white no-wrap font-size-0_75 flex-column overflow-hidden">
        <div :class="state">{{title}}</div>
        <action-icon :type="icon" class="icon" :state="state"/>
    </div>
</template>

<script>
    import ActionIcon from "./ActionIcon";

    export default {
        name: "Action",
        components: {ActionIcon},
        props: ['title', 'icon'],
        data() {
            return {
                state: 'preview'
            }
        },
        computed: {},
        methods: {
            setState(state) {
                this.state = state;
            }
        }
    }
</script>

<style scoped>
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
