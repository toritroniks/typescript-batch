import config from '@libs/config';

declare global {
  const $config: typeof config;
}
