var overLayer = cc.LayerColor.extend({
    winsize:null,
    score:0,
    sound:false,
    isShared:false,

    init:function ()
    {
        this._super();
        this.winsize = cc.Director.getInstance().getWinSize();
        this.audio=cc.AudioEngine.getInstance();
        document.body.style.backgroundColor="#98D8FB";

        var sp_back1=cc.Sprite.create(s_00);
        sp_back1.setAnchorPoint(cc.p(0.5,0));
        sp_back1.setPosition(cc.p(this.winsize.width*0.5,0));
        this.addChild(sp_back1,0);

        var sp_back4=cc.Sprite.create(s_02);
        sp_back4.setAnchorPoint(cc.p(0.5,0));
        sp_back4.setPosition(cc.p(this.winsize.width*0.5,0));
        this.addChild(sp_back4, 1);

        var sp_back2=cc.Sprite.create(s_03);
        sp_back2.setScale(0.01);
        sp_back2.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.644));
        this.addChild(sp_back2, 1);
        var ac=cc.Sequence.create(cc.DelayTime.create(0.2),cc.EaseElasticOut.create(cc.ScaleTo.create(0.7,1)),cc.Repeat.create(cc.RotateBy.create(5,360),9999));
        sp_back2.runAction(ac);

        var sp_back3=cc.Sprite.create(s_141);
        sp_back3.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.644));
        this.addChild(sp_back3, 2);

        var sp_star=cc.Sprite.create(s_06);
        sp_star.setScale(0.01);
        sp_star.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.8));
        this.addChild(sp_star, 1);
        var ae=cc.Sequence.create(cc.DelayTime.create(0.6),cc.Repeat.create(cc.Sequence.create(cc.EaseElasticOut.create(cc.ScaleTo.create(0.3,1)),cc.DelayTime.create(1.0),cc.ScaleTo.create(0.02,0.01)),9999));
        sp_star.runAction(ae);

        var tip=cc.LabelTTF.create("此活动为随手记官方举办, 与Apple Inc. 无关","Arial",18);
        tip.setPosition(cc.p(320,20));
        tip.setColor(cc.c3(255,255,255));
        this.addChild(tip,8);

       this.showResult();

        var zailaiItem = cc.MenuItemImage.create(s_24,s_25,this.gotoMainLayer,this);
        var zailaimenu = cc.Menu.create(zailaiItem);
        zailaimenu.setPosition(cc.p(-this.winsize.width*0.2,this.winsize.height*0.336));
        zailaimenu.setTag(100);
        this.addChild(zailaimenu, 1);
        zailaimenu.runAction(cc.Sequence.create(cc.DelayTime.create(0.5),cc.EaseElasticOut.create(cc.MoveTo.create(0.3,cc.p(this.winsize.width*0.5,this.winsize.height*0.336)))));

        var fenxiangItem = cc.MenuItemImage.create(s_20,s_21,this.share2Friend,this);
        var fenxiangmenu = cc.Menu.create(fenxiangItem);
        fenxiangmenu.setPosition(cc.p(-this.winsize.width*0.2,this.winsize.height*0.431));
        fenxiangmenu.setTag(101);
        this.addChild(fenxiangmenu, 1);
        fenxiangmenu.runAction(cc.Sequence.create(cc.DelayTime.create(0.2),cc.EaseElasticOut.create(cc.MoveTo.create(0.3,cc.p(this.winsize.width*0.5,this.winsize.height*0.431)))));

        var enterItem = cc.MenuItemImage.create(s_22,s_23,this.enterBBS,this);
        var entermenu = cc.Menu.create(enterItem);
        entermenu.setPosition(cc.p(-this.winsize.width*0.2,this.winsize.height*0.24));
        entermenu.setTag(105);
        this.addChild(entermenu, 1);
        entermenu.runAction(cc.Sequence.create(cc.DelayTime.create(0.8),cc.EaseElasticOut.create(cc.MoveTo.create(0.3,cc.p(this.winsize.width*0.5,this.winsize.height*0.24)))));

        var sp_logo=cc.Sprite.create(s_07);
        sp_logo.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.12));
        this.addChild(sp_logo, 2);

        this.setTouchEnabled(true);
    },

    gotoMainLayer:function()
    {
        if (this.sound)
        {
            if(navigator.userAgent.indexOf('Android')>-1)
            {

            }
            else
            {
                this.audio.playEffect(s_button);
            }
        }
        var scene=beginLayer.create();
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,scene));
    },

    showResult:function()
    {
        var tipl=cc.Sprite.create(s_tipl);
        tipl.setPosition(cc.p(this.winsize.width*0.266,this.winsize.height*0.89));
        this.addChild(tipl,5);
        var tipr=cc.Sprite.create(s_tipr);
        tipr.setPosition(cc.p(this.winsize.width*0.82,this.winsize.height*0.89));
        this.addChild(tipr,5);
        var tipl1=cc.Sprite.create(s_tipl1);
        tipl1.setPosition(cc.p(this.winsize.width*0.34,this.winsize.height*0.83));
        this.addChild(tipl1,5);
        var tipr1=cc.Sprite.create(s_tipr1);
        tipr1.setPosition(cc.p(this.winsize.width*0.66,this.winsize.height*0.83));
        this.addChild(tipr1,5);
        var scorelb=cc.LabelTTF.create(this.score+"","Arial",38,cc.Size(100,50),cc.TEXT_ALIGNMENT_CENTER);
        scorelb.setAnchorPoint(cc.p(0.5,0.5));
        scorelb.setPosition(cc.p(this.winsize.width*0.587,this.winsize.height*0.89));
        scorelb.setColor(cc.c3(235,57,33));
        this.addChild(scorelb,5);
        var percent=((this.score/2800.0)*100).toFixed(1);

        if(percent<1)
        {
            percent=1.0;
        }

        if(percent>=100)
        {
            percent=99.9;
        }
        var content="啪啪啪，我获得了"+this.score+"金币，击败"+percent+"%的人，不服来战";
        var pcntlb=cc.LabelTTF.create(percent,"Arial",38,cc.Size(100,50),cc.TEXT_ALIGNMENT_CENTER);
        pcntlb.setAnchorPoint(cc.p(0.5,0.5));
        pcntlb.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.83));
        pcntlb.setColor(cc.c3(235,57,33));
        this.addChild(pcntlb,5);
        document.title = window.wxData.desc = content;
        document.title = window.wxFriend.desc = content;
    },

    share2Friend:function()
    {
        if (this.sound)
        {
            if(navigator.userAgent.indexOf('Android')>-1)
            {

            }
            else
            {
                this.audio.playEffect(s_button);
            }
        }
        if (ssjShare.check())
        {
            ssjShare.share(window.wxFriend.imgUrl, window.wxFriend.link, window.wxFriend.title, window.wxFriend.desc);
        }
        else
        {
            // 弹出箭头的地方
            if(this.isShared==false)
            {
                document.body.style.backgroundColor="#2C424D";
                var shield1=cc.Sprite.create(s_shld);
                shield1.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.5));
                shield1.setTag(102);
                shield1.setScaleY(1.5);
                this.addChild(shield1,5);
                var shield2=cc.Sprite.create(s_arrow);
                shield2.setPosition(cc.p(this.winsize.width*0.8,this.winsize.height*0.9));
                shield2.setTag(103);
                this.addChild(shield2,5);
                var shield3=cc.Sprite.create(s_tip);
                shield3.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.8));
                shield3.setTag(104);
                this.addChild(shield3,5);

                if(this.getChildByTag(100))this.getChildByTag(100).setEnabled(false);
                if(this.getChildByTag(101))this.getChildByTag(101).setEnabled(false);
                if(this.getChildByTag(105))this.getChildByTag(105).setEnabled(false);
                this.isShared=true;
            }
        }
    },

   enterBBS:function()
    {
        if (this.sound)
        {
            if(navigator.userAgent.indexOf('Android')>-1)
            {

            }
            else
            {
                this.audio.playEffect(s_button);
            }
        }
        var newURL="http://bbs.feidee.com/m/";
        window.location.href=newURL;
    },

    onTouchesBegan:function(touches, event)
    {
        if(this.isShared==true)
        {
            document.body.style.backgroundColor="#98D8FB";
            if(this.getChildByTag(100))this.getChildByTag(100).setEnabled(true);
            if(this.getChildByTag(101))this.getChildByTag(101).setEnabled(true);
            if(this.getChildByTag(105))this.getChildByTag(105).setEnabled(true);
            this.removeChildByTag(102,true);
            this.removeChildByTag(103,true);
            this.removeChildByTag(104,true);
            this.isShared=false;
        }
    },

    setScore:function(_score,_sound)
    {
        this.score=_score;
        this.sound=_sound;
    }

});

overLayer.create=function(_score,_sound)
{
    var _overLayer=new overLayer();
    _overLayer.setScore(_score,_sound);
    _overLayer.init();
    var _scene=cc.Scene.create();
    _scene.addChild(_overLayer);
    return _scene;
};