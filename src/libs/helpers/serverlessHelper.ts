import type { AWS } from '@serverless/typescript';

const slsAWS: AWS = {
  service: 'dummy',
  provider: {
    name: 'aws',
  },
  functions: {
    dummy: {},
  },
  resources: {
    Resources: {},
  },
};
const slsFunctions = slsAWS.functions;
const slsFunction = slsFunctions!.dummy;
const slsRoleStatements = slsAWS.provider.iamRoleStatements;
const slsResources = slsAWS.resources?.Resources;

export type SLSFunctions = typeof slsFunctions;
export type SLSFunction = typeof slsFunction;
export type SLSRoleStatements = typeof slsRoleStatements;
export type SLSResources = typeof slsResources;

export function getBaseInfo(rawDir: string) {
  const dir = `${rawDir.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}`;
  const jobName = dir.split('/').slice(-1)[0];
  return { jobName };
}
