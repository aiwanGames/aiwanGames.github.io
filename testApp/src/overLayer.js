var overLayer = cc.LayerColor.extend({
    winsize:null,
    gameLevel:0,
    gameTime:0,

    init:function ()
    {
        //初始化父类
        this._super();
        this.winsize = cc.Director.getInstance().getWinSize();
        this.setColor(cc.c4(255,255,255,255));

        //再来一次
        var zailaiItem = cc.MenuItemImage.create(s_again,s_again_press,this.gotoMainLayer,this);
        var menu = cc.Menu.create(zailaiItem);
        menu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.46));
        this.addChild(menu, 1);

        //分享
        var sp_tip=cc.Sprite.create(s_fenxiang);
        sp_tip.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.84));
        this.addChild(sp_tip,1);

        //手
        var sp_hand=cc.Sprite.create(s_share);
        sp_hand.setPosition(cc.p(this.winsize.width*0.85,this.winsize.height*0.9));
        this.addChild(sp_hand,1);
        var ac0=cc.MoveTo.create(0.4,cc.p(this.winsize.width*0.9,this.winsize.height*0.95));
        var ac1=cc.MoveTo.create(0.4,cc.p(this.winsize.width*0.85,this.winsize.height*0.9));
        var ac2=cc.Sequence.create(ac0,ac1);
        var ac3=cc.RepeatForever.create(ac2);
        sp_hand.runAction(ac3);

        //成绩
        var sp_time=cc.Sprite.create(s_time);
        sp_time.setAnchorPoint(cc.p(0,0.5));
        sp_time.setPosition(cc.p(this.winsize.width*0.35,this.winsize.height*0.68));
        this.addChild(sp_time,1);
        var sp_level=cc.Sprite.create(s_level);
        sp_level.setAnchorPoint(cc.p(0,0.5));
        sp_level.setPosition(cc.p(this.winsize.width*0.35,this.winsize.height*0.6));
        this.addChild(sp_level,1);

        //添加时间，层数
        var sp_gameTime=cc.LabelAtlas.create(""+this.gameTime,s_number,26,32,'0');
        sp_gameTime.setAnchorPoint(cc.p(0,0.5));
        sp_gameTime.setPosition(cc.p(this.winsize.width*0.6,this.winsize.height*0.68));
        this.addChild(sp_gameTime,1);
        var sp_gameLevel=cc.LabelAtlas.create(""+this.gameLevel,s_number,26,32,'0');
        sp_gameLevel.setAnchorPoint(cc.p(0,0.5));
        sp_gameLevel.setPosition(cc.p(this.winsize.width*0.6,this.winsize.height*0.6));
        this.addChild(sp_gameLevel,1);

        //关注公众号
        var guanzhu=cc.LabelTTF.create("更多小游戏,尽在微信订阅号 : aiwanGames", "Arial",20);
        guanzhu.setColor(cc.c3(0, 0, 0));
        guanzhu.setAnchorPoint(cc.p(0.5,0.5));
        guanzhu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.3));
        this.addChild(guanzhu,1);
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

    setScore:function(_score,_time)
    {
        this.gameLevel=_score;
        this.gameTime=_time;
    }
})

overLayer.create=function(_score,_time)
{
    var _overLayer=new overLayer();
    _overLayer.setScore(_score,_time);
    _overLayer.init();
    var _scene=cc.Scene.create();
    _scene.addChild(_overLayer);
    return _scene;
}
