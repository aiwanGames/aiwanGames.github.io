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

        if(this.ghostIndex==0)
        {
            var tip=cc.LabelTTF.create("看来鬼鬼们对你不感兴趣.", "Arial",35);
            tip.setColor(cc.c3(245,245,50));
            tip.setAnchorPoint(cc.p(0.5,0.5));
            tip.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.7));
            this.addChild(tip,1);
        }
        else
        {
            var gh=null;
            var con="";
            var shareToPengyou=" ";
            var imgURL="";
            switch(this.ghostIndex)
            {
                case 1:gh=cc.Sprite.create(s_img12);con="[嗓门鬼]  危险指数 30";shareToPengyou="我抓到一个[嗓门鬼]，大家也来试试！";imgURL="http://aiwanGames.github.io/ghostNearby/res/HD/img_02.png";break;
                case 2:gh=cc.Sprite.create(s_img13);con="[长舌鬼]  危险指数 60";shareToPengyou="我抓到一个[长舌鬼]，大家也来试试！";imgURL="http://aiwanGames.github.io/ghostNearby/res/HD/img_03.png";break;
                case 3:gh=cc.Sprite.create(s_img14);con="[胆小鬼]  危险指数 10";shareToPengyou="我抓到一个[胆小鬼]，大家也来试试！";imgURL="http://aiwanGames.github.io/ghostNearby/res/HD/img_04.png";break;
                case 4:gh=cc.Sprite.create(s_img15);con="[勾魂鬼]  危险指数 80";shareToPengyou="我抓到一个[勾魂鬼]，大家也来试试！";imgURL="http://aiwanGames.github.io/ghostNearby/res/HD/img_05.png";break;
                case 5:gh=cc.Sprite.create(s_img16);con="[恶灵]  危险指数 100";shareToPengyou="我抓到一个[恶灵]，被缠上了，恐怖！晒出来把它驱散！";imgURL="http://aiwanGames.github.io/ghostNearby/res/HD/img_06.png";break;
            }
            gh.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.5));
            this.addChild(gh,1);

            var tip1=cc.LabelTTF.create(con, "Arial",35);
            tip1.setColor(cc.c3(245,245,50));
            tip1.setAnchorPoint(cc.p(0.5,0.5));
            tip1.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.7));
            tip1.setTag(171);
            this.addChild(tip1,1);
        }

        sys.localStorage.setItem("ghostIndex",this.ghostIndex);

        if(this.ghostIndex==5)
        {
            sys.localStorage.setItem("isGhostShared","0");
            //去除恶灵
            var yaoqingItem = cc.MenuItemImage.create(s_img05,s_img05,this.share2Friend,this);
            var yaoqingmenu = cc.Menu.create(yaoqingItem);
            yaoqingmenu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.3));
            this.addChild(yaoqingmenu, 1);
            var tip2=cc.LabelTTF.create("你被[恶灵]盯上了，赶紧借助朋友的力量驱散！", "Arial",30);
            tip2.setColor(cc.c3(245,245,50));
            tip2.setAnchorPoint(cc.p(0.5,0.5));
            tip2.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.6));
            tip2.setTag(172);
            this.addChild(tip2,1);
        }
        else
        {
            //再来一次
            var zailaiItem = cc.MenuItemImage.create(s_img04,s_img04,this.gotoMainLayer,this);
            var zailaimenu = cc.Menu.create(zailaiItem);
            zailaimenu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.3));
            this.addChild(zailaimenu, 1);
        }

        //分享标题和描述
        window.wxData.imgUrl=imgURL;
        document.title = window.wxData.desc = shareToPengyou;
        document.title = window.wxFriend.desc = shareToPengyou;
    },

    update:function(dt)
    {
        //游戏主要刷新函数
        if(window.shared)
        {
            window.shared=false;
            sys.localStorage.setItem("isGhostShared","1");
            sys.localStorage.setItem("ghostIndex",0);
            this.removeChildByTag(170);
            this.removeChildByTag(171);
            this.removeChildByTag(172);
            var tip=cc.LabelTTF.create("[恶灵] 已被驱散，你安全了.", "Arial",35);
            tip.setColor(cc.c3(245,245,50));
            tip.setAnchorPoint(cc.p(0.5,0.5));
            tip.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.7));
            this.addChild(tip,1);
            //再来一次
            var zailaiItem = cc.MenuItemImage.create(s_img04,s_img04,this.gotoMainLayer,this);
            var zailaimenu = cc.Menu.create(zailaiItem);
            zailaimenu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.3));
            this.addChild(zailaimenu, 1);
            window.wxData.imgUrl="http://aiwanGames.github.io/ghostNearby/res/HD/shareImage.png";
            document.title = window.wxData.desc = "我刚驱散了身边的一只[恶灵]，恐怖！大家也来试试！";
            document.title = window.wxFriend.desc = "我刚驱散了身边的一只[恶灵]，恐怖！大家也来试试！";
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
        if(this.isSharedC)
        {
            return;
        }
        //分享提醒
        var sp_hand=cc.Sprite.create(s_img06);
        sp_hand.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*1.2));
        sp_hand.setScale(1.05);
        sp_hand.setTag(170);
        this.addChild(sp_hand,1);
        var ac0=cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(this.winsize.width*0.5,this.winsize.height*0.899)));
        sp_hand.runAction(ac0);
        this.isSharedC=true;
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
