!function e(i,o,n){function t(r,c){if(!o[r]){if(!i[r]){var s="function"==typeof require&&require;if(!c&&s)return s(r,!0);if(u)return u(r,!0);var l=new Error("Cannot find module '"+r+"'");throw l.code="MODULE_NOT_FOUND",l}var a=o[r]={exports:{}};i[r][0].call(a.exports,function(e){var o=i[r][1][e];return t(o?o:e)},a,a.exports,e,i,o,n)}return o[r].exports}for(var u="function"==typeof require&&require,r=0;r<n.length;r++)t(n[r]);return t}({1:[function(){var e=function(){var i={},e=i.hasOwnProperty;return{subscribe:function(o,n){e.call(i,o)||(i[o]=[]);var t=i[o].push(n)-1;return{remove:function(){delete i[o][t]}}},publish:function(o,n){e.call(i,o)&&i[o].forEach(function(i){i(void 0!==n?n:{})})}}}(),o=function(){function o(i){this.num=i,this.id="cube-"+i,this.$el=$("#"+this.id),this.value=1;var e=this;if(this.$el.on("click",function(){e.choose()}),0===this.$el.length)throw"Die number "+i+" does not exist"}var n,t,u,r,c=5,s=!0,l=!1,a=!1,f=[],h=[],d=0,v=500,p=0,b={1:"show-front",2:"show-back",3:"show-right",4:"show-left",5:"show-top",6:"show-bottom"},m={fmgs:"The Five-Minute Geek Show","mildly-alarming":"The Mildly Alarming Podcast"};o.prototype={removeFromLive:function(){var i=this;f=f.filter(function(e){return e.id!=i.id})},choose:function(){if(!this.isLive())return void O("Not live, no choos-y");if(a)return void D("You cannot choose a die until you roll again.");if(!l)return void D("You cannot choose a die until you have rolled.");if(this.value<d)return void D("You can't choose dice with a value lower than your match.");this.value>d&&(d=this.value);var i=this;sameValueDice=f.filter(function(e){return e.value==i.value});for(var o in sameValueDice)sameValueDice[o].moveToPool();e.publish("die.chosen",this)},moveToPool:function(){this.removeFromLive(),h.push(this),e.publish("die.movedToPool",this)},isLive:function(){var i=this,e=f.filter(function(e){return e.id==i.id});return e.length>0},roll:function(){var i=T();this.value=i,e.publish("die.rolled",this)}};var g=function(){e.subscribe("dice.rolled",function(){$(".cube-wrapper").removeClass("queued")}),e.subscribe("dice.rolled",function(){l=!0,a=!1}),e.subscribe("dice.rolled",function(){x.liveAllowsFutureChoosing()}),e.subscribe("die.chosen",function(){$("#quit-and-score").css("display","inline-block")}),e.subscribe("die.chosen",function(){a=!0,S.updateScore(),x.liveContainsDice()}),e.subscribe("die.movedToPool",function(i){i.$el.closest(".cube-wrapper").detach().appendTo(t)}),e.subscribe("die.rolled",function(i){i.$el[0].className="cube "+b[i.value]}),e.subscribe("score.changed",function(){u.text(p)}),e.subscribe("play.scoredOut",function(){D("You got "+p+" point(s) for "+m[r]),$.ajax({method:"POST",url:"/api/games",data:{points:p,podcast:r},success:function(i){console.log(i)}}),$("#screen").css("display","block")})},w=function(){for(i=1;i<=c;i++)f.push(new o(i));n=$("#live-container"),t=$("#match-container"),u=$("#current-score"),$("#roll-button").on("click",function(){q()}),$("#quit-and-score").on("click",function(){O("Quitting because quit and score button pressed."),S.quitAndScore()}),$(".pick-a-podcast__button").on("click",function(){y($(this).data("podcast-slug")),$(".pick-a-podcast").hide()}),g()},y=function(i){r=i},q=function(){for(var i in f)f[i].roll();e.publish("dice.rolled")},T=function(){return Math.round(5*Math.random())+1},k=function(i){setTimeout(i,v)},x={liveAllowsFutureChoosing:function(){for(var i in f)if(f[i].value>=d)return;k(function(){D("Fail roll!"),S.failRoll()})},liveContainsDice:function(){0===f.length&&(O("Quitting because live length is 0"),quitAndScore())}},D=function(i){var e=$('<div class="alert">').text(i);$("#notifications").append(e),setTimeout(function(){e.slideUp()},3e3)},O=function(i){s&&console.log(i)},S={failRoll:function(){p=1,e.publish("score.changed"),e.publish("play.scoredOut")},updateScore:function(){var i=0;for(var o in h)i+=h[o].value;p=i,e.publish("score.changed")},quitAndScore:function(){this.updateScore(),e.publish("play.scoredOut")}};return{init:w}}();$(function(){o.init()})},{}]},{},[1]);