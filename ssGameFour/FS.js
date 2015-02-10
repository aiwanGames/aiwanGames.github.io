/**
 * Created by andysong on 14-7-10.
 * FS.js 2.3.0 | FS.org/LICENSE.md
 */
(function(global, undefined) {

    /**
     * jquery free
     */
    if (!Function.prototype.bind) {
        Function.prototype.bind = function (oThis) {
            if (typeof this !== "function") {
                throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")
            }

            var aArgs = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                fNOP = function () {},
                fBound = function () {
                    return fToBind.apply(this instanceof fNOP && oThis
                        ? this
                        : oThis,
                        aArgs.concat(Array.prototype.slice.call(arguments)))
                };

            // instanceof called on an object with an invalid prototype property
            // 'this' not sure has a prototype property
            fNOP.prototype = this.prototype || {}
            fBound.prototype = new fNOP()

            return fBound
        };
    }
    Element.prototype.on = Element.prototype.addEventListener;
    NodeList.prototype.on = function (event, fn) {
        []['forEach'].call(this, function (el) {
            el.on(event, fn)
        });
        return this
    };
    Element.prototype.trigger = function (type, data) {
        var event = document.createEvent('HTMLEvents')
        event.initEvent(type, true, true)
        event.data = data || {}
        event.eventName = type
        event.target = this
        this.dispatchEvent(event)
        return this
    };

    NodeList.prototype.trigger = function (event) {
        []['forEach'].call(this, function (el) {
            el['trigger'](event)
        });
        return this
    };
    global.$ = document.querySelectorAll.bind(document);
    global.$$ = document.getElementById.bind(document);
    Element.prototype.findone = function(str) {
        return this.querySelector(str)
    }


    /**
     * FS start ...
     */
// Avoid conflicting when `FS.js` is loaded multiple times
    if (global.FS) {
        return
    }

    var FS = global.FS = {
        // The current version of FS.js being used
        version: "0.1.0"
    }

    var data = FS.data = {}

    FS.debug = 'bbs.feidee.com' != document.domain;

    FS.log = function() {
        if (!FS.debug) return
        if (arguments[0] == 'dir') {
            console.dir([].slice.call(arguments, 1))
        } else {
            console.log(arguments)
        }
    }


    /**
     * util-lang.js - The minimal language enhancement
     */

    function isType(type) {
        return function(obj) {
            return {}.toString.call(obj) == "[object " + type + "]"
        }
    }

    // http://bbs.feidee.com
    FS.root = window.location.origin;
    FS.ASSETS_ROOT = window.ASSETS_ROOT || (document.domain=='bbs.feidee.com'?'http://bbsimg.feidee.com':'');

        FS.isObject = isType("Object")
    FS.isString = isType("String")
    FS.isArray = Array.isArray || isType("Array")
    FS.isFunction = isType("Function")
    FS.isWindow = function (obj) {
        return obj != null && obj == obj.window;
    }
    FS.isDocument = function (obj) {
        return obj != null && obj.nodeType == obj.DOCUMENT_NODE
    }
    FS.isPlainObject = function(obj) {
        return FS.isObject(obj) && ! FS.isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
    }

    var extend = function (target, source, deep) {
        for (var k in source) {
            if (deep && (FS.isPlainObject(source[k]) || FS.isArray(source[k]))) {
                if (FS.isPlainObject(source[k]) && ! FS.isPlainObject(target[k])) {
                    target[k] = {}
                }
                if (FS.isArray(source[k]) && ! FS.isArray(target[k])) {
                    target[k] = []
                }
                extend(target[k], source[k], deep);
            } else if (source[k] !== undefined) {
                target[k] = source[k]
            }
        }
    };

    FS.extend = function(target){
        var deep, args = [].slice.call(arguments, 1)
        if (typeof target == 'boolean') {
            deep = target
            target = args.shift()
        }
        args.forEach(function(arg){ extend(target, arg, deep) })
        return target
    };

    var vendor = (function () {
        var _elementStyle = document.createElement('div').style
        var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
            transform,
            i = 0,
            l = vendors.length

        for ( ; i < l; i++ ) {
            transform = vendors[i] + 'ransform'
            if ( transform in _elementStyle ) return vendors[i].substr(0, vendors[i].length-1)
        }

        return false;
    })();

    FS.prefixStyle = function (style) {
        if (vendor === false) return false
        if (vendor === '') return style
        return vendor + style.charAt(0).toUpperCase() + style.substr(1)
    };

    /**
     * FS.cutstr
     * @param str
     * @param len
     * @param ellipsis
     * @returns {string}
     */
    FS.cutstr = function (str, len, ellipsis) {
        var rlen = len * 2
        var i = 0
        var count = 0
        var restr = str
        var restrlen = restr.length
        ellipsis = ellipsis == undefined ? '...' : ellipsis
        while (i < restrlen) {
            if (restr.charCodeAt(i) > 0 && restr.charCodeAt(i) < 255) {
                count++
            } else {
                count += 2
            }
            if (count <= rlen) {
                i++;
            } else {
                break
            }
        }
        restr = restr.substr(0, i)
        return restr + (restrlen > len ? ellipsis : '')
    }


    FS.ajax = function (opts) {
        var defs = {
            type: 'GET',
            url: '',
            async: true,
            data: {},
            dataType: 'JSON',
            timeout: 30*1000,
            cache: false,
            success: function() {},
            error: function() {}
        }
        FS.extend(defs, opts)
        if (!defs.cache) {
            var a = document.createElement('a')
            a.href = defs.url
            defs.url += (a.search == '' ? '?' : '&') + 'fromajax=' + (new Date().getTime())
        }
        var xhr = new XMLHttpRequest()
        xhr.timeout = defs.timeout
        xhr.open(defs.type, defs.url, defs.async)

        // https://developer.mozilla.org/en-US/docs/Web/Guide/Using_FormData_Objects
        var fd;
        if (defs.type === 'POST') {
            fd = new FormData()
            fd.boundary && xhr.setRequestHeader("Content-Type", "multipart\/form-data; boundary=" + fd.boundary)
            for (var key in defs.data) {
                fd.append(key, defs.data[key])
            }
        }
        xhr.onload = function () {
            var result = xhr.response || xhr.responseText
            var error = false
            if (xhr.readyState == 4 && xhr.status == 200) {
                if (defs.dataType == 'JSON') {
                    try {
                        result = JSON.parse(result)
                    } catch(e) {
                        error = {
                            success: false,
                            message: '数据解析错误！'
                        }
                    }
                }
            } else {
                error = {
                    success: false,
                    message: '服务器内部错误！'
                }
            }

            defs[error ? 'error' : 'success'](error ? error : result)
        }
        xhr.ontimeout = function() {
            defs.error({
                success: false,
                message: '网络请求超时！'
            })
        }
        xhr.send(defs.type === 'POST' ? fd : null)
        return xhr
    }


    var _cid = 0
    function cid() {
        return _cid++
    }


    /**
     * util-events.js - The minimal events support
     */

    var events = data.events = {}

// Bind event
    FS.on = function(name, callback) {
        var list = events[name] || (events[name] = [])
        list.push(callback)
        return FS
    }

// Remove event. If `callback` is undefined, remove all callbacks for the
// event. If `event` and `callback` are both undefined, remove all callbacks
// for all events
    FS.off = function(name, callback) {
        // Remove *all* events
        if (!(name || callback)) {
            events = data.events = {}
            return FS
        }

        var list = events[name]
        if (list) {
            if (callback) {
                for (var i = list.length - 1; i >= 0; i--) {
                    if (list[i] === callback) {
                        list.splice(i, 1)
                    }
                }
            }
            else {
                delete events[name]
            }
        }

        return FS
    }

// Emit event, firing all bound callbacks. Callbacks receive the same
// arguments as `emit` does, apart from the event name
    var emit = FS.emit = function(name, data) {
        var list = events[name], fn

        if (list) {
            // Copy callback lists to prevent modification
            list = list.slice()

            // Execute event callbacks, use index because it's the faster.
            for(var i = 0, len = list.length; i < len; i++) {
                list[i](data)
            }
        }

        return FS
    }


    /**
     * util-path.js - The utilities for operating path such as id, uri
     */

    var DIRNAME_RE = /[^?#]*\//;

    var DOT_RE = /\/\.\//g;
    var DOUBLE_DOT_RE = /\/[^/]+\/\.\.\//;
    var MULTI_SLASH_RE = /([^:/])\/+\//g;

// Extract the directory portion of a path
// dirname("a/b/c.js?t=123#xx/zz") ==> "a/b/"
// ref: http://jsperf.com/regex-vs-split/2
    function dirname(path) {
        return path.match(DIRNAME_RE)[0]
    }

// Canonicalize a path
// realpath("http://test.com/a//./b/../c") ==> "http://test.com/a/c"
    function realpath(path) {
        // /a/b/./c/./d ==> /a/b/c/d
        path = path.replace(DOT_RE, "/")

        /*
         @author wh1100717
         a//b/c ==> a/b/c
         a///b/////c ==> a/b/c
         DOUBLE_DOT_RE matches a/b/c//../d path correctly only if replace // with / first
         */
        path = path.replace(MULTI_SLASH_RE, "$1/")

        // a/b/c/../../d  ==>  a/b/../d  ==>  a/d
        while (path.match(DOUBLE_DOT_RE)) {
            path = path.replace(DOUBLE_DOT_RE, "/")
        }

        return path
    }

// Normalize an id
// normalize("path/to/a") ==> "path/to/a.js"
// NOTICE: substring is faster than negative slice and RegExp
    function normalize(path) {
        var last = path.length - 1
        var lastC = path.charAt(last)

        // If the uri ends with `#`, just return it without '#'
        if (lastC === "#") {
            return path.substring(0, last)
        }

        return (path.substring(last - 2) === ".js" ||
            path.indexOf("?") > 0 ||
            lastC === "/") ? path : path + ".js"
    }


    var PATHS_RE = /^([^/:]+)(\/.+)$/;
    var VARS_RE = /{([^{]+)}/g;

    function parseAlias(id) {
        var alias = data.alias;
        return alias && FS.isString(alias[id]) ? alias[id] : id;
    }

    function parsePaths(id) {
        var paths = data.paths;
        var m;

        if (paths && (m = id.match(PATHS_RE)) && FS.isString(paths[m[1]])) {
            id = paths[m[1]] + m[2];
        }

        return id;
    }

    function parseVars(id) {
        var vars = data.vars;

        if (vars && id.indexOf("{") > -1) {
            id = id.replace(VARS_RE, function(m, key) {
                return FS.isString(vars[key]) ? vars[key] : m
            })
        }

        return id
    }

    function parseMap(uri) {
        var map = data.map
        var ret = uri

        if (map) {
            for (var i = 0, len = map.length; i < len; i++) {
                var rule = map[i]

                ret = FS.isFunction(rule) ?
                    (rule(uri) || uri) :
                    uri.replace(rule[0], rule[1])

                // Only apply the first matched rule
                if (ret !== uri) break
            }
        }

        return ret
    }


    var ABSOLUTE_RE = /^\/\/.|:\//;
    var ROOT_DIR_RE = /^.*?\/\/.*?\//;

    function addBase(id, refUri) {
        var ret;
        var first = id.charAt(0);

        // Absolute
        if (ABSOLUTE_RE.test(id)) {
            ret = id;
        }
        // Relative
        else if (first === ".") {
            ret = realpath((refUri ? dirname(refUri) : data.cwd) + id);
        }
        // Root
        else if (first === "/") {
            var m = data.cwd.match(ROOT_DIR_RE);
            ret = m ? m[0] + id.substring(1) : id;
        }
        // Top-level
        else {
            ret = data.base + id;
        }

        // Add default protocol when uri begins with "//"
        if (ret.indexOf("//") === 0) {
            ret = location.protocol + ret;
        }

        return ret;
    }

    function id2Uri(id, refUri) {
        if (!id) return "";

        id = parseAlias(id);
        id = parsePaths(id);
        id = parseVars(id);
        id = normalize(id);

        var uri = addBase(id, refUri);
        uri = parseMap(uri);

        return uri;
    }


    var doc = document;
    var cwd = (!location.href || location.href.indexOf('about:') === 0) ? '' : dirname(location.href);
    var scripts = doc.scripts;

// Recommend to add `FSnode` id for the `FS.js` script element
    var loaderScript = doc.getElementById("FSnode") ||
        scripts[scripts.length - 1]

// When `FS.js` is inline, set loaderDir to current working directory
    var loaderDir = dirname(getScriptAbsoluteSrc(loaderScript) || cwd)

    function getScriptAbsoluteSrc(node) {
        return node.hasAttribute ? // non-IE6/7
            node.src :
            // see http://msdn.microsoft.com/en-us/library/ms536429(VS.85).aspx
            node.getAttribute("src", 4)
    }


// For Developers
    FS.resolve = id2Uri


    /**
     * util-request.js - The utilities for requesting script and style files
     * ref: tests/research/load-js-css/test.html
     */

    var head = doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement
    var baseElement = head.getElementsByTagName("base")[0]

    var currentlyAddingScript
    var interactiveScript

    function request(url, callback, charset) {
        var node = doc.createElement("script")

        if (charset) {
            var cs = FS.isFunction(charset) ? charset(url) : charset
            if (cs) {
                node.charset = cs
            }
        }

        addOnload(node, callback, url)

        node.async = true
        node.src = url

        // For some cache cases in IE 6-8, the script executes IMMEDIATELY after
        // the end of the insert execution, so use `currentlyAddingScript` to
        // hold current node, for deriving url in `define` call
        currentlyAddingScript = node

        // ref: #185 & http://dev.jquery.com/ticket/2709
        baseElement ?
            head.insertBefore(node, baseElement) :
            head.appendChild(node)

        currentlyAddingScript = null
    }

    function addOnload(node, callback, url) {
        var supportOnload = "onload" in node

        if (supportOnload) {
            node.onload = onload
            node.onerror = function() {
                emit("error", { uri: url, node: node })
                onload()
            }
        }
        else {
            node.onreadystatechange = function() {
                if (/loaded|complete/.test(node.readyState)) {
                    onload()
                }
            }
        }

        function onload() {
            // Ensure only run once and handle memory leak in IE
            node.onload = node.onerror = node.onreadystatechange = null

            // Remove the script to reduce memory leak
            if (!data.debug) {
                head.removeChild(node)
            }

            // Dereference the node
            node = null

            callback()
        }
    }

    function getCurrentScript() {
        if (currentlyAddingScript) {
            return currentlyAddingScript
        }

        // For IE6-9 browsers, the script onload event may not fire right
        // after the script is evaluated. Kris Zyp found that it
        // could query the script nodes and the one that is in "interactive"
        // mode indicates the current script
        // ref: http://goo.gl/JHfFW
        if (interactiveScript && interactiveScript.readyState === "interactive") {
            return interactiveScript
        }

        var scripts = head.getElementsByTagName("script")

        for (var i = scripts.length - 1; i >= 0; i--) {
            var script = scripts[i]
            if (script.readyState === "interactive") {
                interactiveScript = script
                return interactiveScript
            }
        }
    }


// For Developers
    FS.request = request


    /**
     * util-deps.js - The parser for dependencies
     * ref: tests/research/parse-dependencies/test.html
     */

    var REQUIRE_RE = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g
    var SLASH_RE = /\\\\/g

    function parseDependencies(code) {
        var ret = []

        code.replace(SLASH_RE, "")
            .replace(REQUIRE_RE, function(m, m1, m2) {
                if (m2) {
                    ret.push(m2)
                }
            })

        return ret
    }


    /**
     * module.js - The core of module loader
     */

    var cachedMods = FS.cache = {}
    var anonymousMeta

    var fetchingList = {}
    var fetchedList = {}
    var callbackList = {}

    var STATUS = Module.STATUS = {
        // 1 - The `module.uri` is being fetched
        FETCHING: 1,
        // 2 - The meta data has been saved to cachedMods
        SAVED: 2,
        // 3 - The `module.dependencies` are being loaded
        LOADING: 3,
        // 4 - The module are ready to execute
        LOADED: 4,
        // 5 - The module is being executed
        EXECUTING: 5,
        // 6 - The `module.exports` is available
        EXECUTED: 6
    }


    function Module(uri, deps) {
        this.uri = uri
        this.dependencies = deps || []
        this.exports = null
        this.status = 0

        // Who depends on me
        this._waitings = {}

        // The number of unloaded dependencies
        this._remain = 0
    }

// Resolve module.dependencies
    Module.prototype.resolve = function() {
        var mod = this
        var ids = mod.dependencies
        var uris = []

        for (var i = 0, len = ids.length; i < len; i++) {
            uris[i] = Module.resolve(ids[i], mod.uri)
        }
        return uris
    }

// Load module.dependencies and fire onload when all done
    Module.prototype.load = function() {
        var mod = this

        // If the module is being loaded, just wait it onload call
        if (mod.status >= STATUS.LOADING) {
            return
        }

        mod.status = STATUS.LOADING

        // Emit `load` event for plugins such as combo plugin
        var uris = mod.resolve()
        emit("load", uris)

        var len = mod._remain = uris.length
        var m

        // Initialize modules and register waitings
        for (var i = 0; i < len; i++) {
            m = Module.get(uris[i])

            if (m.status < STATUS.LOADED) {
                // Maybe duplicate: When module has dupliate dependency, it should be it's count, not 1
                m._waitings[mod.uri] = (m._waitings[mod.uri] || 0) + 1
            }
            else {
                mod._remain--
            }
        }

        if (mod._remain === 0) {
            mod.onload()
            return
        }

        // Begin parallel loading
        var requestCache = {}

        for (i = 0; i < len; i++) {
            m = cachedMods[uris[i]]

            if (m.status < STATUS.FETCHING) {
                m.fetch(requestCache)
            }
            else if (m.status === STATUS.SAVED) {
                m.load()
            }
        }

        // Send all requests at last to avoid cache bug in IE6-9. Issues#808
        for (var requestUri in requestCache) {
            if (requestCache.hasOwnProperty(requestUri)) {
                requestCache[requestUri]()
            }
        }
    }

// Call this method when module is loaded
    Module.prototype.onload = function() {
        var mod = this
        mod.status = STATUS.LOADED

        if (mod.callback) {
            mod.callback()
        }

        // Notify waiting modules to fire onload
        var waitings = mod._waitings
        var uri, m

        for (uri in waitings) {
            if (waitings.hasOwnProperty(uri)) {
                m = cachedMods[uri]
                m._remain -= waitings[uri]
                if (m._remain === 0) {
                    m.onload()
                }
            }
        }

        // Reduce memory taken
        delete mod._waitings
        delete mod._remain
    }

// Fetch a module
    Module.prototype.fetch = function(requestCache) {
        var mod = this
        var uri = mod.uri

        mod.status = STATUS.FETCHING

        // Emit `fetch` event for plugins such as combo plugin
        var emitData = { uri: uri }
        emit("fetch", emitData)
        var requestUri = emitData.requestUri || uri

        // Empty uri or a non-CMD module
        if (!requestUri || fetchedList[requestUri]) {
            mod.load()
            return
        }

        if (fetchingList[requestUri]) {
            callbackList[requestUri].push(mod)
            return
        }

        fetchingList[requestUri] = true
        callbackList[requestUri] = [mod]

        // Emit `request` event for plugins such as text plugin
        emit("request", emitData = {
            uri: uri,
            requestUri: requestUri,
            onRequest: onRequest,
            charset: data.charset
        })

        if (!emitData.requested) {
            requestCache ?
                requestCache[emitData.requestUri] = sendRequest :
                sendRequest()
        }

        function sendRequest() {
            FS.request(emitData.requestUri, emitData.onRequest, emitData.charset)
        }

        function onRequest() {
            delete fetchingList[requestUri]
            fetchedList[requestUri] = true

            // Save meta data of anonymous module
            if (anonymousMeta) {
                Module.save(uri, anonymousMeta)
                anonymousMeta = null
            }

            // Call callbacks
            var m, mods = callbackList[requestUri]
            delete callbackList[requestUri]
            while ((m = mods.shift())) m.load()
        }
    }

// Execute a module
    Module.prototype.exec = function () {
        var mod = this

        // When module is executed, DO NOT execute it again. When module
        // is being executed, just return `module.exports` too, for avoiding
        // circularly calling
        if (mod.status >= STATUS.EXECUTING) {
            return mod.exports
        }

        mod.status = STATUS.EXECUTING

        // Create require
        var uri = mod.uri

        function require(id) {
            return Module.get(require.resolve(id)).exec()
        }

        require.resolve = function(id) {
            return Module.resolve(id, uri)
        }

        require.async = function(ids, callback) {
            Module.use(ids, callback, uri + "_async_" + cid())
            return require
        }

        // Exec factory
        var factory = mod.factory

        var exports = FS.isFunction(factory) ?
            factory(require, mod.exports = {}, mod) :
            factory

        if (exports === undefined) {
            exports = mod.exports
        }

        // Reduce memory leak
        delete mod.factory

        mod.exports = exports
        mod.status = STATUS.EXECUTED

        // Emit `exec` event
        emit("exec", mod)

        return exports
    }

// Resolve id to uri
    Module.resolve = function(id, refUri) {
        // Emit `resolve` event for plugins such as text plugin
        var emitData = { id: id, refUri: refUri }
        emit("resolve", emitData)

        return emitData.uri || FS.resolve(emitData.id, refUri)
    }

// Define a module
    Module.define = function (id, deps, factory) {
        var argsLen = arguments.length

        // define(factory)
        if (argsLen === 1) {
            factory = id
            id = undefined
        }
        else if (argsLen === 2) {
            factory = deps

            // define(deps, factory)
            if (FS.isArray(id)) {
                deps = id
                id = undefined
            }
            // define(id, factory)
            else {
                deps = undefined
            }
        }

        // Parse dependencies according to the module factory code
        if (!FS.isArray(deps) && FS.isFunction(factory)) {
            deps = parseDependencies(factory.toString())
        }

        var meta = {
            id: id,
            uri: Module.resolve(id),
            deps: deps,
            factory: factory
        }

        // Try to derive uri in IE6-9 for anonymous modules
        if (!meta.uri && doc.attachEvent) {
            var script = getCurrentScript()

            if (script) {
                meta.uri = script.src
            }

            // NOTE: If the id-deriving methods above is failed, then falls back
            // to use onload event to get the uri
        }

        // Emit `define` event, used in nocache plugin, FS node version etc
        emit("define", meta)

        meta.uri ? Module.save(meta.uri, meta) :
            // Save information for "saving" work in the script onload event
            anonymousMeta = meta
    }

// Save meta data to cachedMods
    Module.save = function(uri, meta) {
        var mod = Module.get(uri)

        // Do NOT override already saved modules
        if (mod.status < STATUS.SAVED) {
            mod.id = meta.id || uri
            mod.dependencies = meta.deps || []
            mod.factory = meta.factory
            mod.status = STATUS.SAVED

            emit("save", mod)
        }
    }

// Get an existed module or create a new one
    Module.get = function(uri, deps) {
        return cachedMods[uri] || (cachedMods[uri] = new Module(uri, deps))
    }

// Use function is equal to load a anonymous module
    Module.use = function (ids, callback, uri) {
        var mod = Module.get(uri, FS.isArray(ids) ? ids : [ids])

        mod.callback = function() {
            var exports = []
            var uris = mod.resolve()

            for (var i = 0, len = uris.length; i < len; i++) {
                exports[i] = cachedMods[uris[i]].exec()
            }

            if (callback) {
                callback.apply(global, exports)
            }

            delete mod.callback
        }

        mod.load()
    }


// Public API

    FS.use = function(ids, callback) {
        Module.use(ids, callback, data.cwd + "_use_" + cid())
        return FS
    }

    Module.define.cmd = {}
    global.define = Module.define


// For Developers

    FS.Module = Module
    data.fetchedList = fetchedList
    data.cid = cid

    FS.require = function(id) {
        var mod = Module.get(Module.resolve(id))
        if (mod.status < STATUS.EXECUTING) {
            mod.onload()
            mod.exec()
        }
        return mod.exports
    }


    /**
     * config.js - The configuration for the loader
     */

// The root path to use for id2uri parsing
    data.base = loaderDir

// The loader directory
    data.dir = loaderDir

// The current working directory
    data.cwd = cwd

// The charset for requesting files
    data.charset = "utf-8"

// data.alias - An object containing shorthands of module id
// data.paths - An object containing path shorthands in module id
// data.vars - The {xxx} variables in module id
// data.map - An array containing rules to map module uri
// data.debug - Debug mode. The default value is false

    FS.config = function(configData) {

        for (var key in configData) {
            var curr = configData[key]
            var prev = data[key]

            // Merge object config such as alias, vars
            if (prev && FS.isObject(prev)) {
                for (var k in curr) {
                    prev[k] = curr[k]
                }
            }
            else {
                // Concat array config such as map
                if (FS.isArray(prev)) {
                    curr = prev.concat(curr)
                }
                // Make sure that `data.base` is an absolute path
                else if (key === "base") {
                    // Make sure end with "/"
                    if (curr.slice(-1) !== "/") {
                        curr += "/"
                    }
                    curr = addBase(curr)
                }

                // Set config
                data[key] = curr
            }
        }

        emit("config", configData)
        return FS
    }


    // trigger dom content loaded
    document.addEventListener( "DOMContentLoaded", function() {
        document.removeEventListener( "DOMContentLoaded", arguments.callee, false );
        FS.emit('ready');
    }, false );
})(this);


(function (global, FS, undefined) {

    // device info
    FS.device = function() {
        var defs = {
            platform: 'browser', // 平台 android, iphone, ipad, wphone, browser
            app: '', // mymoney, cardniu
            version: '', // app version
            entry: '' // mymoney hot, mymoney market
        };
        return defs;
    }();

    /**
     * 兼容老版【调用客户端方法】
     * @param callback
     * @param params
     */
    function mobilecallback(callback, params) {
        if (FS.device.app == 'mymoney') {
            if (FS.device.platform == 'android') {
                prompt(callback, params);
            } else if (FS.device.platform == 'iphone') {
                if (FS.device.version > 1) params = encodeURIComponent(params);
                //alert('feidee://' + callback + '/' + params);
                window.location.href = 'feidee://' + callback + '/' + params;
            }
        }
    }


    /**
     * 兼容android mymoney v4 || iphone mymoney 3
     * @param MethodName
     * @param JSONParamString
     * @param CallBackName
     * @param ExtraString
     * @constructor
     */
    function CallClient(MethodName, JSONParamString, CallBackName, ExtraString)
    {
        if (FS.device.app == 'mymoney') {
            if (FS.device.platform == 'android') {
                AndroidBbs[MethodName] && AndroidBbs[MethodName](JSONParamString, CallBackName, ExtraString);
            } else if (FS.device.platform == 'iphone') {
                window.location.href = 'feidee://BBS/'+MethodName+
                    '/?p='+JSONParamString+
                    '&cb='+CallBackName+
                    '&e='+ExtraString;
            }
        }
    }


    /**
     * 调用客户端方法
     * @param success 成功回调
     * @param failure 失败回调
     * @param service 客户端服务名
     * @param method 客户端方法名
     * @param params 传给客户端的参数（json string）
     * TODO native 关键字会导致yui压缩不成功（what a fuck day!）
     * FS.NB('requestLogin', '{"type":1}', 'loginResult', '');
     */
    function nativeBridge(success, failure, service, method, params) {
        if (arguments.length === 2) {
            return mobilecallback(success, failure);
        }

        if (arguments.length === 4) {
            return CallClient(success, failure, service, method);
        }

        return true;
    }

    FS.NB = nativeBridge;

})(this, FS);


/**
 * 兼容旧版，获取硬件信息
 */
(function (global, FS, undefined) {
    var ua = navigator.userAgent;
    var variables = {
        platform: function () {
            if (/android/i.test(ua)) return 'android';
            if (/iphone/i.test(ua)) return 'iphone';
            if (/ipad/i.test(ua)) return 'ipad';
            return 'other';
        }(),
        app: function() {
            if (/MyMoneySms/i.test(ua)) return 'cardniu'; // 卡牛
            if (/feideeAndroid|MyMoney/i.test(ua)) return 'mymoney'; // 随手记
            return 'browser'; // 直接浏览器打开
        }(),
        version: function () {
            if (/feideeAndroid-V4/i.test(ua)) {
                return 4;
            } else if (/feideeAndroid-V3/i.test(ua)) {
                return 3;
            } else if (/feideeAndroid-V2/i.test(ua)) {
                return 2;
            } else if (/iPhone\/1\.0/i.test(ua)) {
                return 1
            } else if (/iPhone\/2\.0/i.test(ua)) {
                return 2
            } else if (/iPhone\/3\.0/i.test(ua)) {
                return 3
            }
            return 0;
        }()
    };
    FS.extend(FS.device, variables);
})(this, FS);


/**
 * importStyle
 */
(function (global, FS, undefined) {
    var RE_NON_WORD = /\W/g
    var doc = document
    var head = document.getElementsByTagName('head')[0] ||
        document.documentElement
    var styleNode

    FS.importStyle = function(cssText, id) {
        if (id) {
            // Convert id to valid string
            id = id.replace(RE_NON_WORD, '-')

            // Don't add multiple times
            if (doc.getElementById(id)) return
        }

        var element

        // Don't share styleNode when id is spectied
        if (!styleNode || id) {
            element = doc.createElement('style')
            id && (element.id = id)

            // Adds to DOM first to avoid the css hack invalid
            head.appendChild(element)
        } else {
            element = styleNode
        }

        // IE
        if (element.styleSheet !== undefined) {

            // http://support.microsoft.com/kb/262161
            if (doc.getElementsByTagName('style').length > 31) {
                throw new Error('Exceed the maximal count of style tags in IE')
            }

            element.styleSheet.cssText += cssText
        }
        // W3C
        else {
            element.appendChild(doc.createTextNode(cssText))
        }

        if (!id) {
            styleNode = element
        }
    }
})(this, FS);


/**
 * FormData Polyfill
 */
(function(w) {
    if (w.FormData)
        return;
    function FormData() {
        this.fake = true;
        this.boundary = "--------FormData" + Math.random();
        this._fields = [];
    }
    FormData.prototype.append = function(key, value) {
        this._fields.push([key, value]);
    }
    FormData.prototype.toString = function() {
        var boundary = this.boundary;
        var body = "";
        this._fields.forEach(function(field) {
            body += "--" + boundary + "\r\n";
            // file upload
            if (field[1].name) {
                var file = field[1];
                body += "Content-Disposition: form-data; name=\""+ field[0] +"\"; filename=\""+ file.name +"\"\r\n";
                body += "Content-Type: "+ file.type +"\r\n\r\n";
                body += file.getAsBinary() + "\r\n";
            } else {
                body += "Content-Disposition: form-data; name=\""+ field[0] +"\";\r\n\r\n";
                body += field[1] + "\r\n";
            }
        });
        body += "--" + boundary +"--";
        return body;
    }
    w.FormData = FormData;
})(window);

/**
 * android 2.3(不含) 以下不支持 dataset
 * TODO 替代dataset
 */
(function(doc, ele) {
    if (!doc.documentElement.dataset) ele.prototype.dataset = {};
})(document, Element);



/**
 * 兼容旧版，android ssj客户端页面加载完回调 PageLoadFinished
 * TODO 用配置变量替代/m/
 */
(function(FS) {
    //if (FS.device.platform != 'android' || FS.device.app != 'mymoney') return;
    if (FS.device.app != 'mymoney') return;
    FS.on('ready', function() {
        FS.off('ready', arguments.callee);
        var href = window.location.href;
        setTimeout(function () {
            var page = href.replace(/.*\/m\//, '').replace(/\..*/, '');
            FS.NB('PageLoadFinished', page);
        }, 50);
    });
})(FS);
FS.config({
    base: FS.ASSETS_ROOT + '/m/',
    paths: {
        m: FS.ASSETS_ROOT + '/m'
    }
});
