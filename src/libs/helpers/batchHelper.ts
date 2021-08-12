import 'source-map-support/register';
import Ajv, { Schema } from 'ajv';
import exceptions from '@libs/enums/exceptions';

export async function baseHandler<T>(handler: BatchHandler<T>, batchOptions?: BatchOptions) {
  console.log('START:', process.argv[1]);
  try {
    const event = JSON.parse(process.argv[2] ?? '{}');
    console.log('EVENT:', JSON.stringify(event, null, 2));
    if (batchOptions?.reqSchema) validateRequest(batchOptions.reqSchema, event);
    handler(event);
  } catch (err) {
    console.error(err);
  }
  console.log('END');
  return;
}

function validateRequest(schema: Schema, req: unknown) {
  const ajv = new Ajv({
    strict: true,
    allErrors: true,
    coerceTypes: false,
  });
  const isValid = ajv.validate(schema, req);
  if (!isValid) {
    console.error(JSON.stringify(ajv.errors, null, 2));
    throw exceptions.validationError.withDetails(ajv.errors);
  }
}

export type BatchHandler<T> = (event: T) => Promise<void>;

export interface BatchOptions {
  reqSchema?: any;
}
