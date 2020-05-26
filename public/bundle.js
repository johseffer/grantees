/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "f01fcf8e95d27f387b34";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/App.js")(__webpack_require__.s = "./src/App.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../Users/Elaine/AppData/Roaming/npm/node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g; // This works in non-strict mode\n\ng = function () {\n  return this;\n}();\n\ntry {\n  // This works if eval is allowed (see CSP)\n  g = g || new Function(\"return this\")();\n} catch (e) {\n  // This works if the window reference is available\n  if (typeof window === \"object\") g = window;\n} // g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\n\nmodule.exports = g;\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");

/***/ }),

/***/ "../../../Users/Elaine/AppData/Roaming/npm/node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (module) {\n  if (!module.webpackPolyfill) {\n    module.deprecate = function () {};\n\n    module.paths = []; // module.parent = undefined by default\n\n    if (!module.children) module.children = [];\n    Object.defineProperty(module, \"loaded\", {\n      enumerable: true,\n      get: function () {\n        return module.l;\n      }\n    });\n    Object.defineProperty(module, \"id\", {\n      enumerable: true,\n      get: function () {\n        return module.i;\n      }\n    });\n    module.webpackPolyfill = 1;\n  }\n\n  return module;\n};\n\n//# sourceURL=webpack:///(webpack)/buildin/module.js?");

/***/ }),

/***/ "../../../Users/Elaine/AppData/Roaming/npm/node_modules/webpack/node_modules/node-libs-browser/node_modules/punycode/punycode.js":
/*!**********************************************************************************!*\
  !*** (webpack)/node_modules/node-libs-browser/node_modules/punycode/punycode.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */\n;\n\n(function (root) {\n  /** Detect free variables */\n  var freeExports =  true && exports && !exports.nodeType && exports;\n  var freeModule =  true && module && !module.nodeType && module;\n  var freeGlobal = typeof global == 'object' && global;\n\n  if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal) {\n    root = freeGlobal;\n  }\n  /**\n   * The `punycode` object.\n   * @name punycode\n   * @type Object\n   */\n\n\n  var punycode,\n\n  /** Highest positive signed 32-bit float value */\n  maxInt = 2147483647,\n      // aka. 0x7FFFFFFF or 2^31-1\n\n  /** Bootstring parameters */\n  base = 36,\n      tMin = 1,\n      tMax = 26,\n      skew = 38,\n      damp = 700,\n      initialBias = 72,\n      initialN = 128,\n      // 0x80\n  delimiter = '-',\n      // '\\x2D'\n\n  /** Regular expressions */\n  regexPunycode = /^xn--/,\n      regexNonASCII = /[^\\x20-\\x7E]/,\n      // unprintable ASCII chars + non-ASCII chars\n  regexSeparators = /[\\x2E\\u3002\\uFF0E\\uFF61]/g,\n      // RFC 3490 separators\n\n  /** Error messages */\n  errors = {\n    'overflow': 'Overflow: input needs wider integers to process',\n    'not-basic': 'Illegal input >= 0x80 (not a basic code point)',\n    'invalid-input': 'Invalid input'\n  },\n\n  /** Convenience shortcuts */\n  baseMinusTMin = base - tMin,\n      floor = Math.floor,\n      stringFromCharCode = String.fromCharCode,\n\n  /** Temporary variable */\n  key;\n  /*--------------------------------------------------------------------------*/\n\n  /**\n   * A generic error utility function.\n   * @private\n   * @param {String} type The error type.\n   * @returns {Error} Throws a `RangeError` with the applicable error message.\n   */\n\n  function error(type) {\n    throw new RangeError(errors[type]);\n  }\n  /**\n   * A generic `Array#map` utility function.\n   * @private\n   * @param {Array} array The array to iterate over.\n   * @param {Function} callback The function that gets called for every array\n   * item.\n   * @returns {Array} A new array of values returned by the callback function.\n   */\n\n\n  function map(array, fn) {\n    var length = array.length;\n    var result = [];\n\n    while (length--) {\n      result[length] = fn(array[length]);\n    }\n\n    return result;\n  }\n  /**\n   * A simple `Array#map`-like wrapper to work with domain name strings or email\n   * addresses.\n   * @private\n   * @param {String} domain The domain name or email address.\n   * @param {Function} callback The function that gets called for every\n   * character.\n   * @returns {Array} A new string of characters returned by the callback\n   * function.\n   */\n\n\n  function mapDomain(string, fn) {\n    var parts = string.split('@');\n    var result = '';\n\n    if (parts.length > 1) {\n      // In email addresses, only the domain name should be punycoded. Leave\n      // the local part (i.e. everything up to `@`) intact.\n      result = parts[0] + '@';\n      string = parts[1];\n    } // Avoid `split(regex)` for IE8 compatibility. See #17.\n\n\n    string = string.replace(regexSeparators, '\\x2E');\n    var labels = string.split('.');\n    var encoded = map(labels, fn).join('.');\n    return result + encoded;\n  }\n  /**\n   * Creates an array containing the numeric code points of each Unicode\n   * character in the string. While JavaScript uses UCS-2 internally,\n   * this function will convert a pair of surrogate halves (each of which\n   * UCS-2 exposes as separate characters) into a single code point,\n   * matching UTF-16.\n   * @see `punycode.ucs2.encode`\n   * @see <https://mathiasbynens.be/notes/javascript-encoding>\n   * @memberOf punycode.ucs2\n   * @name decode\n   * @param {String} string The Unicode input string (UCS-2).\n   * @returns {Array} The new array of code points.\n   */\n\n\n  function ucs2decode(string) {\n    var output = [],\n        counter = 0,\n        length = string.length,\n        value,\n        extra;\n\n    while (counter < length) {\n      value = string.charCodeAt(counter++);\n\n      if (value >= 0xD800 && value <= 0xDBFF && counter < length) {\n        // high surrogate, and there is a next character\n        extra = string.charCodeAt(counter++);\n\n        if ((extra & 0xFC00) == 0xDC00) {\n          // low surrogate\n          output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);\n        } else {\n          // unmatched surrogate; only append this code unit, in case the next\n          // code unit is the high surrogate of a surrogate pair\n          output.push(value);\n          counter--;\n        }\n      } else {\n        output.push(value);\n      }\n    }\n\n    return output;\n  }\n  /**\n   * Creates a string based on an array of numeric code points.\n   * @see `punycode.ucs2.decode`\n   * @memberOf punycode.ucs2\n   * @name encode\n   * @param {Array} codePoints The array of numeric code points.\n   * @returns {String} The new Unicode string (UCS-2).\n   */\n\n\n  function ucs2encode(array) {\n    return map(array, function (value) {\n      var output = '';\n\n      if (value > 0xFFFF) {\n        value -= 0x10000;\n        output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);\n        value = 0xDC00 | value & 0x3FF;\n      }\n\n      output += stringFromCharCode(value);\n      return output;\n    }).join('');\n  }\n  /**\n   * Converts a basic code point into a digit/integer.\n   * @see `digitToBasic()`\n   * @private\n   * @param {Number} codePoint The basic numeric code point value.\n   * @returns {Number} The numeric value of a basic code point (for use in\n   * representing integers) in the range `0` to `base - 1`, or `base` if\n   * the code point does not represent a value.\n   */\n\n\n  function basicToDigit(codePoint) {\n    if (codePoint - 48 < 10) {\n      return codePoint - 22;\n    }\n\n    if (codePoint - 65 < 26) {\n      return codePoint - 65;\n    }\n\n    if (codePoint - 97 < 26) {\n      return codePoint - 97;\n    }\n\n    return base;\n  }\n  /**\n   * Converts a digit/integer into a basic code point.\n   * @see `basicToDigit()`\n   * @private\n   * @param {Number} digit The numeric value of a basic code point.\n   * @returns {Number} The basic code point whose value (when used for\n   * representing integers) is `digit`, which needs to be in the range\n   * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is\n   * used; else, the lowercase form is used. The behavior is undefined\n   * if `flag` is non-zero and `digit` has no uppercase form.\n   */\n\n\n  function digitToBasic(digit, flag) {\n    //  0..25 map to ASCII a..z or A..Z\n    // 26..35 map to ASCII 0..9\n    return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);\n  }\n  /**\n   * Bias adaptation function as per section 3.4 of RFC 3492.\n   * https://tools.ietf.org/html/rfc3492#section-3.4\n   * @private\n   */\n\n\n  function adapt(delta, numPoints, firstTime) {\n    var k = 0;\n    delta = firstTime ? floor(delta / damp) : delta >> 1;\n    delta += floor(delta / numPoints);\n\n    for (;\n    /* no initialization */\n    delta > baseMinusTMin * tMax >> 1; k += base) {\n      delta = floor(delta / baseMinusTMin);\n    }\n\n    return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));\n  }\n  /**\n   * Converts a Punycode string of ASCII-only symbols to a string of Unicode\n   * symbols.\n   * @memberOf punycode\n   * @param {String} input The Punycode string of ASCII-only symbols.\n   * @returns {String} The resulting string of Unicode symbols.\n   */\n\n\n  function decode(input) {\n    // Don't use UCS-2\n    var output = [],\n        inputLength = input.length,\n        out,\n        i = 0,\n        n = initialN,\n        bias = initialBias,\n        basic,\n        j,\n        index,\n        oldi,\n        w,\n        k,\n        digit,\n        t,\n\n    /** Cached calculation results */\n    baseMinusT; // Handle the basic code points: let `basic` be the number of input code\n    // points before the last delimiter, or `0` if there is none, then copy\n    // the first basic code points to the output.\n\n    basic = input.lastIndexOf(delimiter);\n\n    if (basic < 0) {\n      basic = 0;\n    }\n\n    for (j = 0; j < basic; ++j) {\n      // if it's not a basic code point\n      if (input.charCodeAt(j) >= 0x80) {\n        error('not-basic');\n      }\n\n      output.push(input.charCodeAt(j));\n    } // Main decoding loop: start just after the last delimiter if any basic code\n    // points were copied; start at the beginning otherwise.\n\n\n    for (index = basic > 0 ? basic + 1 : 0; index < inputLength;)\n    /* no final expression */\n    {\n      // `index` is the index of the next character to be consumed.\n      // Decode a generalized variable-length integer into `delta`,\n      // which gets added to `i`. The overflow checking is easier\n      // if we increase `i` as we go, then subtract off its starting\n      // value at the end to obtain `delta`.\n      for (oldi = i, w = 1, k = base;;\n      /* no condition */\n      k += base) {\n        if (index >= inputLength) {\n          error('invalid-input');\n        }\n\n        digit = basicToDigit(input.charCodeAt(index++));\n\n        if (digit >= base || digit > floor((maxInt - i) / w)) {\n          error('overflow');\n        }\n\n        i += digit * w;\n        t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;\n\n        if (digit < t) {\n          break;\n        }\n\n        baseMinusT = base - t;\n\n        if (w > floor(maxInt / baseMinusT)) {\n          error('overflow');\n        }\n\n        w *= baseMinusT;\n      }\n\n      out = output.length + 1;\n      bias = adapt(i - oldi, out, oldi == 0); // `i` was supposed to wrap around from `out` to `0`,\n      // incrementing `n` each time, so we'll fix that now:\n\n      if (floor(i / out) > maxInt - n) {\n        error('overflow');\n      }\n\n      n += floor(i / out);\n      i %= out; // Insert `n` at position `i` of the output\n\n      output.splice(i++, 0, n);\n    }\n\n    return ucs2encode(output);\n  }\n  /**\n   * Converts a string of Unicode symbols (e.g. a domain name label) to a\n   * Punycode string of ASCII-only symbols.\n   * @memberOf punycode\n   * @param {String} input The string of Unicode symbols.\n   * @returns {String} The resulting Punycode string of ASCII-only symbols.\n   */\n\n\n  function encode(input) {\n    var n,\n        delta,\n        handledCPCount,\n        basicLength,\n        bias,\n        j,\n        m,\n        q,\n        k,\n        t,\n        currentValue,\n        output = [],\n\n    /** `inputLength` will hold the number of code points in `input`. */\n    inputLength,\n\n    /** Cached calculation results */\n    handledCPCountPlusOne,\n        baseMinusT,\n        qMinusT; // Convert the input in UCS-2 to Unicode\n\n    input = ucs2decode(input); // Cache the length\n\n    inputLength = input.length; // Initialize the state\n\n    n = initialN;\n    delta = 0;\n    bias = initialBias; // Handle the basic code points\n\n    for (j = 0; j < inputLength; ++j) {\n      currentValue = input[j];\n\n      if (currentValue < 0x80) {\n        output.push(stringFromCharCode(currentValue));\n      }\n    }\n\n    handledCPCount = basicLength = output.length; // `handledCPCount` is the number of code points that have been handled;\n    // `basicLength` is the number of basic code points.\n    // Finish the basic string - if it is not empty - with a delimiter\n\n    if (basicLength) {\n      output.push(delimiter);\n    } // Main encoding loop:\n\n\n    while (handledCPCount < inputLength) {\n      // All non-basic code points < n have been handled already. Find the next\n      // larger one:\n      for (m = maxInt, j = 0; j < inputLength; ++j) {\n        currentValue = input[j];\n\n        if (currentValue >= n && currentValue < m) {\n          m = currentValue;\n        }\n      } // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,\n      // but guard against overflow\n\n\n      handledCPCountPlusOne = handledCPCount + 1;\n\n      if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {\n        error('overflow');\n      }\n\n      delta += (m - n) * handledCPCountPlusOne;\n      n = m;\n\n      for (j = 0; j < inputLength; ++j) {\n        currentValue = input[j];\n\n        if (currentValue < n && ++delta > maxInt) {\n          error('overflow');\n        }\n\n        if (currentValue == n) {\n          // Represent delta as a generalized variable-length integer\n          for (q = delta, k = base;;\n          /* no condition */\n          k += base) {\n            t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;\n\n            if (q < t) {\n              break;\n            }\n\n            qMinusT = q - t;\n            baseMinusT = base - t;\n            output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));\n            q = floor(qMinusT / baseMinusT);\n          }\n\n          output.push(stringFromCharCode(digitToBasic(q, 0)));\n          bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);\n          delta = 0;\n          ++handledCPCount;\n        }\n      }\n\n      ++delta;\n      ++n;\n    }\n\n    return output.join('');\n  }\n  /**\n   * Converts a Punycode string representing a domain name or an email address\n   * to Unicode. Only the Punycoded parts of the input will be converted, i.e.\n   * it doesn't matter if you call it on a string that has already been\n   * converted to Unicode.\n   * @memberOf punycode\n   * @param {String} input The Punycoded domain name or email address to\n   * convert to Unicode.\n   * @returns {String} The Unicode representation of the given Punycode\n   * string.\n   */\n\n\n  function toUnicode(input) {\n    return mapDomain(input, function (string) {\n      return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;\n    });\n  }\n  /**\n   * Converts a Unicode string representing a domain name or an email address to\n   * Punycode. Only the non-ASCII parts of the domain name will be converted,\n   * i.e. it doesn't matter if you call it with a domain that's already in\n   * ASCII.\n   * @memberOf punycode\n   * @param {String} input The domain name or email address to convert, as a\n   * Unicode string.\n   * @returns {String} The Punycode representation of the given domain name or\n   * email address.\n   */\n\n\n  function toASCII(input) {\n    return mapDomain(input, function (string) {\n      return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;\n    });\n  }\n  /*--------------------------------------------------------------------------*/\n\n  /** Define the public API */\n\n\n  punycode = {\n    /**\n     * A string representing the current Punycode.js version number.\n     * @memberOf punycode\n     * @type String\n     */\n    'version': '1.4.1',\n\n    /**\n     * An object of methods to convert from JavaScript's internal character\n     * representation (UCS-2) to Unicode code points, and back.\n     * @see <https://mathiasbynens.be/notes/javascript-encoding>\n     * @memberOf punycode\n     * @type Object\n     */\n    'ucs2': {\n      'decode': ucs2decode,\n      'encode': ucs2encode\n    },\n    'decode': decode,\n    'encode': encode,\n    'toASCII': toASCII,\n    'toUnicode': toUnicode\n  };\n  /** Expose `punycode` */\n  // Some AMD build optimizers, like r.js, check for specific condition patterns\n  // like the following:\n\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {\n      return punycode;\n    }).call(exports, __webpack_require__, exports, module),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else {}\n})(this);\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../buildin/module.js */ \"../../../Users/Elaine/AppData/Roaming/npm/node_modules/webpack/buildin/module.js\")(module), __webpack_require__(/*! ./../../../../buildin/global.js */ \"../../../Users/Elaine/AppData/Roaming/npm/node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///(webpack)/node_modules/node-libs-browser/node_modules/punycode/punycode.js?");

/***/ }),

/***/ "../../../Users/Elaine/AppData/Roaming/npm/node_modules/webpack/node_modules/querystring-es3/decode.js":
/*!********************************************************!*\
  !*** (webpack)/node_modules/querystring-es3/decode.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n // If obj.hasOwnProperty has been overridden, then calling\n// obj.hasOwnProperty(prop) will break.\n// See: https://github.com/joyent/node/issues/1707\n\nfunction hasOwnProperty(obj, prop) {\n  return Object.prototype.hasOwnProperty.call(obj, prop);\n}\n\nmodule.exports = function (qs, sep, eq, options) {\n  sep = sep || '&';\n  eq = eq || '=';\n  var obj = {};\n\n  if (typeof qs !== 'string' || qs.length === 0) {\n    return obj;\n  }\n\n  var regexp = /\\+/g;\n  qs = qs.split(sep);\n  var maxKeys = 1000;\n\n  if (options && typeof options.maxKeys === 'number') {\n    maxKeys = options.maxKeys;\n  }\n\n  var len = qs.length; // maxKeys <= 0 means that we should not limit keys count\n\n  if (maxKeys > 0 && len > maxKeys) {\n    len = maxKeys;\n  }\n\n  for (var i = 0; i < len; ++i) {\n    var x = qs[i].replace(regexp, '%20'),\n        idx = x.indexOf(eq),\n        kstr,\n        vstr,\n        k,\n        v;\n\n    if (idx >= 0) {\n      kstr = x.substr(0, idx);\n      vstr = x.substr(idx + 1);\n    } else {\n      kstr = x;\n      vstr = '';\n    }\n\n    k = decodeURIComponent(kstr);\n    v = decodeURIComponent(vstr);\n\n    if (!hasOwnProperty(obj, k)) {\n      obj[k] = v;\n    } else if (isArray(obj[k])) {\n      obj[k].push(v);\n    } else {\n      obj[k] = [obj[k], v];\n    }\n  }\n\n  return obj;\n};\n\nvar isArray = Array.isArray || function (xs) {\n  return Object.prototype.toString.call(xs) === '[object Array]';\n};\n\n//# sourceURL=webpack:///(webpack)/node_modules/querystring-es3/decode.js?");

/***/ }),

/***/ "../../../Users/Elaine/AppData/Roaming/npm/node_modules/webpack/node_modules/querystring-es3/encode.js":
/*!********************************************************!*\
  !*** (webpack)/node_modules/querystring-es3/encode.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n\nvar stringifyPrimitive = function (v) {\n  switch (typeof v) {\n    case 'string':\n      return v;\n\n    case 'boolean':\n      return v ? 'true' : 'false';\n\n    case 'number':\n      return isFinite(v) ? v : '';\n\n    default:\n      return '';\n  }\n};\n\nmodule.exports = function (obj, sep, eq, name) {\n  sep = sep || '&';\n  eq = eq || '=';\n\n  if (obj === null) {\n    obj = undefined;\n  }\n\n  if (typeof obj === 'object') {\n    return map(objectKeys(obj), function (k) {\n      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;\n\n      if (isArray(obj[k])) {\n        return map(obj[k], function (v) {\n          return ks + encodeURIComponent(stringifyPrimitive(v));\n        }).join(sep);\n      } else {\n        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));\n      }\n    }).join(sep);\n  }\n\n  if (!name) return '';\n  return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));\n};\n\nvar isArray = Array.isArray || function (xs) {\n  return Object.prototype.toString.call(xs) === '[object Array]';\n};\n\nfunction map(xs, f) {\n  if (xs.map) return xs.map(f);\n  var res = [];\n\n  for (var i = 0; i < xs.length; i++) {\n    res.push(f(xs[i], i));\n  }\n\n  return res;\n}\n\nvar objectKeys = Object.keys || function (obj) {\n  var res = [];\n\n  for (var key in obj) {\n    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);\n  }\n\n  return res;\n};\n\n//# sourceURL=webpack:///(webpack)/node_modules/querystring-es3/encode.js?");

/***/ }),

/***/ "../../../Users/Elaine/AppData/Roaming/npm/node_modules/webpack/node_modules/querystring-es3/index.js":
/*!*******************************************************!*\
  !*** (webpack)/node_modules/querystring-es3/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.decode = exports.parse = __webpack_require__(/*! ./decode */ \"../../../Users/Elaine/AppData/Roaming/npm/node_modules/webpack/node_modules/querystring-es3/decode.js\");\nexports.encode = exports.stringify = __webpack_require__(/*! ./encode */ \"../../../Users/Elaine/AppData/Roaming/npm/node_modules/webpack/node_modules/querystring-es3/encode.js\");\n\n//# sourceURL=webpack:///(webpack)/node_modules/querystring-es3/index.js?");

/***/ }),

/***/ "../../../Users/Elaine/AppData/Roaming/npm/node_modules/webpack/node_modules/url/url.js":
/*!*****************************************!*\
  !*** (webpack)/node_modules/url/url.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n\nvar punycode = __webpack_require__(/*! punycode */ \"../../../Users/Elaine/AppData/Roaming/npm/node_modules/webpack/node_modules/node-libs-browser/node_modules/punycode/punycode.js\");\n\nvar util = __webpack_require__(/*! ./util */ \"../../../Users/Elaine/AppData/Roaming/npm/node_modules/webpack/node_modules/url/util.js\");\n\nexports.parse = urlParse;\nexports.resolve = urlResolve;\nexports.resolveObject = urlResolveObject;\nexports.format = urlFormat;\nexports.Url = Url;\n\nfunction Url() {\n  this.protocol = null;\n  this.slashes = null;\n  this.auth = null;\n  this.host = null;\n  this.port = null;\n  this.hostname = null;\n  this.hash = null;\n  this.search = null;\n  this.query = null;\n  this.pathname = null;\n  this.path = null;\n  this.href = null;\n} // Reference: RFC 3986, RFC 1808, RFC 2396\n// define these here so at least they only have to be\n// compiled once on the first module load.\n\n\nvar protocolPattern = /^([a-z0-9.+-]+:)/i,\n    portPattern = /:[0-9]*$/,\n    // Special case for a simple path URL\nsimplePathPattern = /^(\\/\\/?(?!\\/)[^\\?\\s]*)(\\?[^\\s]*)?$/,\n    // RFC 2396: characters reserved for delimiting URLs.\n// We actually just auto-escape these.\ndelims = ['<', '>', '\"', '`', ' ', '\\r', '\\n', '\\t'],\n    // RFC 2396: characters not allowed for various reasons.\nunwise = ['{', '}', '|', '\\\\', '^', '`'].concat(delims),\n    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.\nautoEscape = ['\\''].concat(unwise),\n    // Characters that are never ever allowed in a hostname.\n// Note that any invalid chars are also handled, but these\n// are the ones that are *expected* to be seen, so we fast-path\n// them.\nnonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),\n    hostEndingChars = ['/', '?', '#'],\n    hostnameMaxLen = 255,\n    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,\n    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,\n    // protocols that can allow \"unsafe\" and \"unwise\" chars.\nunsafeProtocol = {\n  'javascript': true,\n  'javascript:': true\n},\n    // protocols that never have a hostname.\nhostlessProtocol = {\n  'javascript': true,\n  'javascript:': true\n},\n    // protocols that always contain a // bit.\nslashedProtocol = {\n  'http': true,\n  'https': true,\n  'ftp': true,\n  'gopher': true,\n  'file': true,\n  'http:': true,\n  'https:': true,\n  'ftp:': true,\n  'gopher:': true,\n  'file:': true\n},\n    querystring = __webpack_require__(/*! querystring */ \"../../../Users/Elaine/AppData/Roaming/npm/node_modules/webpack/node_modules/querystring-es3/index.js\");\n\nfunction urlParse(url, parseQueryString, slashesDenoteHost) {\n  if (url && util.isObject(url) && url instanceof Url) return url;\n  var u = new Url();\n  u.parse(url, parseQueryString, slashesDenoteHost);\n  return u;\n}\n\nUrl.prototype.parse = function (url, parseQueryString, slashesDenoteHost) {\n  if (!util.isString(url)) {\n    throw new TypeError(\"Parameter 'url' must be a string, not \" + typeof url);\n  } // Copy chrome, IE, opera backslash-handling behavior.\n  // Back slashes before the query string get converted to forward slashes\n  // See: https://code.google.com/p/chromium/issues/detail?id=25916\n\n\n  var queryIndex = url.indexOf('?'),\n      splitter = queryIndex !== -1 && queryIndex < url.indexOf('#') ? '?' : '#',\n      uSplit = url.split(splitter),\n      slashRegex = /\\\\/g;\n  uSplit[0] = uSplit[0].replace(slashRegex, '/');\n  url = uSplit.join(splitter);\n  var rest = url; // trim before proceeding.\n  // This is to support parse stuff like \"  http://foo.com  \\n\"\n\n  rest = rest.trim();\n\n  if (!slashesDenoteHost && url.split('#').length === 1) {\n    // Try fast path regexp\n    var simplePath = simplePathPattern.exec(rest);\n\n    if (simplePath) {\n      this.path = rest;\n      this.href = rest;\n      this.pathname = simplePath[1];\n\n      if (simplePath[2]) {\n        this.search = simplePath[2];\n\n        if (parseQueryString) {\n          this.query = querystring.parse(this.search.substr(1));\n        } else {\n          this.query = this.search.substr(1);\n        }\n      } else if (parseQueryString) {\n        this.search = '';\n        this.query = {};\n      }\n\n      return this;\n    }\n  }\n\n  var proto = protocolPattern.exec(rest);\n\n  if (proto) {\n    proto = proto[0];\n    var lowerProto = proto.toLowerCase();\n    this.protocol = lowerProto;\n    rest = rest.substr(proto.length);\n  } // figure out if it's got a host\n  // user@server is *always* interpreted as a hostname, and url\n  // resolution will treat //foo/bar as host=foo,path=bar because that's\n  // how the browser resolves relative URLs.\n\n\n  if (slashesDenoteHost || proto || rest.match(/^\\/\\/[^@\\/]+@[^@\\/]+/)) {\n    var slashes = rest.substr(0, 2) === '//';\n\n    if (slashes && !(proto && hostlessProtocol[proto])) {\n      rest = rest.substr(2);\n      this.slashes = true;\n    }\n  }\n\n  if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {\n    // there's a hostname.\n    // the first instance of /, ?, ;, or # ends the host.\n    //\n    // If there is an @ in the hostname, then non-host chars *are* allowed\n    // to the left of the last @ sign, unless some host-ending character\n    // comes *before* the @-sign.\n    // URLs are obnoxious.\n    //\n    // ex:\n    // http://a@b@c/ => user:a@b host:c\n    // http://a@b?@c => user:a host:c path:/?@c\n    // v0.12 TODO(isaacs): This is not quite how Chrome does things.\n    // Review our test case against browsers more comprehensively.\n    // find the first instance of any hostEndingChars\n    var hostEnd = -1;\n\n    for (var i = 0; i < hostEndingChars.length; i++) {\n      var hec = rest.indexOf(hostEndingChars[i]);\n      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec;\n    } // at this point, either we have an explicit point where the\n    // auth portion cannot go past, or the last @ char is the decider.\n\n\n    var auth, atSign;\n\n    if (hostEnd === -1) {\n      // atSign can be anywhere.\n      atSign = rest.lastIndexOf('@');\n    } else {\n      // atSign must be in auth portion.\n      // http://a@b/c@d => host:b auth:a path:/c@d\n      atSign = rest.lastIndexOf('@', hostEnd);\n    } // Now we have a portion which is definitely the auth.\n    // Pull that off.\n\n\n    if (atSign !== -1) {\n      auth = rest.slice(0, atSign);\n      rest = rest.slice(atSign + 1);\n      this.auth = decodeURIComponent(auth);\n    } // the host is the remaining to the left of the first non-host char\n\n\n    hostEnd = -1;\n\n    for (var i = 0; i < nonHostChars.length; i++) {\n      var hec = rest.indexOf(nonHostChars[i]);\n      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec;\n    } // if we still have not hit it, then the entire thing is a host.\n\n\n    if (hostEnd === -1) hostEnd = rest.length;\n    this.host = rest.slice(0, hostEnd);\n    rest = rest.slice(hostEnd); // pull out port.\n\n    this.parseHost(); // we've indicated that there is a hostname,\n    // so even if it's empty, it has to be present.\n\n    this.hostname = this.hostname || ''; // if hostname begins with [ and ends with ]\n    // assume that it's an IPv6 address.\n\n    var ipv6Hostname = this.hostname[0] === '[' && this.hostname[this.hostname.length - 1] === ']'; // validate a little.\n\n    if (!ipv6Hostname) {\n      var hostparts = this.hostname.split(/\\./);\n\n      for (var i = 0, l = hostparts.length; i < l; i++) {\n        var part = hostparts[i];\n        if (!part) continue;\n\n        if (!part.match(hostnamePartPattern)) {\n          var newpart = '';\n\n          for (var j = 0, k = part.length; j < k; j++) {\n            if (part.charCodeAt(j) > 127) {\n              // we replace non-ASCII char with a temporary placeholder\n              // we need this to make sure size of hostname is not\n              // broken by replacing non-ASCII by nothing\n              newpart += 'x';\n            } else {\n              newpart += part[j];\n            }\n          } // we test again with ASCII char only\n\n\n          if (!newpart.match(hostnamePartPattern)) {\n            var validParts = hostparts.slice(0, i);\n            var notHost = hostparts.slice(i + 1);\n            var bit = part.match(hostnamePartStart);\n\n            if (bit) {\n              validParts.push(bit[1]);\n              notHost.unshift(bit[2]);\n            }\n\n            if (notHost.length) {\n              rest = '/' + notHost.join('.') + rest;\n            }\n\n            this.hostname = validParts.join('.');\n            break;\n          }\n        }\n      }\n    }\n\n    if (this.hostname.length > hostnameMaxLen) {\n      this.hostname = '';\n    } else {\n      // hostnames are always lower case.\n      this.hostname = this.hostname.toLowerCase();\n    }\n\n    if (!ipv6Hostname) {\n      // IDNA Support: Returns a punycoded representation of \"domain\".\n      // It only converts parts of the domain name that\n      // have non-ASCII characters, i.e. it doesn't matter if\n      // you call it with a domain that already is ASCII-only.\n      this.hostname = punycode.toASCII(this.hostname);\n    }\n\n    var p = this.port ? ':' + this.port : '';\n    var h = this.hostname || '';\n    this.host = h + p;\n    this.href += this.host; // strip [ and ] from the hostname\n    // the host field still retains them, though\n\n    if (ipv6Hostname) {\n      this.hostname = this.hostname.substr(1, this.hostname.length - 2);\n\n      if (rest[0] !== '/') {\n        rest = '/' + rest;\n      }\n    }\n  } // now rest is set to the post-host stuff.\n  // chop off any delim chars.\n\n\n  if (!unsafeProtocol[lowerProto]) {\n    // First, make 100% sure that any \"autoEscape\" chars get\n    // escaped, even if encodeURIComponent doesn't think they\n    // need to be.\n    for (var i = 0, l = autoEscape.length; i < l; i++) {\n      var ae = autoEscape[i];\n      if (rest.indexOf(ae) === -1) continue;\n      var esc = encodeURIComponent(ae);\n\n      if (esc === ae) {\n        esc = escape(ae);\n      }\n\n      rest = rest.split(ae).join(esc);\n    }\n  } // chop off from the tail first.\n\n\n  var hash = rest.indexOf('#');\n\n  if (hash !== -1) {\n    // got a fragment string.\n    this.hash = rest.substr(hash);\n    rest = rest.slice(0, hash);\n  }\n\n  var qm = rest.indexOf('?');\n\n  if (qm !== -1) {\n    this.search = rest.substr(qm);\n    this.query = rest.substr(qm + 1);\n\n    if (parseQueryString) {\n      this.query = querystring.parse(this.query);\n    }\n\n    rest = rest.slice(0, qm);\n  } else if (parseQueryString) {\n    // no query string, but parseQueryString still requested\n    this.search = '';\n    this.query = {};\n  }\n\n  if (rest) this.pathname = rest;\n\n  if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {\n    this.pathname = '/';\n  } //to support http.request\n\n\n  if (this.pathname || this.search) {\n    var p = this.pathname || '';\n    var s = this.search || '';\n    this.path = p + s;\n  } // finally, reconstruct the href based on what has been validated.\n\n\n  this.href = this.format();\n  return this;\n}; // format a parsed object into a url string\n\n\nfunction urlFormat(obj) {\n  // ensure it's an object, and not a string url.\n  // If it's an obj, this is a no-op.\n  // this way, you can call url_format() on strings\n  // to clean up potentially wonky urls.\n  if (util.isString(obj)) obj = urlParse(obj);\n  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);\n  return obj.format();\n}\n\nUrl.prototype.format = function () {\n  var auth = this.auth || '';\n\n  if (auth) {\n    auth = encodeURIComponent(auth);\n    auth = auth.replace(/%3A/i, ':');\n    auth += '@';\n  }\n\n  var protocol = this.protocol || '',\n      pathname = this.pathname || '',\n      hash = this.hash || '',\n      host = false,\n      query = '';\n\n  if (this.host) {\n    host = auth + this.host;\n  } else if (this.hostname) {\n    host = auth + (this.hostname.indexOf(':') === -1 ? this.hostname : '[' + this.hostname + ']');\n\n    if (this.port) {\n      host += ':' + this.port;\n    }\n  }\n\n  if (this.query && util.isObject(this.query) && Object.keys(this.query).length) {\n    query = querystring.stringify(this.query);\n  }\n\n  var search = this.search || query && '?' + query || '';\n  if (protocol && protocol.substr(-1) !== ':') protocol += ':'; // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.\n  // unless they had them to begin with.\n\n  if (this.slashes || (!protocol || slashedProtocol[protocol]) && host !== false) {\n    host = '//' + (host || '');\n    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;\n  } else if (!host) {\n    host = '';\n  }\n\n  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;\n  if (search && search.charAt(0) !== '?') search = '?' + search;\n  pathname = pathname.replace(/[?#]/g, function (match) {\n    return encodeURIComponent(match);\n  });\n  search = search.replace('#', '%23');\n  return protocol + host + pathname + search + hash;\n};\n\nfunction urlResolve(source, relative) {\n  return urlParse(source, false, true).resolve(relative);\n}\n\nUrl.prototype.resolve = function (relative) {\n  return this.resolveObject(urlParse(relative, false, true)).format();\n};\n\nfunction urlResolveObject(source, relative) {\n  if (!source) return relative;\n  return urlParse(source, false, true).resolveObject(relative);\n}\n\nUrl.prototype.resolveObject = function (relative) {\n  if (util.isString(relative)) {\n    var rel = new Url();\n    rel.parse(relative, false, true);\n    relative = rel;\n  }\n\n  var result = new Url();\n  var tkeys = Object.keys(this);\n\n  for (var tk = 0; tk < tkeys.length; tk++) {\n    var tkey = tkeys[tk];\n    result[tkey] = this[tkey];\n  } // hash is always overridden, no matter what.\n  // even href=\"\" will remove it.\n\n\n  result.hash = relative.hash; // if the relative url is empty, then there's nothing left to do here.\n\n  if (relative.href === '') {\n    result.href = result.format();\n    return result;\n  } // hrefs like //foo/bar always cut to the protocol.\n\n\n  if (relative.slashes && !relative.protocol) {\n    // take everything except the protocol from relative\n    var rkeys = Object.keys(relative);\n\n    for (var rk = 0; rk < rkeys.length; rk++) {\n      var rkey = rkeys[rk];\n      if (rkey !== 'protocol') result[rkey] = relative[rkey];\n    } //urlParse appends trailing / to urls like http://www.example.com\n\n\n    if (slashedProtocol[result.protocol] && result.hostname && !result.pathname) {\n      result.path = result.pathname = '/';\n    }\n\n    result.href = result.format();\n    return result;\n  }\n\n  if (relative.protocol && relative.protocol !== result.protocol) {\n    // if it's a known url protocol, then changing\n    // the protocol does weird things\n    // first, if it's not file:, then we MUST have a host,\n    // and if there was a path\n    // to begin with, then we MUST have a path.\n    // if it is file:, then the host is dropped,\n    // because that's known to be hostless.\n    // anything else is assumed to be absolute.\n    if (!slashedProtocol[relative.protocol]) {\n      var keys = Object.keys(relative);\n\n      for (var v = 0; v < keys.length; v++) {\n        var k = keys[v];\n        result[k] = relative[k];\n      }\n\n      result.href = result.format();\n      return result;\n    }\n\n    result.protocol = relative.protocol;\n\n    if (!relative.host && !hostlessProtocol[relative.protocol]) {\n      var relPath = (relative.pathname || '').split('/');\n\n      while (relPath.length && !(relative.host = relPath.shift()));\n\n      if (!relative.host) relative.host = '';\n      if (!relative.hostname) relative.hostname = '';\n      if (relPath[0] !== '') relPath.unshift('');\n      if (relPath.length < 2) relPath.unshift('');\n      result.pathname = relPath.join('/');\n    } else {\n      result.pathname = relative.pathname;\n    }\n\n    result.search = relative.search;\n    result.query = relative.query;\n    result.host = relative.host || '';\n    result.auth = relative.auth;\n    result.hostname = relative.hostname || relative.host;\n    result.port = relative.port; // to support http.request\n\n    if (result.pathname || result.search) {\n      var p = result.pathname || '';\n      var s = result.search || '';\n      result.path = p + s;\n    }\n\n    result.slashes = result.slashes || relative.slashes;\n    result.href = result.format();\n    return result;\n  }\n\n  var isSourceAbs = result.pathname && result.pathname.charAt(0) === '/',\n      isRelAbs = relative.host || relative.pathname && relative.pathname.charAt(0) === '/',\n      mustEndAbs = isRelAbs || isSourceAbs || result.host && relative.pathname,\n      removeAllDots = mustEndAbs,\n      srcPath = result.pathname && result.pathname.split('/') || [],\n      relPath = relative.pathname && relative.pathname.split('/') || [],\n      psychotic = result.protocol && !slashedProtocol[result.protocol]; // if the url is a non-slashed url, then relative\n  // links like ../.. should be able\n  // to crawl up to the hostname, as well.  This is strange.\n  // result.protocol has already been set by now.\n  // Later on, put the first path part into the host field.\n\n  if (psychotic) {\n    result.hostname = '';\n    result.port = null;\n\n    if (result.host) {\n      if (srcPath[0] === '') srcPath[0] = result.host;else srcPath.unshift(result.host);\n    }\n\n    result.host = '';\n\n    if (relative.protocol) {\n      relative.hostname = null;\n      relative.port = null;\n\n      if (relative.host) {\n        if (relPath[0] === '') relPath[0] = relative.host;else relPath.unshift(relative.host);\n      }\n\n      relative.host = null;\n    }\n\n    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');\n  }\n\n  if (isRelAbs) {\n    // it's absolute.\n    result.host = relative.host || relative.host === '' ? relative.host : result.host;\n    result.hostname = relative.hostname || relative.hostname === '' ? relative.hostname : result.hostname;\n    result.search = relative.search;\n    result.query = relative.query;\n    srcPath = relPath; // fall through to the dot-handling below.\n  } else if (relPath.length) {\n    // it's relative\n    // throw away the existing file, and take the new path instead.\n    if (!srcPath) srcPath = [];\n    srcPath.pop();\n    srcPath = srcPath.concat(relPath);\n    result.search = relative.search;\n    result.query = relative.query;\n  } else if (!util.isNullOrUndefined(relative.search)) {\n    // just pull out the search.\n    // like href='?foo'.\n    // Put this after the other two cases because it simplifies the booleans\n    if (psychotic) {\n      result.hostname = result.host = srcPath.shift(); //occationaly the auth can get stuck only in host\n      //this especially happens in cases like\n      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')\n\n      var authInHost = result.host && result.host.indexOf('@') > 0 ? result.host.split('@') : false;\n\n      if (authInHost) {\n        result.auth = authInHost.shift();\n        result.host = result.hostname = authInHost.shift();\n      }\n    }\n\n    result.search = relative.search;\n    result.query = relative.query; //to support http.request\n\n    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {\n      result.path = (result.pathname ? result.pathname : '') + (result.search ? result.search : '');\n    }\n\n    result.href = result.format();\n    return result;\n  }\n\n  if (!srcPath.length) {\n    // no path at all.  easy.\n    // we've already handled the other stuff above.\n    result.pathname = null; //to support http.request\n\n    if (result.search) {\n      result.path = '/' + result.search;\n    } else {\n      result.path = null;\n    }\n\n    result.href = result.format();\n    return result;\n  } // if a url ENDs in . or .., then it must get a trailing slash.\n  // however, if it ends in anything else non-slashy,\n  // then it must NOT get a trailing slash.\n\n\n  var last = srcPath.slice(-1)[0];\n  var hasTrailingSlash = (result.host || relative.host || srcPath.length > 1) && (last === '.' || last === '..') || last === ''; // strip single dots, resolve double dots to parent dir\n  // if the path tries to go above the root, `up` ends up > 0\n\n  var up = 0;\n\n  for (var i = srcPath.length; i >= 0; i--) {\n    last = srcPath[i];\n\n    if (last === '.') {\n      srcPath.splice(i, 1);\n    } else if (last === '..') {\n      srcPath.splice(i, 1);\n      up++;\n    } else if (up) {\n      srcPath.splice(i, 1);\n      up--;\n    }\n  } // if the path is allowed to go above the root, restore leading ..s\n\n\n  if (!mustEndAbs && !removeAllDots) {\n    for (; up--; up) {\n      srcPath.unshift('..');\n    }\n  }\n\n  if (mustEndAbs && srcPath[0] !== '' && (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {\n    srcPath.unshift('');\n  }\n\n  if (hasTrailingSlash && srcPath.join('/').substr(-1) !== '/') {\n    srcPath.push('');\n  }\n\n  var isAbsolute = srcPath[0] === '' || srcPath[0] && srcPath[0].charAt(0) === '/'; // put the host back\n\n  if (psychotic) {\n    result.hostname = result.host = isAbsolute ? '' : srcPath.length ? srcPath.shift() : ''; //occationaly the auth can get stuck only in host\n    //this especially happens in cases like\n    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')\n\n    var authInHost = result.host && result.host.indexOf('@') > 0 ? result.host.split('@') : false;\n\n    if (authInHost) {\n      result.auth = authInHost.shift();\n      result.host = result.hostname = authInHost.shift();\n    }\n  }\n\n  mustEndAbs = mustEndAbs || result.host && srcPath.length;\n\n  if (mustEndAbs && !isAbsolute) {\n    srcPath.unshift('');\n  }\n\n  if (!srcPath.length) {\n    result.pathname = null;\n    result.path = null;\n  } else {\n    result.pathname = srcPath.join('/');\n  } //to support request.http\n\n\n  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {\n    result.path = (result.pathname ? result.pathname : '') + (result.search ? result.search : '');\n  }\n\n  result.auth = relative.auth || result.auth;\n  result.slashes = result.slashes || relative.slashes;\n  result.href = result.format();\n  return result;\n};\n\nUrl.prototype.parseHost = function () {\n  var host = this.host;\n  var port = portPattern.exec(host);\n\n  if (port) {\n    port = port[0];\n\n    if (port !== ':') {\n      this.port = port.substr(1);\n    }\n\n    host = host.substr(0, host.length - port.length);\n  }\n\n  if (host) this.hostname = host;\n};\n\n//# sourceURL=webpack:///(webpack)/node_modules/url/url.js?");

/***/ }),

/***/ "../../../Users/Elaine/AppData/Roaming/npm/node_modules/webpack/node_modules/url/util.js":
/*!******************************************!*\
  !*** (webpack)/node_modules/url/util.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = {\n  isString: function (arg) {\n    return typeof arg === 'string';\n  },\n  isObject: function (arg) {\n    return typeof arg === 'object' && arg !== null;\n  },\n  isNull: function (arg) {\n    return arg === null;\n  },\n  isNullOrUndefined: function (arg) {\n    return arg == null;\n  }\n};\n\n//# sourceURL=webpack:///(webpack)/node_modules/url/util.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/App.scss":
/*!***************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/App.scss ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \".container {\\n  display: flex; }\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/App.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/components/nav/nav.component.scss":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/components/nav/nav.component.scss ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \".container {\\n  display: flex;\\n  flex-direction: column; }\\n\\n.header {\\n  font-family: 'Roboto', sans-serif;\\n  font-weight: bold;\\n  display: flex;\\n  align-items: center;\\n  position: sticky;\\n  top: 0;\\n  height: 50px;\\n  background-color: white;\\n  padding-left: 25px; }\\n  .header > img {\\n    width: 128px;\\n    height: 34px; }\\n\\n.nav {\\n  display: flex;\\n  position: sticky;\\n  top: 0;\\n  background-color: #1FBFAE;\\n  color: white;\\n  height: 50px;\\n  padding-left: 25px; }\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/components/nav/nav.component.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\n\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join('');\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === 'string') {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring\n\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return \"/*# sourceURL=\".concat(cssMapping.sourceRoot || '').concat(source, \" */\");\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = \"sourceMappingURL=data:application/json;charset=utf-8;base64,\".concat(base64);\n  return \"/*# \".concat(data, \" */\");\n}\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/hookrouter/dist/Link.js":
/*!**********************************************!*\
  !*** ./node_modules/hookrouter/dist/Link.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.A = exports.setLinkProps = void 0;\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nvar _router = __webpack_require__(/*! ./router */ \"./node_modules/hookrouter/dist/router.js\");\n\nfunction _interopRequireDefault(obj) {\n  return obj && obj.__esModule ? obj : {\n    default: obj\n  };\n}\n\nfunction _objectSpread(target) {\n  for (var i = 1; i < arguments.length; i++) {\n    var source = arguments[i] != null ? arguments[i] : {};\n    var ownKeys = Object.keys(source);\n\n    if (typeof Object.getOwnPropertySymbols === 'function') {\n      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {\n        return Object.getOwnPropertyDescriptor(source, sym).enumerable;\n      }));\n    }\n\n    ownKeys.forEach(function (key) {\n      _defineProperty(target, key, source[key]);\n    });\n  }\n\n  return target;\n}\n\nfunction _defineProperty(obj, key, value) {\n  if (key in obj) {\n    Object.defineProperty(obj, key, {\n      value: value,\n      enumerable: true,\n      configurable: true,\n      writable: true\n    });\n  } else {\n    obj[key] = value;\n  }\n\n  return obj;\n}\n/**\r\n * Accepts HTML `a`-tag properties, requiring `href` and optionally\r\n * `onClick`, which are appropriately wrapped to allow other\r\n * frameworks to be used for creating `hookrouter` navigatable links.\r\n *\r\n * If `onClick` is supplied, then the navigation will happen before\r\n * the supplied `onClick` action!\r\n *\r\n * @example\r\n *\r\n * &lt;MyFrameworkLink what=\"ever\" {...useLink({ href: '/' })}&gt;\r\n *   Link text\r\n * &lt;/MyFrameworkLink&gt;\r\n *\r\n * @param {Object} props Requires `href`. `onClick` is optional.\r\n */\n\n\nvar setLinkProps = function setLinkProps(props) {\n  var onClick = function onClick(e) {\n    if (!e.shiftKey && !e.ctrlKey && !e.altKey) {\n      e.preventDefault(); // prevent the link from actually navigating\n\n      (0, _router.navigate)(e.currentTarget.href);\n    }\n\n    if (props.onClick) {\n      props.onClick(e);\n    }\n  };\n\n  var href = props.href.substr(0, 1) === '/' ? (0, _router.getBasepath)() + props.href : props.href;\n  return _objectSpread({}, props, {\n    href: href,\n    onClick: onClick\n  });\n};\n/**\r\n * Accepts standard HTML `a`-tag properties. `href` and, optionally,\r\n * `onClick` are used to create links that work with `hookrouter`.\r\n *\r\n * @example\r\n *\r\n * &lt;A href=\"/\" target=\"_blank\"&gt;\r\n *   Home\r\n * &lt;/A&gt;\r\n *\r\n * @param {Object} props Requires `href`. `onClick` is optional\r\n */\n\n\nexports.setLinkProps = setLinkProps;\n\nvar A = function A(props) {\n  return _react.default.createElement(\"a\", setLinkProps(props));\n};\n\nexports.A = A;\n\n//# sourceURL=webpack:///./node_modules/hookrouter/dist/Link.js?");

/***/ }),

/***/ "./node_modules/hookrouter/dist/controlledInterceptor.js":
/*!***************************************************************!*\
  !*** ./node_modules/hookrouter/dist/controlledInterceptor.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.useControlledInterceptor = void 0;\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nvar _interceptor = __webpack_require__(/*! ./interceptor */ \"./node_modules/hookrouter/dist/interceptor.js\");\n\nvar _router = __webpack_require__(/*! ./router */ \"./node_modules/hookrouter/dist/router.js\");\n\nfunction _interopRequireDefault(obj) {\n  return obj && obj.__esModule ? obj : {\n    default: obj\n  };\n}\n\nfunction _slicedToArray(arr, i) {\n  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();\n}\n\nfunction _nonIterableRest() {\n  throw new TypeError(\"Invalid attempt to destructure non-iterable instance\");\n}\n\nfunction _iterableToArrayLimit(arr, i) {\n  var _arr = [];\n  var _n = true;\n  var _d = false;\n  var _e = undefined;\n\n  try {\n    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {\n      _arr.push(_s.value);\n\n      if (i && _arr.length === i) break;\n    }\n  } catch (err) {\n    _d = true;\n    _e = err;\n  } finally {\n    try {\n      if (!_n && _i[\"return\"] != null) _i[\"return\"]();\n    } finally {\n      if (_d) throw _e;\n    }\n  }\n\n  return _arr;\n}\n\nfunction _arrayWithHoles(arr) {\n  if (Array.isArray(arr)) return arr;\n}\n/**\r\n * This is a controlled version of the interceptor which cancels any navigation intent\r\n * and hands control over it to your calling component.\r\n *\r\n * `interceptedPath` is initially `null` and will be set to the target path upon navigation.\r\n * `confirmNavigation` is the callback to be called to stop the interception and navigate to the last path.\r\n * `resetPath` is a callback that resets `interceptedPath` back to `null`.\r\n *\r\n * @returns {Array} [interceptedPath, confirmNavigation, resetPath]\r\n */\n\n\nvar useControlledInterceptor = function useControlledInterceptor() {\n  var _React$useState = _react.default.useState(null),\n      _React$useState2 = _slicedToArray(_React$useState, 2),\n      interceptedPath = _React$useState2[0],\n      setInterceptedPath = _React$useState2[1];\n\n  var interceptorFunction = _react.default.useMemo(function () {\n    return function (currentPath, nextPath) {\n      setInterceptedPath(nextPath);\n      return currentPath;\n    };\n  }, [setInterceptedPath]);\n\n  var stopInterception = (0, _interceptor.useInterceptor)(interceptorFunction);\n\n  var confirmNavigation = _react.default.useMemo(function () {\n    return function () {\n      stopInterception();\n      (0, _router.navigate)(interceptedPath);\n    };\n  }, [stopInterception, interceptedPath]);\n\n  var resetPath = _react.default.useMemo(function () {\n    return function () {\n      return setInterceptedPath(null);\n    };\n  }, [setInterceptedPath]);\n\n  return [interceptedPath, confirmNavigation, resetPath, stopInterception];\n};\n\nexports.useControlledInterceptor = useControlledInterceptor;\n\n//# sourceURL=webpack:///./node_modules/hookrouter/dist/controlledInterceptor.js?");

/***/ }),

/***/ "./node_modules/hookrouter/dist/index.js":
/*!***********************************************!*\
  !*** ./node_modules/hookrouter/dist/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nObject.defineProperty(exports, \"A\", {\n  enumerable: true,\n  get: function get() {\n    return _Link.A;\n  }\n});\nObject.defineProperty(exports, \"setLinkProps\", {\n  enumerable: true,\n  get: function get() {\n    return _Link.setLinkProps;\n  }\n});\nObject.defineProperty(exports, \"useRedirect\", {\n  enumerable: true,\n  get: function get() {\n    return _redirect.default;\n  }\n});\nObject.defineProperty(exports, \"useQueryParams\", {\n  enumerable: true,\n  get: function get() {\n    return _queryParams.useQueryParams;\n  }\n});\nObject.defineProperty(exports, \"setQueryParams\", {\n  enumerable: true,\n  get: function get() {\n    return _queryParams.setQueryParams;\n  }\n});\nObject.defineProperty(exports, \"getQueryParams\", {\n  enumerable: true,\n  get: function get() {\n    return _queryParams.getQueryParams;\n  }\n});\nObject.defineProperty(exports, \"useInterceptor\", {\n  enumerable: true,\n  get: function get() {\n    return _interceptor.useInterceptor;\n  }\n});\nObject.defineProperty(exports, \"useControlledInterceptor\", {\n  enumerable: true,\n  get: function get() {\n    return _controlledInterceptor.useControlledInterceptor;\n  }\n});\nObject.defineProperty(exports, \"useTitle\", {\n  enumerable: true,\n  get: function get() {\n    return _title.useTitle;\n  }\n});\nObject.defineProperty(exports, \"getTitle\", {\n  enumerable: true,\n  get: function get() {\n    return _title.getTitle;\n  }\n});\nObject.defineProperty(exports, \"navigate\", {\n  enumerable: true,\n  get: function get() {\n    return _router.navigate;\n  }\n});\nObject.defineProperty(exports, \"useRoutes\", {\n  enumerable: true,\n  get: function get() {\n    return _router.useRoutes;\n  }\n});\nObject.defineProperty(exports, \"setPath\", {\n  enumerable: true,\n  get: function get() {\n    return _router.setPath;\n  }\n});\nObject.defineProperty(exports, \"getPath\", {\n  enumerable: true,\n  get: function get() {\n    return _router.getPath;\n  }\n});\nObject.defineProperty(exports, \"getWorkingPath\", {\n  enumerable: true,\n  get: function get() {\n    return _router.getWorkingPath;\n  }\n});\nObject.defineProperty(exports, \"setBasepath\", {\n  enumerable: true,\n  get: function get() {\n    return _router.setBasepath;\n  }\n});\nObject.defineProperty(exports, \"getBasepath\", {\n  enumerable: true,\n  get: function get() {\n    return _router.getBasepath;\n  }\n});\nObject.defineProperty(exports, \"usePath\", {\n  enumerable: true,\n  get: function get() {\n    return _router.usePath;\n  }\n});\n\nvar _Link = __webpack_require__(/*! ./Link */ \"./node_modules/hookrouter/dist/Link.js\");\n\nvar _redirect = _interopRequireDefault(__webpack_require__(/*! ./redirect */ \"./node_modules/hookrouter/dist/redirect.js\"));\n\nvar _queryParams = __webpack_require__(/*! ./queryParams */ \"./node_modules/hookrouter/dist/queryParams.js\");\n\nvar _interceptor = __webpack_require__(/*! ./interceptor */ \"./node_modules/hookrouter/dist/interceptor.js\");\n\nvar _controlledInterceptor = __webpack_require__(/*! ./controlledInterceptor */ \"./node_modules/hookrouter/dist/controlledInterceptor.js\");\n\nvar _title = __webpack_require__(/*! ./title */ \"./node_modules/hookrouter/dist/title.js\");\n\nvar _router = __webpack_require__(/*! ./router */ \"./node_modules/hookrouter/dist/router.js\");\n\nfunction _interopRequireDefault(obj) {\n  return obj && obj.__esModule ? obj : {\n    default: obj\n  };\n}\n\n//# sourceURL=webpack:///./node_modules/hookrouter/dist/index.js?");

/***/ }),

/***/ "./node_modules/hookrouter/dist/interceptor.js":
/*!*****************************************************!*\
  !*** ./node_modules/hookrouter/dist/interceptor.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.useInterceptor = exports.interceptRoute = void 0;\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nfunction _interopRequireDefault(obj) {\n  return obj && obj.__esModule ? obj : {\n    default: obj\n  };\n}\n\nfunction _slicedToArray(arr, i) {\n  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();\n}\n\nfunction _nonIterableRest() {\n  throw new TypeError(\"Invalid attempt to destructure non-iterable instance\");\n}\n\nfunction _iterableToArrayLimit(arr, i) {\n  var _arr = [];\n  var _n = true;\n  var _d = false;\n  var _e = undefined;\n\n  try {\n    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {\n      _arr.push(_s.value);\n\n      if (i && _arr.length === i) break;\n    }\n  } catch (err) {\n    _d = true;\n    _e = err;\n  } finally {\n    try {\n      if (!_n && _i[\"return\"] != null) _i[\"return\"]();\n    } finally {\n      if (_d) throw _e;\n    }\n  }\n\n  return _arr;\n}\n\nfunction _arrayWithHoles(arr) {\n  if (Array.isArray(arr)) return arr;\n}\n\nvar incrementalId = 1;\nvar interceptors = [];\n\nvar interceptRoute = function interceptRoute(previousRoute, nextRoute) {\n  if (!interceptors.length) {\n    return nextRoute;\n  }\n\n  return interceptors.reduceRight(function (nextRoute, interceptor) {\n    return nextRoute === previousRoute ? nextRoute : interceptor.handlerFunction(previousRoute, nextRoute);\n  }, nextRoute);\n};\n\nexports.interceptRoute = interceptRoute;\n\nvar get = function get(componentId) {\n  return interceptors.find(function (obj) {\n    return obj.componentId === componentId;\n  }) || null;\n};\n\nvar remove = function remove(componentId) {\n  var index = interceptors.findIndex(function (obj) {\n    return obj.componentId === componentId;\n  });\n\n  if (index !== -1) {\n    interceptors.splice(index, 1);\n  }\n};\n\nvar useInterceptor = function useInterceptor(handlerFunction) {\n  var _React$useState = _react.default.useState(incrementalId++),\n      _React$useState2 = _slicedToArray(_React$useState, 1),\n      componentId = _React$useState2[0];\n\n  var obj = get(componentId);\n\n  if (!obj) {\n    obj = {\n      componentId: componentId,\n      stop: function stop() {\n        return remove(componentId);\n      },\n      handlerFunction: handlerFunction\n    };\n    interceptors.unshift(obj);\n  }\n\n  _react.default.useEffect(function () {\n    return function () {\n      return obj.stop();\n    };\n  }, []);\n\n  return obj.stop;\n};\n\nexports.useInterceptor = useInterceptor;\n\n//# sourceURL=webpack:///./node_modules/hookrouter/dist/interceptor.js?");

/***/ }),

/***/ "./node_modules/hookrouter/dist/isNode.js":
/*!************************************************!*\
  !*** ./node_modules/hookrouter/dist/isNode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\nvar wIsNode = true;\n\ntry {\n  wIsNode = window === undefined;\n} catch (e) {}\n\nvar _default = wIsNode;\nexports.default = _default;\n\n//# sourceURL=webpack:///./node_modules/hookrouter/dist/isNode.js?");

/***/ }),

/***/ "./node_modules/hookrouter/dist/queryParams.js":
/*!*****************************************************!*\
  !*** ./node_modules/hookrouter/dist/queryParams.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.useQueryParams = exports.getQueryParams = exports.setQueryParams = void 0;\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nvar _isNode = _interopRequireDefault(__webpack_require__(/*! ./isNode */ \"./node_modules/hookrouter/dist/isNode.js\"));\n\nfunction _interopRequireDefault(obj) {\n  return obj && obj.__esModule ? obj : {\n    default: obj\n  };\n}\n\nfunction _slicedToArray(arr, i) {\n  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();\n}\n\nfunction _nonIterableRest() {\n  throw new TypeError(\"Invalid attempt to destructure non-iterable instance\");\n}\n\nfunction _iterableToArrayLimit(arr, i) {\n  var _arr = [];\n  var _n = true;\n  var _d = false;\n  var _e = undefined;\n\n  try {\n    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {\n      _arr.push(_s.value);\n\n      if (i && _arr.length === i) break;\n    }\n  } catch (err) {\n    _d = true;\n    _e = err;\n  } finally {\n    try {\n      if (!_n && _i[\"return\"] != null) _i[\"return\"]();\n    } finally {\n      if (_d) throw _e;\n    }\n  }\n\n  return _arr;\n}\n\nfunction _arrayWithHoles(arr) {\n  if (Array.isArray(arr)) return arr;\n}\n\nvar queryParamListeners = [];\nvar queryParamObject = {};\n\nvar setQueryParams = function setQueryParams(inObj) {\n  var replace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;\n\n  if (!(inObj instanceof Object)) {\n    throw new Error('Object required');\n  }\n\n  if (replace) {\n    queryParamObject = inObj;\n  } else {\n    Object.assign(queryParamObject, inObj);\n  }\n\n  var now = Date.now();\n  queryParamListeners.forEach(function (cb) {\n    return cb(now);\n  });\n\n  if (!_isNode.default) {\n    var qs = '?' + objectToQueryString(queryParamObject);\n\n    if (qs === location.search) {\n      return;\n    }\n\n    history.replaceState(null, null, location.pathname + (qs !== '?' ? qs : ''));\n  }\n};\n\nexports.setQueryParams = setQueryParams;\n\nvar getQueryParams = function getQueryParams() {\n  return Object.assign({}, queryParamObject);\n};\n/**\r\n * This takes an URL query string and converts it into a javascript object.\r\n * @param {string} inStr\r\n * @return {object}\r\n */\n\n\nexports.getQueryParams = getQueryParams;\n\nvar queryStringToObject = function queryStringToObject(inStr) {\n  var p = new URLSearchParams(inStr);\n  var result = {};\n  var _iteratorNormalCompletion = true;\n  var _didIteratorError = false;\n  var _iteratorError = undefined;\n\n  try {\n    for (var _iterator = p[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n      var param = _step.value;\n      result[param[0]] = param[1];\n    }\n  } catch (err) {\n    _didIteratorError = true;\n    _iteratorError = err;\n  } finally {\n    try {\n      if (!_iteratorNormalCompletion && _iterator.return != null) {\n        _iterator.return();\n      }\n    } finally {\n      if (_didIteratorError) {\n        throw _iteratorError;\n      }\n    }\n  }\n\n  return result;\n};\n/**\r\n * This takes a javascript object and turns it into a URL query string.\r\n * @param {object} inObj\r\n * @return {string}\r\n */\n\n\nvar objectToQueryString = function objectToQueryString(inObj) {\n  var qs = new URLSearchParams();\n  Object.entries(inObj).forEach(function (_ref) {\n    var _ref2 = _slicedToArray(_ref, 2),\n        key = _ref2[0],\n        value = _ref2[1];\n\n    return value !== undefined ? qs.append(key, value) : null;\n  });\n  return qs.toString();\n};\n\nif (!_isNode.default) {\n  queryParamObject = queryStringToObject(location.search.substr(1));\n}\n/**\r\n * This hook returns the currently set query parameters as object and offers a setter function\r\n * to set a new query string.\r\n *\r\n * All components that are hooked to the query parameters will get updated if they change.\r\n * Query params can also be updated along with the path, by calling `navigate(url, queryParams)`.\r\n *\r\n * @returns {array} [queryParamObject, setQueryParams]\r\n */\n\n\nvar useQueryParams = function useQueryParams() {\n  var setUpdate = _react.default.useState(0)[1];\n\n  _react.default.useEffect(function () {\n    queryParamListeners.push(setUpdate);\n    return function () {\n      var index = queryParamListeners.indexOf(setUpdate);\n\n      if (index === -1) {\n        return;\n      }\n\n      queryParamListeners.splice(index, 1);\n    };\n  }, [setUpdate]);\n\n  return [queryParamObject, setQueryParams];\n};\n\nexports.useQueryParams = useQueryParams;\n\n//# sourceURL=webpack:///./node_modules/hookrouter/dist/queryParams.js?");

/***/ }),

/***/ "./node_modules/hookrouter/dist/redirect.js":
/*!**************************************************!*\
  !*** ./node_modules/hookrouter/dist/redirect.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nvar _router = __webpack_require__(/*! ./router */ \"./node_modules/hookrouter/dist/router.js\");\n\nfunction _interopRequireDefault(obj) {\n  return obj && obj.__esModule ? obj : {\n    default: obj\n  };\n}\n\nvar useRedirect = function useRedirect(fromURL, toURL) {\n  var queryParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;\n  var replace = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;\n\n  var parentRouterId = _react.default.useContext(_router.ParentContext);\n\n  var currentPath = (0, _router.getWorkingPath)(parentRouterId);\n\n  if (currentPath === fromURL) {\n    (0, _router.navigate)(parentRouterId ? \".\".concat(toURL) : toURL, replace, queryParams);\n  }\n};\n\nvar _default = useRedirect;\nexports.default = _default;\n\n//# sourceURL=webpack:///./node_modules/hookrouter/dist/redirect.js?");

/***/ }),

/***/ "./node_modules/hookrouter/dist/router.js":
/*!************************************************!*\
  !*** ./node_modules/hookrouter/dist/router.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.useRoutes = exports.getWorkingPath = exports.usePath = exports.getPath = exports.setPath = exports.navigate = exports.ParentContext = exports.getBasepath = exports.setBasepath = void 0;\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nvar _isNode = _interopRequireDefault(__webpack_require__(/*! ./isNode */ \"./node_modules/hookrouter/dist/isNode.js\"));\n\nvar _queryParams = __webpack_require__(/*! ./queryParams */ \"./node_modules/hookrouter/dist/queryParams.js\");\n\nvar _interceptor = __webpack_require__(/*! ./interceptor */ \"./node_modules/hookrouter/dist/interceptor.js\");\n\nfunction _interopRequireDefault(obj) {\n  return obj && obj.__esModule ? obj : {\n    default: obj\n  };\n}\n\nfunction _slicedToArray(arr, i) {\n  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();\n}\n\nfunction _nonIterableRest() {\n  throw new TypeError(\"Invalid attempt to destructure non-iterable instance\");\n}\n\nfunction _iterableToArrayLimit(arr, i) {\n  var _arr = [];\n  var _n = true;\n  var _d = false;\n  var _e = undefined;\n\n  try {\n    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {\n      _arr.push(_s.value);\n\n      if (i && _arr.length === i) break;\n    }\n  } catch (err) {\n    _d = true;\n    _e = err;\n  } finally {\n    try {\n      if (!_n && _i[\"return\"] != null) _i[\"return\"]();\n    } finally {\n      if (_d) throw _e;\n    }\n  }\n\n  return _arr;\n}\n\nfunction _arrayWithHoles(arr) {\n  if (Array.isArray(arr)) return arr;\n}\n\nvar preparedRoutes = {};\nvar stack = {};\nvar componentId = 1;\nvar currentPath = _isNode.default ? '' : location.pathname;\nvar basePath = '';\nvar basePathRegEx = null;\nvar pathUpdaters = [];\n/**\r\n * Will define a base path that will be utilized in your routing and navigation.\r\n * To be called _before_ any routing or navigation happens.\r\n * @param {string} inBasepath\r\n */\n\nvar setBasepath = function setBasepath(inBasepath) {\n  basePath = inBasepath;\n  basePathRegEx = new RegExp('^' + basePath);\n};\n/**\r\n * Returns the currently used base path.\r\n * @returns {string}\r\n */\n\n\nexports.setBasepath = setBasepath;\n\nvar getBasepath = function getBasepath() {\n  return basePath;\n};\n\nexports.getBasepath = getBasepath;\n\nvar resolvePath = function resolvePath(inPath) {\n  if (_isNode.default) {\n    var url = __webpack_require__(/*! url */ \"../../../Users/Elaine/AppData/Roaming/npm/node_modules/webpack/node_modules/url/url.js\");\n\n    return url.resolve(currentPath, inPath);\n  }\n\n  var current = new URL(currentPath, location.href);\n  var resolved = new URL(inPath, current);\n  return resolved.pathname;\n};\n\nvar ParentContext = _react.default.createContext(null);\n/**\r\n * Pass a route string to this function to receive a regular expression.\r\n * The transformation will be cached and if you pass the same route a second\r\n * time, the cached regex will be returned.\r\n * @param {string} inRoute\r\n * @returns {Array} [RegExp, propList]\r\n */\n\n\nexports.ParentContext = ParentContext;\n\nvar prepareRoute = function prepareRoute(inRoute) {\n  if (preparedRoutes[inRoute]) {\n    return preparedRoutes[inRoute];\n  }\n\n  var preparedRoute = [new RegExp(\"\".concat(inRoute.substr(0, 1) === '*' ? '' : '^').concat(inRoute.replace(/:[a-zA-Z]+/g, '([^/]+)').replace(/\\*/g, '')).concat(inRoute.substr(-1) === '*' ? '' : '$'))];\n  var propList = inRoute.match(/:[a-zA-Z]+/g);\n  preparedRoute.push(propList ? propList.map(function (paramName) {\n    return paramName.substr(1);\n  }) : []);\n  preparedRoutes[inRoute] = preparedRoute;\n  return preparedRoute;\n};\n/**\r\n * Virtually navigates the browser to the given URL and re-processes all routers.\r\n * @param {string} url The URL to navigate to. Do not mix adding GET params here and using the `getParams` argument.\r\n * @param {boolean} [replace=false] Should the navigation be done with a history replace to prevent back navigation by the user\r\n * @param {object} [queryParams] Key/Value pairs to convert into get parameters to be appended to the URL.\r\n * @param {boolean} [replaceQueryParams=true] Should existing query parameters be carried over, or dropped (replaced)?\r\n */\n\n\nvar navigate = function navigate(url) {\n  var replace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;\n  var queryParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;\n  var replaceQueryParams = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;\n  url = (0, _interceptor.interceptRoute)(currentPath, resolvePath(url));\n\n  if (!url || url === currentPath) {\n    return;\n  }\n\n  currentPath = url;\n\n  if (_isNode.default) {\n    setPath(url);\n    processStack();\n    updatePathHooks();\n    return;\n  }\n\n  var finalURL = basePathRegEx ? url.match(basePathRegEx) ? url : basePath + url : url;\n  window.history[\"\".concat(replace ? 'replace' : 'push', \"State\")](null, null, finalURL);\n  processStack();\n  updatePathHooks();\n\n  if (queryParams) {\n    (0, _queryParams.setQueryParams)(queryParams, replaceQueryParams);\n  }\n};\n\nexports.navigate = navigate;\nvar customPath = '/';\n/**\r\n * Enables you to manually set the path from outside in a nodeJS environment, where window.history is not available.\r\n * @param {string} inPath\r\n */\n\nvar setPath = function setPath(inPath) {\n  var url = __webpack_require__(/*! url */ \"../../../Users/Elaine/AppData/Roaming/npm/node_modules/webpack/node_modules/url/url.js\");\n\n  customPath = url.resolve(customPath, inPath);\n};\n/**\r\n * Returns the current path of the router.\r\n * @returns {string}\r\n */\n\n\nexports.setPath = setPath;\n\nvar getPath = function getPath() {\n  return customPath;\n};\n/**\r\n * This hook returns the currently used URI.\r\n * Works in a browser context as well as for SSR.\r\n *\r\n * _Heads up:_ This will make your component render on every navigation unless you set this hook to passive!\r\n * @param {boolean} [active=true] Will update the component upon path changes. Set to false to only retrieve the path, once.\r\n * @param {boolean} [withBasepath=false] Should the base path be left at the beginning of the URI?\r\n * @returns {string}\r\n */\n\n\nexports.getPath = getPath;\n\nvar usePath = function usePath() {\n  var active = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;\n  var withBasepath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;\n\n  var _React$useState = _react.default.useState(0),\n      _React$useState2 = _slicedToArray(_React$useState, 2),\n      setUpdate = _React$useState2[1];\n\n  _react.default.useEffect(function () {\n    if (!active) {\n      return;\n    }\n\n    pathUpdaters.push(setUpdate);\n    return function () {\n      var index = pathUpdaters.indexOf(setUpdate);\n\n      if (index !== -1) {\n        pathUpdaters.splice(index, 1);\n      }\n    };\n  }, [setUpdate]);\n\n  return withBasepath ? currentPath : currentPath.replace(basePathRegEx, '');\n};\n/**\r\n * Render all components that use path hooks.\r\n */\n\n\nexports.usePath = usePath;\n\nvar updatePathHooks = function updatePathHooks() {\n  var now = Date.now();\n  pathUpdaters.forEach(function (cb) {\n    return cb(now);\n  });\n};\n/**\r\n * Called from within the router. This returns either the current windows url path\r\n * or a already reduced path, if a parent router has already matched with a finishing\r\n * wildcard before.\r\n * @param {string} [parentRouterId]\r\n * @returns {string}\r\n */\n\n\nvar getWorkingPath = function getWorkingPath(parentRouterId) {\n  if (!parentRouterId) {\n    return _isNode.default ? customPath : window.location.pathname.replace(basePathRegEx, '') || '/';\n  }\n\n  var stackEntry = stack[parentRouterId];\n\n  if (!stackEntry) {\n    throw 'wth';\n  }\n\n  return stackEntry.reducedPath !== null ? stackEntry.reducedPath || '/' : window.location.pathname;\n};\n\nexports.getWorkingPath = getWorkingPath;\n\nvar processStack = function processStack() {\n  return Object.values(stack).forEach(process);\n};\n/**\r\n * This function takes two objects and compares if they have the same\r\n * keys and their keys have the same values assigned, so the objects are\r\n * basically the same.\r\n * @param {object} objA\r\n * @param {object} objB\r\n * @return {boolean}\r\n */\n\n\nvar objectsEqual = function objectsEqual(objA, objB) {\n  var objAKeys = Object.keys(objA);\n  var objBKeys = Object.keys(objB);\n\n  var valueIsEqual = function valueIsEqual(key) {\n    return objB.hasOwnProperty(key) && objA[key] === objB[key];\n  };\n\n  return objAKeys.length === objBKeys.length && objAKeys.every(valueIsEqual);\n};\n\nif (!_isNode.default) {\n  window.addEventListener('popstate', function (e) {\n    var nextPath = (0, _interceptor.interceptRoute)(currentPath, location.pathname);\n\n    if (!nextPath || nextPath === currentPath) {\n      e.preventDefault();\n      e.stopPropagation();\n      history.pushState(null, null, currentPath);\n      return;\n    }\n\n    currentPath = nextPath;\n\n    if (nextPath !== location.pathname) {\n      history.replaceState(null, null, nextPath);\n    }\n\n    processStack();\n    updatePathHooks();\n  });\n}\n\nvar emptyFunc = function emptyFunc() {\n  return null;\n};\n/**\r\n * This will calculate the match of a given router.\r\n * @param {object} stackObj\r\n * @param {boolean} [directCall] If its not a direct call, the process function might trigger a component render.\r\n */\n\n\nvar process = function process(stackObj, directCall) {\n  var routerId = stackObj.routerId,\n      parentRouterId = stackObj.parentRouterId,\n      routes = stackObj.routes,\n      setUpdate = stackObj.setUpdate,\n      resultFunc = stackObj.resultFunc,\n      resultProps = stackObj.resultProps,\n      previousReducedPath = stackObj.reducedPath;\n  var currentPath = getWorkingPath(parentRouterId);\n  var route = null;\n  var targetFunction = null;\n  var targetProps = null;\n  var reducedPath = null;\n  var anyMatched = false;\n\n  for (var i = 0; i < routes.length; i++) {\n    var _routes$i = _slicedToArray(routes[i], 2);\n\n    route = _routes$i[0];\n    targetFunction = _routes$i[1];\n\n    var _ref = preparedRoutes[route] ? preparedRoutes[route] : prepareRoute(route),\n        _ref2 = _slicedToArray(_ref, 2),\n        regex = _ref2[0],\n        groupNames = _ref2[1];\n\n    var _result = currentPath.match(regex);\n\n    if (!_result) {\n      targetFunction = emptyFunc;\n      continue;\n    }\n\n    if (groupNames.length) {\n      targetProps = {};\n\n      for (var j = 0; j < groupNames.length; j++) {\n        targetProps[groupNames[j]] = _result[j + 1];\n      }\n    }\n\n    reducedPath = currentPath.replace(_result[0], '');\n    anyMatched = true;\n    break;\n  }\n\n  if (!stack[routerId]) {\n    return;\n  }\n\n  if (!anyMatched) {\n    route = null;\n    targetFunction = null;\n    targetProps = null;\n    reducedPath = null;\n  }\n\n  var funcsDiffer = resultFunc !== targetFunction;\n  var pathDiffer = reducedPath !== previousReducedPath;\n  var propsDiffer = true;\n\n  if (!funcsDiffer) {\n    if (!resultProps && !targetProps) {\n      propsDiffer = false;\n    } else {\n      propsDiffer = !(resultProps && targetProps && objectsEqual(resultProps, targetProps) === true);\n    }\n\n    if (!propsDiffer) {\n      if (!pathDiffer) {\n        return;\n      }\n    }\n  }\n\n  var result = funcsDiffer || propsDiffer ? targetFunction ? targetFunction(targetProps) : null : stackObj.result;\n  Object.assign(stack[routerId], {\n    result: result,\n    reducedPath: reducedPath,\n    matchedRoute: route,\n    passContext: route ? route.substr(-1) === '*' : false\n  });\n\n  if (!directCall && (funcsDiffer || propsDiffer || route === null)) {\n    setUpdate(Date.now());\n  }\n};\n/**\r\n * If a route returns a function, instead of a react element, we need to wrap this function\r\n * to eventually wrap a context object around its result.\r\n * @param RouteContext\r\n * @param originalResult\r\n * @returns {function(): *}\r\n */\n\n\nvar wrapperFunction = function wrapperFunction(RouteContext, originalResult) {\n  return function () {\n    return _react.default.createElement(RouteContext, null, originalResult.apply(originalResult, arguments));\n  };\n};\n/**\r\n * Pass an object to this function where the keys are routes and the values\r\n * are functions to be executed when a route matches. Whatever your function returns\r\n * will be returned from the hook as well into your react component. Ideally you would\r\n * return components to be rendered when certain routes match, but you are not limited\r\n * to that.\r\n * @param {object} routeObj {\"/someRoute\": () => <Example />}\r\n */\n\n\nvar useRoutes = function useRoutes(routeObj) {\n  // Each router gets an internal id to look them up again.\n  var _React$useState3 = _react.default.useState(componentId),\n      _React$useState4 = _slicedToArray(_React$useState3, 1),\n      routerId = _React$useState4[0];\n\n  var setUpdate = _react.default.useState(0)[1]; // Needed to create nested routers which use only a subset of the URL.\n\n\n  var parentRouterId = _react.default.useContext(ParentContext); // If we just took the last ID, increase it for the next hook.\n\n\n  if (routerId === componentId) {\n    componentId += 1;\n  } // Removes the router from the stack after component unmount - it won't be processed anymore.\n\n\n  _react.default.useEffect(function () {\n    return function () {\n      return delete stack[routerId];\n    };\n  }, [routerId]);\n\n  var stackObj = stack[routerId];\n\n  if (stackObj && stackObj.originalRouteObj !== routeObj) {\n    stackObj = null;\n  }\n\n  if (!stackObj) {\n    stackObj = {\n      routerId: routerId,\n      originalRouteObj: routeObj,\n      routes: Object.entries(routeObj),\n      setUpdate: setUpdate,\n      parentRouterId: parentRouterId,\n      matchedRoute: null,\n      reducedPath: null,\n      passContext: false,\n      result: null\n    };\n    stack[routerId] = stackObj;\n    process(stackObj, true);\n  }\n\n  _react.default.useDebugValue(stackObj.matchedRoute);\n\n  if (!stackObj.matchedRoute) {\n    return null;\n  }\n\n  var result = stackObj.result;\n\n  if (!stackObj.passContext) {\n    return result;\n  } else {\n    var RouteContext = function RouteContext(_ref3) {\n      var children = _ref3.children;\n      return _react.default.createElement(ParentContext.Provider, {\n        value: routerId\n      }, children);\n    };\n\n    if (typeof result === 'function') {\n      return wrapperFunction(RouteContext, result);\n    }\n\n    return _react.default.isValidElement(result) && result.type !== RouteContext ? _react.default.createElement(RouteContext, null, result) : result;\n  }\n};\n\nexports.useRoutes = useRoutes;\n\n//# sourceURL=webpack:///./node_modules/hookrouter/dist/router.js?");

/***/ }),

/***/ "./node_modules/hookrouter/dist/title.js":
/*!***********************************************!*\
  !*** ./node_modules/hookrouter/dist/title.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.getTitle = exports.useTitle = void 0;\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nvar _isNode = _interopRequireDefault(__webpack_require__(/*! ./isNode */ \"./node_modules/hookrouter/dist/isNode.js\"));\n\nfunction _interopRequireDefault(obj) {\n  return obj && obj.__esModule ? obj : {\n    default: obj\n  };\n}\n\nvar currentTitle = '';\n/**\r\n * This hook will set the window title, when a component gets mounted.\r\n * When the component gets unmounted, the previously used title will be restored.\r\n * @param {string} inString\r\n */\n\nvar useTitle = function useTitle(inString) {\n  currentTitle = inString;\n\n  if (_isNode.default) {\n    return;\n  }\n\n  _react.default.useEffect(function () {\n    var previousTitle = document.title;\n    document.title = inString;\n    return function () {\n      document.title = previousTitle;\n    };\n  });\n};\n/**\r\n * Returns the current window title to be used in a SSR context\r\n * @returns {string}\r\n */\n\n\nexports.useTitle = useTitle;\n\nvar getTitle = function getTitle() {\n  return currentTitle;\n};\n\nexports.getTitle = getTitle;\n\n//# sourceURL=webpack:///./node_modules/hookrouter/dist/title.js?");

/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*\nobject-assign\n(c) Sindre Sorhus\n@license MIT\n*/\n\n/* eslint-disable no-unused-vars */\n\nvar getOwnPropertySymbols = Object.getOwnPropertySymbols;\nvar hasOwnProperty = Object.prototype.hasOwnProperty;\nvar propIsEnumerable = Object.prototype.propertyIsEnumerable;\n\nfunction toObject(val) {\n  if (val === null || val === undefined) {\n    throw new TypeError('Object.assign cannot be called with null or undefined');\n  }\n\n  return Object(val);\n}\n\nfunction shouldUseNative() {\n  try {\n    if (!Object.assign) {\n      return false;\n    } // Detect buggy property enumeration order in older V8 versions.\n    // https://bugs.chromium.org/p/v8/issues/detail?id=4118\n\n\n    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers\n\n    test1[5] = 'de';\n\n    if (Object.getOwnPropertyNames(test1)[0] === '5') {\n      return false;\n    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056\n\n\n    var test2 = {};\n\n    for (var i = 0; i < 10; i++) {\n      test2['_' + String.fromCharCode(i)] = i;\n    }\n\n    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {\n      return test2[n];\n    });\n\n    if (order2.join('') !== '0123456789') {\n      return false;\n    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056\n\n\n    var test3 = {};\n    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {\n      test3[letter] = letter;\n    });\n\n    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {\n      return false;\n    }\n\n    return true;\n  } catch (err) {\n    // We don't expect any of the above to throw, but better to be safe.\n    return false;\n  }\n}\n\nmodule.exports = shouldUseNative() ? Object.assign : function (target, source) {\n  var from;\n  var to = toObject(target);\n  var symbols;\n\n  for (var s = 1; s < arguments.length; s++) {\n    from = Object(arguments[s]);\n\n    for (var key in from) {\n      if (hasOwnProperty.call(from, key)) {\n        to[key] = from[key];\n      }\n    }\n\n    if (getOwnPropertySymbols) {\n      symbols = getOwnPropertySymbols(from);\n\n      for (var i = 0; i < symbols.length; i++) {\n        if (propIsEnumerable.call(from, symbols[i])) {\n          to[symbols[i]] = from[symbols[i]];\n        }\n      }\n    }\n  }\n\n  return to;\n};\n\n//# sourceURL=webpack:///./node_modules/object-assign/index.js?");

/***/ }),

/***/ "./node_modules/prop-types/checkPropTypes.js":
/*!***************************************************!*\
  !*** ./node_modules/prop-types/checkPropTypes.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\nvar printWarning = function () {};\n\nif (true) {\n  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ \"./node_modules/prop-types/lib/ReactPropTypesSecret.js\");\n\n  var loggedTypeFailures = {};\n  var has = Function.call.bind(Object.prototype.hasOwnProperty);\n\n  printWarning = function (text) {\n    var message = 'Warning: ' + text;\n\n    if (typeof console !== 'undefined') {\n      console.error(message);\n    }\n\n    try {\n      // --- Welcome to debugging React ---\n      // This error was thrown as a convenience so that you can use this stack\n      // to find the callsite that caused this warning to fire.\n      throw new Error(message);\n    } catch (x) {}\n  };\n}\n/**\n * Assert that the values match with the type specs.\n * Error messages are memorized and will only be shown once.\n *\n * @param {object} typeSpecs Map of name to a ReactPropType\n * @param {object} values Runtime values that need to be type-checked\n * @param {string} location e.g. \"prop\", \"context\", \"child context\"\n * @param {string} componentName Name of the component for error messages.\n * @param {?Function} getStack Returns the component stack.\n * @private\n */\n\n\nfunction checkPropTypes(typeSpecs, values, location, componentName, getStack) {\n  if (true) {\n    for (var typeSpecName in typeSpecs) {\n      if (has(typeSpecs, typeSpecName)) {\n        var error; // Prop type validation may throw. In case they do, we don't want to\n        // fail the render phase where it didn't fail before. So we log it.\n        // After these have been cleaned up, we'll let them throw.\n\n        try {\n          // This is intentionally an invariant that gets caught. It's the same\n          // behavior as without this statement except with a better message.\n          if (typeof typeSpecs[typeSpecName] !== 'function') {\n            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.');\n            err.name = 'Invariant Violation';\n            throw err;\n          }\n\n          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);\n        } catch (ex) {\n          error = ex;\n        }\n\n        if (error && !(error instanceof Error)) {\n          printWarning((componentName || 'React class') + ': type specification of ' + location + ' `' + typeSpecName + '` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a ' + typeof error + '. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).');\n        }\n\n        if (error instanceof Error && !(error.message in loggedTypeFailures)) {\n          // Only monitor this failure once because there tends to be a lot of the\n          // same error.\n          loggedTypeFailures[error.message] = true;\n          var stack = getStack ? getStack() : '';\n          printWarning('Failed ' + location + ' type: ' + error.message + (stack != null ? stack : ''));\n        }\n      }\n    }\n  }\n}\n/**\n * Resets warning cache when testing.\n *\n * @private\n */\n\n\ncheckPropTypes.resetWarningCache = function () {\n  if (true) {\n    loggedTypeFailures = {};\n  }\n};\n\nmodule.exports = checkPropTypes;\n\n//# sourceURL=webpack:///./node_modules/prop-types/checkPropTypes.js?");

/***/ }),

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!*************************************************************!*\
  !*** ./node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\nvar ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';\nmodule.exports = ReactPropTypesSecret;\n\n//# sourceURL=webpack:///./node_modules/prop-types/lib/ReactPropTypesSecret.js?");

/***/ }),

/***/ "./node_modules/react/cjs/react.development.js":
/*!*****************************************************!*\
  !*** ./node_modules/react/cjs/react.development.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/** @license React v16.13.1\n * react.development.js\n *\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\nif (true) {\n  (function () {\n    'use strict';\n\n    var _assign = __webpack_require__(/*! object-assign */ \"./node_modules/object-assign/index.js\");\n\n    var checkPropTypes = __webpack_require__(/*! prop-types/checkPropTypes */ \"./node_modules/prop-types/checkPropTypes.js\");\n\n    var ReactVersion = '16.13.1'; // The Symbol used to tag the ReactElement-like types. If there is no native Symbol\n    // nor polyfill, then a plain number is used for performance.\n\n    var hasSymbol = typeof Symbol === 'function' && Symbol.for;\n    var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;\n    var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;\n    var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;\n    var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;\n    var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;\n    var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;\n    var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary\n\n    var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;\n    var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;\n    var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;\n    var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;\n    var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;\n    var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;\n    var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;\n    var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;\n    var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;\n    var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;\n    var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;\n    var FAUX_ITERATOR_SYMBOL = '@@iterator';\n\n    function getIteratorFn(maybeIterable) {\n      if (maybeIterable === null || typeof maybeIterable !== 'object') {\n        return null;\n      }\n\n      var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];\n\n      if (typeof maybeIterator === 'function') {\n        return maybeIterator;\n      }\n\n      return null;\n    }\n    /**\n     * Keeps track of the current dispatcher.\n     */\n\n\n    var ReactCurrentDispatcher = {\n      /**\n       * @internal\n       * @type {ReactComponent}\n       */\n      current: null\n    };\n    /**\n     * Keeps track of the current batch's configuration such as how long an update\n     * should suspend for if it needs to.\n     */\n\n    var ReactCurrentBatchConfig = {\n      suspense: null\n    };\n    /**\n     * Keeps track of the current owner.\n     *\n     * The current owner is the component who should own any components that are\n     * currently being constructed.\n     */\n\n    var ReactCurrentOwner = {\n      /**\n       * @internal\n       * @type {ReactComponent}\n       */\n      current: null\n    };\n    var BEFORE_SLASH_RE = /^(.*)[\\\\\\/]/;\n\n    function describeComponentFrame(name, source, ownerName) {\n      var sourceInfo = '';\n\n      if (source) {\n        var path = source.fileName;\n        var fileName = path.replace(BEFORE_SLASH_RE, '');\n        {\n          // In DEV, include code for a common special case:\n          // prefer \"folder/index.js\" instead of just \"index.js\".\n          if (/^index\\./.test(fileName)) {\n            var match = path.match(BEFORE_SLASH_RE);\n\n            if (match) {\n              var pathBeforeSlash = match[1];\n\n              if (pathBeforeSlash) {\n                var folderName = pathBeforeSlash.replace(BEFORE_SLASH_RE, '');\n                fileName = folderName + '/' + fileName;\n              }\n            }\n          }\n        }\n        sourceInfo = ' (at ' + fileName + ':' + source.lineNumber + ')';\n      } else if (ownerName) {\n        sourceInfo = ' (created by ' + ownerName + ')';\n      }\n\n      return '\\n    in ' + (name || 'Unknown') + sourceInfo;\n    }\n\n    var Resolved = 1;\n\n    function refineResolvedLazyComponent(lazyComponent) {\n      return lazyComponent._status === Resolved ? lazyComponent._result : null;\n    }\n\n    function getWrappedName(outerType, innerType, wrapperName) {\n      var functionName = innerType.displayName || innerType.name || '';\n      return outerType.displayName || (functionName !== '' ? wrapperName + \"(\" + functionName + \")\" : wrapperName);\n    }\n\n    function getComponentName(type) {\n      if (type == null) {\n        // Host root, text node or just invalid type.\n        return null;\n      }\n\n      {\n        if (typeof type.tag === 'number') {\n          error('Received an unexpected object in getComponentName(). ' + 'This is likely a bug in React. Please file an issue.');\n        }\n      }\n\n      if (typeof type === 'function') {\n        return type.displayName || type.name || null;\n      }\n\n      if (typeof type === 'string') {\n        return type;\n      }\n\n      switch (type) {\n        case REACT_FRAGMENT_TYPE:\n          return 'Fragment';\n\n        case REACT_PORTAL_TYPE:\n          return 'Portal';\n\n        case REACT_PROFILER_TYPE:\n          return \"Profiler\";\n\n        case REACT_STRICT_MODE_TYPE:\n          return 'StrictMode';\n\n        case REACT_SUSPENSE_TYPE:\n          return 'Suspense';\n\n        case REACT_SUSPENSE_LIST_TYPE:\n          return 'SuspenseList';\n      }\n\n      if (typeof type === 'object') {\n        switch (type.$$typeof) {\n          case REACT_CONTEXT_TYPE:\n            return 'Context.Consumer';\n\n          case REACT_PROVIDER_TYPE:\n            return 'Context.Provider';\n\n          case REACT_FORWARD_REF_TYPE:\n            return getWrappedName(type, type.render, 'ForwardRef');\n\n          case REACT_MEMO_TYPE:\n            return getComponentName(type.type);\n\n          case REACT_BLOCK_TYPE:\n            return getComponentName(type.render);\n\n          case REACT_LAZY_TYPE:\n            {\n              var thenable = type;\n              var resolvedThenable = refineResolvedLazyComponent(thenable);\n\n              if (resolvedThenable) {\n                return getComponentName(resolvedThenable);\n              }\n\n              break;\n            }\n        }\n      }\n\n      return null;\n    }\n\n    var ReactDebugCurrentFrame = {};\n    var currentlyValidatingElement = null;\n\n    function setCurrentlyValidatingElement(element) {\n      {\n        currentlyValidatingElement = element;\n      }\n    }\n\n    {\n      // Stack implementation injected by the current renderer.\n      ReactDebugCurrentFrame.getCurrentStack = null;\n\n      ReactDebugCurrentFrame.getStackAddendum = function () {\n        var stack = ''; // Add an extra top frame while an element is being validated\n\n        if (currentlyValidatingElement) {\n          var name = getComponentName(currentlyValidatingElement.type);\n          var owner = currentlyValidatingElement._owner;\n          stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner.type));\n        } // Delegate to the injected renderer-specific implementation\n\n\n        var impl = ReactDebugCurrentFrame.getCurrentStack;\n\n        if (impl) {\n          stack += impl() || '';\n        }\n\n        return stack;\n      };\n    }\n    /**\n     * Used by act() to track whether you're inside an act() scope.\n     */\n\n    var IsSomeRendererActing = {\n      current: false\n    };\n    var ReactSharedInternals = {\n      ReactCurrentDispatcher: ReactCurrentDispatcher,\n      ReactCurrentBatchConfig: ReactCurrentBatchConfig,\n      ReactCurrentOwner: ReactCurrentOwner,\n      IsSomeRendererActing: IsSomeRendererActing,\n      // Used by renderers to avoid bundling object-assign twice in UMD bundles:\n      assign: _assign\n    };\n    {\n      _assign(ReactSharedInternals, {\n        // These should not be included in production.\n        ReactDebugCurrentFrame: ReactDebugCurrentFrame,\n        // Shim for React DOM 16.0.0 which still destructured (but not used) this.\n        // TODO: remove in React 17.0.\n        ReactComponentTreeHook: {}\n      });\n    } // by calls to these methods by a Babel plugin.\n    //\n    // In PROD (or in packages without access to React internals),\n    // they are left as they are instead.\n\n    function warn(format) {\n      {\n        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n          args[_key - 1] = arguments[_key];\n        }\n\n        printWarning('warn', format, args);\n      }\n    }\n\n    function error(format) {\n      {\n        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {\n          args[_key2 - 1] = arguments[_key2];\n        }\n\n        printWarning('error', format, args);\n      }\n    }\n\n    function printWarning(level, format, args) {\n      // When changing this logic, you might want to also\n      // update consoleWithStackDev.www.js as well.\n      {\n        var hasExistingStack = args.length > 0 && typeof args[args.length - 1] === 'string' && args[args.length - 1].indexOf('\\n    in') === 0;\n\n        if (!hasExistingStack) {\n          var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;\n          var stack = ReactDebugCurrentFrame.getStackAddendum();\n\n          if (stack !== '') {\n            format += '%s';\n            args = args.concat([stack]);\n          }\n        }\n\n        var argsWithFormat = args.map(function (item) {\n          return '' + item;\n        }); // Careful: RN currently depends on this prefix\n\n        argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it\n        // breaks IE9: https://github.com/facebook/react/issues/13610\n        // eslint-disable-next-line react-internal/no-production-logging\n\n        Function.prototype.apply.call(console[level], console, argsWithFormat);\n\n        try {\n          // --- Welcome to debugging React ---\n          // This error was thrown as a convenience so that you can use this stack\n          // to find the callsite that caused this warning to fire.\n          var argIndex = 0;\n          var message = 'Warning: ' + format.replace(/%s/g, function () {\n            return args[argIndex++];\n          });\n          throw new Error(message);\n        } catch (x) {}\n      }\n    }\n\n    var didWarnStateUpdateForUnmountedComponent = {};\n\n    function warnNoop(publicInstance, callerName) {\n      {\n        var _constructor = publicInstance.constructor;\n        var componentName = _constructor && (_constructor.displayName || _constructor.name) || 'ReactClass';\n        var warningKey = componentName + \".\" + callerName;\n\n        if (didWarnStateUpdateForUnmountedComponent[warningKey]) {\n          return;\n        }\n\n        error(\"Can't call %s on a component that is not yet mounted. \" + 'This is a no-op, but it might indicate a bug in your application. ' + 'Instead, assign to `this.state` directly or define a `state = {};` ' + 'class property with the desired state in the %s component.', callerName, componentName);\n        didWarnStateUpdateForUnmountedComponent[warningKey] = true;\n      }\n    }\n    /**\n     * This is the abstract API for an update queue.\n     */\n\n\n    var ReactNoopUpdateQueue = {\n      /**\n       * Checks whether or not this composite component is mounted.\n       * @param {ReactClass} publicInstance The instance we want to test.\n       * @return {boolean} True if mounted, false otherwise.\n       * @protected\n       * @final\n       */\n      isMounted: function (publicInstance) {\n        return false;\n      },\n\n      /**\n       * Forces an update. This should only be invoked when it is known with\n       * certainty that we are **not** in a DOM transaction.\n       *\n       * You may want to call this when you know that some deeper aspect of the\n       * component's state has changed but `setState` was not called.\n       *\n       * This will not invoke `shouldComponentUpdate`, but it will invoke\n       * `componentWillUpdate` and `componentDidUpdate`.\n       *\n       * @param {ReactClass} publicInstance The instance that should rerender.\n       * @param {?function} callback Called after component is updated.\n       * @param {?string} callerName name of the calling function in the public API.\n       * @internal\n       */\n      enqueueForceUpdate: function (publicInstance, callback, callerName) {\n        warnNoop(publicInstance, 'forceUpdate');\n      },\n\n      /**\n       * Replaces all of the state. Always use this or `setState` to mutate state.\n       * You should treat `this.state` as immutable.\n       *\n       * There is no guarantee that `this.state` will be immediately updated, so\n       * accessing `this.state` after calling this method may return the old value.\n       *\n       * @param {ReactClass} publicInstance The instance that should rerender.\n       * @param {object} completeState Next state.\n       * @param {?function} callback Called after component is updated.\n       * @param {?string} callerName name of the calling function in the public API.\n       * @internal\n       */\n      enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {\n        warnNoop(publicInstance, 'replaceState');\n      },\n\n      /**\n       * Sets a subset of the state. This only exists because _pendingState is\n       * internal. This provides a merging strategy that is not available to deep\n       * properties which is confusing. TODO: Expose pendingState or don't use it\n       * during the merge.\n       *\n       * @param {ReactClass} publicInstance The instance that should rerender.\n       * @param {object} partialState Next partial state to be merged with state.\n       * @param {?function} callback Called after component is updated.\n       * @param {?string} Name of the calling function in the public API.\n       * @internal\n       */\n      enqueueSetState: function (publicInstance, partialState, callback, callerName) {\n        warnNoop(publicInstance, 'setState');\n      }\n    };\n    var emptyObject = {};\n    {\n      Object.freeze(emptyObject);\n    }\n    /**\n     * Base class helpers for the updating state of a component.\n     */\n\n    function Component(props, context, updater) {\n      this.props = props;\n      this.context = context; // If a component has string refs, we will assign a different object later.\n\n      this.refs = emptyObject; // We initialize the default updater but the real one gets injected by the\n      // renderer.\n\n      this.updater = updater || ReactNoopUpdateQueue;\n    }\n\n    Component.prototype.isReactComponent = {};\n    /**\n     * Sets a subset of the state. Always use this to mutate\n     * state. You should treat `this.state` as immutable.\n     *\n     * There is no guarantee that `this.state` will be immediately updated, so\n     * accessing `this.state` after calling this method may return the old value.\n     *\n     * There is no guarantee that calls to `setState` will run synchronously,\n     * as they may eventually be batched together.  You can provide an optional\n     * callback that will be executed when the call to setState is actually\n     * completed.\n     *\n     * When a function is provided to setState, it will be called at some point in\n     * the future (not synchronously). It will be called with the up to date\n     * component arguments (state, props, context). These values can be different\n     * from this.* because your function may be called after receiveProps but before\n     * shouldComponentUpdate, and this new state, props, and context will not yet be\n     * assigned to this.\n     *\n     * @param {object|function} partialState Next partial state or function to\n     *        produce next partial state to be merged with current state.\n     * @param {?function} callback Called after state is updated.\n     * @final\n     * @protected\n     */\n\n    Component.prototype.setState = function (partialState, callback) {\n      if (!(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null)) {\n        {\n          throw Error(\"setState(...): takes an object of state variables to update or a function which returns an object of state variables.\");\n        }\n      }\n\n      this.updater.enqueueSetState(this, partialState, callback, 'setState');\n    };\n    /**\n     * Forces an update. This should only be invoked when it is known with\n     * certainty that we are **not** in a DOM transaction.\n     *\n     * You may want to call this when you know that some deeper aspect of the\n     * component's state has changed but `setState` was not called.\n     *\n     * This will not invoke `shouldComponentUpdate`, but it will invoke\n     * `componentWillUpdate` and `componentDidUpdate`.\n     *\n     * @param {?function} callback Called after update is complete.\n     * @final\n     * @protected\n     */\n\n\n    Component.prototype.forceUpdate = function (callback) {\n      this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');\n    };\n    /**\n     * Deprecated APIs. These APIs used to exist on classic React classes but since\n     * we would like to deprecate them, we're not going to move them over to this\n     * modern base class. Instead, we define a getter that warns if it's accessed.\n     */\n\n\n    {\n      var deprecatedAPIs = {\n        isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],\n        replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']\n      };\n\n      var defineDeprecationWarning = function (methodName, info) {\n        Object.defineProperty(Component.prototype, methodName, {\n          get: function () {\n            warn('%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);\n            return undefined;\n          }\n        });\n      };\n\n      for (var fnName in deprecatedAPIs) {\n        if (deprecatedAPIs.hasOwnProperty(fnName)) {\n          defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);\n        }\n      }\n    }\n\n    function ComponentDummy() {}\n\n    ComponentDummy.prototype = Component.prototype;\n    /**\n     * Convenience component with default shallow equality check for sCU.\n     */\n\n    function PureComponent(props, context, updater) {\n      this.props = props;\n      this.context = context; // If a component has string refs, we will assign a different object later.\n\n      this.refs = emptyObject;\n      this.updater = updater || ReactNoopUpdateQueue;\n    }\n\n    var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();\n    pureComponentPrototype.constructor = PureComponent; // Avoid an extra prototype jump for these methods.\n\n    _assign(pureComponentPrototype, Component.prototype);\n\n    pureComponentPrototype.isPureReactComponent = true; // an immutable object with a single mutable value\n\n    function createRef() {\n      var refObject = {\n        current: null\n      };\n      {\n        Object.seal(refObject);\n      }\n      return refObject;\n    }\n\n    var hasOwnProperty = Object.prototype.hasOwnProperty;\n    var RESERVED_PROPS = {\n      key: true,\n      ref: true,\n      __self: true,\n      __source: true\n    };\n    var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;\n    {\n      didWarnAboutStringRefs = {};\n    }\n\n    function hasValidRef(config) {\n      {\n        if (hasOwnProperty.call(config, 'ref')) {\n          var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;\n\n          if (getter && getter.isReactWarning) {\n            return false;\n          }\n        }\n      }\n      return config.ref !== undefined;\n    }\n\n    function hasValidKey(config) {\n      {\n        if (hasOwnProperty.call(config, 'key')) {\n          var getter = Object.getOwnPropertyDescriptor(config, 'key').get;\n\n          if (getter && getter.isReactWarning) {\n            return false;\n          }\n        }\n      }\n      return config.key !== undefined;\n    }\n\n    function defineKeyPropWarningGetter(props, displayName) {\n      var warnAboutAccessingKey = function () {\n        {\n          if (!specialPropKeyWarningShown) {\n            specialPropKeyWarningShown = true;\n            error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);\n          }\n        }\n      };\n\n      warnAboutAccessingKey.isReactWarning = true;\n      Object.defineProperty(props, 'key', {\n        get: warnAboutAccessingKey,\n        configurable: true\n      });\n    }\n\n    function defineRefPropWarningGetter(props, displayName) {\n      var warnAboutAccessingRef = function () {\n        {\n          if (!specialPropRefWarningShown) {\n            specialPropRefWarningShown = true;\n            error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);\n          }\n        }\n      };\n\n      warnAboutAccessingRef.isReactWarning = true;\n      Object.defineProperty(props, 'ref', {\n        get: warnAboutAccessingRef,\n        configurable: true\n      });\n    }\n\n    function warnIfStringRefCannotBeAutoConverted(config) {\n      {\n        if (typeof config.ref === 'string' && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {\n          var componentName = getComponentName(ReactCurrentOwner.current.type);\n\n          if (!didWarnAboutStringRefs[componentName]) {\n            error('Component \"%s\" contains the string ref \"%s\". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://fb.me/react-strict-mode-string-ref', getComponentName(ReactCurrentOwner.current.type), config.ref);\n            didWarnAboutStringRefs[componentName] = true;\n          }\n        }\n      }\n    }\n    /**\n     * Factory method to create a new React element. This no longer adheres to\n     * the class pattern, so do not use new to call it. Also, instanceof check\n     * will not work. Instead test $$typeof field against Symbol.for('react.element') to check\n     * if something is a React Element.\n     *\n     * @param {*} type\n     * @param {*} props\n     * @param {*} key\n     * @param {string|object} ref\n     * @param {*} owner\n     * @param {*} self A *temporary* helper to detect places where `this` is\n     * different from the `owner` when React.createElement is called, so that we\n     * can warn. We want to get rid of owner and replace string `ref`s with arrow\n     * functions, and as long as `this` and owner are the same, there will be no\n     * change in behavior.\n     * @param {*} source An annotation object (added by a transpiler or otherwise)\n     * indicating filename, line number, and/or other information.\n     * @internal\n     */\n\n\n    var ReactElement = function (type, key, ref, self, source, owner, props) {\n      var element = {\n        // This tag allows us to uniquely identify this as a React Element\n        $$typeof: REACT_ELEMENT_TYPE,\n        // Built-in properties that belong on the element\n        type: type,\n        key: key,\n        ref: ref,\n        props: props,\n        // Record the component responsible for creating this element.\n        _owner: owner\n      };\n      {\n        // The validation flag is currently mutative. We put it on\n        // an external backing store so that we can freeze the whole object.\n        // This can be replaced with a WeakMap once they are implemented in\n        // commonly used development environments.\n        element._store = {}; // To make comparing ReactElements easier for testing purposes, we make\n        // the validation flag non-enumerable (where possible, which should\n        // include every environment we run tests in), so the test framework\n        // ignores it.\n\n        Object.defineProperty(element._store, 'validated', {\n          configurable: false,\n          enumerable: false,\n          writable: true,\n          value: false\n        }); // self and source are DEV only properties.\n\n        Object.defineProperty(element, '_self', {\n          configurable: false,\n          enumerable: false,\n          writable: false,\n          value: self\n        }); // Two elements created in two different places should be considered\n        // equal for testing purposes and therefore we hide it from enumeration.\n\n        Object.defineProperty(element, '_source', {\n          configurable: false,\n          enumerable: false,\n          writable: false,\n          value: source\n        });\n\n        if (Object.freeze) {\n          Object.freeze(element.props);\n          Object.freeze(element);\n        }\n      }\n      return element;\n    };\n    /**\n     * Create and return a new ReactElement of the given type.\n     * See https://reactjs.org/docs/react-api.html#createelement\n     */\n\n\n    function createElement(type, config, children) {\n      var propName; // Reserved names are extracted\n\n      var props = {};\n      var key = null;\n      var ref = null;\n      var self = null;\n      var source = null;\n\n      if (config != null) {\n        if (hasValidRef(config)) {\n          ref = config.ref;\n          {\n            warnIfStringRefCannotBeAutoConverted(config);\n          }\n        }\n\n        if (hasValidKey(config)) {\n          key = '' + config.key;\n        }\n\n        self = config.__self === undefined ? null : config.__self;\n        source = config.__source === undefined ? null : config.__source; // Remaining properties are added to a new props object\n\n        for (propName in config) {\n          if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {\n            props[propName] = config[propName];\n          }\n        }\n      } // Children can be more than one argument, and those are transferred onto\n      // the newly allocated props object.\n\n\n      var childrenLength = arguments.length - 2;\n\n      if (childrenLength === 1) {\n        props.children = children;\n      } else if (childrenLength > 1) {\n        var childArray = Array(childrenLength);\n\n        for (var i = 0; i < childrenLength; i++) {\n          childArray[i] = arguments[i + 2];\n        }\n\n        {\n          if (Object.freeze) {\n            Object.freeze(childArray);\n          }\n        }\n        props.children = childArray;\n      } // Resolve default props\n\n\n      if (type && type.defaultProps) {\n        var defaultProps = type.defaultProps;\n\n        for (propName in defaultProps) {\n          if (props[propName] === undefined) {\n            props[propName] = defaultProps[propName];\n          }\n        }\n      }\n\n      {\n        if (key || ref) {\n          var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;\n\n          if (key) {\n            defineKeyPropWarningGetter(props, displayName);\n          }\n\n          if (ref) {\n            defineRefPropWarningGetter(props, displayName);\n          }\n        }\n      }\n      return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);\n    }\n\n    function cloneAndReplaceKey(oldElement, newKey) {\n      var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);\n      return newElement;\n    }\n    /**\n     * Clone and return a new ReactElement using element as the starting point.\n     * See https://reactjs.org/docs/react-api.html#cloneelement\n     */\n\n\n    function cloneElement(element, config, children) {\n      if (!!(element === null || element === undefined)) {\n        {\n          throw Error(\"React.cloneElement(...): The argument must be a React element, but you passed \" + element + \".\");\n        }\n      }\n\n      var propName; // Original props are copied\n\n      var props = _assign({}, element.props); // Reserved names are extracted\n\n\n      var key = element.key;\n      var ref = element.ref; // Self is preserved since the owner is preserved.\n\n      var self = element._self; // Source is preserved since cloneElement is unlikely to be targeted by a\n      // transpiler, and the original source is probably a better indicator of the\n      // true owner.\n\n      var source = element._source; // Owner will be preserved, unless ref is overridden\n\n      var owner = element._owner;\n\n      if (config != null) {\n        if (hasValidRef(config)) {\n          // Silently steal the ref from the parent.\n          ref = config.ref;\n          owner = ReactCurrentOwner.current;\n        }\n\n        if (hasValidKey(config)) {\n          key = '' + config.key;\n        } // Remaining properties override existing props\n\n\n        var defaultProps;\n\n        if (element.type && element.type.defaultProps) {\n          defaultProps = element.type.defaultProps;\n        }\n\n        for (propName in config) {\n          if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {\n            if (config[propName] === undefined && defaultProps !== undefined) {\n              // Resolve default props\n              props[propName] = defaultProps[propName];\n            } else {\n              props[propName] = config[propName];\n            }\n          }\n        }\n      } // Children can be more than one argument, and those are transferred onto\n      // the newly allocated props object.\n\n\n      var childrenLength = arguments.length - 2;\n\n      if (childrenLength === 1) {\n        props.children = children;\n      } else if (childrenLength > 1) {\n        var childArray = Array(childrenLength);\n\n        for (var i = 0; i < childrenLength; i++) {\n          childArray[i] = arguments[i + 2];\n        }\n\n        props.children = childArray;\n      }\n\n      return ReactElement(element.type, key, ref, self, source, owner, props);\n    }\n    /**\n     * Verifies the object is a ReactElement.\n     * See https://reactjs.org/docs/react-api.html#isvalidelement\n     * @param {?object} object\n     * @return {boolean} True if `object` is a ReactElement.\n     * @final\n     */\n\n\n    function isValidElement(object) {\n      return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;\n    }\n\n    var SEPARATOR = '.';\n    var SUBSEPARATOR = ':';\n    /**\n     * Escape and wrap key so it is safe to use as a reactid\n     *\n     * @param {string} key to be escaped.\n     * @return {string} the escaped key.\n     */\n\n    function escape(key) {\n      var escapeRegex = /[=:]/g;\n      var escaperLookup = {\n        '=': '=0',\n        ':': '=2'\n      };\n      var escapedString = ('' + key).replace(escapeRegex, function (match) {\n        return escaperLookup[match];\n      });\n      return '$' + escapedString;\n    }\n    /**\n     * TODO: Test that a single child and an array with one item have the same key\n     * pattern.\n     */\n\n\n    var didWarnAboutMaps = false;\n    var userProvidedKeyEscapeRegex = /\\/+/g;\n\n    function escapeUserProvidedKey(text) {\n      return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');\n    }\n\n    var POOL_SIZE = 10;\n    var traverseContextPool = [];\n\n    function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {\n      if (traverseContextPool.length) {\n        var traverseContext = traverseContextPool.pop();\n        traverseContext.result = mapResult;\n        traverseContext.keyPrefix = keyPrefix;\n        traverseContext.func = mapFunction;\n        traverseContext.context = mapContext;\n        traverseContext.count = 0;\n        return traverseContext;\n      } else {\n        return {\n          result: mapResult,\n          keyPrefix: keyPrefix,\n          func: mapFunction,\n          context: mapContext,\n          count: 0\n        };\n      }\n    }\n\n    function releaseTraverseContext(traverseContext) {\n      traverseContext.result = null;\n      traverseContext.keyPrefix = null;\n      traverseContext.func = null;\n      traverseContext.context = null;\n      traverseContext.count = 0;\n\n      if (traverseContextPool.length < POOL_SIZE) {\n        traverseContextPool.push(traverseContext);\n      }\n    }\n    /**\n     * @param {?*} children Children tree container.\n     * @param {!string} nameSoFar Name of the key path so far.\n     * @param {!function} callback Callback to invoke with each child found.\n     * @param {?*} traverseContext Used to pass information throughout the traversal\n     * process.\n     * @return {!number} The number of children in this subtree.\n     */\n\n\n    function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {\n      var type = typeof children;\n\n      if (type === 'undefined' || type === 'boolean') {\n        // All of the above are perceived as null.\n        children = null;\n      }\n\n      var invokeCallback = false;\n\n      if (children === null) {\n        invokeCallback = true;\n      } else {\n        switch (type) {\n          case 'string':\n          case 'number':\n            invokeCallback = true;\n            break;\n\n          case 'object':\n            switch (children.$$typeof) {\n              case REACT_ELEMENT_TYPE:\n              case REACT_PORTAL_TYPE:\n                invokeCallback = true;\n            }\n\n        }\n      }\n\n      if (invokeCallback) {\n        callback(traverseContext, children, // If it's the only child, treat the name as if it was wrapped in an array\n        // so that it's consistent if the number of children grows.\n        nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);\n        return 1;\n      }\n\n      var child;\n      var nextName;\n      var subtreeCount = 0; // Count of children found in the current subtree.\n\n      var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;\n\n      if (Array.isArray(children)) {\n        for (var i = 0; i < children.length; i++) {\n          child = children[i];\n          nextName = nextNamePrefix + getComponentKey(child, i);\n          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);\n        }\n      } else {\n        var iteratorFn = getIteratorFn(children);\n\n        if (typeof iteratorFn === 'function') {\n          {\n            // Warn about using Maps as children\n            if (iteratorFn === children.entries) {\n              if (!didWarnAboutMaps) {\n                warn('Using Maps as children is deprecated and will be removed in ' + 'a future major release. Consider converting children to ' + 'an array of keyed ReactElements instead.');\n              }\n\n              didWarnAboutMaps = true;\n            }\n          }\n          var iterator = iteratorFn.call(children);\n          var step;\n          var ii = 0;\n\n          while (!(step = iterator.next()).done) {\n            child = step.value;\n            nextName = nextNamePrefix + getComponentKey(child, ii++);\n            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);\n          }\n        } else if (type === 'object') {\n          var addendum = '';\n          {\n            addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();\n          }\n          var childrenString = '' + children;\n          {\n            {\n              throw Error(\"Objects are not valid as a React child (found: \" + (childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString) + \").\" + addendum);\n            }\n          }\n        }\n      }\n\n      return subtreeCount;\n    }\n    /**\n     * Traverses children that are typically specified as `props.children`, but\n     * might also be specified through attributes:\n     *\n     * - `traverseAllChildren(this.props.children, ...)`\n     * - `traverseAllChildren(this.props.leftPanelChildren, ...)`\n     *\n     * The `traverseContext` is an optional argument that is passed through the\n     * entire traversal. It can be used to store accumulations or anything else that\n     * the callback might find relevant.\n     *\n     * @param {?*} children Children tree object.\n     * @param {!function} callback To invoke upon traversing each child.\n     * @param {?*} traverseContext Context for traversal.\n     * @return {!number} The number of children in this subtree.\n     */\n\n\n    function traverseAllChildren(children, callback, traverseContext) {\n      if (children == null) {\n        return 0;\n      }\n\n      return traverseAllChildrenImpl(children, '', callback, traverseContext);\n    }\n    /**\n     * Generate a key string that identifies a component within a set.\n     *\n     * @param {*} component A component that could contain a manual key.\n     * @param {number} index Index that is used if a manual key is not provided.\n     * @return {string}\n     */\n\n\n    function getComponentKey(component, index) {\n      // Do some typechecking here since we call this blindly. We want to ensure\n      // that we don't block potential future ES APIs.\n      if (typeof component === 'object' && component !== null && component.key != null) {\n        // Explicit key\n        return escape(component.key);\n      } // Implicit key determined by the index in the set\n\n\n      return index.toString(36);\n    }\n\n    function forEachSingleChild(bookKeeping, child, name) {\n      var func = bookKeeping.func,\n          context = bookKeeping.context;\n      func.call(context, child, bookKeeping.count++);\n    }\n    /**\n     * Iterates through children that are typically specified as `props.children`.\n     *\n     * See https://reactjs.org/docs/react-api.html#reactchildrenforeach\n     *\n     * The provided forEachFunc(child, index) will be called for each\n     * leaf child.\n     *\n     * @param {?*} children Children tree container.\n     * @param {function(*, int)} forEachFunc\n     * @param {*} forEachContext Context for forEachContext.\n     */\n\n\n    function forEachChildren(children, forEachFunc, forEachContext) {\n      if (children == null) {\n        return children;\n      }\n\n      var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);\n      traverseAllChildren(children, forEachSingleChild, traverseContext);\n      releaseTraverseContext(traverseContext);\n    }\n\n    function mapSingleChildIntoContext(bookKeeping, child, childKey) {\n      var result = bookKeeping.result,\n          keyPrefix = bookKeeping.keyPrefix,\n          func = bookKeeping.func,\n          context = bookKeeping.context;\n      var mappedChild = func.call(context, child, bookKeeping.count++);\n\n      if (Array.isArray(mappedChild)) {\n        mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, function (c) {\n          return c;\n        });\n      } else if (mappedChild != null) {\n        if (isValidElement(mappedChild)) {\n          mappedChild = cloneAndReplaceKey(mappedChild, // Keep both the (mapped) and old keys if they differ, just as\n          // traverseAllChildren used to do for objects as children\n          keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);\n        }\n\n        result.push(mappedChild);\n      }\n    }\n\n    function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {\n      var escapedPrefix = '';\n\n      if (prefix != null) {\n        escapedPrefix = escapeUserProvidedKey(prefix) + '/';\n      }\n\n      var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);\n      traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);\n      releaseTraverseContext(traverseContext);\n    }\n    /**\n     * Maps children that are typically specified as `props.children`.\n     *\n     * See https://reactjs.org/docs/react-api.html#reactchildrenmap\n     *\n     * The provided mapFunction(child, key, index) will be called for each\n     * leaf child.\n     *\n     * @param {?*} children Children tree container.\n     * @param {function(*, int)} func The map function.\n     * @param {*} context Context for mapFunction.\n     * @return {object} Object containing the ordered map of results.\n     */\n\n\n    function mapChildren(children, func, context) {\n      if (children == null) {\n        return children;\n      }\n\n      var result = [];\n      mapIntoWithKeyPrefixInternal(children, result, null, func, context);\n      return result;\n    }\n    /**\n     * Count the number of children that are typically specified as\n     * `props.children`.\n     *\n     * See https://reactjs.org/docs/react-api.html#reactchildrencount\n     *\n     * @param {?*} children Children tree container.\n     * @return {number} The number of children.\n     */\n\n\n    function countChildren(children) {\n      return traverseAllChildren(children, function () {\n        return null;\n      }, null);\n    }\n    /**\n     * Flatten a children object (typically specified as `props.children`) and\n     * return an array with appropriately re-keyed children.\n     *\n     * See https://reactjs.org/docs/react-api.html#reactchildrentoarray\n     */\n\n\n    function toArray(children) {\n      var result = [];\n      mapIntoWithKeyPrefixInternal(children, result, null, function (child) {\n        return child;\n      });\n      return result;\n    }\n    /**\n     * Returns the first child in a collection of children and verifies that there\n     * is only one child in the collection.\n     *\n     * See https://reactjs.org/docs/react-api.html#reactchildrenonly\n     *\n     * The current implementation of this function assumes that a single child gets\n     * passed without a wrapper, but the purpose of this helper function is to\n     * abstract away the particular structure of children.\n     *\n     * @param {?object} children Child collection structure.\n     * @return {ReactElement} The first and only `ReactElement` contained in the\n     * structure.\n     */\n\n\n    function onlyChild(children) {\n      if (!isValidElement(children)) {\n        {\n          throw Error(\"React.Children.only expected to receive a single React element child.\");\n        }\n      }\n\n      return children;\n    }\n\n    function createContext(defaultValue, calculateChangedBits) {\n      if (calculateChangedBits === undefined) {\n        calculateChangedBits = null;\n      } else {\n        {\n          if (calculateChangedBits !== null && typeof calculateChangedBits !== 'function') {\n            error('createContext: Expected the optional second argument to be a ' + 'function. Instead received: %s', calculateChangedBits);\n          }\n        }\n      }\n\n      var context = {\n        $$typeof: REACT_CONTEXT_TYPE,\n        _calculateChangedBits: calculateChangedBits,\n        // As a workaround to support multiple concurrent renderers, we categorize\n        // some renderers as primary and others as secondary. We only expect\n        // there to be two concurrent renderers at most: React Native (primary) and\n        // Fabric (secondary); React DOM (primary) and React ART (secondary).\n        // Secondary renderers store their context values on separate fields.\n        _currentValue: defaultValue,\n        _currentValue2: defaultValue,\n        // Used to track how many concurrent renderers this context currently\n        // supports within in a single renderer. Such as parallel server rendering.\n        _threadCount: 0,\n        // These are circular\n        Provider: null,\n        Consumer: null\n      };\n      context.Provider = {\n        $$typeof: REACT_PROVIDER_TYPE,\n        _context: context\n      };\n      var hasWarnedAboutUsingNestedContextConsumers = false;\n      var hasWarnedAboutUsingConsumerProvider = false;\n      {\n        // A separate object, but proxies back to the original context object for\n        // backwards compatibility. It has a different $$typeof, so we can properly\n        // warn for the incorrect usage of Context as a Consumer.\n        var Consumer = {\n          $$typeof: REACT_CONTEXT_TYPE,\n          _context: context,\n          _calculateChangedBits: context._calculateChangedBits\n        }; // $FlowFixMe: Flow complains about not setting a value, which is intentional here\n\n        Object.defineProperties(Consumer, {\n          Provider: {\n            get: function () {\n              if (!hasWarnedAboutUsingConsumerProvider) {\n                hasWarnedAboutUsingConsumerProvider = true;\n                error('Rendering <Context.Consumer.Provider> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Provider> instead?');\n              }\n\n              return context.Provider;\n            },\n            set: function (_Provider) {\n              context.Provider = _Provider;\n            }\n          },\n          _currentValue: {\n            get: function () {\n              return context._currentValue;\n            },\n            set: function (_currentValue) {\n              context._currentValue = _currentValue;\n            }\n          },\n          _currentValue2: {\n            get: function () {\n              return context._currentValue2;\n            },\n            set: function (_currentValue2) {\n              context._currentValue2 = _currentValue2;\n            }\n          },\n          _threadCount: {\n            get: function () {\n              return context._threadCount;\n            },\n            set: function (_threadCount) {\n              context._threadCount = _threadCount;\n            }\n          },\n          Consumer: {\n            get: function () {\n              if (!hasWarnedAboutUsingNestedContextConsumers) {\n                hasWarnedAboutUsingNestedContextConsumers = true;\n                error('Rendering <Context.Consumer.Consumer> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Consumer> instead?');\n              }\n\n              return context.Consumer;\n            }\n          }\n        }); // $FlowFixMe: Flow complains about missing properties because it doesn't understand defineProperty\n\n        context.Consumer = Consumer;\n      }\n      {\n        context._currentRenderer = null;\n        context._currentRenderer2 = null;\n      }\n      return context;\n    }\n\n    function lazy(ctor) {\n      var lazyType = {\n        $$typeof: REACT_LAZY_TYPE,\n        _ctor: ctor,\n        // React uses these fields to store the result.\n        _status: -1,\n        _result: null\n      };\n      {\n        // In production, this would just set it on the object.\n        var defaultProps;\n        var propTypes;\n        Object.defineProperties(lazyType, {\n          defaultProps: {\n            configurable: true,\n            get: function () {\n              return defaultProps;\n            },\n            set: function (newDefaultProps) {\n              error('React.lazy(...): It is not supported to assign `defaultProps` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');\n              defaultProps = newDefaultProps; // Match production behavior more closely:\n\n              Object.defineProperty(lazyType, 'defaultProps', {\n                enumerable: true\n              });\n            }\n          },\n          propTypes: {\n            configurable: true,\n            get: function () {\n              return propTypes;\n            },\n            set: function (newPropTypes) {\n              error('React.lazy(...): It is not supported to assign `propTypes` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');\n              propTypes = newPropTypes; // Match production behavior more closely:\n\n              Object.defineProperty(lazyType, 'propTypes', {\n                enumerable: true\n              });\n            }\n          }\n        });\n      }\n      return lazyType;\n    }\n\n    function forwardRef(render) {\n      {\n        if (render != null && render.$$typeof === REACT_MEMO_TYPE) {\n          error('forwardRef requires a render function but received a `memo` ' + 'component. Instead of forwardRef(memo(...)), use ' + 'memo(forwardRef(...)).');\n        } else if (typeof render !== 'function') {\n          error('forwardRef requires a render function but was given %s.', render === null ? 'null' : typeof render);\n        } else {\n          if (render.length !== 0 && render.length !== 2) {\n            error('forwardRef render functions accept exactly two parameters: props and ref. %s', render.length === 1 ? 'Did you forget to use the ref parameter?' : 'Any additional parameter will be undefined.');\n          }\n        }\n\n        if (render != null) {\n          if (render.defaultProps != null || render.propTypes != null) {\n            error('forwardRef render functions do not support propTypes or defaultProps. ' + 'Did you accidentally pass a React component?');\n          }\n        }\n      }\n      return {\n        $$typeof: REACT_FORWARD_REF_TYPE,\n        render: render\n      };\n    }\n\n    function isValidElementType(type) {\n      return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.\n      type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);\n    }\n\n    function memo(type, compare) {\n      {\n        if (!isValidElementType(type)) {\n          error('memo: The first argument must be a component. Instead ' + 'received: %s', type === null ? 'null' : typeof type);\n        }\n      }\n      return {\n        $$typeof: REACT_MEMO_TYPE,\n        type: type,\n        compare: compare === undefined ? null : compare\n      };\n    }\n\n    function resolveDispatcher() {\n      var dispatcher = ReactCurrentDispatcher.current;\n\n      if (!(dispatcher !== null)) {\n        {\n          throw Error(\"Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\\n1. You might have mismatching versions of React and the renderer (such as React DOM)\\n2. You might be breaking the Rules of Hooks\\n3. You might have more than one copy of React in the same app\\nSee https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem.\");\n        }\n      }\n\n      return dispatcher;\n    }\n\n    function useContext(Context, unstable_observedBits) {\n      var dispatcher = resolveDispatcher();\n      {\n        if (unstable_observedBits !== undefined) {\n          error('useContext() second argument is reserved for future ' + 'use in React. Passing it is not supported. ' + 'You passed: %s.%s', unstable_observedBits, typeof unstable_observedBits === 'number' && Array.isArray(arguments[2]) ? '\\n\\nDid you call array.map(useContext)? ' + 'Calling Hooks inside a loop is not supported. ' + 'Learn more at https://fb.me/rules-of-hooks' : '');\n        } // TODO: add a more generic warning for invalid values.\n\n\n        if (Context._context !== undefined) {\n          var realContext = Context._context; // Don't deduplicate because this legitimately causes bugs\n          // and nobody should be using this in existing code.\n\n          if (realContext.Consumer === Context) {\n            error('Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be ' + 'removed in a future major release. Did you mean to call useContext(Context) instead?');\n          } else if (realContext.Provider === Context) {\n            error('Calling useContext(Context.Provider) is not supported. ' + 'Did you mean to call useContext(Context) instead?');\n          }\n        }\n      }\n      return dispatcher.useContext(Context, unstable_observedBits);\n    }\n\n    function useState(initialState) {\n      var dispatcher = resolveDispatcher();\n      return dispatcher.useState(initialState);\n    }\n\n    function useReducer(reducer, initialArg, init) {\n      var dispatcher = resolveDispatcher();\n      return dispatcher.useReducer(reducer, initialArg, init);\n    }\n\n    function useRef(initialValue) {\n      var dispatcher = resolveDispatcher();\n      return dispatcher.useRef(initialValue);\n    }\n\n    function useEffect(create, deps) {\n      var dispatcher = resolveDispatcher();\n      return dispatcher.useEffect(create, deps);\n    }\n\n    function useLayoutEffect(create, deps) {\n      var dispatcher = resolveDispatcher();\n      return dispatcher.useLayoutEffect(create, deps);\n    }\n\n    function useCallback(callback, deps) {\n      var dispatcher = resolveDispatcher();\n      return dispatcher.useCallback(callback, deps);\n    }\n\n    function useMemo(create, deps) {\n      var dispatcher = resolveDispatcher();\n      return dispatcher.useMemo(create, deps);\n    }\n\n    function useImperativeHandle(ref, create, deps) {\n      var dispatcher = resolveDispatcher();\n      return dispatcher.useImperativeHandle(ref, create, deps);\n    }\n\n    function useDebugValue(value, formatterFn) {\n      {\n        var dispatcher = resolveDispatcher();\n        return dispatcher.useDebugValue(value, formatterFn);\n      }\n    }\n\n    var propTypesMisspellWarningShown;\n    {\n      propTypesMisspellWarningShown = false;\n    }\n\n    function getDeclarationErrorAddendum() {\n      if (ReactCurrentOwner.current) {\n        var name = getComponentName(ReactCurrentOwner.current.type);\n\n        if (name) {\n          return '\\n\\nCheck the render method of `' + name + '`.';\n        }\n      }\n\n      return '';\n    }\n\n    function getSourceInfoErrorAddendum(source) {\n      if (source !== undefined) {\n        var fileName = source.fileName.replace(/^.*[\\\\\\/]/, '');\n        var lineNumber = source.lineNumber;\n        return '\\n\\nCheck your code at ' + fileName + ':' + lineNumber + '.';\n      }\n\n      return '';\n    }\n\n    function getSourceInfoErrorAddendumForProps(elementProps) {\n      if (elementProps !== null && elementProps !== undefined) {\n        return getSourceInfoErrorAddendum(elementProps.__source);\n      }\n\n      return '';\n    }\n    /**\n     * Warn if there's no key explicitly set on dynamic arrays of children or\n     * object keys are not valid. This allows us to keep track of children between\n     * updates.\n     */\n\n\n    var ownerHasKeyUseWarning = {};\n\n    function getCurrentComponentErrorInfo(parentType) {\n      var info = getDeclarationErrorAddendum();\n\n      if (!info) {\n        var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;\n\n        if (parentName) {\n          info = \"\\n\\nCheck the top-level render call using <\" + parentName + \">.\";\n        }\n      }\n\n      return info;\n    }\n    /**\n     * Warn if the element doesn't have an explicit key assigned to it.\n     * This element is in an array. The array could grow and shrink or be\n     * reordered. All children that haven't already been validated are required to\n     * have a \"key\" property assigned to it. Error statuses are cached so a warning\n     * will only be shown once.\n     *\n     * @internal\n     * @param {ReactElement} element Element that requires a key.\n     * @param {*} parentType element's parent's type.\n     */\n\n\n    function validateExplicitKey(element, parentType) {\n      if (!element._store || element._store.validated || element.key != null) {\n        return;\n      }\n\n      element._store.validated = true;\n      var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);\n\n      if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {\n        return;\n      }\n\n      ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a\n      // property, it may be the creator of the child that's responsible for\n      // assigning it a key.\n\n      var childOwner = '';\n\n      if (element && element._owner && element._owner !== ReactCurrentOwner.current) {\n        // Give the component that originally created this child.\n        childOwner = \" It was passed a child from \" + getComponentName(element._owner.type) + \".\";\n      }\n\n      setCurrentlyValidatingElement(element);\n      {\n        error('Each child in a list should have a unique \"key\" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.', currentComponentErrorInfo, childOwner);\n      }\n      setCurrentlyValidatingElement(null);\n    }\n    /**\n     * Ensure that every element either is passed in a static location, in an\n     * array with an explicit keys property defined, or in an object literal\n     * with valid key property.\n     *\n     * @internal\n     * @param {ReactNode} node Statically passed child of any type.\n     * @param {*} parentType node's parent's type.\n     */\n\n\n    function validateChildKeys(node, parentType) {\n      if (typeof node !== 'object') {\n        return;\n      }\n\n      if (Array.isArray(node)) {\n        for (var i = 0; i < node.length; i++) {\n          var child = node[i];\n\n          if (isValidElement(child)) {\n            validateExplicitKey(child, parentType);\n          }\n        }\n      } else if (isValidElement(node)) {\n        // This element was passed in a valid location.\n        if (node._store) {\n          node._store.validated = true;\n        }\n      } else if (node) {\n        var iteratorFn = getIteratorFn(node);\n\n        if (typeof iteratorFn === 'function') {\n          // Entry iterators used to provide implicit keys,\n          // but now we print a separate warning for them later.\n          if (iteratorFn !== node.entries) {\n            var iterator = iteratorFn.call(node);\n            var step;\n\n            while (!(step = iterator.next()).done) {\n              if (isValidElement(step.value)) {\n                validateExplicitKey(step.value, parentType);\n              }\n            }\n          }\n        }\n      }\n    }\n    /**\n     * Given an element, validate that its props follow the propTypes definition,\n     * provided by the type.\n     *\n     * @param {ReactElement} element\n     */\n\n\n    function validatePropTypes(element) {\n      {\n        var type = element.type;\n\n        if (type === null || type === undefined || typeof type === 'string') {\n          return;\n        }\n\n        var name = getComponentName(type);\n        var propTypes;\n\n        if (typeof type === 'function') {\n          propTypes = type.propTypes;\n        } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.\n        // Inner props are checked in the reconciler.\n        type.$$typeof === REACT_MEMO_TYPE)) {\n          propTypes = type.propTypes;\n        } else {\n          return;\n        }\n\n        if (propTypes) {\n          setCurrentlyValidatingElement(element);\n          checkPropTypes(propTypes, element.props, 'prop', name, ReactDebugCurrentFrame.getStackAddendum);\n          setCurrentlyValidatingElement(null);\n        } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {\n          propTypesMisspellWarningShown = true;\n          error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');\n        }\n\n        if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {\n          error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');\n        }\n      }\n    }\n    /**\n     * Given a fragment, validate that it can only be provided with fragment props\n     * @param {ReactElement} fragment\n     */\n\n\n    function validateFragmentProps(fragment) {\n      {\n        setCurrentlyValidatingElement(fragment);\n        var keys = Object.keys(fragment.props);\n\n        for (var i = 0; i < keys.length; i++) {\n          var key = keys[i];\n\n          if (key !== 'children' && key !== 'key') {\n            error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);\n            break;\n          }\n        }\n\n        if (fragment.ref !== null) {\n          error('Invalid attribute `ref` supplied to `React.Fragment`.');\n        }\n\n        setCurrentlyValidatingElement(null);\n      }\n    }\n\n    function createElementWithValidation(type, props, children) {\n      var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to\n      // succeed and there will likely be errors in render.\n\n      if (!validType) {\n        var info = '';\n\n        if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {\n          info += ' You likely forgot to export your component from the file ' + \"it's defined in, or you might have mixed up default and named imports.\";\n        }\n\n        var sourceInfo = getSourceInfoErrorAddendumForProps(props);\n\n        if (sourceInfo) {\n          info += sourceInfo;\n        } else {\n          info += getDeclarationErrorAddendum();\n        }\n\n        var typeString;\n\n        if (type === null) {\n          typeString = 'null';\n        } else if (Array.isArray(type)) {\n          typeString = 'array';\n        } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {\n          typeString = \"<\" + (getComponentName(type.type) || 'Unknown') + \" />\";\n          info = ' Did you accidentally export a JSX literal instead of a component?';\n        } else {\n          typeString = typeof type;\n        }\n\n        {\n          error('React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);\n        }\n      }\n\n      var element = createElement.apply(this, arguments); // The result can be nullish if a mock or a custom function is used.\n      // TODO: Drop this when these are no longer allowed as the type argument.\n\n      if (element == null) {\n        return element;\n      } // Skip key warning if the type isn't valid since our key validation logic\n      // doesn't expect a non-string/function type and can throw confusing errors.\n      // We don't want exception behavior to differ between dev and prod.\n      // (Rendering will throw with a helpful message and as soon as the type is\n      // fixed, the key warnings will appear.)\n\n\n      if (validType) {\n        for (var i = 2; i < arguments.length; i++) {\n          validateChildKeys(arguments[i], type);\n        }\n      }\n\n      if (type === REACT_FRAGMENT_TYPE) {\n        validateFragmentProps(element);\n      } else {\n        validatePropTypes(element);\n      }\n\n      return element;\n    }\n\n    var didWarnAboutDeprecatedCreateFactory = false;\n\n    function createFactoryWithValidation(type) {\n      var validatedFactory = createElementWithValidation.bind(null, type);\n      validatedFactory.type = type;\n      {\n        if (!didWarnAboutDeprecatedCreateFactory) {\n          didWarnAboutDeprecatedCreateFactory = true;\n          warn('React.createFactory() is deprecated and will be removed in ' + 'a future major release. Consider using JSX ' + 'or use React.createElement() directly instead.');\n        } // Legacy hook: remove it\n\n\n        Object.defineProperty(validatedFactory, 'type', {\n          enumerable: false,\n          get: function () {\n            warn('Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');\n            Object.defineProperty(this, 'type', {\n              value: type\n            });\n            return type;\n          }\n        });\n      }\n      return validatedFactory;\n    }\n\n    function cloneElementWithValidation(element, props, children) {\n      var newElement = cloneElement.apply(this, arguments);\n\n      for (var i = 2; i < arguments.length; i++) {\n        validateChildKeys(arguments[i], newElement.type);\n      }\n\n      validatePropTypes(newElement);\n      return newElement;\n    }\n\n    {\n      try {\n        var frozenObject = Object.freeze({});\n        var testMap = new Map([[frozenObject, null]]);\n        var testSet = new Set([frozenObject]); // This is necessary for Rollup to not consider these unused.\n        // https://github.com/rollup/rollup/issues/1771\n        // TODO: we can remove these if Rollup fixes the bug.\n\n        testMap.set(0, 0);\n        testSet.add(0);\n      } catch (e) {}\n    }\n    var createElement$1 = createElementWithValidation;\n    var cloneElement$1 = cloneElementWithValidation;\n    var createFactory = createFactoryWithValidation;\n    var Children = {\n      map: mapChildren,\n      forEach: forEachChildren,\n      count: countChildren,\n      toArray: toArray,\n      only: onlyChild\n    };\n    exports.Children = Children;\n    exports.Component = Component;\n    exports.Fragment = REACT_FRAGMENT_TYPE;\n    exports.Profiler = REACT_PROFILER_TYPE;\n    exports.PureComponent = PureComponent;\n    exports.StrictMode = REACT_STRICT_MODE_TYPE;\n    exports.Suspense = REACT_SUSPENSE_TYPE;\n    exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;\n    exports.cloneElement = cloneElement$1;\n    exports.createContext = createContext;\n    exports.createElement = createElement$1;\n    exports.createFactory = createFactory;\n    exports.createRef = createRef;\n    exports.forwardRef = forwardRef;\n    exports.isValidElement = isValidElement;\n    exports.lazy = lazy;\n    exports.memo = memo;\n    exports.useCallback = useCallback;\n    exports.useContext = useContext;\n    exports.useDebugValue = useDebugValue;\n    exports.useEffect = useEffect;\n    exports.useImperativeHandle = useImperativeHandle;\n    exports.useLayoutEffect = useLayoutEffect;\n    exports.useMemo = useMemo;\n    exports.useReducer = useReducer;\n    exports.useRef = useRef;\n    exports.useState = useState;\n    exports.version = ReactVersion;\n  })();\n}\n\n//# sourceURL=webpack:///./node_modules/react/cjs/react.development.js?");

/***/ }),

/***/ "./node_modules/react/index.js":
/*!*************************************!*\
  !*** ./node_modules/react/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nif (false) {} else {\n  module.exports = __webpack_require__(/*! ./cjs/react.development.js */ \"./node_modules/react/cjs/react.development.js\");\n}\n\n//# sourceURL=webpack:///./node_modules/react/index.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nvar stylesInDom = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDom.length; i++) {\n    if (stylesInDom[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var index = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3]\n    };\n\n    if (index !== -1) {\n      stylesInDom[index].references++;\n      stylesInDom[index].updater(obj);\n    } else {\n      stylesInDom.push({\n        identifier: identifier,\n        updater: addStyle(obj, options),\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n  var attributes = options.attributes || {};\n\n  if (typeof attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : undefined;\n\n    if (nonce) {\n      attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(attributes).forEach(function (key) {\n    style.setAttribute(key, attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.media ? \"@media \".concat(obj.media, \" {\").concat(obj.css, \"}\") : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  } else {\n    style.removeAttribute('media');\n  }\n\n  if (sourceMap && btoa) {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    if (Object.prototype.toString.call(newList) !== '[object Array]') {\n      return;\n    }\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDom[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDom[_index].references === 0) {\n        stylesInDom[_index].updater();\n\n        stylesInDom.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var hookrouter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! hookrouter */ \"./node_modules/hookrouter/dist/index.js\");\n/* harmony import */ var hookrouter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(hookrouter__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./routes */ \"./src/routes.js\");\n/* harmony import */ var _components_nav_nav_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/nav/nav.component */ \"./src/components/nav/nav.component.js\");\n/* harmony import */ var _App_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./App.scss */ \"./src/App.scss\");\n/* harmony import */ var _App_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_App_scss__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\n\nfunction App() {\n  var routeResult = Object(hookrouter__WEBPACK_IMPORTED_MODULE_1__[\"useRoutes\"])(_routes__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: _App_scss__WEBPACK_IMPORTED_MODULE_4___default.a.container\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_nav_nav_component__WEBPACK_IMPORTED_MODULE_3__[\"default\"], null), routeResult);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (App);\n\n//# sourceURL=webpack:///./src/App.js?");

/***/ }),

/***/ "./src/App.scss":
/*!**********************!*\
  !*** ./src/App.scss ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var api = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n            var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./App.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/App.scss\");\n\n            content = content.__esModule ? content.default : content;\n\n            if (typeof content === 'string') {\n              content = [[module.i, content, '']];\n            }\n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = api(content, options);\n\n\nif (true) {\n  if (!content.locals || module.hot.invalidate) {\n    var isEqualLocals = function isEqualLocals(a, b) {\n  if (!a && b || a && !b) {\n    return false;\n  }\n\n  var p;\n\n  for (p in a) {\n    if (a[p] !== b[p]) {\n      return false;\n    }\n  }\n\n  for (p in b) {\n    if (!a[p]) {\n      return false;\n    }\n  }\n\n  return true;\n};\n    var oldLocals = content.locals;\n\n    module.hot.accept(\n      /*! !../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./App.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/App.scss\",\n      function () {\n        content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./App.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/App.scss\");\n\n              content = content.__esModule ? content.default : content;\n\n              if (typeof content === 'string') {\n                content = [[module.i, content, '']];\n              }\n\n              if (!isEqualLocals(oldLocals, content.locals)) {\n                module.hot.invalidate();\n\n                return;\n              }\n\n              oldLocals = content.locals;\n\n              update(content);\n      }\n    )\n  }\n\n  module.hot.dispose(function() {\n    update();\n  });\n}\n\nmodule.exports = content.locals || {};\n\n//# sourceURL=webpack:///./src/App.scss?");

/***/ }),

/***/ "./src/components/nav/images/transfeera-logo-verde.svg":
/*!*************************************************************!*\
  !*** ./src/components/nav/images/transfeera-logo-verde.svg ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"./images/536f645238758285918e9541e1f1fd51.svg\");\n\n//# sourceURL=webpack:///./src/components/nav/images/transfeera-logo-verde.svg?");

/***/ }),

/***/ "./src/components/nav/nav.component.js":
/*!*********************************************!*\
  !*** ./src/components/nav/nav.component.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var hookrouter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! hookrouter */ \"./node_modules/hookrouter/dist/index.js\");\n/* harmony import */ var hookrouter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(hookrouter__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _images_transfeera_logo_verde_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./images/transfeera-logo-verde.svg */ \"./src/components/nav/images/transfeera-logo-verde.svg\");\n/* harmony import */ var _nav_component_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nav.component.scss */ \"./src/components/nav/nav.component.scss\");\n/* harmony import */ var _nav_component_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nav_component_scss__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\nvar Nav = function Nav() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"container\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"header\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n    className: \"iconeTransfera\",\n    alt: \"\",\n    src: _images_transfeera_logo_verde_svg__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"nav\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(hookrouter__WEBPACK_IMPORTED_MODULE_1__[\"A\"], {\n    href: \"/\"\n  }, \"Seus Favorecidos\"))));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Nav);\n\n//# sourceURL=webpack:///./src/components/nav/nav.component.js?");

/***/ }),

/***/ "./src/components/nav/nav.component.scss":
/*!***********************************************!*\
  !*** ./src/components/nav/nav.component.scss ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n            var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./nav.component.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/components/nav/nav.component.scss\");\n\n            content = content.__esModule ? content.default : content;\n\n            if (typeof content === 'string') {\n              content = [[module.i, content, '']];\n            }\n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = api(content, options);\n\n\nif (true) {\n  if (!content.locals || module.hot.invalidate) {\n    var isEqualLocals = function isEqualLocals(a, b) {\n  if (!a && b || a && !b) {\n    return false;\n  }\n\n  var p;\n\n  for (p in a) {\n    if (a[p] !== b[p]) {\n      return false;\n    }\n  }\n\n  for (p in b) {\n    if (!a[p]) {\n      return false;\n    }\n  }\n\n  return true;\n};\n    var oldLocals = content.locals;\n\n    module.hot.accept(\n      /*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./nav.component.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/components/nav/nav.component.scss\",\n      function () {\n        content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./nav.component.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/components/nav/nav.component.scss\");\n\n              content = content.__esModule ? content.default : content;\n\n              if (typeof content === 'string') {\n                content = [[module.i, content, '']];\n              }\n\n              if (!isEqualLocals(oldLocals, content.locals)) {\n                module.hot.invalidate();\n\n                return;\n              }\n\n              oldLocals = content.locals;\n\n              update(content);\n      }\n    )\n  }\n\n  module.hot.dispose(function() {\n    update();\n  });\n}\n\nmodule.exports = content.locals || {};\n\n//# sourceURL=webpack:///./src/components/nav/nav.component.scss?");

/***/ }),

/***/ "./src/pages/grantee/grantee.page.js":
/*!*******************************************!*\
  !*** ./src/pages/grantee/grantee.page.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n\nvar GranteePage = function GranteePage() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null, \"Seus Favorecidos\"));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (GranteePage);\n\n//# sourceURL=webpack:///./src/pages/grantee/grantee.page.js?");

/***/ }),

/***/ "./src/routes.js":
/*!***********************!*\
  !*** ./src/routes.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _pages_grantee_grantee_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/grantee/grantee.page */ \"./src/pages/grantee/grantee.page.js\");\n\n\nvar routes = {\n  \"/\": function _() {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_pages_grantee_grantee_page__WEBPACK_IMPORTED_MODULE_1__[\"default\"], null);\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (routes);\n\n//# sourceURL=webpack:///./src/routes.js?");

/***/ })

/******/ });