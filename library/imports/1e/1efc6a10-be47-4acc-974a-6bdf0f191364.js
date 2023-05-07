"use strict";
cc._RF.push(module, '1efc6oQvkdKzJdKa98PGRNk', 'gameStart');
// script/gameStart.js

"use strict";

//开始游戏、重开游戏
cc.Class({
  "extends": cc.Component,
  //加载完成
  onLoad: function onLoad() {
    this.node.on('click', this.gameStart, this);
  },
  gameStart: function gameStart() {
    cc.director.loadScene("game");
  }
});

cc._RF.pop();