"use strict";
cc._RF.push(module, 'f3b0cFDpm9ATLXIIKo9XlwM', 'Shake');
// script/Shake.js

"use strict";

// 抖动动画
cc.Shake = cc.ActionInterval.extend({
  _initial_x: 0,
  _initial_y: 0,
  _strength_x: 0,
  _strength_y: 0,

  /*
   * 创建抖动动画
   * @param {number} duration     动画持续时长
   * @param {number} strength_x   抖动幅度： x方向
   * @param {number} strength_y   抖动幅度： y方向
   */
  ctor: function ctor(duration, strength_x, strength_y) {
    //cc.ActionInterval.prototype.ctor.call(this);
    this.initWithDuration(duration, strength_x, strength_y);
  },
  initWithDuration: function initWithDuration(duration, strength_x, strength_y) {
    cc.ActionInterval.prototype.initWithDuration.call(this, duration);
    this._strength_x = strength_x;
    this._strength_y = strength_y;
    return true;
  },
  rangeRand: function rangeRand(min, max) {
    var rnd = Math.random();
    return rnd * (max - min) + min;
  },
  update: function update() {
    var randx = this.rangeRand(-this._strength_x, this._strength_x);
    var randy = this.rangeRand(-this._strength_y, this._strength_y);
    this.getTarget().setPosition(randx + this._initial_x, randy + this._initial_y);
  },
  startWithTarget: function startWithTarget(target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    this._initial_x = target.x;
    this._initial_y = target.y;
  },
  stop: function stop() {
    this.getTarget().setPosition(new cc.Vec2(this._initial_x, this._initial_y));
    cc.ActionInterval.prototype.stop.call(this);
  }
});

cc.shake = function (duration, strength_x, strength_y) {
  return new cc.Shake(duration, strength_x, strength_y);
};

cc._RF.pop();