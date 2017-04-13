import ProcessPool from './process-pool';

 var pool : ProcessPool = new ProcessPool(__dirname + '/child.js',null,null,{});

 pool.enqueue('hello');