window.shared=false;
var overLayer = cc.LayerColor.extend({
    winsize:null,
    gameLevel:0,
    gameTime:0,
    label1:null,
    isSharedC:false,

    init:function ()
    {
        //初始化父类
        this._super();
        this.winsize = cc.Director.getInstance().getWinSize();
        this.setColor(cc.c3(220,70,70));

        //再来一次
        var zailaiItem = cc.MenuItemImage.create(s_img05,s_img05,this.gotoMainLayer,this);
        var zailaimenu = cc.Menu.create(zailaiItem);
        zailaimenu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.3));
        this.addChild(zailaimenu, 1);

        //邀请好友
        var yaoqingItem = cc.MenuItemImage.create(s_img06,s_img06,this.share2Friend,this);
        var yaoqingmenu = cc.Menu.create(yaoqingItem);
        yaoqingmenu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.15));
        this.addChild(yaoqingmenu, 1);

        //统计图
        var sp_cal=cc.Sprite.create(s_img18);
        sp_cal.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.62));
        sp_cal.setScale(0.01);
        this.addChild(sp_cal,1);
        sp_cal.runAction(cc.Sequence.create(cc.DelayTime.create(0.5),cc.Spawn.create(cc.ScaleTo.create(0.5,0.85),cc.RotateBy.create(0.5,360))));

        //文字
        this.label1=cc.LabelTTF.create("", "黑体",25,cc.size(500,100),cc.TEXT_ALIGNMENT_CENTER);
        this.label1.setColor(cc.c3(255,220,135));
        this.label1.setAnchorPoint(cc.p(0.5,0.5));
        this.label1.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.87));
        this.addChild(this.label1,1);
        var hasSharedBefore=sys.localStorage.getItem("isChinaGovShared");
        var resultStr="";
        if(hasSharedBefore=="1")
        {
            resultStr="你共答对"+this.gameLevel+"道,以下是全国答题分布图.";
            this.label1.setString(resultStr);
        }
        else
        {
            resultStr="你共答对"+this.gameLevel+"道,以下是全国答题分布图.\n邀请好友帮忙揭晓答案.";
            this.label1.setString(resultStr);
            this.scheduleUpdate();
        }

        //关注公众号
        var guanzhu=cc.LabelTTF.create("更多小游戏,尽在微信订阅号 : aiwanGames", "Arial",20);
        guanzhu.setColor(cc.c3(255,220,135));
        guanzhu.setAnchorPoint(cc.p(0.5,0.5));
        guanzhu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.05));
        this.addChild(guanzhu,1);

        //分享标题和描述
        var shareToPengyou="测测你的图形推理能力到底有多强，我竟答对了"+this.gameLevel+"道！";
        document.title = window.wxData.desc = shareToPengyou;
        document.title = window.wxFriend.desc = shareToPengyou;
    },

    onEnterTransitionDidFinish:function()
    {

    },

    gotoMainLayer:function()
    {
        var scene=beginLayer.create();
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,scene));
    },

    update:function(dt)
    {
        //游戏主要刷新函数
        if(window.shared)
        {
            window.shared=false;
            sys.localStorage.setItem("isChinaGovShared","1");
            this.label1.stopAllActions();
            this.label1.setString("分享成功!\n点击再来一次,即可查看答案.");
        }
    },

    setScore:function(_score,_time)
    {
        this.gameLevel=_score;
        this.gameTime=_time;
    },

    share2Friend: function ()
    {
        if(this.isSharedC)
        {
            return;
        }
        this.isSharedC=true;
        //手
        var sp_hand=cc.Sprite.create(s_img09);
        sp_hand.setPosition(cc.p(this.winsize.width*0.93,this.winsize.height*0.92));
        sp_hand.setRotation(35);
        sp_hand.setScale(0.65);
        this.addChild(sp_hand,1);
        var ac0=cc.MoveTo.create(0.4,cc.p(this.winsize.width*0.96,this.winsize.height*0.95));
        var ac1=cc.MoveTo.create(0.4,cc.p(this.winsize.width*0.93,this.winsize.height*0.92));
        var ac2=cc.Sequence.create(ac0,ac1);
        var ac3=cc.RepeatForever.create(ac2);
        sp_hand.runAction(ac3);
        //提示分享
        this.label1.setString("点击右上角[分享至朋友圈]推荐给好友.");
        var ac10=cc.RotateTo.create(0.1,7);
        var ac11=cc.RotateTo.create(0.1,0);
        var ac12=cc.RotateTo.create(0.1,-7);
        var ac13=cc.RotateTo.create(0.1,0);
        var ac14=cc.DelayTime.create(1.0);
        this.label1.runAction(cc.RepeatForever.create(cc.Sequence.create(ac10,ac11,ac12,ac13,ac14)));
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
