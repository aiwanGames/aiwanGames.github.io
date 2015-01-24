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
        //光环
        var sp_back1=cc.Sprite.create(s_img13);
        sp_back1.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.6));
        this.addChild(sp_back1,1);
        var ac1=cc.RepeatForever.create(cc.RotateBy.create(4.0,360));
        sp_back1.runAction(ac1);
        //礼物
        var sp_back2=cc.Sprite.create(s_img23);
        sp_back2.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.6));
        sp_back2.setTag(800);
        sp_back2.setRotation(-20);
        this.addChild(sp_back2,1);
        var ac2=cc.Sequence.create(cc.DelayTime.create(0.25),cc.RotateBy.create(0.2,40),cc.RotateBy.create(0.2,-40),cc.RotateBy.create(0.2,40),cc.RotateBy.create(0.1,-20),cc.Spawn.create(cc.FadeOut.create(0.15),cc.ScaleTo.create(0.15,1.2)),cc.CallFunc.create(this.showResult,this));
        sp_back2.runAction(ac2);
        //分数
        var timeLabel=cc.LabelTTF.create("恭喜,你薅了"+this.score+"斤羊毛.","Arial",37);
        timeLabel.setAnchorPoint(cc.p(0.5,0.5));
        timeLabel.setTag(801);
        timeLabel.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.82));
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
        fenxiangmenu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.22));
        fenxiangmenu.setTag(101);
        this.addChild(fenxiangmenu, 1);

        this.setTouchEnabled(true);
    },

    gotoMainLayer:function()
    {
        var scene=beginLayer.create();
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,scene));
    },

    showResult:function()
    {
        var _gift=this.getChildByTag(800);
        var _label=this.getChildByTag(801);
        _gift.runAction(cc.Sequence.create(cc.Spawn.create(cc.FadeIn.create(0.25),cc.ScaleTo.create(0.25,1.2)),cc.ScaleTo.create(0.15,1.0)));
        var content="";
        if(this.score<50)
        {
            content="我薅(hao)的羊毛太少，被小伙伴完爆，不能愉快的玩耍了！";
            _label.setString("获得【剪刀】，亲继续薅吧！");
            _gift.initWithFile(s_img05);
            _gift.setScale(1.3);
        }
        else if(this.score>=50&&this.score<250)
        {
            content="我薅(hao)了"+this.score+"斤羊毛，织了一双羊毛袜子送给你！";
            _label.setString("获得【羊毛袜子】，加油哟！");
            _gift.initWithFile(s_img19);
        }
        else if(this.score>=250&&this.score<450)
        {
            content="我薅(hao)了"+this.score+"斤羊毛，织了一双羊毛手套送给你！";
            _label.setString("获得【羊毛手套】，不错哟！");
            _gift.initWithFile(s_img22);
        }
        else if(this.score>=450&&this.score<650)
        {
            content="我薅(hao)了"+this.score+"斤羊毛，织了一顶羊毛帽子送给你！";
            _label.setString("获得【羊毛帽子】，你真棒！");
            _gift.initWithFile(s_img20);
        }
        else
        {
            content="我薅(hao)了"+this.score+"斤羊毛，织了一双羊毛靴送给你！";
            _label.setString("获得【羊毛靴】，薅毛之王！");
            _gift.initWithFile(s_img21);
        }
        document.title = window.wxData.desc = content;
        document.title = window.wxFriend.desc = content;
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