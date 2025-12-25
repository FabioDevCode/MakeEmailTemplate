import { defineStore } from 'pinia';

export const useEditorStore = defineStore('editor', {
    state: () => ({
        mjml: '',
        html: '',
        errors: [] as any[],
        currentTemplateId: null as number | null,
        templates: [] as { id: number; name: string; content: string }[],
    }),
    actions: {
        setTemplate(template: { id: number; name: string; content: string }) {
            this.mjml = template.content;
            this.currentTemplateId = template.id;
        },
        setHtml(html: string) {
            this.html = html;
        },
        setErrors(errors: any[]) {
            this.errors = errors;
        },
        setTemplates(templates: { id: number; name: string; content: string }[]) {
            this.templates = templates;
        }
    }
});
