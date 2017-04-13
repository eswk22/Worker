/// <reference path="../typings/index.d.ts" />
import * as generic from 'generic-pool';
export default class ProcessPool {
    private settings;
    path: string;
    args: any;
    options: any;
    pool: generic.Pool<any>;
    constructor(path: any, args: any, options: any, settings: any);
    create(): Promise<any>;
    validate(): any;
    destroy(client: any): any;
    enqueue(data: any): any;
    drain(callback: any): any;
}
