<template>
    <div class="editor">
        <textarea ref="editorEl"></textarea>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { basicSetup } from 'codemirror';
import { xml } from '@codemirror/lang-xml';
import { useEditorStore } from '~/stores/editor';
import { useDebounceFn } from '@vueuse/core';

const editorEl = ref<HTMLTextAreaElement>();
const store = useEditorStore();

onMounted(() => {
    const updateDebounced = useDebounceFn((content: string) => {
        store.mjml = content;
    }, 300);

    const state = EditorState.create({
        doc: store.mjml,
        extensions: [
            basicSetup,
            xml(),
            EditorView.updateListener.of((update) => {
                if (update.docChanged) {
                    updateDebounced(update.state.doc.toString());
                }
            })
        ]
    });

    const view = new EditorView({
        state,
        parent: editorEl.value!,
    });
});
</script>

<style scoped>
.editor {
  height: 100%;
}
</style>
