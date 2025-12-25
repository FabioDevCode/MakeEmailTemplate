<template>
    <iframe :srcdoc="store.html" class="preview"></iframe>
</template>

<script setup lang="ts">
import { useEditorStore } from '~/stores/editor';
const store = useEditorStore();
</script>

<style scoped>
.preview {
    width: 100%;
    height: 100%;
    border: none;
}
</style>
