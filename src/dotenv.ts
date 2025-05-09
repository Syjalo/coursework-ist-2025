import 'dotenv/config';
import z from 'zod';

const envSchema = z.object({
	DB_FILE_NAME: z.string(),
});

envSchema.parse(process.env);

declare global {
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof envSchema> {}
	}
}
