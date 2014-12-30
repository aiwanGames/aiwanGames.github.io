window.shared=false;
var overLayer = cc.LayerColor.extend({
    winsize:null,
    ghostIndex:0,
    isSharedC:false,

    init:function ()
    {
        //初始化父类
        this._super();
        this.winsize = cc.Director.getInstance().getWinSize();
        this.setColor(cc.c3(0,0,0));

        //红色背景框
        var back=cc.Sprite.create(s_img03);
        back.setPosition(this.winsize.width*0.5,this.winsize.height*0.5);
        back.setScaleX(1.2);
        back.setScaleY(1.05);
        this.addChild(back,2);
        var ac0=cc.FadeOut.create(1.0);
        var ac1=cc.FadeIn.create(0.4);
        back.runAction(cc.RepeatForever.create(cc.Sequence.create(ac0,ac1,null)));

        //墓地背景
        var back1=cc.Sprite.create(s_img07);
        back1.setPosition(this.winsize.width*0.5,this.winsize.height*0.5);
        this.addChild(back1,0);

        //关注公众号
        var guanzhu=cc.LabelTTF.create("更多小游戏,尽在微信订阅号 : aiwanGames", "Arial",20);
        guanzhu.setColor(cc.c3(245,245,50));
        guanzhu.setAnchorPoint(cc.p(0.5,0.5));
        guanzhu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.05));
        this.addChild(guanzhu,1);

        var shareToPengyou=" ";
        var imgURL="";

        if(this.ghostIndex==0)
        {
            var tip=cc.LabelTTF.create("看来鬼鬼们对你不感兴趣.", "Arial",30);
            tip.setColor(cc.c3(245,245,50));
            tip.setAnchorPoint(cc.p(0.5,0.5));
            tip.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.77));
            this.addChild(tip,1);
            shareToPengyou="探测你身边的鬼鬼，胆小慎入！";
            imgURL="http://aiwanGames.github.io/ghostNearby/res/HD/shareImage.png";
        }
        else
        {
            var gh=null;
            var con="";
            switch(this.ghostIndex)
            {
                case 1:gh=cc.Sprite.create(s_img11);con="[饿死鬼]  危险指数 50\n晚上不要留剩饭哦.";shareToPengyou="我抓到一只[饿死鬼]，有点恐怖，慎入！";imgURL="http://aiwanGames.github.io/ghostNearby/res/HD/img_01.png";break;
                case 2:gh=cc.Sprite.create(s_img12);con="[嗓门鬼]  危险指数 30\n晚上听见有人喊叫莫回头.";shareToPengyou="我抓到一只[嗓门鬼]，有点恐怖，慎入！";imgURL="http://aiwanGames.github.io/ghostNearby/res/HD/img_02.png";break;
                case 3:gh=cc.Sprite.create(s_img13);con="[长舌鬼]  危险指数 60\n晚上小心耳边的窃窃私语.";shareToPengyou="我抓到一只[长舌鬼]，有点恐怖，慎入！";imgURL="http://aiwanGames.github.io/ghostNearby/res/HD/img_03.png";break;
                case 4:gh=cc.Sprite.create(s_img14);con="[胆小鬼]  危险指数 10\n今天可以放心出行.";shareToPengyou="我抓到一只[胆小鬼]，有点恐怖，慎入！";imgURL="http://aiwanGames.github.io/ghostNearby/res/HD/img_04.png";break;
                case 5:gh=cc.Sprite.create(s_img15);con="[勾魂鬼]  危险指数 80\n睡觉时莫要睁眼看床头.";shareToPengyou="我抓到一只[勾魂鬼]，有点恐怖，慎入！";imgURL="http://aiwanGames.github.io/ghostNearby/res/HD/img_05.png";break;
                case 6:gh=cc.Sprite.create(s_img16);con="[恶灵]  危险指数 100\n危险！快借助朋友的力量驱散恶灵！";shareToPengyou="我抓到一只[恶灵]，恐怖！快帮我把它驱散！";imgURL="http://aiwanGames.github.io/ghostNearby/res/HD/img_06.png";break;
            }
            gh.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.5));
            gh.setTag(174);
            this.addChild(gh,1);

            var tip1=cc.LabelTTF.create(con, "Arial",30,cc.size(500,100),cc.TEXT_ALIGNMENT_CENTER);
            tip1.setColor(cc.c3(245,245,50));
            tip1.setAnchorPoint(cc.p(0.5,0.5));
            tip1.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.73));
            tip1.setTag(171);
            this.addChild(tip1,1);
        }

        sys.localStorage.setItem("ghostIndex",this.ghostIndex);

        if(this.ghostIndex==6)
        {
            sys.localStorage.setItem("isGhostShared","0");
            //去除恶灵
            var yaoqingItem = cc.MenuItemImage.create(s_img05,s_img05,this.share2Friend,this);
            var yaoqingmenu = cc.Menu.create(yaoqingItem);
            yaoqingmenu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.3));
            yaoqingmenu.setTag(173);
            this.addChild(yaoqingmenu, 1);
        }
        else
        {
            //再来一次
            var zailaiItem = cc.MenuItemImage.create(s_img04,s_img04,this.gotoMainLayer,this);
            var zailaimenu = cc.Menu.create(zailaiItem);
            zailaimenu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.3));
            zailaimenu.setTag(167);
            this.addChild(zailaimenu, 1);
            var yaoqingItem = cc.MenuItemImage.create(s_img17,s_img17,this.share2Friend,this);
            var yaoqingmenu = cc.Menu.create(yaoqingItem);
            yaoqingmenu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.2));
            yaoqingmenu.setTag(173);
            this.addChild(yaoqingmenu, 1);
        }

        //分享标题和描述
        window.wxData.imgUrl=imgURL;
        window.wxFriend.imgUrl=imgURL;
        document.title = window.wxData.desc = shareToPengyou;
        document.title = window.wxFriend.desc = shareToPengyou;

        this.scheduleUpdate();
        this.setTouchEnabled(true);
    },

    update:function(dt)
    {
        //游戏主要刷新函数
        if(window.shared)
        {
            window.shared=false;
            //this.isSharedC=false;
            sys.localStorage.setItem("isGhostShared","1");
            sys.localStorage.setItem("ghostIndex",0);
            this.removeChildByTag(170);
            this.removeChildByTag(171);
            this.removeChildByTag(172);
            this.removeChildByTag(173);
            this.removeChildByTag(174);
            var tip=cc.LabelTTF.create("鬼鬼已魂飞魄散，你安全了.", "Arial",30);
            tip.setColor(cc.c3(245,245,50));
            tip.setAnchorPoint(cc.p(0.5,0.5));
            tip.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.77));
            this.addChild(tip,1);
            var gh=cc.Sprite.create(s_img18);
            gh.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.5));
            this.addChild(gh,1);
            //再来一次
            var zailaiItem = cc.MenuItemImage.create(s_img04,s_img04,this.gotoMainLayer,this);
            var zailaimenu = cc.Menu.create(zailaiItem);
            zailaimenu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.3));
            zailaimenu.setTag(167);
            this.addChild(zailaimenu, 1);
            var yaoqingItem = cc.MenuItemImage.create(s_img17,s_img17,this.share2Friend,this);
            var yaoqingmenu = cc.Menu.create(yaoqingItem);
            yaoqingmenu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.2));
            yaoqingmenu.setTag(173);
            this.addChild(yaoqingmenu, 1);
            window.wxData.imgUrl="http://aiwanGames.github.io/ghostNearby/res/HD/shareImage.png";
            window.wxFriend.imgUrl="http://aiwanGames.github.io/ghostNearby/res/HD/shareImage.png";
            document.title = window.wxData.desc = "我刚驱散了身边的一只鬼鬼，恐怖！";
            document.title = window.wxFriend.desc = "我刚驱散了身边的一只鬼鬼，恐怖！";
        }
    },

    onEnterTransitionDidFinish:function()
    {

    },

    gotoMainLayer:function()
    {
        var scene=beginLayer.create();
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,scene));
    },

    setScore:function(_ghostIndex)
    {
        this.ghostIndex=_ghostIndex;
    },

    share2Friend: function ()
    {
        if(this.isSharedC==false)
        {
        //屏蔽层
        var shield1=cc.Sprite.create(s_img06);
        shield1.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.5));
        shield1.setTag(170);
        this.addChild(shield1,1);
        var shield2=cc.Sprite.create(s_img19);
        shield2.setPosition(cc.p(this.winsize.width*0.8,this.winsize.height*0.9));
        shield2.setTag(169);
        this.addChild(shield2,1);
        var label=cc.LabelTTF.create("点击这里分享","黑体",35);
        label.setAnchorPoint(cc.p(0.5,0.5));
        label.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.78));
        label.setColor(cc.c3(255,255,255));
        label.setTag(168);
        this.addChild(label,1);
        this.getChildByTag(167).setEnabled(false);
        this.getChildByTag(173).setEnabled(false);
        this.isSharedC=true;
        }
    },

    onTouchesBegan:function(touches, event)
    {
        if(this.isSharedC==true)
        {
            this.getChildByTag(167).setEnabled(true);
            this.getChildByTag(173).setEnabled(true);
            this.removeChildByTag(168,true);
            this.removeChildByTag(169,true);
            this.removeChildByTag(170,true);
            this.isSharedC=false;
        }
    }
})

overLayer.create=function(_ghostIndex)
{
    var _overLayer=new overLayer();
    _overLayer.setScore(_ghostIndex);
    _overLayer.init();
    var _scene=cc.Scene.create();
    _scene.addChild(_overLayer);
    return _scene;
}
