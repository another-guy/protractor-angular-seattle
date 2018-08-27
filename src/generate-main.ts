import { ResourceLoader } from '@angular/compiler';
import { Compiler, CompilerFactory, Injectable, Renderer2, RendererFactory2, RendererStyleFlags2, RendererType2, StaticProvider, Type } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { platformDynamicServer } from '@angular/platform-server';
import { readFile } from 'fs';
import * as glob from 'glob';
import * as path from 'path';
import 'zone.js';
import 'zone.js/dist/long-stack-trace-zone.js';
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
        if (globError) reject(globError.toString());
        else
          readFile(path.join(this._cwd, matches[0]), (readFileError, data) => {
            if (readFileError) reject(readFileError);
            else resolve(data.toString());
          });
      });
    });
  }
}

@Injectable()
export class MyRenderer implements Renderer2 {
  data: { [key: string]: any; };
  destroy(): void { }
  createElement(name: string, namespace?: string) { }
  createComment(value: string) { }
  createText(value: string) { }
  destroyNode: (node: any) => void;
  appendChild(parent: any, newChild: any): void { }
  insertBefore(parent: any, newChild: any, refChild: any): void { }
  removeChild(parent: any, oldChild: any): void { }
  selectRootElement(selectorOrNode: any) { }
  parentNode(node: any) { }
  nextSibling(node: any) { }
  setAttribute(el: any, name: string, value: string, namespace?: string): void { }
  removeAttribute(el: any, name: string, namespace?: string): void { }
  addClass(el: any, name: string): void { }
  removeClass(el: any, name: string): void { }
  setStyle(el: any, style: string, value: any, flags?: RendererStyleFlags2): void { }
  removeStyle(el: any, style: string, flags?: RendererStyleFlags2): void { }
  setProperty(el: any, name: string, value: any): void { }
  setValue(node: any, value: string): void { }
  listen(target: any, eventName: string, callback: (event: any) => boolean | void): () => void { return null; }
  constructor(private eventManager: EventManager) {}
}

@Injectable()
export class MyDomRendererFactory2 implements RendererFactory2 {
  private renderer: MyRenderer;
  constructor(eventManager: EventManager) {
    this.renderer = new MyRenderer(eventManager);
  }
  createRenderer(hostElement: any, type: RendererType2): Renderer2 {
    return this.renderer;
  }
  begin?(): void { throw new Error("Method not implemented."); }
  end?(): void { throw new Error("Method not implemented."); }
  whenRenderingDone?(): Promise<any> { throw new Error("Method not implemented."); }
}

export function createCompiler(compilerFactory: CompilerFactory): Compiler {
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
          providers: [
            { provide: ResourceLoader, useValue: new ResourceLoaderImpl(`src\\app`), deps: [ ] },

            // { provide: Renderer2, useFactory: createRenderer, deps: [EventManager] },
            {
              provide: RendererFactory2,
              useClass: MyDomRendererFactory2,
              deps: [EventManager],
            },
          ],
        });
    
    const appComponent = moduleRef.injector.get(AppComponent);
    
    console.info(appComponent.title.toString());
  } catch (error) {
    const errorText = error.toString();
    throw new Error(errorText);
  }
}

generate(AppModule)
  .then(message => console.info({ message }))
  .catch(error => console.error({ error }));
