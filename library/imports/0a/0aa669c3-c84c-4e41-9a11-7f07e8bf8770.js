"use strict";
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