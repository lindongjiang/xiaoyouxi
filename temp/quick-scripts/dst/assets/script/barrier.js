
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/Barrier.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '60c62mT6OhALLjJRsK7kVMV', 'barrier');
// script/barrier.js

"use strict";

//障碍物类
var Barrier = cc.Class({
  "extends": cc.Component,
  properties: function properties() {
    return {
      lbScore: {
        "default": null,
        type: cc.Label
      },
      isAddBuffBall: false
    };
  },
  //start
  start: function start() {
    if (this.lbScore) {
      this.lbScore.node.rotation = -this.node.rotation;
    }

    this.setScore(this.main.setBarrierScore());
    this.node.color = cc.color(200, this.randomNum(0, 255), this.randomNum(0, 255), 255);
  },
  //获取随机值
  randomNum: function randomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.floor(Rand * Range);
    return num;
  },
  //设置分数
  setScore: function setScore(score) {
    if (this.lbScore) {
      this.score = score;
      this.lbScore.string = this.score.toString();
    }
  },
  //发生碰撞时
  onBeginContact: function onBeginContact(contact, selfCollider, otherCollider) {
    if (this.isAddBuffBall) {
      this.main.addBall(this.node.position);
      this.main.removeBarrier(this);
    } else {
      this.main.addScore();

      if (this.score == 1) {
        this.main.removeBarrier(this);
      } else {
        this.setScore(this.score - 1);
        this.main.shake(this);
      }
    }
  }
});
module.exports = Barrier;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();