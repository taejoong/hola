// LICENSE_CODE ZON
'use strict'; /*jslint node:true, browser:true*/
(function(){
var define;
var is_node = typeof module=='object' && module.exports;
if (!is_node)
    define = self.define;
else
    define = require('./require_node.js').define(module, '../');
define(['/util/array.js'], function(array){
var E = {};

var is_jtest = false;
var jtest_vals = {};
var MAX_INT = 2147483647;
var MIN_INT = -MAX_INT-1;

function jtest_pop(s){
    var elm;
    if (s===undefined)
	return null;
    if ((elm = jtest_vals[s])===undefined)
	return null;
    return elm.shift();
}

E.rand = function(s){
    var ret;
    if (is_jtest && (ret = jtest_pop(s))!==null)
	return ret;
    return Math.random();
};

E.rand_int = function(s){
    var ret;
    if (is_jtest && (ret = jtest_pop(s))!==null)
	return ret;
    return Math.floor(Math.random()*(MAX_INT-MIN_INT+1))-MAX_INT;
};

E.rand_range = function(from, to, s){
    var ret;
    if (is_jtest && (ret = jtest_pop(s))!==null)
        return ret;
    return Math.floor(Math.random()*(to-from))+from;
};

E.jtest_push = function(s, arr){
    if (!jtest_vals[s])
	jtest_vals[s] = [];
    if (Array.isArray(arr))
	array.push(jtest_vals[s], arr);
    else
	jtest_vals[s].push(arr);
};

E.jtest_init = function(){
    is_jtest = true;
    jtest_vals = {};
};

E.jtest_uninit = function(){
    is_jtest = false; };

E.basic_u32 = function(v){ return (1103515245*v+12345) >>> 0; };
E.basic_u31 = function(v){ return (1103515245*v+12345) & 0x7fffffff; };

return E; }); }());
