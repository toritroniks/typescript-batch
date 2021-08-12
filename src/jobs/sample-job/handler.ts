import { baseHandler, BatchHandler } from '@libs/helpers/batchHelper';
import { ReqInterface, reqSchema } from './schema';

const handler: BatchHandler<ReqInterface> = async args => {
  console.log('Batch Script:', args.param);
  console.log($config.sampleConfig);
  throw new Error();
};

baseHandler(handler, { reqSchema: reqSchema });
