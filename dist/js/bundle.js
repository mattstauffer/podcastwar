!function o(n,t,i){function e(u,c){if(!t[u]){if(!n[u]){var a="function"==typeof require&&require;if(!c&&a)return a(u,!0);if(r)return r(u,!0);var s=new Error("Cannot find module '"+u+"'");throw s.code="MODULE_NOT_FOUND",s}var l=t[u]={exports:{}};n[u][0].call(l.exports,function(o){var t=n[u][1][o];return e(t?t:o)},l,l.exports,o,n,t,i)}return t[u].exports}for(var r="function"==typeof require&&require,u=0;u<i.length;u++)e(i[u]);return e}({1:[function(){var o=function(){function o(o){this.num=o,this.id="cube-"+o,this.$el=$("#"+this.id),this.value=1;var n=this;if(this.$el.on("click",function(){n.choose()}),0===this.$el.length)throw"Die number "+o+" does not exist"}var n,t,e,r=5,u=!1,c=!1,a=[],s=[],l=0,f=500,h={1:"show-front",2:"show-back",3:"show-right",4:"show-left",5:"show-top",6:"show-bottom"};o.prototype={removeFromLive:function(){var o=this;a=a.filter(function(n){return n.id!=o.id})},choose:function(){if(c)return void w("You cannot choose a die until you roll again.");if(!u)return void w("You cannot choose a die until you have rolled.");$("#quit-and-score").css("display","block");var o=this,n=a.filter(function(n){return n.value==o.value});if(this.value<l)return void w("You can't choose dice with a value lower than your match.");this.value>l&&(l=this.value);for(num in n)n[num].moveToPool();c=!0,0==a.length&&q()},moveToPool:function(){this.removeFromLive(),s.push(this),this.$el.closest(".cube-wrapper").detach().appendTo(e)},isInPool:function(){},isLive:function(){},roll:function(){var o=m();this.$el[0].className="cube "+h[o],this.value=o}};var v=function(){for(i=1;i<=r;i++)a.push(new o(i));t=$("#live-container"),e=$("#match-container"),n=$("#roll-button"),$quitAndScoreButton=$("#quit-and-score"),n.on("click",function(){d()}),$quitAndScoreButton.on("click",function(){q()})},d=function(){$(".cube-wrapper").removeClass("queued"),u=!0;for(cubeNum in a)a[cubeNum].roll();c=!1;for(cubeNum in a)if(a[cubeNum].value>=l)return;p(function(){w("Fail roll!"),b()})},m=function(){return Math.round(5*Math.random())+1},p=function(o){setTimeout(o,f)},w=function(o){var n=$('<div class="alert">').text(o);$("#notifications").append(n),setTimeout(function(){n.slideUp()},3e3)},b=function(){y(1)},q=function(){var o=0;for(die in s)o+=s[die].value;y(o)},y=function(o){w("You got "+o+" soldiery points for your podcast of choice")};return{init:v}}();$(function(){o.init()})},{}]},{},[1]);