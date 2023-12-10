import { EnvEnum } from '@genex/enums';
import { IFrontendConfig } from '@genex/interfaces';

export const environment: IFrontendConfig = {
  production: true,
  env: EnvEnum.LOCAL,
  url: 'http://localhost:4200',
  appTitle: 'Genex',
  serverUrl: 'http://localhost:3000/api',
};
