/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/js/commentSection.js":
/*!*****************************************!*\
  !*** ./src/client/js/commentSection.js ***!
  \*****************************************/
/***/ (() => {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar videobox = document.getElementById(\"videobox\");\nvar form = document.getElementById(\"commentForm\");\n\nvar addComment = function addComment(text) {\n  //새로고침하지 않아도 바로 댓글내용이 보이도록 fake댓글 만들기\n  var videoComments = document.querySelector(\".video__comments ul\");\n  var newComment = document.createElement(\"li\");\n  newComment.className = \"video__comment\";\n  var icon = document.createElement(\"i\");\n  icon.className = \"fas fa-comment\";\n  var span = document.createElement(\"span\");\n  span.innerText = \" \".concat(text);\n  newComment.appendChild(icon);\n  newComment.appendChild(span);\n  videoComments.prepend(newComment); //appendChild = 순서대로, prepend = 역순으로\n};\n\nvar handleSubmit = /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {\n    var textarea, text, videoId, _yield$fetch, status;\n\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            event.preventDefault(); //이벤트 작동시 브라우저가 행동을 멈춤. 그렇게하지 않으면 폼을 제출하고 순식간에 초기화됌\n\n            textarea = form.querySelector(\"textarea\");\n            text = textarea.value;\n            videoId = videobox.dataset.id;\n\n            if (!(text === \"\")) {\n              _context.next = 6;\n              break;\n            }\n\n            return _context.abrupt(\"return\");\n\n          case 6:\n            _context.next = 8;\n            return fetch(\"/api/videos/\".concat(videoId, \"/comment\"), {\n              //await로 status값을 응답받음.//JS 내용을 backend로 내보내는 역활\n              method: \"POST\",\n              headers: {\n                \"Content-Type\": \"application/json\" //express 미들웨어가 제대로 (변환)읽을 수 있도록, String 처럼 보이지만 Js object 임을 알림.\n\n              },\n              body: JSON.stringify({\n                text: text\n              }) //req.body 를 보냄. text를 string화 시키고, index.js에 app.use(express.json())를 추가하여 JS object로 변환;\n\n            });\n\n          case 8:\n            _yield$fetch = _context.sent;\n            status = _yield$fetch.status;\n            textarea.value = \"\"; //텍스트 입력칸 초기화\n\n            if (status === 201) {\n              addComment(text); //201status라면 댓글작성\n            }\n\n          case 12:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n\n  return function handleSubmit(_x) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nif (form) {\n  form.addEventListener(\"submit\", handleSubmit);\n}\n\n//# sourceURL=webpack://mytube/./src/client/js/commentSection.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/commentSection.js"]();
/******/ 	
/******/ })()
;