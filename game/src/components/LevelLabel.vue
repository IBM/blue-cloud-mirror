<template>
    <div class="content text-white text-shadow">
        <div class="ibm-plex-sans time">{{level}}/2</div>
        <div class="label">Level</div>
    </div>
</template>

<script>
    export default {
        name: "LevelLabel",
        props: ['level']
    }
</script>

<style scoped>
    .content {
        position: absolute;
        top: 2rem;
        left: 2rem;
    }
    .time {
        font-size: 3rem;
        line-height: 2.2rem;
    }
    .label {
        font-size: 1.5rem;
    }

</style>
