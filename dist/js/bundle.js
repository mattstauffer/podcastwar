!function n(r,o,t){function e(u,c){if(!o[u]){if(!r[u]){var f="function"==typeof require&&require;if(!c&&f)return f(u,!0);if(i)return i(u,!0);var a=new Error("Cannot find module '"+u+"'");throw a.code="MODULE_NOT_FOUND",a}var s=o[u]={exports:{}};r[u][0].call(s.exports,function(n){var o=r[u][1][n];return e(o?o:n)},s,s.exports,n,r,o,t)}return o[u].exports}for(var i="function"==typeof require&&require,u=0;u<t.length;u++)e(t[u]);return e}({1:[function(){var n=function(){var n,r,o,t=6,e=[],u=[],c={1:"show-back",2:"show-right",3:"show-left",4:"show-top",5:"show-bottom",6:"show-front"},f=function(){for(i=1;i<=t;i++){var u=$("#cube-"+i);u.on("click",function(){h($(this))}),e.push(u)}r=$("#live-container"),o=$("#pool-container"),n=$("#roll-button"),n.on("click",function(){a()})},a=function(){$(".cube-wrapper").removeClass("queued");for(cubeNum in e)s(e[cubeNum])},s=function(n){n[0].className="cube "+c[p()]},p=function(){return Math.round(5*Math.random())+1},h=function(n){var r=function(n){e=e.filter(function(r){return r.id!=n[0].id})};r(n),u.push(n),n.closest(".cube-wrapper").detach().appendTo(o)};return{init:f}}();$(function(){n.init()})},{}]},{},[1]);