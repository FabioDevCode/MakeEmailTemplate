import mjml2html from 'mjml';
import { z } from 'zod';

const schema = z.object({
    mjml: z.string().min(1),
});

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { mjml } = schema.parse(body);

    const { html, errors } = mjml2html(mjml);

    return { html, errors };
});
