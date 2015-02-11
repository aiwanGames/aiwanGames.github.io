var overLayer = cc.LayerColor.extend({
    winsize:null,
    score:0,
    isShared:false,

    init:function ()
    {
        this._super();
        this.winsize = cc.Director.getInstance().getWinSize();

        var sp_back=cc.Sprite.create(s_img01);
        sp_back.setAnchorPoint(cc.p(0.5,0));
        sp_back.setPosition(cc.p(this.winsize.width*0.5,0));
        this.addChild(sp_back,0);

        var sp_back1=cc.Sprite.create(s_img13);
        sp_back1.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.6));
        this.addChild(sp_back1,1);
        var ac1=cc.RepeatForever.create(cc.RotateBy.create(4.0,360));
        sp_back1.runAction(ac1);

        var tip=cc.LabelTTF.create("此活动为随手记官方举办, 与Apple Inc. 无关","Arial",15);
        tip.setPosition(cc.p(320,15));
        tip.setColor(cc.c3(255,255,255));
        this.addChild(tip,8);

        this.showResult();

        var timeLabel=cc.LabelTTF.create("恭喜,你薅了"+(this.score/50).toFixed(1)+"斤羊毛","Arial",35);
        timeLabel.setAnchorPoint(cc.p(0.5,0.5));
        timeLabel.setTag(801);
        timeLabel.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.9));
        timeLabel.setColor(cc.c3(235,90,55));
        this.addChild(timeLabel,1);

        var zailaiItem = cc.MenuItemImage.create(s_img03,s_img03,this.gotoMainLayer,this);
        var zailaimenu = cc.Menu.create(zailaiItem);
        //zailaiItem.setScale(0.8);
        zailaimenu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.27));
        zailaimenu.setTag(100);
        this.addChild(zailaimenu, 1);

        var fenxiangItem = cc.MenuItemImage.create(s_img04,s_img04,this.share2Friend,this);
        var fenxiangmenu = cc.Menu.create(fenxiangItem);
        //fenxiangItem.setScale(0.8);
        fenxiangmenu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.38));
        fenxiangmenu.setTag(101);
        this.addChild(fenxiangmenu, 1);

        var enterItem = cc.MenuItemImage.create(s_img24,s_img24,this.enterBBS,this);
        var entermenu = cc.Menu.create(enterItem);
        //enterItem.setScale(0.8);
        entermenu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.16));
        entermenu.setTag(105);
        this.addChild(entermenu, 1);

        var sp_logo=cc.Sprite.create(s_img22);
        sp_logo.setScale(0.7);
        sp_logo.setPosition(cc.p(this.winsize.width*0.5,55));
        this.addChild(sp_logo, 2);

        this.setTouchEnabled(true);
    },

    gotoMainLayer:function()
    {
        var scene=beginLayer.create();
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,scene));
    },

    showResult:function()
    {
        var _gift=cc.Sprite.create(s_img05);
        _gift.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.6));
        this.addChild(_gift,5);
        var _label=cc.LabelTTF.create("","Arial",32,cc.Size(500,200),cc.TEXT_ALIGNMENT_CENTER);
        _label.setAnchorPoint(cc.p(0.5,0.5));
        _label.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.81));
        _label.setColor(cc.c3(235,90,55));
        this.addChild(_label,1);
        var content="";
        var img="http://aiwangames.com/ssGameThree/res/HD/";
        if(this.score<50)
        {
            content="我薅的羊毛太少，被小伙伴完爆，快来帮帮我！";
            _label.setString("获得 [ 剪刀 ]\n太少了，做成礼物臣妾做不到啊");
            _gift.initWithFile(s_img05);
            _gift.setScale(1.4);
        }
        else if(this.score>=50&&this.score<200)
        {
            content="我薅了"+(this.score/50).toFixed(1)+"斤羊毛，织了一羊毛内内送给你";
            _label.setString("获得 [ 羊毛内内 ]\n屁屁，也是需要保暖的！");
            _gift.initWithFile(s_img19);
            window.wxData.imgUrl=img+"shareImage1.png";
            window.wxFriend.imgUrl=img+"shareImage1.png";
            document.getElementById("shareImage").src=img+"shareImage1.png";
        }
        else if(this.score>=200&&this.score<300)
        {
            content="我薅了"+(this.score/50).toFixed(1)+"斤羊毛，织了一顶羊毛帽子送给你";
            _label.setString("获得 [ 羊毛帽子 ]\n林海雪原等你征服！");
            _gift.initWithFile(s_img20);
            window.wxData.imgUrl=img+"shareImage2.png";
            window.wxFriend.imgUrl=img+"shareImage2.png";
            document.getElementById("shareImage").src=img+"shareImage2.png";
        }
        else
        {
            content="我薅了"+(this.score/50).toFixed(1)+"斤羊毛，织了一件羊毛大衣送给你";
            _label.setString("获得 [ 羊毛大衣 ]\n妈妈再也不用担心你被冻坏了！");
            _gift.initWithFile(s_img21);
            window.wxData.imgUrl=img+"shareImage3.png";
            window.wxFriend.imgUrl=img+"shareImage3.png";
            document.getElementById("shareImage").src=img+"shareImage3.png";
        }
        document.title = window.wxData.desc = content;
        document.title = window.wxFriend.desc = content;
    },

    share2Friend:function()
    {
        if(this.isShared==false)
        {
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
            if(this.getChildByTag(101))this.getChildByTag(101).setEnabled(false);
            if(this.getChildByTag(105))this.getChildByTag(105).setEnabled(false);
            this.isShared=true;
        }
    },

   enterBBS:function()
    {
        var newURL="http://bbs.feidee.com";
        window.location.href=newURL;
    },

    onTouchesBegan:function(touches, event)
    {
        if(this.isShared==true)
        {
            if(this.getChildByTag(100))this.getChildByTag(100).setEnabled(true);
            if(this.getChildByTag(101))this.getChildByTag(101).setEnabled(true);
            if(this.getChildByTag(105))this.getChildByTag(105).setEnabled(true);
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