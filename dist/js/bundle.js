!function o(n,t,i){function e(r,c){if(!t[r]){if(!n[r]){var l="function"==typeof require&&require;if(!c&&l)return l(r,!0);if(u)return u(r,!0);var s=new Error("Cannot find module '"+r+"'");throw s.code="MODULE_NOT_FOUND",s}var a=t[r]={exports:{}};n[r][0].call(a.exports,function(o){var t=n[r][1][o];return e(t?t:o)},a,a.exports,o,n,t,i)}return t[r].exports}for(var u="function"==typeof require&&require,r=0;r<i.length;r++)e(i[r]);return e}({1:[function(){var o=function(){function o(o){this.num=o,this.id="cube-"+o,this.$el=$("#"+this.id),this.value=1;var n=this;if(this.$el.on("click",function(){n.choose()}),0===this.$el.length)throw"Die number "+o+" does not exist"}var n,t,e,u=5,r=!1,c=!1,l=[],s=[],a=null,f=500,h={1:"show-front",2:"show-back",3:"show-right",4:"show-left",5:"show-top",6:"show-bottom"};o.prototype={removeFromLive:function(){var o=this;l=l.filter(function(n){return n.id!=o.id})},choose:function(){if(c)return void w("You cannot choose a die until you roll again.");if(!r)return void w("You cannot choose a die until you have rolled.");$("#quit-and-score").css("display","block");var o=this,n=l.filter(function(n){return n.value==o.value});if(null===a){a=this.value;for(num in n)n[num].moveToPool()}else{if(this.value==a||this.value>a)for(num in n)n[num].moveToPool();if(a>this.value)return void w("You can't choose dice with a value lower than your match.")}c=!0,0==l.length&&q()},moveToPool:function(){this.removeFromLive(),s.push(this),this.$el.closest(".cube-wrapper").detach().appendTo(e)},isInPool:function(){},isLive:function(){},roll:function(){var o=m();this.$el[0].className="cube "+h[o],this.value=o}};var v=function(){for(i=1;i<=u;i++)l.push(new o(i));t=$("#live-container"),e=$("#match-container"),n=$("#roll-button"),$quitAndScoreButton=$("#quit-and-score"),n.on("click",function(){d()}),$quitAndScoreButton.on("click",function(){q()})},d=function(){$(".cube-wrapper").removeClass("queued"),r=!0;for(cubeNum in l)l[cubeNum].roll();c=!1;for(cubeNum in l)if(l[cubeNum].value>=a)return;p(function(){w("Fail roll!"),b()})},m=function(){return Math.round(5*Math.random())+1},p=function(o){setTimeout(o,f)},w=function(o){var n=$('<div class="alert">').text(o);$("#notifications").append(n),setTimeout(function(){n.slideUp()},3e3)},b=function(){y(1)},q=function(){y("@todo")},y=function(o){w("Your score was: "+o)};return{init:v}}();$(function(){o.init()})},{}]},{},[1]);