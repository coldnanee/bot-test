import { ZodSchema } from 'zod';

export const validateEnv =
  (schema: ZodSchema) => (config: Record<string, string>) => {
    try {
      return schema.parse(config);
    } catch (e) {
      throw new Error((e as string).toString());
    }
  };
