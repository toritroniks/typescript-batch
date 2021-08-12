import { FromSchema } from 'json-schema-to-ts';

export const reqSchema = {
  type: 'object',
  properties: {
    param: { type: 'string' },
  },
  additionalProperties: false,
  required: ['param'],
} as const;

export type ReqInterface = FromSchema<typeof reqSchema>;
