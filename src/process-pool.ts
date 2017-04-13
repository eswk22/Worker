/// <reference path="./../typings/index.d.ts" />
import * as generic from 'generic-pool';
import _ from 'lodash';
import * as childProcess from 'child_process';

export default class ProcessPool {
    private settings : any;
    public path: string;
    public args : any;
    public options : any;
    public pool : generic.Pool<any>;
    constructor(path, args, options, settings){
        settings = {
            name:       'fork-pool',
            size:       require('os').cpus().length,
            log:        false,
            timeout:    30000,
            debug:		false
        //    ,debugPort:	process.d.debugPort	// Default debugging port for the main process. Skip from here.
        };
        this.settings = settings;
        this.path = path;
        this.args = args;
        this.options = options;  
      //  let options : generic.Options = this.settings;

        let poolFactory : generic.Factory<any> = {
             name : this.settings.name,
             create : this.create,
             destroy : this.destroy,
             validate : this.validate,
        }
        this.pool = generic.createPool(poolFactory);
      

        // {
        //     settings : settings,
        //     name : settings.name,
        //     create : this.create,
        //     destroy : this.destroy,
        //     enqueue : this.enqueue,
        //     drain: this.drain,
        //     max: settings.size,
        //     min: settings.size - 1,
        //     idleTimeoutMillis: settings.timeout,
        //     log: settings.log
        // });
    }


    create() : Promise<any> {
        return new Promise<any>((resolve,reject) => { 
        try{
            let debugArgIdx : number = process.execArgv.indexOf('--debug');
            if (debugArgIdx !== -1) {
                // Remove debugging from process before forking
                process.execArgv.splice(debugArgIdx, 1);
            }
            // if (this.settings.debug) {
            //     // Optionally set an unused port number if you want to debug the children.
            //     // This only works if idle processes stay alive (long timeout), or you will run out of ports eventually.
            //     process.execArgv.push('--debug=' + (++this.settings.debugPort));
            // }
            var childNode = childProcess.fork(__dirname + '\\child.js', this.args, this.options);
            resolve(childNode);
        }
        catch(error){
            console.log(error);
            reject(error);
        }
        });
    }

    validate () : any {

    }
    destroy(client) : any {
         client.kill();
    }
    enqueue(data):any{
        let instance = this.pool;
        try{
            instance.acquire().catch((error) => {
                console.log(error);
            }).then((client:childProcess.ChildProcess) => { 
                client.send(data);
                client.once('message', function (message) {
                    var a = {
                        pid:    client.pid,
                        stdout: message
                    };
                    console.log(a);
                    instance.release(client);
                });
            });
        }
        catch(error){
            console.log(error); 
        }
    }
    drain(callback) : any {
        let instance = this.pool;
       

        
    }

}