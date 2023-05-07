
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/gameStart.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU3RhcnQuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsIm9uTG9hZCIsIm5vZGUiLCJvbiIsImdhbWVTdGFydCIsImRpcmVjdG9yIiwibG9hZFNjZW5lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0FBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBRUw7QUFDQUMsRUFBQUEsTUFISyxvQkFHSTtBQUNMLFNBQUtDLElBQUwsQ0FBVUMsRUFBVixDQUFhLE9BQWIsRUFBcUIsS0FBS0MsU0FBMUIsRUFBb0MsSUFBcEM7QUFDSCxHQUxJO0FBTUxBLEVBQUFBLFNBTkssdUJBTU07QUFDUE4sSUFBQUEsRUFBRSxDQUFDTyxRQUFILENBQVlDLFNBQVosQ0FBc0IsTUFBdEI7QUFDSDtBQVJJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8v5byA5aeL5ri45oiP44CB6YeN5byA5ri45oiPXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICAgIC8v5Yqg6L295a6M5oiQXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKCdjbGljaycsdGhpcy5nYW1lU3RhcnQsdGhpcyk7XHJcbiAgICB9LFxyXG4gICAgZ2FtZVN0YXJ0KCl7XHJcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiZ2FtZVwiKTtcclxuICAgIH1cclxufSk7XHJcbiJdfQ==