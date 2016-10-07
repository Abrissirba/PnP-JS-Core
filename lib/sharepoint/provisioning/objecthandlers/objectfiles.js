"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CoreUtil = require("../../../utils/util");
var util_1 = require("../util");
var objecthandlerbase_1 = require("./objecthandlerbase");
/**
 * Describes the Files Object Handler
 */
var ObjectFiles = (function (_super) {
    __extends(ObjectFiles, _super);
    /**
     * Creates a new instance of the ObjectFiles class
     */
    function ObjectFiles() {
        _super.call(this, "Files");
    }
    /**
     * Provisioning Files
     *
     * @param objects The files to provisiion
     */
    ObjectFiles.prototype.ProvisionObjects = function (objects) {
        var _this = this;
        _super.prototype.scope_started.call(this);
        return new Promise(function (resolve, reject) {
            var clientContext = SP.ClientContext.get_current();
            var web = clientContext.get_web();
            var fileInfos = [];
            var promises = [];
            objects.forEach(function (obj, index) {
                promises.push(_this.httpClient.fetchRaw(util_1.Util.replaceUrlTokens(obj.Src)).then(function (response) {
                    return response.text();
                }));
            });
            Promise.all(promises).then(function (responses) {
                responses.forEach(function (response, index) {
                    var obj = objects[index];
                    var filename = _this.GetFilenameFromFilePath(obj.Dest);
                    var webServerRelativeUrl = _spPageContextInfo.webServerRelativeUrl;
                    var folder = web.getFolderByServerRelativeUrl(webServerRelativeUrl + "/" + _this.GetFolderFromFilePath(obj.Dest));
                    var fi = {
                        Contents: response,
                        Dest: obj.Dest,
                        Filename: filename,
                        Folder: folder,
                        Instance: null,
                        Overwrite: false,
                        Properties: [],
                        RemoveExistingWebParts: true,
                        ServerRelativeUrl: obj.Dest,
                        Src: obj.Src,
                        Views: [],
                        WebParts: [],
                    };
                    CoreUtil.Util.extend(fi, obj);
                    if (fi.Filename.indexOf("Form.aspx") !== -1) {
                        return;
                    }
                    var objCreationInformation = new SP.FileCreationInformation();
                    objCreationInformation.set_overwrite(fi.Overwrite);
                    objCreationInformation.set_url(fi.Filename);
                    objCreationInformation.set_content(new SP.Base64EncodedByteArray());
                    for (var i = 0; i < fi.Contents.length; i++) {
                        objCreationInformation.get_content().append(fi.Contents.charCodeAt(i));
                    }
                    clientContext.load(fi.Folder.get_files().add(objCreationInformation));
                    fileInfos.push(fi);
                });
            });
            clientContext.executeQueryAsync(function () {
                promises = [];
                fileInfos.forEach(function (fi) {
                    if (fi.Properties && Object.keys(fi.Properties).length > 0) {
                        promises.push(_this.ApplyFileProperties(fi.Dest, fi.Properties));
                    }
                    if (fi.WebParts && fi.WebParts.length > 0) {
                        promises.push(_this.AddWebPartsToWebPartPage(fi.Dest, fi.Src, fi.WebParts, fi.RemoveExistingWebParts));
                    }
                });
                Promise.all(promises).then(function () {
                    _this.ModifyHiddenViews(objects).then(function (value) {
                        _super.prototype.scope_ended.call(_this);
                        resolve(value);
                    }, function (error) {
                        _super.prototype.scope_ended.call(_this);
                        reject(error);
                    });
                });
            }, function (error) {
                _super.prototype.scope_ended.call(_this);
                reject(error);
            });
        });
    };
    ObjectFiles.prototype.RemoveWebPartsFromFileIfSpecified = function (clientContext, limitedWebPartManager, shouldRemoveExisting) {
        return new Promise(function (resolve, reject) {
            if (!shouldRemoveExisting) {
                resolve();
            }
            var existingWebParts = limitedWebPartManager.get_webParts();
            clientContext.load(existingWebParts);
            clientContext.executeQueryAsync(function () {
                existingWebParts.get_data().forEach(function (wp) {
                    wp.deleteWebPart();
                });
                clientContext.load(existingWebParts);
                clientContext.executeQueryAsync(resolve, reject);
            }, reject);
        });
    };
    ObjectFiles.prototype.GetWebPartXml = function (webParts) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var promises = [];
            webParts.forEach(function (wp, index) {
                if (wp.Contents.FileUrl) {
                    var fileUrl = util_1.Util.replaceUrlTokens(wp.Contents.FileUrl);
                    promises.push(_this.httpClient.fetchRaw(fileUrl).then(function (response) {
                        return response.text();
                    }));
                }
                else {
                    promises.push((function () {
                        return new Promise(function (res, rej) {
                            res();
                        });
                    })());
                }
            });
            Promise.all(promises).then(function (responses) {
                responses.forEach(function (response, index) {
                    var wp = webParts[index];
                    if (wp !== null && response && response.length > 0) {
                        wp.Contents.Xml = response;
                    }
                });
                resolve(webParts);
            });
        });
    };
    ObjectFiles.prototype.AddWebPartsToWebPartPage = function (dest, src, webParts, shouldRemoveExisting) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var clientContext = SP.ClientContext.get_current();
            var web = clientContext.get_web();
            var fileServerRelativeUrl = _spPageContextInfo.webServerRelativeUrl + "/" + dest;
            var file = web.getFileByServerRelativeUrl(fileServerRelativeUrl);
            clientContext.load(file);
            clientContext.executeQueryAsync(function () {
                var limitedWebPartManager = file.getLimitedWebPartManager(SP.WebParts.PersonalizationScope.shared);
                _this.RemoveWebPartsFromFileIfSpecified(clientContext, limitedWebPartManager, shouldRemoveExisting).then(function () {
                    _this.GetWebPartXml(webParts).then(function (webPartsWithXml) {
                        webPartsWithXml.forEach(function (wp) {
                            if (!wp.Contents.Xml) {
                                return;
                            }
                            var oWebPartDefinition = limitedWebPartManager.importWebPart(util_1.Util.replaceUrlTokens(wp.Contents.Xml));
                            var oWebPart = oWebPartDefinition.get_webPart();
                            limitedWebPartManager.addWebPart(oWebPart, wp.Zone, wp.Order);
                        });
                        clientContext.executeQueryAsync(resolve, resolve);
                    });
                });
            }, resolve);
        });
    };
    ObjectFiles.prototype.ApplyFileProperties = function (dest, fileProperties) {
        return new Promise(function (resolve, reject) {
            var clientContext = SP.ClientContext.get_current();
            var web = clientContext.get_web();
            var fileServerRelativeUrl = _spPageContextInfo.webServerRelativeUrl + "/" + dest;
            var file = web.getFileByServerRelativeUrl(fileServerRelativeUrl);
            var listItemAllFields = file.get_listItemAllFields();
            Object.keys(fileProperties).forEach(function (key) {
                listItemAllFields.set_item(key, fileProperties[key]);
            });
            listItemAllFields.update();
            clientContext.executeQueryAsync(resolve, resolve);
        });
    };
    ObjectFiles.prototype.GetViewFromCollectionByUrl = function (viewCollection, url) {
        var serverRelativeUrl = _spPageContextInfo.webServerRelativeUrl + "/" + url;
        var viewCollectionEnumerator = viewCollection.getEnumerator();
        while (viewCollectionEnumerator.moveNext()) {
            var view = viewCollectionEnumerator.get_current();
            if (view.get_serverRelativeUrl().toString().toLowerCase() === serverRelativeUrl.toLowerCase()) {
                return view;
            }
        }
        return null;
    };
    ObjectFiles.prototype.ModifyHiddenViews = function (objects) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var clientContext = SP.ClientContext.get_current();
            var web = clientContext.get_web();
            var mapping = {};
            var lists = [];
            var listViewCollections = [];
            objects.forEach(function (obj) {
                if (!obj.Views) {
                    return;
                }
                obj.Views.forEach(function (v) {
                    mapping[v.List] = mapping[v.List] || [];
                    mapping[v.List].push(CoreUtil.Util.extend(v, { "Url": obj.Dest }));
                });
            });
            Object.keys(mapping).forEach(function (l, index) {
                lists.push(web.get_lists().getByTitle(l));
                listViewCollections.push(web.get_lists().getByTitle(l).get_views());
                clientContext.load(lists[index]);
                clientContext.load(listViewCollections[index]);
            });
            clientContext.executeQueryAsync(function () {
                Object.keys(mapping).forEach(function (l, index) {
                    var views = mapping[l];
                    var list = lists[index];
                    var viewCollection = listViewCollections[index];
                    views.forEach(function (v) {
                        var view = _this.GetViewFromCollectionByUrl(viewCollection, v.Url);
                        if (view == null) {
                            return;
                        }
                        if (v.Paged) {
                            view.set_paged(v.Paged);
                        }
                        if (v.Query) {
                            view.set_viewQuery(v.Query);
                        }
                        if (v.RowLimit) {
                            view.set_rowLimit(v.RowLimit);
                        }
                        if (v.ViewFields && v.ViewFields.length > 0) {
                            var columns_1 = view.get_viewFields();
                            columns_1.removeAll();
                            v.ViewFields.forEach(function (vf) {
                                columns_1.add(vf);
                            });
                        }
                        view.update();
                    });
                    clientContext.load(viewCollection);
                    list.update();
                });
                clientContext.executeQueryAsync(resolve, resolve);
            }, resolve);
        });
    };
    ObjectFiles.prototype.GetFolderFromFilePath = function (filePath) {
        var split = filePath.split("/");
        return split.splice(0, split.length - 1).join("/");
    };
    ObjectFiles.prototype.GetFilenameFromFilePath = function (filePath) {
        var split = filePath.split("/");
        return split[split.length - 1];
    };
    return ObjectFiles;
}(objecthandlerbase_1.ObjectHandlerBase));
exports.ObjectFiles = ObjectFiles;
;
