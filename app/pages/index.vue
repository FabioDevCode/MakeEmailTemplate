<template>
  <div class="container">
    <!-- Colonne templates -->
    <div class="templates">
      <h3>Templates</h3>
      <ul>
        <li v-for="template in store.templates" :key="template.name">
          <button @click="selectTemplate(template)">{{ template.name }}</button>
        </li>
      </ul>
    </div>

    <!-- Colonne éditeur -->
    <div class="editor-column">
      <Editor />
      <button class="compile-btn" @click="compileMJML">Compile</button>
      <div v-if="store.errors.length" class="errors">
        <h4>Errors:</h4>
        <ul>
          <li v-for="(err, index) in store.errors" :key="index">{{ err.formattedMessage || err.message }}</li>
        </ul>
      </div>
    </div>

    <!-- Colonne preview -->
    <div class="preview-column">
      <Preview />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Editor from '~/components/Editor.vue';
import Preview from '~/components/Preview.vue';
import { useEditorStore } from '~/stores/editor';

const store = useEditorStore();

const selectTemplate = (template: { id: number; name: string; content: string }) => {
  store.setTemplate(template);
};

const compileMJML = async () => {
  try {
    const res = await $fetch<{ html: string; errors: any[] }>('/api/compile', {
      method: 'POST',
      body: { mjml: store.mjml }
    });
    store.setHtml(res.html);
    store.setErrors(res.errors);
  } catch (err: any) {
    store.setErrors([{ message: err.message }]);
  }
};

onMounted(async () => {
  // Charger les templates au démarrage
  const templates = await $fetch<{ id: number; name: string; content: string }[]>('/api/templates');
  store.setTemplates(templates);

  // Charger premier template par défaut
  if (templates.length > 0) {
    selectTemplate(templates[0]!);
  }
});
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
  font-family: sans-serif;
}

.templates {
  width: 15%;
  border-right: 1px solid #ccc;
  padding: 10px;
  overflow-y: auto;
}

.editor-column {
  width: 45%;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.compile-btn {
  margin-top: 10px;
  padding: 5px 10px;
  align-self: flex-start;
}

.errors {
  margin-top: 10px;
  color: red;
  font-size: 0.9em;
  max-height: 150px;
  overflow-y: auto;
}

.preview-column {
  width: 40%;
  border-left: 1px solid #ccc;
  padding: 10px;
  overflow-y: auto;
}

.preview-column iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
