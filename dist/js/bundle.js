!function n(o,t,i){function e(u,c){if(!t[u]){if(!o[u]){var s="function"==typeof require&&require;if(!c&&s)return s(u,!0);if(r)return r(u,!0);var a=new Error("Cannot find module '"+u+"'");throw a.code="MODULE_NOT_FOUND",a}var l=t[u]={exports:{}};o[u][0].call(l.exports,function(n){var t=o[u][1][n];return e(t?t:n)},l,l.exports,n,o,t,i)}return t[u].exports}for(var r="function"==typeof require&&require,u=0;u<i.length;u++)e(i[u]);return e}({1:[function(){var n=function(){var n={},o=n.hasOwnProperty;return{subscribe:function(t,i){o.call(n,t)||(n[t]=[]);var e=n[t].push(i)-1;return{remove:function(){delete n[t][e]}}},publish:function(t,i){o.call(n,t)&&n[t].forEach(function(n){n(void 0!==i?i:{})})}}}(),o=function(){function o(n){this.num=n,this.id="cube-"+n,this.$el=$("#"+this.id),this.value=1;var o=this;if(this.$el.on("click",function(){o.choose()}),0===this.$el.length)throw"Die number "+n+" does not exist"}var t,e,r,u,c=5,s=!0,a=!1,l=!1,f=[],h=[],v=0,d=500,p=0,b={1:"show-front",2:"show-back",3:"show-right",4:"show-left",5:"show-top",6:"show-bottom"};o.prototype={removeFromLive:function(){var n=this;f=f.filter(function(o){return o.id!=n.id})},choose:function(){if(!this.isLive())return void N("Not live, no choos-y");if(l)return void x("You cannot choose a die until you roll again.");if(!a)return void x("You cannot choose a die until you have rolled.");$("#quit-and-score").css("display","inline-block");var n=this,o=f.filter(function(o){return o.value==n.value});if(this.value<v)return void x("You can't choose dice with a value lower than your match.");this.value>v&&(v=this.value);for(var t in o)o[t].moveToPool();l=!0,T(),0===f.length&&(N("Quitting because live length is 0"),L())},moveToPool:function(){this.removeFromLive(),h.push(this),this.$el.closest(".cube-wrapper").detach().appendTo(r)},isLive:function(){var n=this,o=f.filter(function(o){return o.id==n.id});return o.length>0},roll:function(){var n=y();this.$el[0].className="cube "+b[n],this.value=n}};var m=function(){n.subscribe("die.chosen",function(){})},w=function(){for(i=1;i<=c;i++)f.push(new o(i));e=$("#live-container"),r=$("#match-container"),t=$("#roll-button"),$quitAndScoreButton=$("#quit-and-score"),u=$("#current-score"),t.on("click",function(){g()}),$quitAndScoreButton.on("click",function(){N("Quitting because quit and score button pressed."),L()}),m()},g=function(){$(".cube-wrapper").removeClass("queued"),a=!0;for(var n in f)f[n].roll();l=!1;for(n in f)if(f[n].value>=v)return;q(function(){x("Fail roll!"),k()})},y=function(){return Math.round(5*Math.random())+1},q=function(n){setTimeout(n,d)},x=function(n){var o=$('<div class="alert">').text(n);$("#notifications").append(o),setTimeout(function(){o.slideUp()},3e3)},k=function(){F(1)},T=function(){var n=0;for(var o in h)n+=h[o].value;p=n,u.text(p)},L=function(){T(),F(p)},F=function(n){x("You got "+n+" point(s) for your podcast of choice"),$("#screen").css("display","block")},N=function(n){s&&console.log(n)};return{init:w}}();$(function(){o.init()})},{}]},{},[1]);