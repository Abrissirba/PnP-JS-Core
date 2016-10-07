"use strict";
/**
 * Descibes a Sequencer
 */
var Sequencer = (function () {
    /**
     * Creates a new instance of the Sequencer class, and declare private variables
     */
    function Sequencer(functions, parameter, scope) {
        this.functions = functions;
        this.parameter = parameter;
        this.scope = scope;
    }
    /**
     * Executes the functions in sequence using DeferredObject
     */
    Sequencer.prototype.execute = function (progressFunction) {
        var promiseSequence = Promise.resolve(); // empty promise to chain on
        this.functions.forEach(function (sequenceFunction, functionNr) {
            promiseSequence = promiseSequence.then(function () {
                return sequenceFunction.call(this.scope, this.parameter);
            }).then(function (result) {
                if (progressFunction) {
                    progressFunction.call(this, functionNr, this.functions);
                }
            });
        }, this);
        return promiseSequence; // This will resolve after the entire chain is resolved
    };
    return Sequencer;
}());
exports.Sequencer = Sequencer;
