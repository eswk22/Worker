import ProcessPool from './../src/process-pool';

import { expect } from 'chai';
describe('Process Generation', () => {
    it("Create more than on process",(done)=>{
        let pool : ProcessPool = new ProcessPool(__dirname + '\\child.js',null,null,{});
        pool.enqueue('hello');
        done();
    });
});