/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../node_modules/babel-core/lib/transformation/file/options sync recursive":
/*!************************************************************************!*\
  !*** ../node_modules/babel-core/lib/transformation/file/options/ sync ***!
  \************************************************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "../node_modules/babel-core/lib/transformation/file/options sync recursive";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "../node_modules/babel-core/lib/transformation/file sync recursive":
/*!****************************************************************!*\
  !*** ../node_modules/babel-core/lib/transformation/file/ sync ***!
  \****************************************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "../node_modules/babel-core/lib/transformation/file sync recursive";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "./Routing/404.router.js":
/*!*******************************!*\
  !*** ./Routing/404.router.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var router = __webpack_require__(/*! express */ "../node_modules/express/index.js").Router();

var Pagenotfounder = __webpack_require__(/*! ../controller/404.controller */ "./controller/404.controller.js");

router.get('/', Pagenotfounder);
module.exports = router;

/***/ }),

/***/ "./Routing/auth.router.js":
/*!********************************!*\
  !*** ./Routing/auth.router.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var router = __webpack_require__(/*! express */ "../node_modules/express/index.js").Router();

var _require = __webpack_require__(/*! ../controller/auth.controller */ "./controller/auth.controller.js"),
    signup = _require.signup,
    login = _require.login;

router.post('/signup', signup);
router.post('/login', function () {
  console.log('login', login);
});
module.exports = router;

/***/ }),

/***/ "./controller/404.controller.js":
/*!**************************************!*\
  !*** ./controller/404.controller.js ***!
  \**************************************/
/***/ ((module) => {

var pageNotFound = function pageNotFound(req, res, next) {
  var message = "Page Not Found";
  res.status(404).send({
    message: message,
    status: 404
  });
};

module.exports = pageNotFound;

/***/ }),

/***/ "./controller/auth.controller.js":
/*!***************************************!*\
  !*** ./controller/auth.controller.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var studentModel = __webpack_require__(/*! ../models/student.model */ "./models/student.model.js");

var _require = __webpack_require__(/*! ../validations/auth.validation */ "./validations/auth.validation.js"),
    createStudentValidation = _require.createStudentValidation,
    loginValidation = _require.loginValidation;

var signup = function signup(req, res, next) {
  var _createStudentValidat = createStudentValidation(req.body),
      error = _createStudentValidat.error;

  if (error) {
    res.status(400).send({
      message: error.details['0'].message
    });
  } else {
    try {
      var _req$body = req.body,
          firstName = _req$body.firstName,
          lastName = _req$body.lastName,
          email = _req$body.email,
          Phone = _req$body.Phone,
          address = _req$body.address,
          meeting_time = _req$body.meeting_time;
      var student = new studentModel({
        firstName: firstName,
        lastName: lastName,
        email: email,
        Phone: Phone,
        address: address,
        meeting_time: meeting_time
      });
      res.send({
        message: "sign up api"
      });
    } catch (error) {
      res.status(400).send({
        message: error.details['0'].message
      });
    }
  }
};

var login = function login(req, res, next) {
  var _loginValidation = loginValidation(req.body),
      error = _loginValidation.error;

  if (error) {
    res.status(error.status).send({
      message: error.details['0'].message
    });
  } else {
    try {
      var _req$body2 = req.body,
          username = _req$body2.username,
          password = _req$body2.password;
      var student = new studentModel({
        username: username,
        password: password
      });
      res.send({
        data: student
      });
    } catch (error) {
      res.status(error.status).send({
        message: error.details['0'].message
      });
    }
  }
};

module.exports = {
  signup: signup,
  login: login
};

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var express = __webpack_require__(/*! express */ "../node_modules/express/index.js");

var _require = __webpack_require__(/*! express-graphql */ "../node_modules/express-graphql/index.js"),
    graphqlHTTP = _require.graphqlHTTP;

var schema = __webpack_require__(/*! ./schema/schema */ "./schema/schema.js");

var app = express();

var authRouter = __webpack_require__(/*! ./Routing/auth.router */ "./Routing/auth.router.js");

var pageNotFound = __webpack_require__(/*! ./Routing/404.router */ "./Routing/404.router.js"); // Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.


var webpack = __webpack_require__(/*! webpack */ "../node_modules/webpack/lib/index.js");

var config = __webpack_require__(/*! ../webpack.config.js */ "../webpack.config.js");

var compiler = webpack(config);

var webpackDevMiddleware = __webpack_require__(/*! webpack-dev-middleware */ "../node_modules/webpack-dev-middleware/dist/cjs.js")(compiler, config.devServer); // dotenv 


var dotenv = __webpack_require__(/*! dotenv */ "../node_modules/dotenv/lib/main.js").config();

var port = process.env.PORT || 3051; // mongoose 

var mongoose = __webpack_require__(/*! mongoose */ "../node_modules/mongoose/dist/browser.umd.js");

mongoose.connect("mongodb://localhost:".concat(process.env.MONGODB_PORT), {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {})["catch"](function (err) {
  console.log(err);
});
mongoose.connection.once('open', function () {
  console.log('mongodb connection established');
});
var staticMiddleware = express["static"]('../dist');
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));
app.use(staticMiddleware);
app.use("/auth", authRouter);
app.use('/graphql', graphqlHTTP({
  schema: schema,
  // rootValue: root,
  graphiql: true
}));
app.use("*", pageNotFound);
app.use(pageNotFound);
app.listen(port, function () {
  console.log('Server listening on port ' + port);
});

/***/ }),

/***/ "./models/student.model.js":
/*!*********************************!*\
  !*** ./models/student.model.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var mongoose = __webpack_require__(/*! mongoose */ "../node_modules/mongoose/dist/browser.umd.js");

var Schema = mongoose.Schema;
var studentSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    max: 50
  },
  lastName: {
    type: String,
    required: true,
    max: 50
  },
  email: {
    type: String,
    required: true,
    max: 50
  },
  Phone: {
    type: Number,
    required: true,
    max: 10
  },
  address: {
    type: String
  },
  meeting_time: {
    type: Date,
    "default": new Date()
  }
});
module.exports = mongoose.model('user', studentSchema);

/***/ }),

/***/ "./schema/schema.js":
/*!**************************!*\
  !*** ./schema/schema.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var graphql = __webpack_require__(/*! graphql */ "../node_modules/graphql/index.mjs");

var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLSchema = graphql.GraphQLSchema;

/***/ }),

/***/ "./validations/auth.validation.js":
/*!****************************************!*\
  !*** ./validations/auth.validation.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Joi = __webpack_require__(/*! @hapi/joi */ "../node_modules/@hapi/joi/dist/joi-browser.min.js");

var createStudentValidation = function createStudentValidation(data) {
  var validationSchema = Joi.object({
    'firstName': Joi.string().required('firstName is required').min(5),
    'lastName': Joi.string().required('lastName is required').min(5),
    'email': Joi.string().required('email is required').min(5),
    'Phone': Joi.number().required('Phone is required').min(5),
    'address': Joi.string().required('address is required') //'meeting_time':Joi.data().required('meeting_time is required'),

  });
  return validationSchema.validate(data);
};

var loginValidation = function loginValidation(data) {
  var validationSchema = Joi.object({
    username: Joi.string().required('username is required').min(5),
    password: Joi.string().required('password is required').min(5)
  });
  return validationSchema.validate(data);
};

module.exports = {
  createStudentValidation: createStudentValidation,
  loginValidation: loginValidation
};

/***/ }),

/***/ "../webpack.config.js":
/*!****************************!*\
  !*** ../webpack.config.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var __dirname = "/";
var path = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'path'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var Minifyplugin = __webpack_require__(/*! babel-minify-webpack-plugin */ "../node_modules/babel-minify-webpack-plugin/dist/cjs.js");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: {
    index: './index.js'
  },
  context: path.resolve(__dirname, 'src'),
  devServer: {
    contentBase: "./dist",
    hot: true,
    overlay: true,
    status: {
      color: true
    }
  },
  plugins: [new Minifyplugin({
    comments: false
  })],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].bundle.js',
    clean: true,
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    rules: [{
      // test: /.(js|jsx)$/, 
      test: /\.js?$/,
      exclude: '/node_modules',
      loader: 'babel-loader'
    }]
  },
  resolveLoader: {
    modules: [__dirname + '/node_modules']
  }
};

/***/ }),

/***/ "../node_modules/express/lib sync recursive":
/*!*****************************************!*\
  !*** ../node_modules/express/lib/ sync ***!
  \*****************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "../node_modules/express/lib sync recursive";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "../node_modules/jest-worker/build/base sync recursive":
/*!****************************************************!*\
  !*** ../node_modules/jest-worker/build/base/ sync ***!
  \****************************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "../node_modules/jest-worker/build/base sync recursive";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "../node_modules/jest-worker/build/workers sync recursive":
/*!*******************************************************!*\
  !*** ../node_modules/jest-worker/build/workers/ sync ***!
  \*******************************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "../node_modules/jest-worker/build/workers sync recursive";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "../node_modules/jest-worker/build sync recursive":
/*!***********************************************!*\
  !*** ../node_modules/jest-worker/build/ sync ***!
  \***********************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "../node_modules/jest-worker/build sync recursive";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "../node_modules/loader-runner/lib sync recursive":
/*!***********************************************!*\
  !*** ../node_modules/loader-runner/lib/ sync ***!
  \***********************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "../node_modules/loader-runner/lib sync recursive";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "../node_modules/terser-webpack-plugin/dist sync recursive":
/*!********************************************************!*\
  !*** ../node_modules/terser-webpack-plugin/dist/ sync ***!
  \********************************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "../node_modules/terser-webpack-plugin/dist sync recursive";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "../node_modules/webpack/hot sync recursive ^\\.\\/lazy\\-compilation\\-.*\\.js$":
/*!*************************************************************************!*\
  !*** ../node_modules/webpack/hot/ sync ^\.\/lazy\-compilation\-.*\.js$ ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./lazy-compilation-node.js": "../node_modules/webpack/hot/lazy-compilation-node.js",
	"./lazy-compilation-web.js": "../node_modules/webpack/hot/lazy-compilation-web.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../node_modules/webpack/hot sync recursive ^\\.\\/lazy\\-compilation\\-.*\\.js$";

/***/ }),

/***/ "../node_modules/webpack/lib/serialization sync recursive":
/*!*******************************************************!*\
  !*** ../node_modules/webpack/lib/serialization/ sync ***!
  \*******************************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "../node_modules/webpack/lib/serialization sync recursive";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "?e6a8":
/*!**********************!*\
  !*** path (ignored) ***!
  \**********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?5d80":
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?9d4a":
/*!************************!*\
  !*** pnpapi (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?f400":
/*!*******************************!*\
  !*** ./extend-node (ignored) ***!
  \*******************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?8497":
/*!***************************!*\
  !*** ./streams (ignored) ***!
  \***************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?8546":
/*!**********************!*\
  !*** http (ignored) ***!
  \**********************/
/***/ (() => {

/* (ignored) */

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/amd options */
/******/ 	(() => {
/******/ 		__webpack_require__.amdO = {};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) var result = runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_hapi_joi_dist_joi-browser_min_js-node_modules_babel-minify-webpack-plugi-7c0bc3"], () => (__webpack_require__("./index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.bundle.js.map