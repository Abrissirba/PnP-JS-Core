"use strict";
/**
 * Describes a ProvisioningStep
 */
var ProvisioningStep = (function () {
    /**
     * Creates a new instance of the ProvisioningStep class
     */
    function ProvisioningStep(name, index, objects, parameters, handler) {
        this.name = name;
        this.index = index;
        this.objects = objects;
        this.parameters = parameters;
        this.handler = handler;
    }
    /**
     * Executes the ProvisioningStep function
     *
     * @param dependentPromise The promise the ProvisioningStep is dependent on
     */
    ProvisioningStep.prototype.execute = function (dependentPromise) {
        var _this = this;
        var _handler = new this.handler();
        if (!dependentPromise) {
            return _handler.ProvisionObjects(this.objects, this.parameters);
        }
        return new Promise(function (resolve, reject) {
            dependentPromise.then(function () {
                return _handler.ProvisionObjects(_this.objects, _this.parameters).then(resolve, resolve);
            });
        });
    };
    return ProvisioningStep;
}());
exports.ProvisioningStep = ProvisioningStep;
