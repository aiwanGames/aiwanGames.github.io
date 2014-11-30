var overLayer = cc.LayerColor.extend({
    winsize:null,
    gameLevel:0,
    gameTime:0,

    init:function ()
    {
        //初始化父类
        this._super();
        this.winsize = cc.Director.getInstance().getWinSize();
        this.setColor(cc.c4(255,204,0,255));

        //再来一次
        var zailaiItem = cc.MenuItemImage.create(s_img05,s_img05,this.gotoMainLayer,this);
        var zailaimenu = cc.Menu.create(zailaiItem);
        zailaimenu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.40));
        this.addChild(zailaimenu, 1);

        //手
        var sp_hand=cc.Sprite.create(s_img14);
        sp_hand.setPosition(cc.p(this.winsize.width*0.85,this.winsize.height*0.9));
        this.addChild(sp_hand,1);
        sp_hand.setRotation(35);
        sp_hand.setScale(0.8);
        var ac0=cc.MoveTo.create(0.4,cc.p(this.winsize.width*0.9,this.winsize.height*0.95));
        var ac1=cc.MoveTo.create(0.4,cc.p(this.winsize.width*0.85,this.winsize.height*0.9));
        var ac2=cc.Sequence.create(ac0,ac1);
        var ac3=cc.RepeatForever.create(ac2);
        sp_hand.runAction(ac3);

        //文字
        var label1=cc.LabelTTF.create("你共认对"+this.gameLevel+"个叠加字.\n邀请好友,答案马上现身.", "黑体",28,cc.size(500,150),cc.TEXT_ALIGNMENT_CENTER);
        label1.setColor(cc.c3(0, 0, 0));
        label1.setAnchorPoint(cc.p(0.5,0.5));
        label1.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.58));
        this.addChild(label1,1);

        //关注公众号
        var guanzhu=cc.LabelTTF.create("更多小游戏,尽在微信订阅号 : aiwanGames", "Arial",20);
        guanzhu.setColor(cc.c3(0, 0, 0));
        guanzhu.setAnchorPoint(cc.p(0.5,0.5));
        guanzhu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.3));
        this.addChild(guanzhu,1);

        //提示用户分享
        var shareLabel=cc.LabelTTF.create("点击右上角[分享至朋友圈]推荐给好友.","黑体",23,cc.size(500,150),cc.TEXT_ALIGNMENT_CENTER);
        shareLabel.setColor(cc.c3(0,0,0));
        shareLabel.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.76));
        this.addChild(shareLabel,1);
        var ac0=cc.RotateTo.create(0.1,7);
        var ac1=cc.RotateTo.create(0.1,0);
        var ac2=cc.RotateTo.create(0.1,-7);
        var ac3=cc.RotateTo.create(0.1,0);
        var ac4=cc.DelayTime.create(1.0);
        shareLabel.runAction(cc.RepeatForever.create(cc.Sequence.create(ac0,ac1,ac2,ac3,ac4)));

        //分享标题和描述
        var shareText="我在《游戏名称》中坚持了秒，快来挑战我！";
        document.title = window.wxData.desc = shareText;
        document.title = window.wxFriend.desc = shareText;

        window.shared=false;
        this.scheduleUpdate();
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
        if(window.shared)
        {
            window.shared=false;
            var label1=cc.LabelTTF.create("点击再来一次,答案即将揭晓.", "黑体",28,cc.size(500,150),cc.TEXT_ALIGNMENT_CENTER);
            label1.setColor(cc.c3(0, 0, 0));
            label1.setAnchorPoint(cc.p(0.5,0.5));
            label1.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.5));
            this.addChild(label1,1);
        }
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
