"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var process_pool_1 = require("./process-pool");
var pool = new process_pool_1.default(__dirname + '/child.js', null, null, {});
pool.enqueue('hello');
