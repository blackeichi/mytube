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

/***/ "./src/client/js/sidebar.js":
/*!**********************************!*\
  !*** ./src/client/js/sidebar.js ***!
  \**********************************/
/***/ (() => {

eval("var sidebar = document.getElementById(\"sidebar\");\nvar sidebar2 = document.getElementById(\"sidebar_extend\");\nvar sidebarBtn = document.getElementById(\"sidebarBtn\");\nvar sidebarCloseBtn = document.getElementById(\"sidebarCloseBtn\");\nvar basemenu = document.getElementById(\"basemenu\");\n\nvar handleClick = function handleClick() {\n  sidebar2.style.width = \"25%\";\n  sidebar2.style.display = \"flex\";\n  sidebar.style.display = \"none\"; //sidebarBtn.style.display = \"none\";\n};\n\nvar handleClose = function handleClose() {\n  sidebar2.style.display = \"none\";\n  sidebar.style.display = \"flex\";\n};\n\nsidebarBtn.addEventListener(\"click\", handleClick);\nsidebarCloseBtn.addEventListener(\"click\", handleClose);\n\n//# sourceURL=webpack://mytube/./src/client/js/sidebar.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/sidebar.js"]();
/******/ 	
/******/ })()
;