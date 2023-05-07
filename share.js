cc.Class({
    extends: cc.Component,

    properties: {
        // 在编辑器中关联分享标题和图片
        shareTitle: '我在玩一个很有趣的游戏！',
        shareImage: cc.Texture2D,
    },

    // 初始化
    onLoad () {
        // 设置分享按钮的点击事件
        this.node.on(cc.Node.EventType.TOUCH_END, this.onShareButtonClicked, this);
    },

    // 分享按钮点击事件处理函数
    onShareButtonClicked () {
        // console.log('1')
        // 调用微信小游戏的分享接口
        if (typeof wx !== 'undefined') {
            wx.shareAppMessage({
                title: this.shareTitle,
                imageUrl: this.shareImage.url,
            });
        }
    },
});
