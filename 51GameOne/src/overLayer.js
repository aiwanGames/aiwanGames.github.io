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
        sp_back1.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.61));
        this.addChild(sp_back1,1);
        var sp_back2=cc.Sprite.create(s_img23);
        sp_back2.setScale(0.8);
        sp_back2.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.61));
        this.addChild(sp_back2,1);
        var ac1=cc.RepeatForever.create(cc.RotateBy.create(4.0,360));
        sp_back1.runAction(ac1);

        var sp_logo=cc.Sprite.create(s_img22);
        sp_logo.setPosition(cc.p(this.winsize.width*0.5,64));
        this.addChild(sp_logo,0);

        var tip=cc.LabelTTF.create("此活动为随手记官方举办, 与Apple Inc. 无关","Arial",15);
        tip.setPosition(cc.p(320,20));
        tip.setColor(cc.c3(255,255,255));
        this.addChild(tip,8);

        var timeLabel=cc.LabelTTF.create("恭喜发财！你接住了"+this.score+"斤金子","Arial",36);
        timeLabel.setAnchorPoint(cc.p(0.5,0.5));
        timeLabel.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.92));
        timeLabel.setColor(cc.c3(170,36,21));
        this.addChild(timeLabel,1);

        var pcnt=(this.score/4500*100).toFixed(1);
        if(pcnt<1)
        {
            pcnt=1;
        }
        else if(pcnt>=100)
        {
            pcnt=99.9;
        }
        else
        {

        }

        var cnt="";
        if(this.score<500)
        {
            cnt="亲，你该努力一下啦！";
        }
        else if(this.score>=500&&this.score<1500)
        {
            cnt="豪，这个鱼塘被你承包啦！";
        }
        else if(this.score>=1500&&this.score<3000)
        {
            cnt="可以回到古代当地主！\n每天带一群奴才上街调戏良家妇女~";
        }
        else if(this.score>=3000&&this.score<4000)
        {
            cnt="总裁，您的私人飞机已备好！\n早餐咱上哪吃？";
        }
        else
        {
            cnt="可以穿越回唐代当皇帝！\n媚娘等你翻牌子！";
        }

        var timeLabel1=cc.LabelTTF.create("击败了"+pcnt+"%的人\n","Arial",30);
        timeLabel1.setAnchorPoint(cc.p(0.5,0.5));
        timeLabel1.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.84));
        timeLabel1.setColor(cc.c3(170,36,21));
        this.addChild(timeLabel1,1);

        var timeLabel2=cc.LabelTTF.create(cnt,"Arial",30,cc.Size(500,100),cc.TEXT_ALIGNMENT_CENTER);
        timeLabel2.setAnchorPoint(cc.p(0.5,0.5));
        timeLabel2.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.785));
        timeLabel2.setColor(cc.c3(132,75,0));
        this.addChild(timeLabel2,1);

        var zailaiItem = cc.MenuItemImage.create(s_img03,s_img03,this.gotoMainLayer,this);
        //zailaiItem.setScale(0.8);
        var zailaimenu = cc.Menu.create(zailaiItem);
        zailaimenu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.31));
        zailaimenu.setTag(100);
        this.addChild(zailaimenu, 1);

        var fenxiangItem = cc.MenuItemImage.create(s_img04,s_img04,this.share2Friend,this);
        //fenxiangItem.setScale(0.8);
        var fenxiangmenu = cc.Menu.create(fenxiangItem);
        fenxiangmenu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.42));
        fenxiangmenu.setTag(101);
        this.addChild(fenxiangmenu, 1);

        var enterItem = cc.MenuItemImage.create(s_img21,s_img21,this.enterBBS,this);
        //enterItem.setScale(0.8);
        var entermenu = cc.Menu.create(enterItem);
        entermenu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.20));
        entermenu.setTag(105);
        this.addChild(entermenu, 1);

        document.title = window.wxData.desc = "我接住了"+this.score+"财气，有钱就是任性，不服来战！";
        document.title = window.wxFriend.desc = "我接住了"+this.score+"财气，有钱就是任性，不服来战！";
        this.setTouchEnabled(true);
    },

    enterBBS:function()
    {
        var newURL="http://bbs.feidee.com/m/";
        window.location.href=newURL;
    },

    gotoMainLayer:function()
    {
        var scene=beginLayer.create();
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,scene));
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