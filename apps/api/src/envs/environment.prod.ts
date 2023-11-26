import { EnvEnum } from '@genex/enums';
import { IBackendConfig } from '@genex/interfaces';

export const environment: IBackendConfig = {
  env: EnvEnum.PROD,
  port: 3000,
};
