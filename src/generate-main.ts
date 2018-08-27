import { ResourceLoader } from '@angular/compiler';
import { Compiler, CompilerFactory, Injectable, StaticProvider, Type } from '@angular/core';
import { platformDynamicServer } from '@angular/platform-server';
import { readFile } from 'fs';
import * as glob from 'glob';
import * as path from 'path';
import { AppComponent } from './app/app.component';
import { AppModule } from './app/app.module';

@Injectable()
export class ResourceLoaderImpl extends ResourceLoader {
  constructor(private _cwd: string) {
    super();
  }

  get(resourceFileName: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      glob(`**/${resourceFileName}`, { cwd: this._cwd, }, (globError, matches) => {
        if (globError) reject(globError);
        else
          readFile(
            path.join(this._cwd, matches[0]),
            (readFileError, data) => {
              if (readFileError) reject(readFileError);
              else resolve(data.toString());
            }
          );
      });
    });
  }
}

export function createCompiler(compilerFactory: CompilerFactory) {
  return compilerFactory.createCompiler();
}

async function generate<M>(moduleType: Type<M>) {
  try {
    const extraProviders: StaticProvider[] = [
      { provide: Compiler, useFactory: createCompiler, deps: [CompilerFactory] },
    ];
    const platformRef = platformDynamicServer(extraProviders);
    const moduleRef = await platformRef
      .bootstrapModule(
        moduleType,
        {
          providers: [ { provide: ResourceLoader, useValue: new ResourceLoaderImpl(`C:\\temp\\protractor-angular-seattle\\src\\app`), deps: [] }, ], // useClass: ResourceLoaderImpl, 
        });
    
    const appComponent = moduleRef.injector.get(AppComponent);
    
    console.info(appComponent.title.toString());
  } catch (error) {
    const x = JSON.stringify(error) + " ||| " + error.toString();
    throw new Error(x);
  }
}

generate(AppModule)
  .then(message => console.info({ message }))
  .catch(error => console.error({ error }));
