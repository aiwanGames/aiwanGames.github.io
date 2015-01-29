var overLayer = cc.LayerColor.extend({
    winsize:null,
    score:0,
    count:0,
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
        var sp_back1=cc.Sprite.create(s_img06);
        sp_back1.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.56));
        this.addChild(sp_back1,1);
        var sp_back2=cc.Sprite.create(s_img12);
        sp_back2.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.56));
        this.addChild(sp_back2,0);
        var ac1=cc.RepeatForever.create(cc.RotateBy.create(4.0,360));
        sp_back2.runAction(ac1);
        //分数
        var timeLabel=cc.LabelTTF.create("你揍了穷鬼"+this.count+"下，获得"+this.score+"分.","Arial",39);
        timeLabel.setAnchorPoint(cc.p(0.5,0.5));
        timeLabel.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.9));
        timeLabel.setColor(cc.c3(255,235,55));
        this.addChild(timeLabel,1);
        //再来一次按钮
        var zailaiItem = cc.MenuItemImage.create(s_img03,s_img03,this.gotoMainLayer,this);
        var zailaimenu = cc.Menu.create(zailaiItem);
        zailaimenu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.3));
        zailaimenu.setTag(100);
        this.addChild(zailaimenu, 1);
        //分享按钮
        var fenxiangItem = cc.MenuItemImage.create(s_img04,s_img04,this.share2Friend,this);
        var fenxiangmenu = cc.Menu.create(fenxiangItem);
        fenxiangmenu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.17));
        fenxiangmenu.setTag(101);
        this.addChild(fenxiangmenu, 1);
        document.title = window.wxData.desc = "我揍了穷鬼"+this.count+"下，获得"+this.score+"分，快来挑战我吧！";
        document.title = window.wxFriend.desc = "我揍了穷鬼"+this.count+"下，获得"+this.score+"分，快来挑战我吧！";

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
            cnt="打鬼的汉子，你威武雄壮！！";
        }
        else if(this.count>=50&&this.count<90)
        {
            cnt="有力气的汉子，财气总不会太差！";
        }
        else
        {
            cnt="驱魔除鬼这么在行，钟馗都拜你为师！";
        }

        var timeLabel1=cc.LabelTTF.create("你击败了"+pcnt+"%的人.\n"+cnt,"Arial",34,cc.Size(500,200),cc.TEXT_ALIGNMENT_CENTER);
        timeLabel1.setAnchorPoint(cc.p(0.5,0.5));
        timeLabel1.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.79));
        timeLabel1.setColor(cc.c3(255,235,55));
        this.addChild(timeLabel1,1);
        this.setTouchEnabled(true);
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
            //屏蔽层
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