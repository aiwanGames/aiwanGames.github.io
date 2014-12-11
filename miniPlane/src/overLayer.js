var overLayer = cc.LayerColor.extend({
    winsize:null,
    gameScore:0,

    init:function ()
    {
        //初始化父类
        this._super();
        this.winsize = cc.Director.getInstance().getWinSize();
        this.setColor(cc.c4(255,255,255,255));

        //再来一次
        //var zailaiItem = cc.MenuItemImage.create(s_img07,s_img08,this.gotoMainLayer,this);
        //var zailaimenu = cc.Menu.create(zailaiItem);
        //zailaimenu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.4));
        //this.addChild(zailaimenu, 1);

        //分享
        var fenxiangItem = cc.MenuItemImage.create(s_img05,s_img06,this.gotoMainLayer,this);
        var fenxiangmenu = cc.Menu.create(fenxiangItem);
        fenxiangmenu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.2));
        this.addChild(fenxiangmenu, 1);

        //手
        var sp_hand=cc.Sprite.create(s_img15);
        sp_hand.setPosition(cc.p(this.winsize.width*0.85,this.winsize.height*0.9));
        this.addChild(sp_hand,1);
        var ac0=cc.MoveTo.create(0.4,cc.p(this.winsize.width*0.9,this.winsize.height*0.95));
        var ac1=cc.MoveTo.create(0.4,cc.p(this.winsize.width*0.85,this.winsize.height*0.9));
        var ac2=cc.Sequence.create(ac0,ac1);
        var ac3=cc.RepeatForever.create(ac2);
        sp_hand.runAction(ac3);

        //添加分数
        var sp_gameScore=cc.LabelTTF.create(""+this.gameScore,"Arial",20);
        sp_gameScore.setAnchorPoint(cc.p(0,0.5));
        sp_gameScore.setPosition(cc.p(this.winsize.width*0.6,this.winsize.height*0.68));
        this.addChild(sp_gameScore,1);

        //关注公众号
        var guanzhu=cc.LabelTTF.create("更多小游戏,尽在微信订阅号 : aiwanGames", "Arial",20);
        guanzhu.setColor(cc.c3(0, 0, 0));
        guanzhu.setAnchorPoint(cc.p(0.5,0.5));
        guanzhu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.3));
        this.addChild(guanzhu,1);

        //分享内容
        document.title = window.wxData.desc = "分享到朋友圈的描述";
        document.title = window.wxFriend.desc = "分享给朋友的描述";
    },

    onEnterTransitionDidFinish:function()
    {

    },

    gotoMainLayer:function()
    {
        var scene=mainLayer.create();
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,scene));
    },

    update:function(dt)
    {
        //游戏主要刷新函数
    },

    setScore:function(_score)
    {
        this.gameScore=_score;
    }
})

overLayer.create=function(_score)
{
    var _overLayer=new overLayer();
    _overLayer.setScore(_score);
    _overLayer.init();
    var _scene=cc.Scene.create();
    _scene.addChild(_overLayer);
    return _scene;
}
