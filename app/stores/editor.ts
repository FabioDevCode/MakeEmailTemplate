import { defineStore } from 'pinia';

export const useEditorStore = defineStore('editor', {
    state: () => ({
        mjml: '',
        html: '',
        errors: [] as any[],
        currentTemplateId: null as number | null,
    }),
});