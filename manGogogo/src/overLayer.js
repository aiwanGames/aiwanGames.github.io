/**
 * Created by apple on 2014/11/24.
 */
/**
 * Created by apple on 14-11-14.
 */
var overLayer = cc.LayerColor.extend({
    winsize:null,
    gameLevel:0,
    gameTime:0,

    init:function ()
    {
        // 1. super init first
        this._super();
        this.winsize = cc.Director.getInstance().getWinSize();
        this.setColor(cc.c4(255,255,255,255));

        //再来一次按钮
        var zailaiItem = cc.MenuItemImage.create(s_again,s_again_press,this.gotoMainLayer,this);
        var menu = cc.Menu.create(zailaiItem);
        menu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.46));
        this.addChild(menu, 1);
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

        //提示分享和得分
        var shareLabel=cc.LabelTTF.create("点击右上角[分享至朋友圈]推荐给好友.","黑体",23,cc.size(500,150),cc.TEXT_ALIGNMENT_CENTER);
        shareLabel.setColor(cc.c3(0,0,0));
        shareLabel.setAnchorPoint(cc.p(0.5,0.5));
        shareLabel.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.76));
        this.addChild(shareLabel,1);
        var ac0=cc.RotateTo.create(0.1,7);
        var ac1=cc.RotateTo.create(0.1,0);
        var ac2=cc.RotateTo.create(0.1,-7);
        var ac3=cc.RotateTo.create(0.1,0);
        var ac4=cc.DelayTime.create(1.0);
        shareLabel.runAction(cc.RepeatForever.create(cc.Sequence.create(ac0,ac1,ac2,ac3,ac4)));

        //分享标题和描述
        var shareText="我在《是男人就坚持30秒》中坚持了"+this.gameTime+"秒，谁敢来挑战！";
        document.title = window.wxData.desc = shareText;
        document.title = window.wxFriend.desc = shareText;
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
