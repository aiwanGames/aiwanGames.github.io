var overLayer = cc.LayerColor.extend({
    winsize:null,
    score:0,
    count:0,
    isShared:false,

    init:function ()
    {
        this._super();
        this.winsize = cc.Director.getInstance().getWinSize();

        var sp_back=cc.Sprite.create(s_img01);
        sp_back.setAnchorPoint(cc.p(0.5,0));
        sp_back.setPosition(cc.p(this.winsize.width*0.5,0));
        this.addChild(sp_back,0);

        var sp_back2=cc.Sprite.create(s_img06);
        sp_back2.setPosition(cc.p(this.winsize.width*0.495,this.winsize.height*0.562));
        this.addChild(sp_back2, 1);
        var sp_back3=cc.Sprite.create(s_img08);
        sp_back3.setPosition(cc.p(this.winsize.width*0.753,this.winsize.height*0.515));
        this.addChild(sp_back3,2);

        var timeLabel=cc.LabelTTF.create("你揍了穷鬼"+this.count+"下，获得"+this.score+"分","Arial",30);
        timeLabel.setAnchorPoint(cc.p(0.5,0.5));
        timeLabel.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.72));
        timeLabel.setColor(cc.c3(131,14,30));
        this.addChild(timeLabel,6);

        var zailaiItem = cc.MenuItemImage.create(s_img03,s_img03,this.gotoMainLayer,this);
        zailaiItem.setScale(0.8);
        var zailaimenu = cc.Menu.create(zailaiItem);
        zailaimenu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.24));
        zailaimenu.setTag(100);
        this.addChild(zailaimenu, 1);

        var fenxiangItem = cc.MenuItemImage.create(s_img04,s_img04,this.share2Friend,this);
        fenxiangItem.setScale(0.8);
        var fenxiangmenu = cc.Menu.create(fenxiangItem);
        fenxiangmenu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.34));
        fenxiangmenu.setTag(101);
        this.addChild(fenxiangmenu, 1);

        var enterItem = cc.MenuItemImage.create(s_img17,s_img17,this.enterBBS,this);
        enterItem.setScale(0.8);
        var entermenu = cc.Menu.create(enterItem);
        entermenu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.14));
        entermenu.setTag(105);
        this.addChild(entermenu, 1);

        document.title = window.wxData.desc = "我揍了穷鬼"+this.count+"下，获得"+this.score+"分，还差一点点，快来帮帮我！";
        document.title = window.wxFriend.desc = "我揍了穷鬼"+this.count+"下，获得"+this.score+"分，还差一点点，快来帮帮我！";

        var pcnt=(this.count/100*100).toFixed(1);
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
        if(this.count<10)
        {
            cnt="亲，你该努力一下啦！";
        }
        else if(this.count>=10&&this.count<50)
        {
            cnt="打鬼的汉子你威武雄壮！\n赶走穷鬼迎财运！";
        }
        else if(this.count>=50&&this.count<90)
        {
            cnt="有力气的汉子财气总不会太差！\n赶走穷鬼迎财运！";
        }
        else
        {
            cnt="驱魔除鬼这么在行，钟馗都拜你为师！\n赶走穷鬼迎财运！";
        }

        var timeLabel1=cc.LabelTTF.create("击败了"+pcnt+"%的人","Arial",27);
        timeLabel1.setAnchorPoint(cc.p(0.5,0.5));
        timeLabel1.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.66));
        timeLabel1.setColor(cc.c3(131,14,30));
        this.addChild(timeLabel1,6);

        var timeLabel2=cc.LabelTTF.create(cnt,"Arial",25,cc.Size(500,100),cc.TEXT_ALIGNMENT_CENTER);
        timeLabel2.setAnchorPoint(cc.p(0.5,0.5));
        timeLabel2.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.585));
        timeLabel2.setColor(cc.c3(45,71,0));
        this.addChild(timeLabel2,6);

        var sp_result=cc.Sprite.create(s_img19);
        sp_result.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.65));
        this.addChild(sp_result,5);

        this.setTouchEnabled(true);
    },

    enterBBS:function()
    {
        var newURL="http://bbs.feidee.com";
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
            var shield1=cc.Sprite.create(s_img15);
            shield1.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.5));
            shield1.setTag(102);
            this.addChild(shield1,5);
            var shield2=cc.Sprite.create(s_img14);
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

    setScore:function(_score,_cnt)
    {
        this.score=_score;
        this.count=_cnt;
    }

});

overLayer.create=function(_score,_cnt)
{
    var _overLayer=new overLayer();
    _overLayer.setScore(_score,_cnt);
    _overLayer.init();
    var _scene=cc.Scene.create();
    _scene.addChild(_overLayer);
    return _scene;
};