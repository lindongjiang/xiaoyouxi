
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/TakeAim.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '47e07n9NFtIvo4368Li4gPR', 'TakeAim');
// script/TakeAim.js

"use strict";

//瞄准线 控制类
cc.Class({
  "extends": cc.Component,
  properties: function properties() {
    return {
      arraw: cc.Sprite
    };
  },
  //加载完成
  onLoad: function onLoad() {
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
  },
  //触摸移动操作，射线瞄准
  onTouchMove: function onTouchMove(touch) {
    if (!this.node.main.isRecycleFinished()) {
      return;
    }

    var origin = cc.v2(0, 446); //射线原点坐标

    var touchPos = this.node.convertTouchToNodeSpaceAR(touch.touch);

    if (touchPos.y > origin.y) {
      return;
    }

    var graphics = this.node.getComponent(cc.Graphics);
    var line = touchPos.sub(origin);
    var length = 40;
    var lineLength = line.mag(); //获得这个向量的长度

    var increment = line.normalize().mul(length); //根据每条线段的长度获得一个增量向量

    var pos = origin.clone(); //临时变量

    graphics.fillColor = cc.color(255, 255, 255, 150);
    pos.addSelf(increment);
    pos.addSelf(increment);
    graphics.clear(); //只要线段长度还大于每条线段的长度

    while (lineLength > length) {
      graphics.circle(pos.x, pos.y, 5);
      graphics.fill();
      pos.addSelf(increment);
      lineLength -= length;
    }

    var dis = origin.sub(touchPos);
    var angle = Math.atan2(dis.y, dis.x) / Math.PI * 180;
    this.arraw.node.rotation = -angle;
  }
});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxUYWtlQWltLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiYXJyYXciLCJTcHJpdGUiLCJvbkxvYWQiLCJub2RlIiwib24iLCJOb2RlIiwiRXZlbnRUeXBlIiwiVE9VQ0hfTU9WRSIsIm9uVG91Y2hNb3ZlIiwidG91Y2giLCJtYWluIiwiaXNSZWN5Y2xlRmluaXNoZWQiLCJvcmlnaW4iLCJ2MiIsInRvdWNoUG9zIiwiY29udmVydFRvdWNoVG9Ob2RlU3BhY2VBUiIsInkiLCJncmFwaGljcyIsImdldENvbXBvbmVudCIsIkdyYXBoaWNzIiwibGluZSIsInN1YiIsImxlbmd0aCIsImxpbmVMZW5ndGgiLCJtYWciLCJpbmNyZW1lbnQiLCJub3JtYWxpemUiLCJtdWwiLCJwb3MiLCJjbG9uZSIsImZpbGxDb2xvciIsImNvbG9yIiwiYWRkU2VsZiIsImNsZWFyIiwiY2lyY2xlIiwieCIsImZpbGwiLCJkaXMiLCJhbmdsZSIsIk1hdGgiLCJhdGFuMiIsIlBJIiwicm90YXRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFFTEMsRUFBQUEsVUFBVSxFQUFFO0FBQUEsV0FBTztBQUNmQyxNQUFBQSxLQUFLLEVBQUVKLEVBQUUsQ0FBQ0s7QUFESyxLQUFQO0FBQUEsR0FGUDtBQUtMO0FBQ0FDLEVBQUFBLE1BTkssb0JBTUk7QUFDTCxTQUFLQyxJQUFMLENBQVVDLEVBQVYsQ0FBYVIsRUFBRSxDQUFDUyxJQUFILENBQVFDLFNBQVIsQ0FBa0JDLFVBQS9CLEVBQTJDLEtBQUtDLFdBQWhELEVBQTZELElBQTdEO0FBQ0gsR0FSSTtBQVNMO0FBQ0FBLEVBQUFBLFdBVkssdUJBVU9DLEtBVlAsRUFVYztBQUNmLFFBQUcsQ0FBQyxLQUFLTixJQUFMLENBQVVPLElBQVYsQ0FBZUMsaUJBQWYsRUFBSixFQUF1QztBQUNuQztBQUNIOztBQUNELFFBQUlDLE1BQU0sR0FBR2hCLEVBQUUsQ0FBQ2lCLEVBQUgsQ0FBTSxDQUFOLEVBQVMsR0FBVCxDQUFiLENBSmUsQ0FJYzs7QUFDN0IsUUFBSUMsUUFBUSxHQUFHLEtBQUtYLElBQUwsQ0FBVVkseUJBQVYsQ0FBb0NOLEtBQUssQ0FBQ0EsS0FBMUMsQ0FBZjs7QUFFQSxRQUFJSyxRQUFRLENBQUNFLENBQVQsR0FBYUosTUFBTSxDQUFDSSxDQUF4QixFQUEyQjtBQUN2QjtBQUNIOztBQUVELFFBQUlDLFFBQVEsR0FBRyxLQUFLZCxJQUFMLENBQVVlLFlBQVYsQ0FBdUJ0QixFQUFFLENBQUN1QixRQUExQixDQUFmO0FBQ0EsUUFBSUMsSUFBSSxHQUFHTixRQUFRLENBQUNPLEdBQVQsQ0FBYVQsTUFBYixDQUFYO0FBQ0EsUUFBSVUsTUFBTSxHQUFHLEVBQWI7QUFDQSxRQUFJQyxVQUFVLEdBQUdILElBQUksQ0FBQ0ksR0FBTCxFQUFqQixDQWRlLENBY2lCOztBQUNoQyxRQUFJQyxTQUFTLEdBQUdMLElBQUksQ0FBQ00sU0FBTCxHQUFpQkMsR0FBakIsQ0FBcUJMLE1BQXJCLENBQWhCLENBZmUsQ0FlK0I7O0FBQzlDLFFBQUlNLEdBQUcsR0FBR2hCLE1BQU0sQ0FBQ2lCLEtBQVAsRUFBVixDQWhCZSxDQWdCVzs7QUFFMUJaLElBQUFBLFFBQVEsQ0FBQ2EsU0FBVCxHQUFxQmxDLEVBQUUsQ0FBQ21DLEtBQUgsQ0FBUyxHQUFULEVBQWMsR0FBZCxFQUFtQixHQUFuQixFQUF3QixHQUF4QixDQUFyQjtBQUNBSCxJQUFBQSxHQUFHLENBQUNJLE9BQUosQ0FBWVAsU0FBWjtBQUNBRyxJQUFBQSxHQUFHLENBQUNJLE9BQUosQ0FBWVAsU0FBWjtBQUNBUixJQUFBQSxRQUFRLENBQUNnQixLQUFULEdBckJlLENBdUJmOztBQUNBLFdBQU9WLFVBQVUsR0FBR0QsTUFBcEIsRUFBNEI7QUFDeEJMLE1BQUFBLFFBQVEsQ0FBQ2lCLE1BQVQsQ0FBZ0JOLEdBQUcsQ0FBQ08sQ0FBcEIsRUFBdUJQLEdBQUcsQ0FBQ1osQ0FBM0IsRUFBOEIsQ0FBOUI7QUFDQUMsTUFBQUEsUUFBUSxDQUFDbUIsSUFBVDtBQUNBUixNQUFBQSxHQUFHLENBQUNJLE9BQUosQ0FBWVAsU0FBWjtBQUNBRixNQUFBQSxVQUFVLElBQUlELE1BQWQ7QUFDSDs7QUFFRCxRQUFJZSxHQUFHLEdBQUd6QixNQUFNLENBQUNTLEdBQVAsQ0FBV1AsUUFBWCxDQUFWO0FBQ0EsUUFBSXdCLEtBQUssR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVdILEdBQUcsQ0FBQ3JCLENBQWYsRUFBa0JxQixHQUFHLENBQUNGLENBQXRCLElBQTJCSSxJQUFJLENBQUNFLEVBQWhDLEdBQXFDLEdBQWpEO0FBQ0EsU0FBS3pDLEtBQUwsQ0FBV0csSUFBWCxDQUFnQnVDLFFBQWhCLEdBQTJCLENBQUNKLEtBQTVCO0FBQ0g7QUE1Q0ksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy/nnoTlh4bnur8g5o6n5Yi257G7XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuICAgIHByb3BlcnRpZXM6ICgpID0+ICh7XG4gICAgICAgIGFycmF3OiBjYy5TcHJpdGUsXG4gICAgfSksXG4gICAgLy/liqDovb3lrozmiJBcbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCB0aGlzLm9uVG91Y2hNb3ZlLCB0aGlzKTtcbiAgICB9LFxuICAgIC8v6Kem5pG456e75Yqo5pON5L2c77yM5bCE57q/556E5YeGXG4gICAgb25Ub3VjaE1vdmUodG91Y2gpIHtcbiAgICAgICAgaWYoIXRoaXMubm9kZS5tYWluLmlzUmVjeWNsZUZpbmlzaGVkKCkpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBvcmlnaW4gPSBjYy52MigwLCA0NDYpOyAgLy/lsITnur/ljp/ngrnlnZDmoIdcbiAgICAgICAgbGV0IHRvdWNoUG9zID0gdGhpcy5ub2RlLmNvbnZlcnRUb3VjaFRvTm9kZVNwYWNlQVIodG91Y2gudG91Y2gpO1xuXG4gICAgICAgIGlmICh0b3VjaFBvcy55ID4gb3JpZ2luLnkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBncmFwaGljcyA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xuICAgICAgICBsZXQgbGluZSA9IHRvdWNoUG9zLnN1YihvcmlnaW4pO1xuICAgICAgICBsZXQgbGVuZ3RoID0gNDA7XG4gICAgICAgIGxldCBsaW5lTGVuZ3RoID0gbGluZS5tYWcoKTsgICAgLy/ojrflvpfov5nkuKrlkJHph4/nmoTplb/luqZcbiAgICAgICAgbGV0IGluY3JlbWVudCA9IGxpbmUubm9ybWFsaXplKCkubXVsKGxlbmd0aCk7IC8v5qC55o2u5q+P5p2h57q/5q6155qE6ZW/5bqm6I635b6X5LiA5Liq5aKe6YeP5ZCR6YePXG4gICAgICAgIGxldCBwb3MgPSBvcmlnaW4uY2xvbmUoKTsgLy/kuLTml7blj5jph49cblxuICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCAxNTApO1xuICAgICAgICBwb3MuYWRkU2VsZihpbmNyZW1lbnQpO1xuICAgICAgICBwb3MuYWRkU2VsZihpbmNyZW1lbnQpO1xuICAgICAgICBncmFwaGljcy5jbGVhcigpO1xuXG4gICAgICAgIC8v5Y+q6KaB57q/5q616ZW/5bqm6L+Y5aSn5LqO5q+P5p2h57q/5q6155qE6ZW/5bqmXG4gICAgICAgIHdoaWxlIChsaW5lTGVuZ3RoID4gbGVuZ3RoKSB7XG4gICAgICAgICAgICBncmFwaGljcy5jaXJjbGUocG9zLngsIHBvcy55LCA1KTtcbiAgICAgICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcbiAgICAgICAgICAgIHBvcy5hZGRTZWxmKGluY3JlbWVudCk7XG4gICAgICAgICAgICBsaW5lTGVuZ3RoIC09IGxlbmd0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkaXMgPSBvcmlnaW4uc3ViKHRvdWNoUG9zKVxuICAgICAgICB2YXIgYW5nbGUgPSBNYXRoLmF0YW4yKGRpcy55LCBkaXMueCkgLyBNYXRoLlBJICogMTgwO1xuICAgICAgICB0aGlzLmFycmF3Lm5vZGUucm90YXRpb24gPSAtYW5nbGU7XG4gICAgfVxufSlcbiJdfQ==