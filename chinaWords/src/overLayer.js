window.shared=false;
var overLayer = cc.LayerColor.extend({
    winsize:null,
    gameLevel:0,
    gameTime:0,
    label1:null,

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
        this.label1=cc.LabelTTF.create("", "黑体",28,cc.size(500,150),cc.TEXT_ALIGNMENT_CENTER);
        this.label1.setColor(cc.c3(0, 0, 0));
        this.label1.setAnchorPoint(cc.p(0.5,0.5));
        this.label1.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.57));
        this.addChild(this.label1,1);
        var hasSharedBefore=sys.localStorage.getItem("isChinaWordsShared");
        var resultStr="";
        if(hasSharedBefore=="1")
        {
            resultStr="你共认对"+this.gameLevel+"个疑难字.";
            this.label1.setString(resultStr);
        }
        else
        {
            resultStr="你共认对"+this.gameLevel+"个疑难字.\n邀请好友,答案马上现身.";
            this.label1.setString(resultStr);
            this.scheduleUpdate();
        }

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
        var shareToPengyou="";
        var shareToFriend="";
        if(this.gameLevel==0)
        {
            shareToPengyou="我在《全民挑战疑难汉字》中一个字也没认出来，别拦我！";
            shareToFriend="我在《全民挑战疑难汉字》中一个字也没认出来，别拦我，感觉不会再爱了！";
        }
        else if(this.gameLevel>0&&this.gameLevel<=5)
        {
            shareToPengyou="我在《全民挑战疑难汉字》中竟然认出"+this.gameLevel+"个，快来挑战！";
            shareToFriend="我在《全民挑战疑难汉字》中竟然认出"+this.gameLevel+"个，终于没给语文老师丢脸！";
        }
        else if(this.gameLevel>5&&this.gameLevel<=10)
        {
            shareToPengyou="我在《全民挑战疑难汉字》中竟然认出"+this.gameLevel+"个，快来挑战！";
            shareToFriend="我在《全民挑战疑难汉字》中竟然认出"+this.gameLevel+"个，没想到我知识如此渊博！";
        }
        else if(this.gameLevel>10&&this.gameLevel<=15)
        {
            shareToPengyou="我在《全民挑战疑难汉字》中竟然认出"+this.gameLevel+"个，快来挑战！";
            shareToFriend="我在《全民挑战疑难汉字》中竟然认出"+this.gameLevel+"个，堪比文学叫兽！" ;
        }
        else if(this.gameLevel>15&&this.gameLevel<=19)
        {
            shareToPengyou="我在《全民挑战疑难汉字》中竟然认出"+this.gameLevel+"个，快来挑战！";
            shareToFriend="我在《全民挑战疑难汉字》中竟然认出"+this.gameLevel+"个，请考古部门联系我！";
        }
        else
        {
            shareToPengyou="我在《全民挑战疑难汉字》中竟然认出全部汉字，帅呆！";
            shareToFriend="我在《全民挑战疑难汉字》中竟然认出全部汉字，是时候考虑我的身世了！";
        }
        document.title = window.wxData.desc = shareToPengyou;
        document.title = window.wxFriend.desc = shareToFriend;
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
            sys.localStorage.setItem("isChinaWordsShared","1");
            this.label1.setString("分享成功!\n点击再来一次,即可查看答案.");
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
