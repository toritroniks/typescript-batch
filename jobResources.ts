import { SLSResources } from '@libs/helpers/serverlessHelper';

import sampleJob from '@jobs/sample-job';

const jobs: JobConfig[] = [sampleJob];

// eslint-disable-next-line max-lines-per-function
export function getJobResources(): SLSResources {
  const resources: SLSResources = {};
  for (const job of jobs) {
    Object.assign(resources, createJobDefResource(job));
    Object.assign(resources, createJobScheduleResources(job));
  }
  return resources;
}

function createJobDefResource(job: JobConfig): SLSResources {
  return {
    [`${toCamelCase(job.name)}JobDef`]: {
      Type: 'AWS::Batch::JobDefinition',
      Properties: {
        JobDefinitionName: `\${self:custom.stage}-${job.name}`,
        PlatformCapabilities: ['FARGATE'],
        Type: 'Container',
        ContainerProperties: {
          Command: job.command.split(' '),
          ExecutionRoleArn: '${self:custom.config.${self:custom.stage}.jobExecRole}',
          JobRoleArn: '${self:custom.config.${self:custom.stage}.jobTaskRole}',
          ResourceRequirements: [
            { Type: 'VCPU', Value: job.vcpu },
            { Type: 'MEMORY', Value: job.memory },
          ],
          NetworkConfiguration: { AssignPublicIp: 'DISABLED' },
          Image: '${self:custom.config.${self:custom.stage}.containerImage}',
        },
        RetryStrategy: { Attempts: job.retryAttempts },
      },
    },
  };
}

function createJobScheduleResources(job: JobConfig): SLSResources {
  const scheduleResources: SLSResources = {};
  let index = 0;
  for (const scheduleExpression of job.schedules) {
    index++;
    const ruleName = `ts-batch-\${self:custom.stage}-${job.name}-${index}`;
    scheduleResources[`${toCamelCase(job.name)}JobSchedule${index}`] = {
      Type: 'AWS::Events::Rule',
      Properties: {
        Name: ruleName,
        ScheduleExpression: scheduleExpression,
        Targets: [
          {
            Arn: '${self:custom.config.${self:custom.stage}.jobQueue}',
            BatchParameters: {
              JobDefinition: { Ref: `${toCamelCase(job.name)}JobDef` },
              JobName: ruleName,
              RetryStrategy: { Attempts: 1 },
            },
            Id: job.name,
            RoleArn: '${self:custom.config.${self:custom.stage}.eventRole}',
          },
        ],
      },
    };
  }
  return scheduleResources;
}

function toCamelCase(str: string) {
  return `_${str}`.replace(/([-_]\w)/g, function (k) {
    return k[1].toUpperCase();
  });
}

export interface JobConfig {
  name: string;
  command: string;
  vcpu: string;
  memory: string;
  retryAttempts: number;
  /** UTCのクローン定義 */
  schedules: string[];
}
