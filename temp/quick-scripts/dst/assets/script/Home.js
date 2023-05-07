
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/Home.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0aa66nDyExOQZoRfwfov4dw', 'Home');
// script/Home.js

"use strict";

//home主界面
cc.Class({
  "extends": cc.Component,
  properties: {
    progressBar: null,
    loadingLabel: cc.Label,
    startButton: cc.Button
  },
  //加载完成
  onLoad: function onLoad() {
    cc.director.preloadScene("game", this.onProgress.bind(this), this.onLoaded.bind(this));
  },
  //start
  start: function start() {
    this.progressBar = this.node.getChildByName("progressBar").getComponent(cc.ProgressBar);
    this.startButton.node.active = false;
  },
  //预加载进度
  onProgress: function onProgress(completedCount, totalCount, item) {
    var completedRate = completedCount / totalCount;
    this.progressBar.progress = completedRate;
    this.loadingLabel.string = "加载中...（" + parseInt(completedRate * 100).toString() + "）";
  },
  //预加载完成
  onLoaded: function onLoaded() {
    this.loadingLabel.string = "加载完成（100%）";
    this.startButton.node.active = true;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxIb21lLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwicHJvZ3Jlc3NCYXIiLCJsb2FkaW5nTGFiZWwiLCJMYWJlbCIsInN0YXJ0QnV0dG9uIiwiQnV0dG9uIiwib25Mb2FkIiwiZGlyZWN0b3IiLCJwcmVsb2FkU2NlbmUiLCJvblByb2dyZXNzIiwiYmluZCIsIm9uTG9hZGVkIiwic3RhcnQiLCJub2RlIiwiZ2V0Q2hpbGRCeU5hbWUiLCJnZXRDb21wb25lbnQiLCJQcm9ncmVzc0JhciIsImFjdGl2ZSIsImNvbXBsZXRlZENvdW50IiwidG90YWxDb3VudCIsIml0ZW0iLCJjb21wbGV0ZWRSYXRlIiwicHJvZ3Jlc3MiLCJzdHJpbmciLCJwYXJzZUludCIsInRvU3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0FBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBRUxDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxXQUFXLEVBQUUsSUFETDtBQUVSQyxJQUFBQSxZQUFZLEVBQUVMLEVBQUUsQ0FBQ00sS0FGVDtBQUdSQyxJQUFBQSxXQUFXLEVBQUVQLEVBQUUsQ0FBQ1E7QUFIUixHQUZQO0FBT0w7QUFDQUMsRUFBQUEsTUFSSyxvQkFRSTtBQUNMVCxJQUFBQSxFQUFFLENBQUNVLFFBQUgsQ0FBWUMsWUFBWixDQUF5QixNQUF6QixFQUFpQyxLQUFLQyxVQUFMLENBQWdCQyxJQUFoQixDQUFxQixJQUFyQixDQUFqQyxFQUE2RCxLQUFLQyxRQUFMLENBQWNELElBQWQsQ0FBbUIsSUFBbkIsQ0FBN0Q7QUFDSCxHQVZJO0FBV0w7QUFDQUUsRUFBQUEsS0FaSyxtQkFZRztBQUNKLFNBQUtYLFdBQUwsR0FBbUIsS0FBS1ksSUFBTCxDQUFVQyxjQUFWLENBQXlCLGFBQXpCLEVBQXdDQyxZQUF4QyxDQUFxRGxCLEVBQUUsQ0FBQ21CLFdBQXhELENBQW5CO0FBQ0EsU0FBS1osV0FBTCxDQUFpQlMsSUFBakIsQ0FBc0JJLE1BQXRCLEdBQStCLEtBQS9CO0FBQ0gsR0FmSTtBQWdCTDtBQUNBUixFQUFBQSxVQUFVLEVBQUUsb0JBQVVTLGNBQVYsRUFBMEJDLFVBQTFCLEVBQXNDQyxJQUF0QyxFQUE0QztBQUNwRCxRQUFJQyxhQUFhLEdBQUdILGNBQWMsR0FBR0MsVUFBckM7QUFDQSxTQUFLbEIsV0FBTCxDQUFpQnFCLFFBQWpCLEdBQTRCRCxhQUE1QjtBQUNBLFNBQUtuQixZQUFMLENBQWtCcUIsTUFBbEIsR0FBMkIsWUFBWUMsUUFBUSxDQUFDSCxhQUFhLEdBQUcsR0FBakIsQ0FBUixDQUE4QkksUUFBOUIsRUFBWixHQUF1RCxHQUFsRjtBQUNILEdBckJJO0FBc0JMO0FBQ0FkLEVBQUFBLFFBQVEsRUFBRSxvQkFBWTtBQUNsQixTQUFLVCxZQUFMLENBQWtCcUIsTUFBbEIsR0FBMkIsWUFBM0I7QUFDQSxTQUFLbkIsV0FBTCxDQUFpQlMsSUFBakIsQ0FBc0JJLE1BQXRCLEdBQStCLElBQS9CO0FBQ0g7QUExQkksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy9ob21l5Li755WM6Z2iXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBwcm9ncmVzc0JhcjogbnVsbCxcclxuICAgICAgICBsb2FkaW5nTGFiZWw6IGNjLkxhYmVsLFxyXG4gICAgICAgIHN0YXJ0QnV0dG9uOiBjYy5CdXR0b25cclxuICAgIH0sXHJcbiAgICAvL+WKoOi9veWujOaIkFxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLnByZWxvYWRTY2VuZShcImdhbWVcIiwgdGhpcy5vblByb2dyZXNzLmJpbmQodGhpcyksIHRoaXMub25Mb2FkZWQuYmluZCh0aGlzKSk7XHJcbiAgICB9LFxyXG4gICAgLy9zdGFydFxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzc0JhciA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInByb2dyZXNzQmFyXCIpLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0Jhcik7XHJcbiAgICAgICAgdGhpcy5zdGFydEJ1dHRvbi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSxcclxuICAgIC8v6aKE5Yqg6L296L+b5bqmXHJcbiAgICBvblByb2dyZXNzOiBmdW5jdGlvbiAoY29tcGxldGVkQ291bnQsIHRvdGFsQ291bnQsIGl0ZW0pIHtcclxuICAgICAgICBsZXQgY29tcGxldGVkUmF0ZSA9IGNvbXBsZXRlZENvdW50IC8gdG90YWxDb3VudDtcclxuICAgICAgICB0aGlzLnByb2dyZXNzQmFyLnByb2dyZXNzID0gY29tcGxldGVkUmF0ZTtcclxuICAgICAgICB0aGlzLmxvYWRpbmdMYWJlbC5zdHJpbmcgPSBcIuWKoOi9veS4rS4uLu+8iFwiICsgcGFyc2VJbnQoY29tcGxldGVkUmF0ZSAqIDEwMCkudG9TdHJpbmcoKSArIFwi77yJXCI7XHJcbiAgICB9LFxyXG4gICAgLy/pooTliqDovb3lrozmiJBcclxuICAgIG9uTG9hZGVkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nTGFiZWwuc3RyaW5nID0gXCLliqDovb3lrozmiJDvvIgxMDAl77yJXCI7XHJcbiAgICAgICAgdGhpcy5zdGFydEJ1dHRvbi5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9XHJcbn0pO1xyXG4iXX0=