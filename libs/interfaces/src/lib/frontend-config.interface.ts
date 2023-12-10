import { EnvEnum } from "@genex/enums";

export interface IFrontendConfig {
  production: boolean;
  env: EnvEnum;
  url: string;
  appTitle: string;
  serverUrl: string;
}
