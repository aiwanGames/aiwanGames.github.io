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
        var prs0=cc.Sprite.create(s_img18);
        prs0.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.54));
        prs0.setColor(cc.GRAY);
        this.addChild(prs0,1);

        var prs=cc.ProgressTimer.create(cc.Sprite.create(s_img18));
        prs.setPercentage(0);
        prs.setBarChangeRate(1);
        prs.setType(cc.PROGRESS_TIMER_TYPE_RADIAL);
        prs.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.54));
        this.addChild(prs,1);
        var perc=0;
        if(this.gameLevel==0)
        {
            perc=5;
        }
        else
        {
            perc=this.gameLevel/10*100;
        }
        prs.runAction(cc.Sequence.create(cc.DelayTime.create(0.5),cc.ProgressTo.create(1.0,perc)));

        //文字
        this.label1=cc.LabelTTF.create("", "黑体",25,cc.size(500,150),cc.TEXT_ALIGNMENT_CENTER);
        this.label1.setColor(cc.c3(255,220,135));
        this.label1.setAnchorPoint(cc.p(0.5,0.5));
        this.label1.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.75));
        this.addChild(this.label1,1);
        var hasSharedBefore=sys.localStorage.getItem("isChinaGovShared");
        var resultStr="";
        if(hasSharedBefore=="1")
        {
            resultStr="你共答对"+this.gameLevel+"道题\n推理强度为："+perc+"%";
            this.label1.setString(resultStr);
        }
        else
        {
            resultStr="你共答对"+this.gameLevel+"道题\n推理强度为："+perc+"%"+"\n分享给好友可立即揭晓答案";
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
        var shareToPengyou="超准的图形推理能力测试题，我的推理强度是"+perc+"%";
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
            this.removeChildByTag(170);
            this.label1.setVisible(true);
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
        sp_hand.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*1.2));
        sp_hand.setScale(1.05);
        sp_hand.setTag(170);
        this.addChild(sp_hand,1);
        var ac0=cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(this.winsize.width*0.5,this.winsize.height*0.899)));
        sp_hand.runAction(ac0);

        this.label1.setVisible(false);
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
