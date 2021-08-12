import { baseHandler, BatchHandler } from '@libs/helpers/batchHelper';

const handler: BatchHandler<void> = async () => {
  console.log('Sample test');
  console.log($config.sampleConfig);
};

baseHandler(handler);
