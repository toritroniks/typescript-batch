import configLOCAL from './configLOCAL';
import configDEV from './configDEV';

export interface Config {
  sampleConfig: string;
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
