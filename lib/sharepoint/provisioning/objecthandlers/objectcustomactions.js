"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objecthandlerbase_1 = require("./objecthandlerbase");
/**
 * Describes the Custom Actions Object Handler
 */
var ObjectCustomActions = (function (_super) {
    __extends(ObjectCustomActions, _super);
    /**
     * Creates a new instance of the ObjectCustomActions class
     */
    function ObjectCustomActions() {
        _super.call(this, "CustomActions");
    }
    /**
     * Provisioning Custom Actions
     *
     * @param customactions The Custom Actions to provision
     */
    ObjectCustomActions.prototype.ProvisionObjects = function (customactions) {
        var _this = this;
        _super.prototype.scope_started.call(this);
        return new Promise(function (resolve, reject) {
            var clientContext = SP.ClientContext.get_current();
            var userCustomActions = clientContext.get_web().get_userCustomActions();
            clientContext.load(userCustomActions);
            clientContext.executeQueryAsync(function () {
                customactions.forEach(function (obj) {
                    var objExists = userCustomActions.get_data().filter(function (userCustomAction) {
                        return userCustomAction.get_title() === obj.Title;
                    }).length > 0;
                    if (!objExists) {
                        var objCreationInformation = userCustomActions.add();
                        if (obj.Description) {
                            objCreationInformation.set_description(obj.Description);
                        }
                        if (obj.CommandUIExtension) {
                            objCreationInformation.set_commandUIExtension(obj.CommandUIExtension);
                        }
                        if (obj.Group) {
                            objCreationInformation.set_group(obj.Group);
                        }
                        if (obj.Title) {
                            objCreationInformation.set_title(obj.Title);
                        }
                        if (obj.Url) {
                            objCreationInformation.set_url(obj.Url);
                        }
                        if (obj.ScriptBlock) {
                            objCreationInformation.set_scriptBlock(obj.ScriptBlock);
                        }
                        if (obj.ScriptSrc) {
                            objCreationInformation.set_scriptSrc(obj.ScriptSrc);
                        }
                        if (obj.Location) {
                            objCreationInformation.set_location(obj.Location);
                        }
                        if (obj.ImageUrl) {
                            objCreationInformation.set_imageUrl(obj.ImageUrl);
                        }
                        if (obj.Name) {
                            objCreationInformation.set_name(obj.Name);
                        }
                        if (obj.RegistrationId) {
                            objCreationInformation.set_registrationId(obj.RegistrationId);
                        }
                        if (obj.RegistrationType) {
                            objCreationInformation.set_registrationType(obj.RegistrationType);
                        }
                        if (obj.Rights) {
                            objCreationInformation.set_rights(obj.Rights);
                        }
                        if (obj.Sequence) {
                            objCreationInformation.set_sequence(obj.Sequence);
                        }
                        objCreationInformation.update();
                    }
                });
                clientContext.executeQueryAsync(function () {
                    _super.prototype.scope_ended.call(_this);
                    resolve();
                }, function () {
                    _super.prototype.scope_ended.call(_this);
                    resolve();
                });
            }, function () {
                _super.prototype.scope_ended.call(_this);
                resolve();
            });
        });
    };
    return ObjectCustomActions;
}(objecthandlerbase_1.ObjectHandlerBase));
exports.ObjectCustomActions = ObjectCustomActions;
