!function o(i,e,n){function t(u,c){if(!e[u]){if(!i[u]){var s="function"==typeof require&&require;if(!c&&s)return s(u,!0);if(r)return r(u,!0);var l=new Error("Cannot find module '"+u+"'");throw l.code="MODULE_NOT_FOUND",l}var a=e[u]={exports:{}};i[u][0].call(a.exports,function(o){var e=i[u][1][o];return t(e?e:o)},a,a.exports,o,i,e,n)}return e[u].exports}for(var r="function"==typeof require&&require,u=0;u<n.length;u++)t(n[u]);return t}({1:[function(){var o=function(){var o={},i=o.hasOwnProperty;return{subscribe:function(e,n){i.call(o,e)||(o[e]=[]);var t=o[e].push(n)-1;return{remove:function(){delete o[e][t]}}},publish:function(e,n){i.call(o,e)&&o[e].forEach(function(o){o(void 0!==n?n:{})})}}}(),e=function(){function e(o){this.num=o,this.id="cube-"+o,this.$el=$("#"+this.id),this.value=1;var i=this;if(this.$el.on("click",function(){i.choose()}),0===this.$el.length)throw"Die number "+o+" does not exist"}var n,t,r,u,c=5,s=!0,l=!1,a=!1,f=[],h=[],v=0,d=500,p=0,b={1:"show-front",2:"show-back",3:"show-right",4:"show-left",5:"show-top",6:"show-bottom"};e.prototype={removeFromLive:function(){var o=this;f=f.filter(function(i){return i.id!=o.id})},choose:function(){if(!this.isLive())return void P("Not live, no choos-y");if(a)return void T("You cannot choose a die until you roll again.");if(!l)return void T("You cannot choose a die until you have rolled.");if(this.value<v)return void T("You can't choose dice with a value lower than your match.");this.value>v&&(v=this.value);var i=this;sameValueDice=f.filter(function(o){return o.value==i.value});for(var e in sameValueDice)sameValueDice[e].moveToPool();o.publish("die.chosen",this)},moveToPool:function(){this.removeFromLive(),h.push(this),o.publish("die.movedToPool",this)},isLive:function(){var o=this,i=f.filter(function(i){return i.id==o.id});return i.length>0},roll:function(){var i=y();this.value=i,o.publish("die.rolled",this)}};var m=function(){o.subscribe("dice.rolled",function(){$(".cube-wrapper").removeClass("queued"),l=!0,a=!1;for(var o in f)if(f[o].value>=v)return;q(function(){T("Fail roll!"),x()})}),o.subscribe("die.chosen",function(){$("#quit-and-score").css("display","inline-block"),a=!0,k(),0===f.length&&(P("Quitting because live length is 0"),D())}),o.subscribe("die.movedToPool",function(o){o.$el.closest(".cube-wrapper").detach().appendTo(r)}),o.subscribe("die.rolled",function(o){o.$el[0].className="cube "+b[o.value]})},w=function(){for(i=1;i<=c;i++)f.push(new e(i));t=$("#live-container"),r=$("#match-container"),n=$("#roll-button"),$quitAndScoreButton=$("#quit-and-score"),u=$("#current-score"),n.on("click",function(){g()}),$quitAndScoreButton.on("click",function(){P("Quitting because quit and score button pressed."),D()}),m()},g=function(){for(var i in f)f[i].roll();o.publish("dice.rolled")},y=function(){return Math.round(5*Math.random())+1},q=function(o){setTimeout(o,d)},T=function(o){var i=$('<div class="alert">').text(o);$("#notifications").append(i),setTimeout(function(){i.slideUp()},3e3)},x=function(){L(1)},k=function(){var o=0;for(var i in h)o+=h[i].value;p=o,u.text(p)},D=function(){k(),L(p)},L=function(o){T("You got "+o+" point(s) for your podcast of choice"),$("#screen").css("display","block")},P=function(o){s&&console.log(o)};return{init:w}}();$(function(){e.init()})},{}]},{},[1]);