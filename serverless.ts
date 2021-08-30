/* eslint-disable @typescript-eslint/no-explicit-any */
import { allConfigs } from '@libs/config';
import type { AWS } from '@serverless/typescript';
import { getJobResources } from 'jobResources';

const serverlessConfiguration: AWS = {
  service: 'ts-batch',
  frameworkVersion: '2',
  custom: {
    stage: '${opt:stage, "local"}', // local・dev・prd
    config: allConfigs,
  },
  provider: {
    name: 'aws',
    deploymentBucket: {
      name: 'sls-deployment',
    },
    region: 'ap-northeast-1',
    lambdaHashingVersion: '20201221',
  },
  resources: {
    Resources: getJobResources(),
  },
};

module.exports = serverlessConfiguration;
