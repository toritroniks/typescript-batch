import configLOCAL from './configLOCAL';
import configDEV from './configDEV';

export interface Config {
  sampleConfig: string;
  containerImage: string;
  jobExecRole: string;
  jobTaskRole: string;
  jobQueue: string;
  eventRole: string;
}

let config!: Config;

switch (process.env.ENV) {
  case 'dev':
    config = configDEV;
    break;
  default:
    config = configLOCAL;
}

export default config;

export const allConfigs = {
  local: configLOCAL,
  dev: configDEV,
};
