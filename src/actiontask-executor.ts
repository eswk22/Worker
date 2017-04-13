import loadfromString from 'require-from-string';

namespace Worker {
    export class Executor {
        constructor(){
            
        }

        static set PARAMS(ParameterList){

        }

        static set SESSIONS(sessions:any){

        }

        //var actiontask = loadfromString("function test(data) { console.log(data) } module.exports = { test : test }");

    }
}

// Get parameters from parent
process.on("PARAMS",function(params){
    Worker.Executor.PARAMS(params);

});


process.on("SESSIONS",function(sessions){
    Worker.Executor.SESSIONS(sessions);
});