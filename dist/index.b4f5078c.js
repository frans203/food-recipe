// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"63iPG":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "d231a23f43d60e28ed500b93b4f5078c";
// @flow
/*global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE*/
/*::
import type {
HMRAsset,
HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
(string): mixed;
cache: {|[string]: ParcelModule|};
hotData: mixed;
Module: any;
parent: ?ParcelRequire;
isParcelRequire: true;
modules: {|[string]: [Function, {|[string]: string|}]|};
HMR_BUNDLE_ID: string;
root: ParcelRequire;
}
interface ParcelModule {
hot: {|
data: mixed,
accept(cb: (Function) => void): void,
dispose(cb: (mixed) => void): void,
// accept(deps: Array<string> | string, cb: (Function) => void): void,
// decline(): void,
_acceptCallbacks: Array<(Function) => void>,
_disposeCallbacks: Array<(mixed) => void>,
|};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || (function () {}));
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, /*: {|[string]: boolean|}*/
acceptedAssets, /*: {|[string]: boolean|}*/
/*: {|[string]: boolean|}*/
assetsToAccept;
function getHostname() {
  return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
  return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = getHostname();
  var port = getPort();
  var protocol = HMR_SECURE || location.protocol == 'https:' && !(/localhost|127.0.0.1|0.0.0.0/).test(hostname) ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
  // $FlowFixMe
  ws.onmessage = function (event) /*: {data: string, ...}*/
  {
    checkedAssets = {
      /*: {|[string]: boolean|}*/
    };
    acceptedAssets = {
      /*: {|[string]: boolean|}*/
    };
    assetsToAccept = [];
    var data = /*: HMRMessage*/
    JSON.parse(event.data);
    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH);
      // Handle HMR Update
      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        if (didAccept) {
          handled = true;
        }
      });
      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(module.bundle.root, asset);
        });
        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];
          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }
    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      }
      // Render the fancy html overlay
      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      // $FlowFixMe
      document.body.appendChild(overlay);
    }
  };
  ws.onerror = function (e) {
    console.error(e.message);
  };
  ws.onclose = function (e) {
    if (undefined !== 'test') {
      console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}
function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }
  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]>*/
{
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    if (link.parentNode !== null) {
      // $FlowFixMe
      link.parentNode.removeChild(link);
    }
  };
  newLink.setAttribute('href', // $FlowFixMe
  link.getAttribute('href').split('?')[0] + '?' + Date.now());
  // $FlowFixMe
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      // $FlowFixMe[incompatible-type]
      var href = /*: string*/
      links[i].getAttribute('href');
      var hostname = getHostname();
      var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
      var absolute = (/^https?:\/\//i).test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
      if (!absolute) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
function hmrApply(bundle, /*: ParcelRequire*/
asset) /*:  HMRAsset*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (asset.type === 'css') {
    reloadCSS();
    return;
  }
  let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
  if (deps) {
    var fn = new Function('require', 'module', 'exports', asset.output);
    modules[asset.id] = [fn, deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, /*: ParcelRequire*/
id, /*: ParcelRequire*/
/*: string*/
depsByBundle) /*: ?{ [string]: { [string]: string } }*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
    // If we reached the root bundle without finding where the asset should go,
    // there's nothing to do. Mark as "accepted" so we don't reload the page.
    if (!bundle.parent) {
      return true;
    }
    return hmrAcceptCheck(bundle.parent, id, depsByBundle);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(module.bundle.root, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1], null);
  });
}
function hmrAcceptRun(bundle, /*: ParcelRequire*/
id) /*: string*/
{
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(module.bundle.root, id);
      });
      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }
  acceptedAssets[id] = true;
}

},{}],"4ThtM":[function(require,module,exports) {
var _outputBookmarkOutJs = require("./output/bookmarkOut.js");
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _outputBookmarkOutJsDefault = _parcelHelpers.interopDefault(_outputBookmarkOutJs);
var _outputPaginationOutJs = require("./output/paginationOut.js");
var _outputPaginationOutJsDefault = _parcelHelpers.interopDefault(_outputPaginationOutJs);
var _outputSearchOutJs = require("./output/searchOut.js");
var _outputSearchOutJsDefault = _parcelHelpers.interopDefault(_outputSearchOutJs);
var _outputResultsOutJs = require("./output/resultsOut.js");
var _outputResultsOutJsDefault = _parcelHelpers.interopDefault(_outputResultsOutJs);
var _outputAddRecipeOutJs = require("./output/addRecipeOut.js");
var _outputAddRecipeOutJsDefault = _parcelHelpers.interopDefault(_outputAddRecipeOutJs);
require("./output/menuOut.js");
var _modelScriptJs = require("./modelScript.js");
var _outputRecipeOutJs = require("./output/recipeOut.js");
var _help_configJs = require("./help_config.js");
const recipeOutDe = _outputRecipeOutJs.default;
const loadRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    // getting data
    _outputResultsOutJsDefault.default.update(_modelScriptJs.getSearchPerPage());
    _outputBookmarkOutJsDefault.default.update(_modelScriptJs.state.bookmarks);
    recipeOutDe.renderLoading();
    await _modelScriptJs.toFetch(id);
    // const { recipe } = modelScript.state.recipe;
    // rendering recipes
    recipeOutDe.renderRecipe(_modelScriptJs.state.recipe);
  } catch (e) {
    console.error(e + "my error");
    _outputBookmarkOutJsDefault.default.renderErrorMessage(_outputBookmarkOutJsDefault.default.errorMessage);
    recipeOutDe.renderErrorMessage();
  }
};
const searchResults = async () => {
  // 1) get query
  const query = _outputSearchOutJsDefault.default.getQuery();
  if (!query) return;
  // 2) search with the query
  await _modelScriptJs.toSearch(query);
  // 3) render the results
  _outputResultsOutJsDefault.default.renderRecipe(_modelScriptJs.getSearchPerPage(1));
  // 4) pagination
  _outputPaginationOutJsDefault.default.renderRecipe(_modelScriptJs.state.search);
};
function paginationChange(value) {
  _outputResultsOutJsDefault.default.renderRecipe(_modelScriptJs.getSearchPerPage(value));
  _outputPaginationOutJsDefault.default.renderRecipe(_modelScriptJs.state.search);
}
function servingsChange(value) {
  _modelScriptJs.updateServings(value);
  recipeOutDe.update(_modelScriptJs.state.recipe);
}
function bookmarksChange() {
  // add
  if (!_modelScriptJs.state.recipe.bookmarked) _modelScriptJs.addBookmark(_modelScriptJs.state.recipe); else _modelScriptJs.removeBookmark(_modelScriptJs.state.recipe.id);
  // remove
  // update view
  recipeOutDe.update(_modelScriptJs.state.recipe);
  // render Bookmarks
  if (_modelScriptJs.state.bookmarks.length === 0) _outputBookmarkOutJsDefault.default.renderErrorMessage(_outputBookmarkOutJsDefault.default.errorMessage); else {
    _outputBookmarkOutJsDefault.default.renderRecipe(_modelScriptJs.state.bookmarks);
  }
}
function controlBookmarks() {
  if (_modelScriptJs.state.bookmarks.length === 0) _outputBookmarkOutJsDefault.default.renderErrorMessage(_outputBookmarkOutJsDefault.default.errorMessage); else {
    _outputBookmarkOutJsDefault.default.renderRecipe(_modelScriptJs.state.bookmarks);
  }
}
async function controlAddRecipe(newRecipe) {
  try {
    _outputAddRecipeOutJsDefault.default.renderLoading();
    // upload Recipe
    await _modelScriptJs.uploadRecipe(newRecipe);
    // render Recipe
    recipeOutDe.renderRecipe(_modelScriptJs.state.recipe);
    // render Message
    _outputAddRecipeOutJsDefault.default.renderMessage();
    // render in bookmark
    _outputBookmarkOutJsDefault.default.renderRecipe(_modelScriptJs.state.bookmarks);
    // change ID in URL
    window.history.pushState(null, "", `${_modelScriptJs.state.recipe.id}`);
    // close window after 'MODAL_CLOSE_SEC' secs
    setTimeout(function () {
      _outputAddRecipeOutJsDefault.default.toggleWindow();
    }, _help_configJs.MODAL_CLOSE_SEC * 1000);
  } catch (e) {
    _outputAddRecipeOutJsDefault.default.renderErrorMessage();
  }
}
function init() {
  _outputBookmarkOutJsDefault.default.addHandlerRender(controlBookmarks);
  recipeOutDe.addHandlerRender(loadRecipe);
  recipeOutDe.addHandlerUpdateServings(servingsChange);
  recipeOutDe.addHandleraddBookmark(bookmarksChange);
  _outputSearchOutJsDefault.default.addHandlerSearch(searchResults);
  _outputPaginationOutJsDefault.default.addHandlerPagination(paginationChange);
  _outputAddRecipeOutJsDefault.default.addHandlerUpload(controlAddRecipe);
}
init();

},{"./output/bookmarkOut.js":"1S7B3","./output/paginationOut.js":"1yZRt","./output/searchOut.js":"2Naxj","./output/resultsOut.js":"5Ubw0","./output/addRecipeOut.js":"13TYv","./output/menuOut.js":"6UTFX","./modelScript.js":"3OsnQ","./output/recipeOut.js":"37WdU","./help_config.js":"6zlA0","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"1S7B3":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
var _OutputJs = require("./Output.js");
var _OutputJsDefault = _parcelHelpers.interopDefault(_OutputJs);
var _previewOutJs = require("./previewOut.js");
var _previewOutJsDefault = _parcelHelpers.interopDefault(_previewOutJs);
class BookmarkOut extends _OutputJsDefault.default {
  parentElement = document.querySelector(".bookmarks-list");
  errorMessage = "No bookmarks yet . Find a recipe and bookmark it!";
  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }
  generateMarkup() {
    return this.recipeData.map(bm => _previewOutJsDefault.default.renderRecipe(bm, false)).join("");
  }
}
exports.default = new BookmarkOut();

},{"./Output.js":"34RZy","./previewOut.js":"52xRZ","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"34RZy":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
const icons = "./icons.b4f53cee.svg";
class View {
  recipeData;
  renderRecipe(data, render = true) {
    if (!data || Array.isArray(data && data.lenght === 0)) return this.renderErrorMessage();
    this.recipeData = data;
    const html = this.generateMarkup();
    if (!render) return html;
    this.clear();
    this.parentElement.insertAdjacentHTML("afterbegin", html);
  }
  update(data) {
    this.recipeData = data;
    const newMarkup = this.generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = newDom.querySelectorAll("*");
    const curElements = this.parentElement.querySelectorAll("*");
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      if (!curEl) return;
      if (!curEl.isEqualNode(newEl) && newEl.firstChild?.nodeValue?.trim?.() !== "") {
        curEl.textContent = newEl.textContent;
      }
      if (!curEl.isEqualNode(newEl)) {
        Array.from(newEl.attributes).forEach(att => {
          curEl.setAttribute(att.name, att.value);
        });
      }
    });
  }
  renderLoading() {
    const markup = `
      <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;
    this.clear();
    this.parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  clear() {
    this.parentElement.innerHTML = "";
  }
  renderErrorMessage(message = "Error with loading this feature! Try again") {
    this.clear();
    const markup = `
    <div class="error">
      <div>
          <svg>
            <use href="./img/icons.svg#icon-alert-triangle"></use>
          </svg>
        </div>
        <span>${message}</span>
      </div>`;
    this.parentElement.insertAdjacentHTML("beforeend", markup);
  }
  renderMessage(message = this.message) {
    const markup = `
    <div class="error">
      <div>
          <svg>
            <use href="./img/icons.svg#icon-smile"></use>
          </svg>
        </div>
        <span>${message}</span>
      </div>`;
    this.clear();
    this.parentElement.insertAdjacentHTML("beforeend", markup);
  }
}
exports.default = View;

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"5gA8y":[function(require,module,exports) {
"use strict";

exports.interopDefault = function (a) {
  return a && a.__esModule ? a : {
    default: a
  };
};

exports.defineInteropFlag = function (a) {
  Object.defineProperty(a, '__esModule', {
    value: true
  });
};

exports.exportAll = function (source, dest) {
  Object.keys(source).forEach(function (key) {
    if (key === 'default' || key === '__esModule') {
      return;
    } // Skip duplicate re-exports when they have the same value.


    if (key in dest && dest[key] === source[key]) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function () {
        return source[key];
      }
    });
  });
  return dest;
};

exports.export = function (dest, destName, get) {
  Object.defineProperty(dest, destName, {
    enumerable: true,
    get: get
  });
};
},{}],"52xRZ":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
var _OutputJs = require("./Output.js");
var _OutputJsDefault = _parcelHelpers.interopDefault(_OutputJs);
const icons = "./icons.b4f53cee.svg";
class PreviewView extends _OutputJsDefault.default {
  parentElement = document.querySelector("*");
  generateMarkup() {
    const id = window.location.hash.slice(1);
    return `
      <li class="preview ${id === this.recipeData.id ? "preview-link--active" : ""}">
          <a class="preview-link" href='#${this.recipeData.id}'>
          <figure class="preview-fig">
              <img src="${this.recipeData.imageUrl}" alt="${this.recipeData.title}" />
          </figure>

          <div class="preview-data">
              <h4 class='preview-title'>${this.recipeData.title}</h4>
              <p class='preview-publisher'>${this.recipeData.publisher}</p>
               
              <div class="preview-user-generated ${this.recipeData.key ? "" : "hidden"}">
                <svg>
                  <use href="${icons}#icon-user"></use>
                </svg>
              </div>
        
            </div>
          </div>
          </a>
      </li>`;
  }
}
exports.default = new PreviewView();

},{"./Output.js":"34RZy","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"1yZRt":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
var _OutputJs = require("./Output.js");
var _OutputJsDefault = _parcelHelpers.interopDefault(_OutputJs);
class PaginationOut extends _OutputJsDefault.default {
  parentElement = document.querySelector(".pagination");
  addHandlerPagination(handler) {
    this.parentElement.addEventListener("click", function (e) {
      e.preventDefault();
      const btn = e.target.closest(".btn--inline");
      const goTo = +btn.dataset.go;
      handler(goTo);
    });
  }
  generateMarkup() {
    const actualPage = this.recipeData.page;
    const totalPages = Math.ceil(this.recipeData.results.length / this.recipeData.resultsPerPage);
    // 1) If theres more than one page. User in page one
    if (totalPages > 1 && actualPage === 1) {
      return `<button data-go= "${actualPage + 1}" class="btn--inline btn-next">
        <svg class="search-icon">
          <use href="./img/icons.svg#icon-arrow-right"></use>
        </svg>
        <span>Page ${actualPage + 1}</span>
      </button>`;
    }
    // 2) If theres more than one page. User in last page
    if (totalPages > 1 && actualPage === totalPages) {
      return `<button data-go= "${actualPage - 1}" class="btn--inline btn-prev">
    <svg class="search__icon">
      <use href="src/img/icons.svg#icon-arrow-left"></use>
    </svg>
    <span>Page ${actualPage - 1}</span>
  </button>`;
    }
    // 3) If user is is another page
    if (totalPages > 1 && actualPage < totalPages) {
      return `
        <button data-go= "${actualPage - 1}" class="btn--inline btn-prev">
            <svg class="search__icon">
            <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${actualPage - 1}</span>
        </button>
        
        <button data-go= "${actualPage + 1}" class="btn--inline btn-next">
                <svg class="search-icon">
                <use href="./img/icons.svg#icon-arrow-right"></use>
                </svg>
                <span>Page ${actualPage + 1}</span>
        </button>`;
    }
    return "";
  }
}
exports.default = new PaginationOut();

},{"./Output.js":"34RZy","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"2Naxj":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
class SearchView {
  parentElement = document.querySelector(".search");
  clearInput() {
    this.parentElement.querySelector(".field_search").value = "";
  }
  getQuery() {
    const query = this.parentElement.querySelector(".field_search").value;
    this.clearInput();
    return query;
  }
  addHandlerSearch(handler) {
    addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}
exports.default = new SearchView();

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"5Ubw0":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
var _OutputJs = require("./Output.js");
var _OutputJsDefault = _parcelHelpers.interopDefault(_OutputJs);
var _previewOutJs = require("./previewOut.js");
var _previewOutJsDefault = _parcelHelpers.interopDefault(_previewOutJs);
class ResultsView extends _OutputJsDefault.default {
  parentElement = document.querySelector(".results");
  generateMarkup() {
    return this.recipeData.map(re => _previewOutJsDefault.default.renderRecipe(re, false)).join("");
  }
}
exports.default = new ResultsView();

},{"./Output.js":"34RZy","./previewOut.js":"52xRZ","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"13TYv":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
var _OutputJs = require("./Output.js");
var _OutputJsDefault = _parcelHelpers.interopDefault(_OutputJs);
class addRecipeOut extends _OutputJsDefault.default {
  parentElement = document.querySelector(".upload");
  window = document.querySelector(".add-recipe-window");
  overlay = document.querySelector(".overlay");
  btnOpen = document.querySelector(".btn-ar");
  btnClose = document.querySelector(".close-modal");
  message = "Successfully add recipe!";
  constructor() {
    super();
    this.addHandlerShowWindow();
    this.addHandlerCloseWindow();
  }
  toggleWindow() {
    this.window.classList.toggle("hidden");
    this.overlay.classList.toggle("hidden");
  }
  addHandlerShowWindow() {
    this.btnOpen.addEventListener("click", this.toggleWindow.bind(this));
  }
  addHandlerCloseWindow() {
    this.btnClose.addEventListener("click", this.toggleWindow.bind(this));
    this.overlay.addEventListener("click", this.toggleWindow.bind(this));
  }
  addHandlerUpload(handler) {
    this.parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
  generateMarkup() {}
}
exports.default = new addRecipeOut();

},{"./Output.js":"34RZy","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"6UTFX":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
var _OutputJs = require("./Output.js");
var _OutputJsDefault = _parcelHelpers.interopDefault(_OutputJs);
class menuOut extends _OutputJsDefault.default {
  hambMenu = document.querySelector(".menu-btn");
  navItems = document.querySelectorAll(".nav-item");
  btnBookmark = document.querySelector(".btn-bm");
  bookmarks = document.querySelector(".bookmarks");
  searchResults = document.querySelector(".search-results");
  recipe = document.querySelector(".recipe");
  all = document.querySelector(".all");
  constructor() {
    super();
    this.toggleMenuItems();
    this.changeStyleBookmarks();
  }
  toggleMenuItemsFunction() {
    this.navItems.forEach(navI => {
      navI.classList.toggle("menu-tog");
    });
    this.searchResults.classList.toggle("menu-tog");
  }
  styleBookmarks() {
    this.bookmarks.classList.toggle("changeBookmarks");
  }
  toggleMenuItems() {
    this.hambMenu.addEventListener("click", this.toggleMenuItemsFunction.bind(this));
  }
  changeStyleBookmarks() {
    this.btnBookmark.addEventListener("click", this.styleBookmarks.bind(this));
  }
}
exports.default = new menuOut();

},{"./Output.js":"34RZy","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"3OsnQ":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "state", function () {
  return state;
});
_parcelHelpers.export(exports, "toFetch", function () {
  return toFetch;
});
_parcelHelpers.export(exports, "toSearch", function () {
  return toSearch;
});
_parcelHelpers.export(exports, "getSearchPerPage", function () {
  return getSearchPerPage;
});
_parcelHelpers.export(exports, "updateServings", function () {
  return updateServings;
});
_parcelHelpers.export(exports, "addBookmark", function () {
  return addBookmark;
});
_parcelHelpers.export(exports, "removeBookmark", function () {
  return removeBookmark;
});
_parcelHelpers.export(exports, "uploadRecipe", function () {
  return uploadRecipe;
});
var _help_configJs = require("./help_config.js");
var _help_helperJs = require("./help_helper.js");
let state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: _help_configJs.RES_PER_PAGE
  },
  bookmarks: []
};
const generateRecipeObject = resJson => {
  let {recipe} = resJson.data;
  return state.recipe = {
    cookingTime: recipe.cooking_time,
    id: recipe.id,
    imageUrl: recipe.image_url,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    servings: recipe.servings,
    sourceUrl: recipe.source_url,
    title: recipe.title,
    bookmarked: false,
    ...recipe.key && ({
      key: recipe.key
    })
  };
};
const toFetch = async id => {
  try {
    const resJson = await _help_helperJs.AJAX(`${_help_configJs.API_URL}/${id}?key=${_help_configJs.KEY}`);
    state.recipe = generateRecipeObject(resJson);
    if (state.bookmarks.some(bm => bm.id === id)) state.recipe.bookmarked = true; else state.recipe.bookmarked = false;
  } catch (e) {
    throw e;
  }
};
const toSearch = async query => {
  try {
    const dataReceived = await _help_helperJs.AJAX(`${_help_configJs.API_URL}?search=${query}&key=${_help_configJs.KEY}`);
    state.search.results = dataReceived.data.recipes.map(res => {
      return {
        id: res.id,
        title: res.title,
        publisher: res.publisher,
        sourceUrl: res.source_url,
        imageUrl: res.image_url,
        bookmarked: false,
        ...res.key && ({
          key: res.key
        })
      };
    });
  } catch (e) {
    throw e;
  }
};
const getSearchPerPage = (page = 1) => {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};
const updateServings = newServings => {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = ing.quantity * newServings / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};
const persistBookmarks = () => {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};
const addBookmark = recipe => {
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmarks();
};
const removeBookmark = id => {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmarks();
};
const init = () => {
  if (localStorage.getItem("bookmarks")) {
    state.bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  } else return;
};
init();
const uploadRecipe = async newRecipe => {
  const ingredients = Object.entries(newRecipe).filter(ing => ing[0].startsWith("ingredient") && ing[1] !== "").map(ing => {
    const ingArr = ing[1].split(",").map(item => item.trim());
    if (ingArr.length !== 3) throw new Error("Wrong ingredient format! Please use Correct format!");
    const [quantity, unit, description] = ingArr;
    return {
      quantity: quantity ? +quantity : null,
      unit,
      description
    };
  });
  const recipe = {
    title: newRecipe.title,
    source_url: newRecipe.url,
    image_url: newRecipe.image,
    cooking_time: +newRecipe.prep,
    servings: +newRecipe.servings,
    publisher: newRecipe.publisher,
    ingredients,
    bookmarked: false
  };
  const data = await _help_helperJs.AJAX(`${_help_configJs.API_URL}?key=${_help_configJs.KEY}`, recipe);
  state.recipe = generateRecipeObject(data);
  addBookmark(state.recipe);
  try {} catch (e) {}
};

},{"./help_config.js":"6zlA0","./help_helper.js":"7KrU3","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"6zlA0":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "API_URL", function () {
  return API_URL;
});
_parcelHelpers.export(exports, "TIME_OUT_SEC", function () {
  return TIME_OUT_SEC;
});
_parcelHelpers.export(exports, "RES_PER_PAGE", function () {
  return RES_PER_PAGE;
});
_parcelHelpers.export(exports, "KEY", function () {
  return KEY;
});
_parcelHelpers.export(exports, "MODAL_CLOSE_SEC", function () {
  return MODAL_CLOSE_SEC;
});
const API_URL = "https://forkify-api.herokuapp.com/api/v2/recipes";
const TIME_OUT_SEC = 25;
const RES_PER_PAGE = 12;
const KEY = "cc89b79b-47eb-4468-9287-4ad159b7ad73";
const MODAL_CLOSE_SEC = 2;

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"7KrU3":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "timeOut", function () {
  return timeOut;
});
_parcelHelpers.export(exports, "AJAX", function () {
  return AJAX;
});
var _help_config = require("./help_config");
function timeOut(s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Take too long! Time: ${s}`));
    }, s * 1000);
  });
}
const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData ? fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(uploadData)
    }) : fetch(url);
    const res = await Promise.race([fetchPro, timeOut(_help_config.TIME_OUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

},{"./help_config":"6zlA0","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"37WdU":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
var _fractional = require("fractional");
var _OutputJs = require("./Output.js");
var _OutputJsDefault = _parcelHelpers.interopDefault(_OutputJs);
const icons = "./icons.b4f53cee.svg";
class outputRecipe extends _OutputJsDefault.default {
  parentElement = document.querySelector(".recipe");
  message;
  errorMessage;
  generateMarkup() {
    return `<figure class="recipe-fig">
    <img src="${this.recipeData.imageUrl}" alt="" />
    <h1 class="recipe-fig-h"><span>${this.recipeData.title}<span></h1>
  </figure>

  <div class="recipe-details">
    <div class="recipe-info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe-info--time">${this.recipeData.cookingTime}</span>
      <span class="recipe-info-minutes">minutes</span>
    </div>

    <div class="recipe-info">
      <svg class="recipe-info--icon">
        <use href="${icons}#icon-users"></use>
      </svg>

      <span class="recipe-info--number-serving">${this.recipeData.servings}</span>
      <span class="recipe-info-servings">Servings</span>
      <div class="recipe-info-btns">
        <button data-serv-to="${this.recipeData.servings - 1}" class="recipe-serv recipe-minus-serv">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>

        <button data-serv-to="${this.recipeData.servings + 1}" class="recipe-serv recipe-plus-serv">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe-user-genereted ${this.recipeData.key ? "" : "hidden"}">
        <svg>
         <use href="./icons.b4f53cee.svg#icon-user"></use>
        </svg>
    </div>

    <button class="recipe-serv btn-round btn-bookmark">
      <svg class="">
        <use href="${icons}#icon-bookmark${this.recipeData.bookmarked ? "-fill" : ""}"></use>
      </svg>
    </button>
  </div>

  <div class="recipe-ingredients">
    <h2 class="h-ingredients">Recipe ingredients</h2>

    <ul class="recipe-ingredient-list">
    ${this.recipeData.ingredients.map(ing => this.renderIngredients(ing)).join(" ")}
      

    
    </ul>
  </div>

  <div class="recipe-directions">
    <h2 class="h-ingredients">How to cook it</h2>
    <p>
      This recipe was carefully designed and tested by ${this.recipeData.publisher}.
      Please check out directions at their website.
    </p>
     
    <a class="btn recipe-btn" href="${this.recipeData.sourceUrl}" target="_blank">
      <span>Directions</span>
      <svg class="search-icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div> `;
  }
  renderIngredients(ing) {
    return `
    <li class="recipe-ingredient">
    <svg class="recipe-icon">
      <use href="${icons}#icon-check"></use>
    </svg>
    <div class="recipe-quantity">${!ing.quantity ? "" : new _fractional.Fraction(ing.quantity).toString()} ${" "}</div>

    <div class="recipe-description">
      <span class="recipe-unit">${ing.unit} </span>

      <span class="recipe-text">${ing.description} </span>
    </div>
  </li>`;
  }
  addHandlerRender(f) {
    ["hashchange", "load"].forEach(ev => window.addEventListener(ev, f));
  }
  addHandlerUpdateServings(handler) {
    this.parentElement.addEventListener("click", function (e) {
      e.preventDefault();
      const btn = e.target.closest(".recipe-serv");
      if (!btn) return;
      const goTo = +btn.dataset.servTo;
      if (goTo > 0) handler(goTo);
    });
  }
  addHandleraddBookmark(handler) {
    this.parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn-bookmark");
      if (!btn) return;
      handler();
    });
  }
}
exports.default = new outputRecipe();

},{"fractional":"5jzJt","./Output.js":"34RZy","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"5jzJt":[function(require,module,exports) {
/*
fraction.js
A Javascript fraction library.

Copyright (c) 2009  Erik Garrison <erik@hypervolu.me>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/


/* Fractions */
/* 
 *
 * Fraction objects are comprised of a numerator and a denomenator.  These
 * values can be accessed at fraction.numerator and fraction.denomenator.
 *
 * Fractions are always returned and stored in lowest-form normalized format.
 * This is accomplished via Fraction.normalize.
 *
 * The following mathematical operations on fractions are supported:
 *
 * Fraction.equals
 * Fraction.add
 * Fraction.subtract
 * Fraction.multiply
 * Fraction.divide
 *
 * These operations accept both numbers and fraction objects.  (Best results
 * are guaranteed when the input is a fraction object.)  They all return a new
 * Fraction object.
 *
 * Usage:
 *
 * TODO
 *
 */

/*
 * The Fraction constructor takes one of:
 *   an explicit numerator (integer) and denominator (integer),
 *   a string representation of the fraction (string),
 *   or a floating-point number (float)
 *
 * These initialization methods are provided for convenience.  Because of
 * rounding issues the best results will be given when the fraction is
 * constructed from an explicit integer numerator and denomenator, and not a
 * decimal number.
 *
 *
 * e.g. new Fraction(1, 2) --> 1/2
 *      new Fraction('1/2') --> 1/2
 *      new Fraction('2 3/4') --> 11/4  (prints as 2 3/4)
 *
 */
Fraction = function(numerator, denominator)
{
    /* double argument invocation */
    if (typeof numerator !== 'undefined' && denominator) {
        if (typeof(numerator) === 'number' && typeof(denominator) === 'number') {
            this.numerator = numerator;
            this.denominator = denominator;
        } else if (typeof(numerator) === 'string' && typeof(denominator) === 'string') {
            // what are they?
            // hmm....
            // assume they are ints?
            this.numerator = parseInt(numerator);
            this.denominator = parseInt(denominator);
        }
    /* single-argument invocation */
    } else if (typeof denominator === 'undefined') {
        num = numerator; // swap variable names for legibility
        if (typeof(num) === 'number') {  // just a straight number init
            this.numerator = num;
            this.denominator = 1;
        } else if (typeof(num) === 'string') {
            var a, b;  // hold the first and second part of the fraction, e.g. a = '1' and b = '2/3' in 1 2/3
                       // or a = '2/3' and b = undefined if we are just passed a single-part number
            var arr = num.split(' ')
            if (arr[0]) a = arr[0]
            if (arr[1]) b = arr[1]
            /* compound fraction e.g. 'A B/C' */
            //  if a is an integer ...
            if (a % 1 === 0 && b && b.match('/')) {
                return (new Fraction(a)).add(new Fraction(b));
            } else if (a && !b) {
                /* simple fraction e.g. 'A/B' */
                if (typeof(a) === 'string' && a.match('/')) {
                    // it's not a whole number... it's actually a fraction without a whole part written
                    var f = a.split('/');
                    this.numerator = f[0]; this.denominator = f[1];
                /* string floating point */
                } else if (typeof(a) === 'string' && a.match('\.')) {
                    return new Fraction(parseFloat(a));
                /* whole number e.g. 'A' */
                } else { // just passed a whole number as a string
                    this.numerator = parseInt(a);
                    this.denominator = 1;
                }
            } else {
                return undefined; // could not parse
            }
        }
    }
    this.normalize();
}


Fraction.prototype.clone = function()
{
    return new Fraction(this.numerator, this.denominator);
}


/* pretty-printer, converts fractions into whole numbers and fractions */
Fraction.prototype.toString = function()
{
    if (this.denominator==='NaN') return 'NaN'
    var wholepart = (this.numerator/this.denominator>0) ?
      Math.floor(this.numerator / this.denominator) :
      Math.ceil(this.numerator / this.denominator)
    var numerator = this.numerator % this.denominator 
    var denominator = this.denominator;
    var result = []; 
    if (wholepart != 0)  
        result.push(wholepart);
    if (numerator != 0)  
        result.push(((wholepart===0) ? numerator : Math.abs(numerator)) + '/' + denominator);
    return result.length > 0 ? result.join(' ') : 0;
}


/* destructively rescale the fraction by some integral factor */
Fraction.prototype.rescale = function(factor)
{
    this.numerator *= factor;
    this.denominator *= factor;
    return this;
}


Fraction.prototype.add = function(b)
{
    var a = this.clone();
    if (b instanceof Fraction) {
        b = b.clone();
    } else {
        b = new Fraction(b);
    }
    td = a.denominator;
    a.rescale(b.denominator);
    b.rescale(td);

    a.numerator += b.numerator;

    return a.normalize();
}


Fraction.prototype.subtract = function(b)
{
    var a = this.clone();
    if (b instanceof Fraction) {
        b = b.clone();  // we scale our argument destructively, so clone
    } else {
        b = new Fraction(b);
    }
    td = a.denominator;
    a.rescale(b.denominator);
    b.rescale(td);

    a.numerator -= b.numerator;

    return a.normalize();
}


Fraction.prototype.multiply = function(b)
{
    var a = this.clone();
    if (b instanceof Fraction)
    {
        a.numerator *= b.numerator;
        a.denominator *= b.denominator;
    } else if (typeof b === 'number') {
        a.numerator *= b;
    } else {
        return a.multiply(new Fraction(b));
    }
    return a.normalize();
}

Fraction.prototype.divide = function(b)
{
    var a = this.clone();
    if (b instanceof Fraction)
    {
        a.numerator *= b.denominator;
        a.denominator *= b.numerator;
    } else if (typeof b === 'number') {
        a.denominator *= b;
    } else {
        return a.divide(new Fraction(b));
    }
    return a.normalize();
}

Fraction.prototype.equals = function(b)
{
    if (!(b instanceof Fraction)) {
        b = new Fraction(b);
    }
    // fractions that are equal should have equal normalized forms
    var a = this.clone().normalize();
    var b = b.clone().normalize();
    return (a.numerator === b.numerator && a.denominator === b.denominator);
}


/* Utility functions */

/* Destructively normalize the fraction to its smallest representation. 
 * e.g. 4/16 -> 1/4, 14/28 -> 1/2, etc.
 * This is called after all math ops.
 */
Fraction.prototype.normalize = (function()
{

    var isFloat = function(n)
    {
        return (typeof(n) === 'number' && 
                ((n > 0 && n % 1 > 0 && n % 1 < 1) || 
                 (n < 0 && n % -1 < 0 && n % -1 > -1))
               );
    }

    var roundToPlaces = function(n, places) 
    {
        if (!places) {
            return Math.round(n);
        } else {
            var scalar = Math.pow(10, places);
            return Math.round(n*scalar)/scalar;
        }
    }
        
    return (function() {

        // XXX hackish.  Is there a better way to address this issue?
        //
        /* first check if we have decimals, and if we do eliminate them
         * multiply by the 10 ^ number of decimal places in the number
         * round the number to nine decimal places
         * to avoid js floating point funnies
         */
        if (isFloat(this.denominator)) {
            var rounded = roundToPlaces(this.denominator, 9);
            var scaleup = Math.pow(10, rounded.toString().split('.')[1].length);
            this.denominator = Math.round(this.denominator * scaleup); // this !!! should be a whole number
            //this.numerator *= scaleup;
            this.numerator *= scaleup;
        } 
        if (isFloat(this.numerator)) {
            var rounded = roundToPlaces(this.numerator, 9);
            var scaleup = Math.pow(10, rounded.toString().split('.')[1].length);
            this.numerator = Math.round(this.numerator * scaleup); // this !!! should be a whole number
            //this.numerator *= scaleup;
            this.denominator *= scaleup;
        }
        var gcf = Fraction.gcf(this.numerator, this.denominator);
        this.numerator /= gcf;
        this.denominator /= gcf;
        if ((this.numerator < 0 && this.denominator < 0) || (this.numerator > 0 && this.denominator < 0)) {
            this.numerator *= -1;
            this.denominator *= -1;
        }
        return this;
    });

})();


/* Takes two numbers and returns their greatest common factor.
 */
Fraction.gcf = function(a, b)
{

    var common_factors = [];
    var fa = Fraction.primeFactors(a);
    var fb = Fraction.primeFactors(b);
    // for each factor in fa
    // if it's also in fb
    // put it into the common factors
    fa.forEach(function (factor) 
    { 
        var i = fb.indexOf(factor);
        if (i >= 0) {
            common_factors.push(factor);
            fb.splice(i,1); // remove from fb
        }
    });

    if (common_factors.length === 0)
        return 1;

    var gcf = (function() {
        var r = common_factors[0];
        var i;
        for (i=1;i<common_factors.length;i++)
        {
            r = r * common_factors[i];
        }
        return r;
    })();

    return gcf;

};


// Adapted from: 
// http://www.btinternet.com/~se16/js/factor.htm
Fraction.primeFactors = function(n) 
{

    var num = Math.abs(n);
    var factors = [];
    var _factor = 2;  // first potential prime factor

    while (_factor * _factor <= num)  // should we keep looking for factors?
    {      
      if (num % _factor === 0)  // this is a factor
        { 
            factors.push(_factor);  // so keep it
            num = num/_factor;  // and divide our search point by it
        }
        else
        {
            _factor++;  // and increment
        }
    }

    if (num != 1)                    // If there is anything left at the end...
    {                                // ...this must be the last prime factor
        factors.push(num);           //    so it too should be recorded
    }

    return factors;                  // Return the prime factors
}

module.exports.Fraction = Fraction

},{}]},["63iPG","4ThtM"], "4ThtM", "parcelRequireaf34")

//# sourceMappingURL=index.b4f5078c.js.map
