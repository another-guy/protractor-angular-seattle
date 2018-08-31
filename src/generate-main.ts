import { DOCUMENT } from '@angular/common';
import { ResourceLoader } from '@angular/compiler';
import { CompilerFactory, COMPILER_OPTIONS, Injectable, Renderer2, RendererFactory2, RendererStyleFlags2, RendererType2, StaticProvider, Type, NgZone } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';
import { platformServer } from '@angular/platform-server';
import { readFile } from 'fs';
import * as glob from 'glob';
import { JSDOM } from 'jsdom';
import * as path from 'path';
import 'zone.js';
import 'zone.js/dist/long-stack-trace-zone.js';
import { AppComponent } from './app/app.component';
import { AppModule } from './app/app.module';

const jsdom = new JSDOM(`<html></html>`);
export function _document() {
  return jsdom.window.document;
}

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

async function generate<M>(moduleType: Type<M>) {
  try {
    const documentProvider = { provide: DOCUMENT, useFactory: _document, deps: [] };
    const commonPlatformServerProviders: StaticProvider[] = [
      documentProvider,
    ];
    const rendererFactoryProvider = {
      provide: RendererFactory2, useFactory: MyDomRendererFactory2,
      deps: [DOCUMENT, EventManager, NgZone], // DomRendererFactory2, AnimationEngine, NgZone
    };
    const rendererProvider = { provide: Renderer2, useClass: MyRenderer, deps: [EventManager, DOCUMENT] };

    const platformRef = platformServer([
        ...commonPlatformServerProviders,
        {
          provide: COMPILER_OPTIONS,
          useValue: {providers: [{provide: ResourceLoader, useClass: ResourceLoaderImpl, deps: []}]},
          multi: true
        },
        { provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS] },

        rendererFactoryProvider,
        rendererProvider,
      ]);


    const resourceLoaderProvider = { provide: ResourceLoader, useValue: new ResourceLoaderImpl(`src\\app`), deps: [] };

    const moduleRef = await platformRef
      .bootstrapModule(
        moduleType,
        {
          providers: [
            documentProvider,
            
            rendererFactoryProvider,
            rendererProvider,

            resourceLoaderProvider,
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
