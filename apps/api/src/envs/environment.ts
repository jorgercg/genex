import { EnvEnum } from '@genex/enums';
import { IBackendConfig } from '@genex/interfaces';

export const environment: IBackendConfig = {
  env: EnvEnum.LOCAL,
  port: 3000,
};
