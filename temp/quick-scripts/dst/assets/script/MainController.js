
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/MainController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '127dcBUoo1D6LKVwdsIyXAx', 'MainController');
// script/MainController.js

"use strict";

var Ball = require("./Ball");

var Barrier = require("./Barrier");

var Config = require("./Config");

require("./Shake"); //游戏主控制类


var MainController = cc.Class({
  "extends": cc.Component,
  properties: function properties() {
    return {
      prefabBarriers: {
        type: cc.Prefab,
        "default": []
      },
      prefabBall: cc.Prefab,
      balls: {
        type: Ball,
        "default": []
      },
      barriers: {
        type: Barrier,
        "default": []
      },
      lbScoreCount: cc.Label,
      ballCount: cc.Label,
      guide: cc.Node,
      //开局指引 节点
      gameStatus: true,
      gameOverMark: cc.Node,
      //游戏结束 节点
      takeAim: cc.Node //瞄准线 节点

    };
  },
  //加载完成
  onLoad: function onLoad() {
    //启用物理世界
    cc.director.getPhysicsManager().enabled = true;
    cc.director.getActionManager().gravity = cc.v2(0, -1000); //设置重力
    //事件监听

    this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this); //显示游戏指引

    this.init();
    this.guideShow();
    this.addBarriers();
  },
  //初始化
  init: function init() {
    this.score = 0; //计分牌

    this.recycleBallsCount = 1; //收回小球数

    this.barrierScoreRate = 0; //设置障碍物基准率

    this.balls[0].main = this;
    this.balls[0].node.group = Config.groupBallInRecycle;
    this.gameOverMark.active = false;
    this.gameOverMark.zIndex = 10;
    this.guide.zIndex = 10;
    this.guide.active = false;
    this.takeAim.main = this;
  },
  //触摸开始时
  onTouchStart: function onTouchStart() {
    this.guideHide();
  },
  //触摸结束
  onTouchEnd: function onTouchEnd(touch) {
    if (!this.isRecycleFinished()) {
      return;
    }

    var graphics = this.node.getChildByName("take-aim").getComponent(cc.Graphics);
    graphics.clear();
    this.recycleBallsCount = 0;
    var touchPos = this.node.convertTouchToNodeSpaceAR(touch.touch);
    this.shootBalls(touchPos.sub(cc.v2(0, 420)));
  },
  //新增小球
  addBall: function addBall(pos) {
    var ball = cc.instantiate(this.prefabBall).getComponent(Ball);
    ball.node.parent = this.node;
    ball.node.position = pos;
    ball.main = this;
    ball.node.group = Config.groupBallInGame;
    this.balls.push(ball);
    this.setBallCount(this.balls.length);
  },
  //显示小球总数
  setBallCount: function setBallCount(num) {
    this.ballCount.string = '小球数：' + num.toString();
  },
  //连续发射小球
  shootBalls: function shootBalls(dir) {
    var _this = this;

    if (!this.gameStatus) {
      return;
    }

    var _loop = function _loop(i) {
      var ball = _this.balls[i];

      _this.scheduleOnce(function () {
        this.shootBall(ball, dir);
      }.bind(_this), i * 0.2);
    };

    for (var i = 0; i < this.balls.length; i++) {
      _loop(i);
    }
  },
  //发射单个小球
  shootBall: function shootBall(ball, dir) {
    ball.rigidBody.active = false;
    var pathPos = [];
    pathPos.push(ball.node.position);
    pathPos.push(cc.v2(0, 420));
    ball.node.group = Config.groupBallInGame;
    ball.node.runAction(cc.sequence(cc.cardinalSplineTo(0.8, pathPos, 0.5), cc.callFunc(function () {
      ball.rigidBody.active = true;
      ball.rigidBody.linearVelocity = dir.mul(3);
    })));
  },
  //收回小球，上移一排障碍物
  recycleBall: function recycleBall() {
    var _this2 = this;

    this.recycleBallsCount++;
    this.barrierScoreRate += 0.1;

    if (this.isRecycleFinished()) {
      var _loop2 = function _loop2(i) {
        var barrier = _this2.barriers[i];
        barrier.node.runAction(cc.sequence(cc.moveBy(0.5, cc.v2(0, 100)), cc.callFunc(function () {
          if (barrier.node.position.y > 200) {
            barrier.node.runAction(cc.shake(1.5, 3, 3));
          }

          if (barrier.node.position.y > 300) {
            this.gameOver();
          }
        }.bind(_this2))));
      };

      for (var i = 0; i < this.barriers.length; i++) {
        _loop2(i);
      }

      this.addBarriers();
    }
  },
  //小球是否收回完毕
  isRecycleFinished: function isRecycleFinished() {
    return this.recycleBallsCount == this.balls.length;
  },
  //添加障碍物
  addBarriers: function addBarriers() {
    var startPosX = -270;
    var endPosX = 270;
    var currentPosX = startPosX + this.getRandomSpace();

    while (currentPosX < endPosX) {
      var barrier = cc.instantiate(this.prefabBarriers[Math.floor(Math.random() * this.prefabBarriers.length)]).getComponent(Barrier);
      barrier.node.parent = this.node;
      barrier.node.position = cc.v2(currentPosX, -410);

      if (barrier.lbScore) {
        barrier.node.rotation = Math.random() * 360;
      }

      barrier.main = this;
      currentPosX += this.getRandomSpace();
      this.barriers.push(barrier);
    }
  },
  //抖动障碍物
  shake: function shake(barrier) {
    var shake = cc.shake(0.7, 1, 1);
    barrier.node.runAction(shake);
  },
  //计分牌显示
  addScore: function addScore() {
    this.score++;
    this.lbScoreCount.string = '分数：' + this.score.toString();
  },
  //设置障碍物自身分数值
  setBarrierScore: function setBarrierScore() {
    var score = Math.floor(this.randomNum(1 + 2 * this.barrierScoreRate, 5 + 3 * this.barrierScoreRate));
    return score;
  },
  //消除障碍物
  removeBarrier: function removeBarrier(barrier) {
    var idx = this.barriers.indexOf(barrier);

    if (idx != -1) {
      barrier.node.removeFromParent(false);
      this.barriers.splice(idx, 1);
    }
  },
  //获取随机距离，用于生成障碍物的间距
  getRandomSpace: function getRandomSpace() {
    return 80 + Math.random() * 200;
  },
  //获取区间随机值
  randomNum: function randomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.floor(Rand * Range);
    return num;
  },
  //显示引导动画
  guideShow: function guideShow() {
    this.guide.active = true;
    var handMove = this.guide.getChildByName('handMove');
    var animCtrl = handMove.getComponent(cc.Animation);
    animCtrl.play('handMove');
  },
  //关闭引导动画
  guideHide: function guideHide() {
    this.guide.active = false;
    var handMove = this.guide.getChildByName('handMove');
    var animCtrl = handMove.getComponent(cc.Animation);
    animCtrl.stop('handMove');
  },
  //开始游戏
  gameStart: function gameStart() {
    cc.director.loadScene("game");
  },
  //游戏结束
  gameOver: function gameOver() {
    this.gameStatus = false;
    this.gameOverMark.active = true;
    this.gameOverMark.getChildByName("score").getComponent(cc.Label).string = "得分：" + this.score.toString();
  }
});
module.exports = MainController;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxNYWluQ29udHJvbGxlci5qcyJdLCJuYW1lcyI6WyJCYWxsIiwicmVxdWlyZSIsIkJhcnJpZXIiLCJDb25maWciLCJNYWluQ29udHJvbGxlciIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwicHJlZmFiQmFycmllcnMiLCJ0eXBlIiwiUHJlZmFiIiwicHJlZmFiQmFsbCIsImJhbGxzIiwiYmFycmllcnMiLCJsYlNjb3JlQ291bnQiLCJMYWJlbCIsImJhbGxDb3VudCIsImd1aWRlIiwiTm9kZSIsImdhbWVTdGF0dXMiLCJnYW1lT3Zlck1hcmsiLCJ0YWtlQWltIiwib25Mb2FkIiwiZGlyZWN0b3IiLCJnZXRQaHlzaWNzTWFuYWdlciIsImVuYWJsZWQiLCJnZXRBY3Rpb25NYW5hZ2VyIiwiZ3Jhdml0eSIsInYyIiwibm9kZSIsIm9uIiwiRXZlbnRUeXBlIiwiVE9VQ0hfU1RBUlQiLCJvblRvdWNoU3RhcnQiLCJUT1VDSF9FTkQiLCJvblRvdWNoRW5kIiwiaW5pdCIsImd1aWRlU2hvdyIsImFkZEJhcnJpZXJzIiwic2NvcmUiLCJyZWN5Y2xlQmFsbHNDb3VudCIsImJhcnJpZXJTY29yZVJhdGUiLCJtYWluIiwiZ3JvdXAiLCJncm91cEJhbGxJblJlY3ljbGUiLCJhY3RpdmUiLCJ6SW5kZXgiLCJndWlkZUhpZGUiLCJ0b3VjaCIsImlzUmVjeWNsZUZpbmlzaGVkIiwiZ3JhcGhpY3MiLCJnZXRDaGlsZEJ5TmFtZSIsImdldENvbXBvbmVudCIsIkdyYXBoaWNzIiwiY2xlYXIiLCJ0b3VjaFBvcyIsImNvbnZlcnRUb3VjaFRvTm9kZVNwYWNlQVIiLCJzaG9vdEJhbGxzIiwic3ViIiwiYWRkQmFsbCIsInBvcyIsImJhbGwiLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsInBvc2l0aW9uIiwiZ3JvdXBCYWxsSW5HYW1lIiwicHVzaCIsInNldEJhbGxDb3VudCIsImxlbmd0aCIsIm51bSIsInN0cmluZyIsInRvU3RyaW5nIiwiZGlyIiwiaSIsInNjaGVkdWxlT25jZSIsInNob290QmFsbCIsImJpbmQiLCJyaWdpZEJvZHkiLCJwYXRoUG9zIiwicnVuQWN0aW9uIiwic2VxdWVuY2UiLCJjYXJkaW5hbFNwbGluZVRvIiwiY2FsbEZ1bmMiLCJsaW5lYXJWZWxvY2l0eSIsIm11bCIsInJlY3ljbGVCYWxsIiwiYmFycmllciIsIm1vdmVCeSIsInkiLCJzaGFrZSIsImdhbWVPdmVyIiwic3RhcnRQb3NYIiwiZW5kUG9zWCIsImN1cnJlbnRQb3NYIiwiZ2V0UmFuZG9tU3BhY2UiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJsYlNjb3JlIiwicm90YXRpb24iLCJhZGRTY29yZSIsInNldEJhcnJpZXJTY29yZSIsInJhbmRvbU51bSIsInJlbW92ZUJhcnJpZXIiLCJpZHgiLCJpbmRleE9mIiwicmVtb3ZlRnJvbVBhcmVudCIsInNwbGljZSIsIk1pbiIsIk1heCIsIlJhbmdlIiwiUmFuZCIsImhhbmRNb3ZlIiwiYW5pbUN0cmwiLCJBbmltYXRpb24iLCJwbGF5Iiwic3RvcCIsImdhbWVTdGFydCIsImxvYWRTY2VuZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsSUFBSSxHQUFHQyxPQUFPLENBQUMsUUFBRCxDQUFsQjs7QUFDQSxJQUFJQyxPQUFPLEdBQUdELE9BQU8sQ0FBQyxXQUFELENBQXJCOztBQUNBLElBQUlFLE1BQU0sR0FBR0YsT0FBTyxDQUFDLFVBQUQsQ0FBcEI7O0FBQ0FBLE9BQU8sQ0FBQyxTQUFELENBQVAsRUFDQTs7O0FBQ0EsSUFBSUcsY0FBYyxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUMxQixhQUFTRCxFQUFFLENBQUNFLFNBRGM7QUFFMUJDLEVBQUFBLFVBQVUsRUFBRTtBQUFBLFdBQU87QUFDZkMsTUFBQUEsY0FBYyxFQUFFO0FBQ1pDLFFBQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTSxNQURHO0FBRVosbUJBQVM7QUFGRyxPQUREO0FB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QUFDQTVCLEVBQUFBLFFBM00wQixzQkEyTWY7QUFDUCxTQUFLdkUsVUFBTCxHQUFrQixLQUFsQjtBQUNBLFNBQUtDLFlBQUwsQ0FBa0J5QixNQUFsQixHQUEyQixJQUEzQjtBQUNBLFNBQUt6QixZQUFMLENBQWtCK0IsY0FBbEIsQ0FBaUMsT0FBakMsRUFBMENDLFlBQTFDLENBQXVEaEQsRUFBRSxDQUFDVyxLQUExRCxFQUFpRXVELE1BQWpFLEdBQTBFLFFBQVEsS0FBSy9CLEtBQUwsQ0FBV2dDLFFBQVgsRUFBbEY7QUFDSDtBQS9NeUIsQ0FBVCxDQUFyQjtBQWtOQWdELE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnJILGNBQWpCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgQmFsbCA9IHJlcXVpcmUoXCIuL0JhbGxcIik7XHJcbnZhciBCYXJyaWVyID0gcmVxdWlyZShcIi4vQmFycmllclwiKTtcclxudmFyIENvbmZpZyA9IHJlcXVpcmUoXCIuL0NvbmZpZ1wiKTtcclxucmVxdWlyZShcIi4vU2hha2VcIik7XHJcbi8v5ri45oiP5Li75o6n5Yi257G7XHJcbnZhciBNYWluQ29udHJvbGxlciA9IGNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICAgIHByb3BlcnRpZXM6ICgpID0+ICh7XHJcbiAgICAgICAgcHJlZmFiQmFycmllcnM6IHtcclxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcHJlZmFiQmFsbDogY2MuUHJlZmFiLFxyXG4gICAgICAgIGJhbGxzOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IEJhbGwsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiYXJyaWVyczoge1xyXG4gICAgICAgICAgICB0eXBlOiBCYXJyaWVyLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJTY29yZUNvdW50OiBjYy5MYWJlbCxcclxuICAgICAgICBiYWxsQ291bnQ6IGNjLkxhYmVsLFxyXG4gICAgICAgIGd1aWRlOiBjYy5Ob2RlLCAvL+W8gOWxgOaMh+W8lSDoioLngrlcclxuICAgICAgICBnYW1lU3RhdHVzOiB0cnVlLFxyXG4gICAgICAgIGdhbWVPdmVyTWFyazogY2MuTm9kZSwgLy/muLjmiI/nu5PmnZ8g6IqC54K5XHJcbiAgICAgICAgdGFrZUFpbTpjYy5Ob2RlIC8v556E5YeG57q/IOiKgueCuVxyXG4gICAgfSksXHJcblxyXG4gICAgLy/liqDovb3lrozmiJBcclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICAvL+WQr+eUqOeJqeeQhuS4lueVjFxyXG4gICAgICAgIGNjLmRpcmVjdG9yLmdldFBoeXNpY3NNYW5hZ2VyKCkuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0QWN0aW9uTWFuYWdlcigpLmdyYXZpdHkgPSBjYy52MigwLCAtMTAwMCk7IC8v6K6+572u6YeN5YqbXHJcbiAgICAgICAgLy/kuovku7bnm5HlkKxcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMub25Ub3VjaFN0YXJ0LCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uVG91Y2hFbmQsIHRoaXMpO1xyXG4gICAgICAgIC8v5pi+56S65ri45oiP5oyH5byVXHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgdGhpcy5ndWlkZVNob3coKTtcclxuICAgICAgICB0aGlzLmFkZEJhcnJpZXJzKCk7XHJcbiAgICB9LFxyXG4gICAgLy/liJ3lp4vljJZcclxuICAgIGluaXQoKXtcclxuICAgICAgICB0aGlzLnNjb3JlID0gMDsgLy/orqHliIbniYxcclxuICAgICAgICB0aGlzLnJlY3ljbGVCYWxsc0NvdW50ID0gMTsgLy/mlLblm57lsI/nkIPmlbBcclxuICAgICAgICB0aGlzLmJhcnJpZXJTY29yZVJhdGUgPSAwOyAvL+iuvue9rumanOeijeeJqeWfuuWHhueOh1xyXG4gICAgICAgIHRoaXMuYmFsbHNbMF0ubWFpbiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5iYWxsc1swXS5ub2RlLmdyb3VwID0gQ29uZmlnLmdyb3VwQmFsbEluUmVjeWNsZTtcclxuICAgICAgICB0aGlzLmdhbWVPdmVyTWFyay5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmdhbWVPdmVyTWFyay56SW5kZXggPSAxMDtcclxuICAgICAgICB0aGlzLmd1aWRlLnpJbmRleCA9IDEwO1xyXG4gICAgICAgIHRoaXMuZ3VpZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy50YWtlQWltLm1haW4gPSB0aGlzO1xyXG4gICAgfSxcclxuICAgIC8v6Kem5pG45byA5aeL5pe2XHJcbiAgICBvblRvdWNoU3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5ndWlkZUhpZGUoKTtcclxuICAgIH0sXHJcbiAgICAvL+inpuaRuOe7k+adn1xyXG4gICAgb25Ub3VjaEVuZCh0b3VjaCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1JlY3ljbGVGaW5pc2hlZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGdyYXBoaWNzID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidGFrZS1haW1cIikuZ2V0Q29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBncmFwaGljcy5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMucmVjeWNsZUJhbGxzQ291bnQgPSAwO1xyXG4gICAgICAgIGxldCB0b3VjaFBvcyA9IHRoaXMubm9kZS5jb252ZXJ0VG91Y2hUb05vZGVTcGFjZUFSKHRvdWNoLnRvdWNoKTtcclxuICAgICAgICB0aGlzLnNob290QmFsbHModG91Y2hQb3Muc3ViKGNjLnYyKDAsIDQyMCkpKTtcclxuICAgIH0sXHJcbiAgICAvL+aWsOWinuWwj+eQg1xyXG4gICAgYWRkQmFsbChwb3MpIHtcclxuICAgICAgICBsZXQgYmFsbCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiQmFsbCkuZ2V0Q29tcG9uZW50KEJhbGwpO1xyXG4gICAgICAgIGJhbGwubm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgYmFsbC5ub2RlLnBvc2l0aW9uID0gcG9zO1xyXG4gICAgICAgIGJhbGwubWFpbiA9IHRoaXM7XHJcbiAgICAgICAgYmFsbC5ub2RlLmdyb3VwID0gQ29uZmlnLmdyb3VwQmFsbEluR2FtZTtcclxuICAgICAgICB0aGlzLmJhbGxzLnB1c2goYmFsbCk7XHJcbiAgICAgICAgdGhpcy5zZXRCYWxsQ291bnQodGhpcy5iYWxscy5sZW5ndGgpO1xyXG4gICAgfSxcclxuICAgIC8v5pi+56S65bCP55CD5oC75pWwXHJcbiAgICBzZXRCYWxsQ291bnQobnVtKXtcclxuICAgICAgICB0aGlzLmJhbGxDb3VudC5zdHJpbmcgPSAn5bCP55CD5pWw77yaJyArIG51bS50b1N0cmluZygpO1xyXG4gICAgfSxcclxuICAgIC8v6L+e57ut5Y+R5bCE5bCP55CDXHJcbiAgICBzaG9vdEJhbGxzKGRpcikge1xyXG4gICAgICAgIGlmICghdGhpcy5nYW1lU3RhdHVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmJhbGxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBiYWxsID0gdGhpcy5iYWxsc1tpXTtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdEJhbGwoYmFsbCwgZGlyKTtcclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpLCBpICogMC4yKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+WPkeWwhOWNleS4quWwj+eQg1xyXG4gICAgc2hvb3RCYWxsKGJhbGwsIGRpcikge1xyXG4gICAgICAgIGJhbGwucmlnaWRCb2R5LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBwYXRoUG9zID0gW107XHJcbiAgICAgICAgcGF0aFBvcy5wdXNoKGJhbGwubm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgcGF0aFBvcy5wdXNoKGNjLnYyKDAsIDQyMCkpO1xyXG4gICAgICAgIGJhbGwubm9kZS5ncm91cCA9IENvbmZpZy5ncm91cEJhbGxJbkdhbWU7XHJcbiAgICAgICAgYmFsbC5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MuY2FyZGluYWxTcGxpbmVUbygwLjgsIHBhdGhQb3MsIDAuNSksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGJhbGwucmlnaWRCb2R5LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBiYWxsLnJpZ2lkQm9keS5saW5lYXJWZWxvY2l0eSA9IGRpci5tdWwoMyk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKSlcclxuICAgIH0sXHJcbiAgICAvL+aUtuWbnuWwj+eQg++8jOS4iuenu+S4gOaOkumanOeijeeJqVxyXG4gICAgcmVjeWNsZUJhbGwoKSB7XHJcbiAgICAgICAgdGhpcy5yZWN5Y2xlQmFsbHNDb3VudCsrO1xyXG4gICAgICAgIHRoaXMuYmFycmllclNjb3JlUmF0ZSArPSAwLjE7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNSZWN5Y2xlRmluaXNoZWQoKSkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYmFycmllcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBiYXJyaWVyID0gdGhpcy5iYXJyaWVyc1tpXTtcclxuICAgICAgICAgICAgICAgIGJhcnJpZXIubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICAgICAgY2MubW92ZUJ5KDAuNSwgY2MudjIoMCwgMTAwKSksXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmFycmllci5ub2RlLnBvc2l0aW9uLnkgPiAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhcnJpZXIubm9kZS5ydW5BY3Rpb24oY2Muc2hha2UoMS41LCAzLCAzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJhcnJpZXIubm9kZS5wb3NpdGlvbi55ID4gMzAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVPdmVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgICAgICApKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQmFycmllcnMoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/lsI/nkIPmmK/lkKbmlLblm57lrozmr5VcclxuICAgIGlzUmVjeWNsZUZpbmlzaGVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlY3ljbGVCYWxsc0NvdW50ID09IHRoaXMuYmFsbHMubGVuZ3RoO1xyXG4gICAgfSxcclxuICAgIC8v5re75Yqg6Zqc56KN54mpXHJcbiAgICBhZGRCYXJyaWVycygpIHtcclxuICAgICAgICBsZXQgc3RhcnRQb3NYID0gLTI3MDtcclxuICAgICAgICBsZXQgZW5kUG9zWCA9IDI3MDtcclxuICAgICAgICBsZXQgY3VycmVudFBvc1ggPSBzdGFydFBvc1ggKyB0aGlzLmdldFJhbmRvbVNwYWNlKCk7XHJcbiAgICAgICAgd2hpbGUgKGN1cnJlbnRQb3NYIDwgZW5kUG9zWCkge1xyXG4gICAgICAgICAgICBsZXQgYmFycmllciA9IGNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiQmFycmllcnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5wcmVmYWJCYXJyaWVycy5sZW5ndGgpXSkuZ2V0Q29tcG9uZW50KEJhcnJpZXIpO1xyXG4gICAgICAgICAgICBiYXJyaWVyLm5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgICAgICBiYXJyaWVyLm5vZGUucG9zaXRpb24gPSBjYy52MihjdXJyZW50UG9zWCwgLTQxMCk7XHJcbiAgICAgICAgICAgIGlmIChiYXJyaWVyLmxiU2NvcmUpIHtcclxuICAgICAgICAgICAgICAgIGJhcnJpZXIubm9kZS5yb3RhdGlvbiA9IE1hdGgucmFuZG9tKCkgKiAzNjA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYmFycmllci5tYWluID0gdGhpcztcclxuICAgICAgICAgICAgY3VycmVudFBvc1ggKz0gdGhpcy5nZXRSYW5kb21TcGFjZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmJhcnJpZXJzLnB1c2goYmFycmllcik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v5oqW5Yqo6Zqc56KN54mpXHJcbiAgICBzaGFrZShiYXJyaWVyKSB7XHJcbiAgICAgICAgbGV0IHNoYWtlID0gY2Muc2hha2UoMC43LCAxLCAxKTtcclxuICAgICAgICBiYXJyaWVyLm5vZGUucnVuQWN0aW9uKHNoYWtlKTtcclxuICAgIH0sXHJcbiAgICAvL+iuoeWIhueJjOaYvuekulxyXG4gICAgYWRkU2NvcmUoKSB7XHJcbiAgICAgICAgdGhpcy5zY29yZSsrO1xyXG4gICAgICAgIHRoaXMubGJTY29yZUNvdW50LnN0cmluZyA9ICfliIbmlbDvvJonICsgdGhpcy5zY29yZS50b1N0cmluZygpO1xyXG4gICAgfSxcclxuICAgIFxyXG4gICAgLy/orr7nva7pmpznoo3nianoh6rouqvliIbmlbDlgLxcclxuICAgIHNldEJhcnJpZXJTY29yZSgpIHtcclxuICAgICAgICBsZXQgc2NvcmUgPSBNYXRoLmZsb29yKHRoaXMucmFuZG9tTnVtKDEgKyAyICogdGhpcy5iYXJyaWVyU2NvcmVSYXRlLCA1ICsgMyAqIHRoaXMuYmFycmllclNjb3JlUmF0ZSkpO1xyXG4gICAgICAgIHJldHVybiBzY29yZTtcclxuICAgIH0sXHJcbiAgICAvL+a2iOmZpOmanOeijeeJqVxyXG4gICAgcmVtb3ZlQmFycmllcihiYXJyaWVyKSB7XHJcbiAgICAgICAgbGV0IGlkeCA9IHRoaXMuYmFycmllcnMuaW5kZXhPZihiYXJyaWVyKTtcclxuICAgICAgICBpZiAoaWR4ICE9IC0xKSB7XHJcbiAgICAgICAgICAgIGJhcnJpZXIubm9kZS5yZW1vdmVGcm9tUGFyZW50KGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5iYXJyaWVycy5zcGxpY2UoaWR4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/ojrflj5bpmo/mnLrot53nprvvvIznlKjkuo7nlJ/miJDpmpznoo3niannmoTpl7Tot51cclxuICAgIGdldFJhbmRvbVNwYWNlKCkge1xyXG4gICAgICAgIHJldHVybiA4MCArIE1hdGgucmFuZG9tKCkgKiAyMDA7XHJcbiAgICB9LFxyXG4gICAgLy/ojrflj5bljLrpl7Tpmo/mnLrlgLxcclxuICAgIHJhbmRvbU51bShNaW4sIE1heCkge1xyXG4gICAgICAgIHZhciBSYW5nZSA9IE1heCAtIE1pbjtcclxuICAgICAgICB2YXIgUmFuZCA9IE1hdGgucmFuZG9tKCk7XHJcbiAgICAgICAgdmFyIG51bSA9IE1pbiArIE1hdGguZmxvb3IoUmFuZCAqIFJhbmdlKTtcclxuICAgICAgICByZXR1cm4gbnVtO1xyXG4gICAgfSxcclxuICAgIC8v5pi+56S65byV5a+85Yqo55S7XHJcbiAgICBndWlkZVNob3coKSB7XHJcbiAgICAgICAgdGhpcy5ndWlkZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGxldCBoYW5kTW92ZSA9IHRoaXMuZ3VpZGUuZ2V0Q2hpbGRCeU5hbWUoJ2hhbmRNb3ZlJyk7XHJcbiAgICAgICAgbGV0IGFuaW1DdHJsID0gaGFuZE1vdmUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XHJcbiAgICAgICAgYW5pbUN0cmwucGxheSgnaGFuZE1vdmUnKTtcclxuICAgIH0sXHJcbiAgICAvL+WFs+mXreW8leWvvOWKqOeUu1xyXG4gICAgZ3VpZGVIaWRlKCkge1xyXG4gICAgICAgIHRoaXMuZ3VpZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGhhbmRNb3ZlID0gdGhpcy5ndWlkZS5nZXRDaGlsZEJ5TmFtZSgnaGFuZE1vdmUnKTtcclxuICAgICAgICBsZXQgYW5pbUN0cmwgPSBoYW5kTW92ZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcclxuICAgICAgICBhbmltQ3RybC5zdG9wKCdoYW5kTW92ZScpO1xyXG4gICAgfSxcclxuICAgIC8v5byA5aeL5ri45oiPXHJcbiAgICBnYW1lU3RhcnQoKXtcclxuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJnYW1lXCIpO1xyXG4gICAgfSxcclxuICAgIC8v5ri45oiP57uT5p2fXHJcbiAgICBnYW1lT3ZlcigpIHtcclxuICAgICAgICB0aGlzLmdhbWVTdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmdhbWVPdmVyTWFyay5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZ2FtZU92ZXJNYXJrLmdldENoaWxkQnlOYW1lKFwic2NvcmVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIuW+l+WIhu+8mlwiICsgdGhpcy5zY29yZS50b1N0cmluZygpO1xyXG4gICAgfVxyXG4gICAgXHJcbn0pO1xyXG5tb2R1bGUuZXhwb3J0cyA9IE1haW5Db250cm9sbGVyOyJdfQ==