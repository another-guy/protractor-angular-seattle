import { ResourceLoader } from '@angular/compiler';
import { Compiler, CompilerFactory, Injectable, StaticProvider, Type } from '@angular/core';
import { platformDynamicServer } from '@angular/platform-server';
import * as XMLHttpRequest from 'xhr2';
import { AppComponent } from './app/app.component';
import { AppModule } from './app/app.module';

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
          providers: [ { provide: ResourceLoader, useClass: ResourceLoaderImpl, deps: [] }, ]
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

@Injectable()
export class ResourceLoaderImpl extends ResourceLoader {
  get(url: string): Promise<string> {
    let resolve: (result: any) => void;
    let reject: (error: any) => void;
    const promise = new Promise<string>((res, rej) => {
      resolve = res;
      reject = rej;
    });

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'text';

    xhr.onload = function() {
      // responseText is the old-school way of retrieving response (supported by IE8 & 9)
      // response/responseType properties were introduced in ResourceLoader Level2 spec (supported
      // by IE10)
      const response = xhr.response || xhr.responseText;

      // normalize IE9 bug (http://bugs.jquery.com/ticket/1450)
      let status = xhr.status === 1223 ? 204 : xhr.status;

      // fix status code when it is 0 (0 status is undocumented).
      // Occurs when accessing file resources or on Android 4.1 stock browser
      // while retrieving files from application cache.
      if (status === 0) {
        status = response ? 200 : 0;
      }

      if (200 <= status && status <= 300) {
        resolve(response);
      } else {
        reject(`Failed to load ${url}`);
      }
    };

    xhr.onerror = function() {
      reject(`Failed to load ${url}`);
    };

    xhr.send();
    return promise;
  }
}
