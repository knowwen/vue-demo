<template>
    <div>
        <p>Count: {{ count }}</p>
        <button @click="count++">Increment</button>
    </div>  
</template>
<script setup lang="ts" name="Count">
    import { ref } from 'vue';
    const count = ref(0);
</script>

<style scoped>

</style>