<template>
    <div class="content text-white text-shadow">
        <div class="ibm-plex-sans time">{{$store.state.time}}</div>
        <div class="label">Time</div>
    </div>
</template>

<script>
    export default {
        name: "TimeLabel",
        props: ['time']
    }
</script>

<style scoped>
    .content {
        position: absolute;
        top: 2rem;
        right: 2rem;
        text-align: right;
    }
    .time {
        font-size: 3rem;
        line-height: 2.2rem;
    }
    .label {
        font-size: 1.5rem;
    }

</style>
