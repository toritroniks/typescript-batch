import { getBaseInfo } from '@libs/helpers/serverlessHelper';
import { JobConfig } from 'jobResources';

const { jobName } = getBaseInfo(__dirname);

const jobConfig: JobConfig = {
  name: jobName,
  command: `run ${jobName}`,
  memory: '512',
  vcpu: '0.25',
  retryAttempts: 1,
  schedules: ['cron(0 17 * * ? *)'],
};

export default jobConfig;
