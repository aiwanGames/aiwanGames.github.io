var overLayer = cc.LayerColor.extend({
    winsize:null,
    score:0,

    init:function ()
    {
        // 1. super init first
        this._super();
        this.winsize = cc.Director.getInstance().getWinSize();
        //背景
        var sp_back=cc.Sprite.create(s_img01);
        sp_back.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.5));
        this.addChild(sp_back,0);
        //添加游戏结束UI
        var sp_back03=cc.Sprite.create(s_img06);
        sp_back03.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.55));
        this.addChild(sp_back03, 1);
        //再来一次按钮
        var zailaiItem = cc.MenuItemImage.create(s_img04,s_img05,this.gotoMainLayer,this);
        var menu = cc.Menu.create(zailaiItem);
        menu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.24));
        this.addChild(menu, 1);
        //加油
        var sp_jiayou=cc.Sprite.create(s_img07);
        sp_jiayou.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.63));
        this.addChild(sp_jiayou,1);
        //成绩
        var scoreLb=cc.LabelTTF.create("Score : "+this.score,"Consolas",27);
        scoreLb.setAnchorPoint(cc.p(0.0,0.5));
        scoreLb.setPosition(cc.p(this.winsize.width*0.27,this.winsize.height*0.52));
        scoreLb.setColor(cc.c3(245,245,40));
        this.addChild(scoreLb,1);
        var cmtChar="";
        if(this.score<20)
        {
            cmtChar="别逗,好好玩";
        }
        else if(this.score>=20&&this.score<40)
        {
            cmtChar="重度手残";
        }
        else if(this.score>=40&&this.score<60)
        {
            cmtChar="手残";
        }
        else if(this.score>=60&&this.score<80)
        {
            cmtChar="表现不错";
        }
        else if(this.score>=80&&this.score<100)
        {
            cmtChar="小有成就";
        }
        else if(this.score>=100&&this.score<120)
        {
            cmtChar="惊呆小伙伴";
        }
        else if(this.score>=120&&this.score<150)
        {
            cmtChar="疾风手";
        }
        else if(this.score>=150&&this.score<200)
        {
            cmtChar="无影手";
        }
        else
        {
            cmtChar="无敌风火轮";
        }
        var comentLb=cc.LabelTTF.create("反应速度 : "+cmtChar,"Consolas",27);
        comentLb.setAnchorPoint(cc.p(0.0,0.5));
        comentLb.setPosition(cc.p(this.winsize.width*0.27,this.winsize.height*0.45));
        comentLb.setColor(cc.c3(245,245,40));
        this.addChild(comentLb,1);
    },

    gotoMainLayer:function()
    {
        var scene=mainLayer.create();
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.3,scene));
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