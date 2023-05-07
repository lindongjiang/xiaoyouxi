
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/Shake.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxTaGFrZS5qcyJdLCJuYW1lcyI6WyJjYyIsIlNoYWtlIiwiQWN0aW9uSW50ZXJ2YWwiLCJleHRlbmQiLCJfaW5pdGlhbF94IiwiX2luaXRpYWxfeSIsIl9zdHJlbmd0aF94IiwiX3N0cmVuZ3RoX3kiLCJjdG9yIiwiZHVyYXRpb24iLCJzdHJlbmd0aF94Iiwic3RyZW5ndGhfeSIsImluaXRXaXRoRHVyYXRpb24iLCJwcm90b3R5cGUiLCJjYWxsIiwicmFuZ2VSYW5kIiwibWluIiwibWF4Iiwicm5kIiwiTWF0aCIsInJhbmRvbSIsInVwZGF0ZSIsInJhbmR4IiwicmFuZHkiLCJnZXRUYXJnZXQiLCJzZXRQb3NpdGlvbiIsInN0YXJ0V2l0aFRhcmdldCIsInRhcmdldCIsIngiLCJ5Iiwic3RvcCIsIlZlYzIiLCJzaGFrZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBQSxFQUFFLENBQUNDLEtBQUgsR0FBV0QsRUFBRSxDQUFDRSxjQUFILENBQWtCQyxNQUFsQixDQUF5QjtBQUNoQ0MsRUFBQUEsVUFBVSxFQUFFLENBRG9CO0FBRWhDQyxFQUFBQSxVQUFVLEVBQUUsQ0FGb0I7QUFHaENDLEVBQUFBLFdBQVcsRUFBRSxDQUhtQjtBQUloQ0MsRUFBQUEsV0FBVyxFQUFFLENBSm1COztBQUtoQzs7Ozs7O0FBTUFDLEVBQUFBLElBQUksRUFBRSxjQUFVQyxRQUFWLEVBQW9CQyxVQUFwQixFQUFnQ0MsVUFBaEMsRUFBNEM7QUFDOUM7QUFDQSxTQUFLQyxnQkFBTCxDQUFzQkgsUUFBdEIsRUFBZ0NDLFVBQWhDLEVBQTRDQyxVQUE1QztBQUNILEdBZCtCO0FBZWhDQyxFQUFBQSxnQkFmZ0MsNEJBZWZILFFBZmUsRUFlTEMsVUFmSyxFQWVPQyxVQWZQLEVBZW1CO0FBQy9DWCxJQUFBQSxFQUFFLENBQUNFLGNBQUgsQ0FBa0JXLFNBQWxCLENBQTRCRCxnQkFBNUIsQ0FBNkNFLElBQTdDLENBQWtELElBQWxELEVBQXdETCxRQUF4RDtBQUNBLFNBQUtILFdBQUwsR0FBbUJJLFVBQW5CO0FBQ0EsU0FBS0gsV0FBTCxHQUFtQkksVUFBbkI7QUFDQSxXQUFPLElBQVA7QUFDSCxHQXBCK0I7QUFxQmhDSSxFQUFBQSxTQXJCZ0MscUJBcUJ0QkMsR0FyQnNCLEVBcUJqQkMsR0FyQmlCLEVBcUJaO0FBQ2hCLFFBQUlDLEdBQUcsR0FBR0MsSUFBSSxDQUFDQyxNQUFMLEVBQVY7QUFDQSxXQUFPRixHQUFHLElBQUlELEdBQUcsR0FBR0QsR0FBVixDQUFILEdBQW9CQSxHQUEzQjtBQUNILEdBeEIrQjtBQXlCaENLLEVBQUFBLE1BekJnQyxvQkF5QnZCO0FBQ0wsUUFBSUMsS0FBSyxHQUFHLEtBQUtQLFNBQUwsQ0FBZSxDQUFDLEtBQUtULFdBQXJCLEVBQWtDLEtBQUtBLFdBQXZDLENBQVo7QUFDQSxRQUFJaUIsS0FBSyxHQUFHLEtBQUtSLFNBQUwsQ0FBZSxDQUFDLEtBQUtSLFdBQXJCLEVBQWtDLEtBQUtBLFdBQXZDLENBQVo7QUFDQSxTQUFLaUIsU0FBTCxHQUFpQkMsV0FBakIsQ0FBNkJILEtBQUssR0FBRyxLQUFLbEIsVUFBMUMsRUFBc0RtQixLQUFLLEdBQUcsS0FBS2xCLFVBQW5FO0FBQ0gsR0E3QitCO0FBOEJoQ3FCLEVBQUFBLGVBOUJnQywyQkE4QmhCQyxNQTlCZ0IsRUE4QlI7QUFDcEIzQixJQUFBQSxFQUFFLENBQUNFLGNBQUgsQ0FBa0JXLFNBQWxCLENBQTRCYSxlQUE1QixDQUE0Q1osSUFBNUMsQ0FBaUQsSUFBakQsRUFBdURhLE1BQXZEO0FBQ0EsU0FBS3ZCLFVBQUwsR0FBa0J1QixNQUFNLENBQUNDLENBQXpCO0FBQ0EsU0FBS3ZCLFVBQUwsR0FBa0JzQixNQUFNLENBQUNFLENBQXpCO0FBQ0gsR0FsQytCO0FBbUNoQ0MsRUFBQUEsSUFuQ2dDLGtCQW1DekI7QUFDSCxTQUFLTixTQUFMLEdBQWlCQyxXQUFqQixDQUE2QixJQUFJekIsRUFBRSxDQUFDK0IsSUFBUCxDQUFZLEtBQUszQixVQUFqQixFQUE2QixLQUFLQyxVQUFsQyxDQUE3QjtBQUNBTCxJQUFBQSxFQUFFLENBQUNFLGNBQUgsQ0FBa0JXLFNBQWxCLENBQTRCaUIsSUFBNUIsQ0FBaUNoQixJQUFqQyxDQUFzQyxJQUF0QztBQUNIO0FBdEMrQixDQUF6QixDQUFYOztBQXdDQWQsRUFBRSxDQUFDZ0MsS0FBSCxHQUFXLFVBQVV2QixRQUFWLEVBQW9CQyxVQUFwQixFQUFnQ0MsVUFBaEMsRUFBNEM7QUFDbkQsU0FBTyxJQUFJWCxFQUFFLENBQUNDLEtBQVAsQ0FBYVEsUUFBYixFQUF1QkMsVUFBdkIsRUFBbUNDLFVBQW5DLENBQVA7QUFDSCxDQUZEIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyDmipbliqjliqjnlLtcbmNjLlNoYWtlID0gY2MuQWN0aW9uSW50ZXJ2YWwuZXh0ZW5kKHtcbiAgICBfaW5pdGlhbF94OiAwLFxuICAgIF9pbml0aWFsX3k6IDAsXG4gICAgX3N0cmVuZ3RoX3g6IDAsXG4gICAgX3N0cmVuZ3RoX3k6IDAsXG4gICAgLypcbiAgICAgKiDliJvlu7rmipbliqjliqjnlLtcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZHVyYXRpb24gICAgIOWKqOeUu+aMgee7reaXtumVv1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzdHJlbmd0aF94ICAg5oqW5Yqo5bmF5bqm77yaIHjmlrnlkJFcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3RyZW5ndGhfeSAgIOaKluWKqOW5heW6pu+8miB55pa55ZCRXG4gICAgICovXG4gICAgY3RvcjogZnVuY3Rpb24gKGR1cmF0aW9uLCBzdHJlbmd0aF94LCBzdHJlbmd0aF95KSB7XG4gICAgICAgIC8vY2MuQWN0aW9uSW50ZXJ2YWwucHJvdG90eXBlLmN0b3IuY2FsbCh0aGlzKTtcbiAgICAgICAgdGhpcy5pbml0V2l0aER1cmF0aW9uKGR1cmF0aW9uLCBzdHJlbmd0aF94LCBzdHJlbmd0aF95KTtcbiAgICB9LFxuICAgIGluaXRXaXRoRHVyYXRpb24oZHVyYXRpb24sIHN0cmVuZ3RoX3gsIHN0cmVuZ3RoX3kpIHtcbiAgICAgICAgY2MuQWN0aW9uSW50ZXJ2YWwucHJvdG90eXBlLmluaXRXaXRoRHVyYXRpb24uY2FsbCh0aGlzLCBkdXJhdGlvbilcbiAgICAgICAgdGhpcy5fc3RyZW5ndGhfeCA9IHN0cmVuZ3RoX3g7XG4gICAgICAgIHRoaXMuX3N0cmVuZ3RoX3kgPSBzdHJlbmd0aF95O1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgIHJhbmdlUmFuZChtaW4sIG1heCkge1xuICAgICAgICBsZXQgcm5kID0gTWF0aC5yYW5kb20oKTtcbiAgICAgICAgcmV0dXJuIHJuZCAqIChtYXggLSBtaW4pICsgbWluO1xuICAgIH0sXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBsZXQgcmFuZHggPSB0aGlzLnJhbmdlUmFuZCgtdGhpcy5fc3RyZW5ndGhfeCwgdGhpcy5fc3RyZW5ndGhfeCk7XG4gICAgICAgIGxldCByYW5keSA9IHRoaXMucmFuZ2VSYW5kKC10aGlzLl9zdHJlbmd0aF95LCB0aGlzLl9zdHJlbmd0aF95KTtcbiAgICAgICAgdGhpcy5nZXRUYXJnZXQoKS5zZXRQb3NpdGlvbihyYW5keCArIHRoaXMuX2luaXRpYWxfeCwgcmFuZHkgKyB0aGlzLl9pbml0aWFsX3kpO1xuICAgIH0sXG4gICAgc3RhcnRXaXRoVGFyZ2V0KHRhcmdldCkge1xuICAgICAgICBjYy5BY3Rpb25JbnRlcnZhbC5wcm90b3R5cGUuc3RhcnRXaXRoVGFyZ2V0LmNhbGwodGhpcywgdGFyZ2V0KTtcbiAgICAgICAgdGhpcy5faW5pdGlhbF94ID0gdGFyZ2V0Lng7XG4gICAgICAgIHRoaXMuX2luaXRpYWxfeSA9IHRhcmdldC55O1xuICAgIH0sXG4gICAgc3RvcCgpIHtcbiAgICAgICAgdGhpcy5nZXRUYXJnZXQoKS5zZXRQb3NpdGlvbihuZXcgY2MuVmVjMih0aGlzLl9pbml0aWFsX3gsIHRoaXMuX2luaXRpYWxfeSkpO1xuICAgICAgICBjYy5BY3Rpb25JbnRlcnZhbC5wcm90b3R5cGUuc3RvcC5jYWxsKHRoaXMpO1xuICAgIH0sXG59KTtcbmNjLnNoYWtlID0gZnVuY3Rpb24gKGR1cmF0aW9uLCBzdHJlbmd0aF94LCBzdHJlbmd0aF95KSB7XG4gICAgcmV0dXJuIG5ldyBjYy5TaGFrZShkdXJhdGlvbiwgc3RyZW5ndGhfeCwgc3RyZW5ndGhfeSk7XG59OyJdfQ==