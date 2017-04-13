"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var generic = require("generic-pool");
var childProcess = require("child_process");
var ProcessPool = (function () {
    function ProcessPool(path, args, options, settings) {
        settings = {
            name: 'fork-pool',
            size: require('os').cpus().length,
            log: false,
            timeout: 30000,
            debug: false
        };
        this.settings = settings;
        this.path = path;
        this.args = args;
        this.options = options;
        var poolFactory = {
            name: this.settings.name,
            create: this.create,
            destroy: this.destroy,
            validate: this.validate,
        };
        this.pool = generic.createPool(poolFactory);
    }
    ProcessPool.prototype.create = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                var debugArgIdx = process.execArgv.indexOf('--debug');
                if (debugArgIdx !== -1) {
                    process.execArgv.splice(debugArgIdx, 1);
                }
                var childNode = childProcess.fork(__dirname + '\\child.js', _this.args, _this.options);
                resolve(childNode);
            }
            catch (error) {
                console.log(error);
                reject(error);
            }
        });
    };
    ProcessPool.prototype.validate = function () {
    };
    ProcessPool.prototype.destroy = function (client) {
        client.kill();
    };
    ProcessPool.prototype.enqueue = function (data) {
        var instance = this.pool;
        try {
            instance.acquire().catch(function (error) {
                console.log(error);
            }).then(function (client) {
                client.send(data);
                client.once('message', function (message) {
                    var a = {
                        pid: client.pid,
                        stdout: message
                    };
                    console.log(a);
                    instance.release(client);
                });
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    ProcessPool.prototype.drain = function (callback) {
        var instance = this.pool;
    };
    return ProcessPool;
}());
exports.default = ProcessPool;
