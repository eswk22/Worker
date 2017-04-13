"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Worker;
(function (Worker) {
    var Executor = (function () {
        function Executor() {
        }
        Object.defineProperty(Executor, "PARAMS", {
            set: function (ParameterList) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Executor, "SESSIONS", {
            set: function (sessions) {
            },
            enumerable: true,
            configurable: true
        });
        return Executor;
    }());
    Worker.Executor = Executor;
})(Worker || (Worker = {}));
process.on("PARAMS", function (params) {
    Worker.Executor.PARAMS(params);
});
process.on("SESSIONS", function (sessions) {
    Worker.Executor.SESSIONS(sessions);
});
