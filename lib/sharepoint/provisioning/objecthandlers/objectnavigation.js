"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var util_1 = require("../util");
var objecthandlerbase_1 = require("./objecthandlerbase");
/**
 * Describes the Navigation Object Handler
 */
var ObjectNavigation = (function (_super) {
    __extends(ObjectNavigation, _super);
    /**
     * Creates a new instance of the ObjectNavigation class
     */
    function ObjectNavigation() {
        _super.call(this, "Navigation");
    }
    /**
     * Provision Navigation nodes
     *
     * @param object The navigation settings and nodes to provision
     */
    ObjectNavigation.prototype.ProvisionObjects = function (object) {
        var _this = this;
        _super.prototype.scope_started.call(this);
        var clientContext = SP.ClientContext.get_current();
        var navigation = clientContext.get_web().get_navigation();
        return new Promise(function (resolve, reject) {
            _this.ConfigureQuickLaunch(object.QuickLaunch, clientContext, _this.httpClient, navigation).then(function () {
                _super.prototype.scope_ended.call(_this);
                resolve();
            }, function () {
                _super.prototype.scope_ended.call(_this);
                reject();
            });
        });
    };
    /**
     * Retrieves the node with the given title from a collection of SP.NavigationNode
     */
    ObjectNavigation.prototype.getNodeFromCollectionByTitle = function (nodeCollection, title) {
        var f = nodeCollection.filter(function (val) {
            return val.get_title() === title;
        });
        return f[0] || null;
    };
    ;
    ObjectNavigation.prototype.ConfigureQuickLaunch = function (nodes, clientContext, httpClient, navigation) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (nodes.length === 0) {
                resolve();
            }
            else {
                var quickLaunchNodeCollection_1 = navigation.get_quickLaunch();
                clientContext.load(quickLaunchNodeCollection_1);
                clientContext.executeQueryAsync(function () {
                    var temporaryQuickLaunch = [];
                    var index = quickLaunchNodeCollection_1.get_count() - 1;
                    while (index >= 0) {
                        var oldNode = quickLaunchNodeCollection_1.itemAt(index);
                        temporaryQuickLaunch.push(oldNode);
                        oldNode.deleteObject();
                        index--;
                    }
                    clientContext.executeQueryAsync(function () {
                        nodes.forEach(function (n) {
                            var existingNode = _this.getNodeFromCollectionByTitle(temporaryQuickLaunch, n.Title);
                            var newNode = new SP.NavigationNodeCreationInformation();
                            newNode.set_title(n.Title);
                            newNode.set_url(existingNode ? existingNode.get_url() : util_1.Util.replaceUrlTokens(n.Url));
                            newNode.set_asLastNode(true);
                            quickLaunchNodeCollection_1.add(newNode);
                        });
                        clientContext.executeQueryAsync(function () {
                            httpClient.get(_spPageContextInfo.webAbsoluteUrl + "/_api/web/Navigation/QuickLaunch").then(function (response) {
                                response.json().then(function (json) {
                                    json.value.forEach(function (d) {
                                        var node = navigation.getNodeById(d.Id);
                                        var childrenNodeCollection = node.get_children();
                                        var parentNode = nodes.filter(function (value) { return value.Title === d.Title; })[0];
                                        if (parentNode && parentNode.Children) {
                                            parentNode.Children.forEach(function (n) {
                                                var existingNode = _this.getNodeFromCollectionByTitle(temporaryQuickLaunch, n.Title);
                                                var newNode = new SP.NavigationNodeCreationInformation();
                                                newNode.set_title(n.Title);
                                                newNode.set_url(existingNode
                                                    ? existingNode.get_url()
                                                    : util_1.Util.replaceUrlTokens(n.Url));
                                                newNode.set_asLastNode(true);
                                                childrenNodeCollection.add(newNode);
                                            });
                                        }
                                    });
                                    clientContext.executeQueryAsync(resolve, resolve);
                                });
                            });
                        }, resolve);
                    });
                });
            }
        });
    };
    return ObjectNavigation;
}(objecthandlerbase_1.ObjectHandlerBase));
exports.ObjectNavigation = ObjectNavigation;
