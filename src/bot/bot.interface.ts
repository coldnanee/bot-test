import { ModuleMetadata } from '@nestjs/common';

export interface IBotOptions {
  token: string;
}

export interface IBotModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports' | 'exports' | 'providers'> {
  useFactory: (...args: any[]) => Promise<IBotOptions> | IBotOptions;
  inject?: any[];
}
