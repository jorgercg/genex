import { EnvEnum } from '@genex/enums';
import { IFrontendConfig } from '@genex/interfaces';

export const environment: IFrontendConfig = {
  production: false,
  env: EnvEnum.DEV,
  url: 'http://localhost:4200',
  appTitle: 'Genex',
  serverUrl: 'http://localhost:3000/api',
};
