var overLayer = cc.LayerColor.extend({
    winsize:null,
    score:0,
    isShared:false,

    init:function ()
    {
        this._super();
        this.winsize = cc.Director.getInstance().getWinSize();
        //背景
        var sp_back=cc.Sprite.create(s_img01);
        sp_back.setAnchorPoint(cc.p(0.5,0));
        sp_back.setPosition(cc.p(this.winsize.width*0.5,0));
        this.addChild(sp_back,0);
        var sp_back1=cc.Sprite.create(s_img13);
        sp_back1.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.58));
        this.addChild(sp_back1,1);
        var sp_back2=cc.Sprite.create(s_img08);
        sp_back2.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.58));
        this.addChild(sp_back2,1);
        var ac1=cc.RepeatForever.create(cc.RotateBy.create(4.0,360));
        sp_back1.runAction(ac1);
        //分数
        var timeLabel=cc.LabelTTF.create("恭喜,你共抢到"+this.score+"分.","Arial",30);
        timeLabel.setAnchorPoint(cc.p(0.5,0.5));
        timeLabel.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.75));
        timeLabel.setColor(cc.c3(235,90,55));
        this.addChild(timeLabel,1);
        //再来一次按钮
        var zailaiItem = cc.MenuItemImage.create(s_img03,s_img03,this.gotoMainLayer,this);
        var zailaimenu = cc.Menu.create(zailaiItem);
        zailaimenu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.37));
        zailaimenu.setTag(100);
        this.addChild(zailaimenu, 1);
        //分享按钮
        var fenxiangItem = cc.MenuItemImage.create(s_img04,s_img04,this.share2Friend,this);
        var fenxiangmenu = cc.Menu.create(fenxiangItem);
        fenxiangmenu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.20));
        fenxiangmenu.setTag(101);
        this.addChild(fenxiangmenu, 1);
        document.title = window.wxData.desc = "我在《接财神》小游戏中共抢到了"+this.score+"分，快来挑战我吧！";
        document.title = window.wxFriend.desc = "我在《接财神》小游戏中共抢到了"+this.score+"分，快来挑战我吧！";
        this.setTouchEnabled(true);
    },

    gotoMainLayer:function()
    {
        var scene=mainLayer.create();
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,scene));
    },

    share2Friend:function()
    {
        if(this.isShared==false)
        {
            //屏蔽层
            var shield1=cc.Sprite.create(s_img10);
            shield1.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.5));
            shield1.setTag(102);
            this.addChild(shield1,5);
            var shield2=cc.Sprite.create(s_img11);
            shield2.setPosition(cc.p(this.winsize.width*0.8,this.winsize.height*0.9));
            shield2.setTag(103);
            this.addChild(shield2,5);
            var label=cc.LabelTTF.create("点击这里分享","黑体",35);
            label.setAnchorPoint(cc.p(0.5,0.5));
            label.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.78));
            label.setColor(cc.c3(255,255,255));
            label.setTag(104);
            this.addChild(label,5);
            if(this.getChildByTag(100))this.getChildByTag(100).setEnabled(false);
            if(this.getChildByTag(100))this.getChildByTag(101).setEnabled(false);
            this.isShared=true;
        }
    },

    onTouchesBegan:function(touches, event)
    {
        if(this.isShared==true)
        {
            if(this.getChildByTag(100))this.getChildByTag(100).setEnabled(true);
            if(this.getChildByTag(101))this.getChildByTag(101).setEnabled(true);
            this.removeChildByTag(102,true);
            this.removeChildByTag(103,true);
            this.removeChildByTag(104,true);
            this.isShared=false;
        }
    },

    setScore:function(_score)
    {
        this.score=_score;
    }

});

overLayer.create=function(_score)
{
    var _overLayer=new overLayer();
    _overLayer.setScore(_score);
    _overLayer.init();
    var _scene=cc.Scene.create();
    _scene.addChild(_overLayer);
    return _scene;
};