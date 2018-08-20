import { ElementArrayFinder, ElementFinder } from 'protractor';

export class ListPagePartBase<TPart> {
  constructor(
    private _createT: (_: ElementFinder) => TPart,
    protected _elementList: ElementArrayFinder,
  ) {
  }

  get(weekLineIndex: number): TPart {
    return this._createT(this._elementList.get(weekLineIndex));
  }

  async count(): Promise<number> {
    return await this._elementList.count();
  }

  async map<TOutput>(mapFn: (part?: TPart, index?: number) => TPart | any): Promise<TOutput[]> {
    return await this._elementList.map<TOutput>((element, index) => mapFn(this._createT(element), index));
  }

  async forEach(callbackfn: (part: TPart, index: number) => void): Promise<void> {
    /* const _ = */ await this._elementList.map<void>((element, index) => callbackfn(this._createT(element), index));
  }
}
