import fs from 'fs';
import path from 'path';

export default defineEventHandler(async () => {
    const templatesDir = path.resolve('./templates/starter');
    const files = fs.readdirSync(templatesDir);
    const templates = files.map(file => ({
        name: file.replace('.mjml', ''),
        content: fs.readFileSync(path.join(templatesDir, file), 'utf-8')
    }));
    return templates;
});
