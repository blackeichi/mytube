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

eval("var videobox = document.getElementById(\"videobox\");\nvar form = document.getElementById(\"commentForm\");\n\nvar handleSubmit = function handleSubmit(event) {\n  event.preventDefault(); //이벤트 작동시 브라우저가 행동을 멈춤. 그렇게하지 않으면 폼을 제출하고 순식간에 초기화됌\n\n  var textarea = form.querySelector(\"textarea\");\n  var text = textarea.value;\n  var videoId = videobox.dataset.id;\n\n  if (text === \"\") {\n    return;\n  } //작성된 text가 없으면 return\n\n\n  fetch(\"/api/videos/\".concat(videoId, \"/comment\"), {\n    //JS 내용을 backend로 내보내는 역활\n    method: \"POST\",\n    headers: {\n      \"Content-Type\": \"application/json\" //express 미들웨어가 제대로 (변환)읽을 수 있도록, String 처럼 보이지만 Js object 임을 알림.\n\n    },\n    body: JSON.stringify({\n      text: text\n    }) //req.body 를 보냄. text를 string화 시키고, index.js에 app.use(express.json())를 추가하여 JS object로 변환;\n\n  });\n};\n\nif (form) {\n  form.addEventListener(\"submit\", handleSubmit);\n}\n\n//# sourceURL=webpack://mytube/./src/client/js/commentSection.js?");

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