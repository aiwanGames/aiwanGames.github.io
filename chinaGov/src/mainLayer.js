var mainLayer = cc.LayerColor.extend({
    winsize:null,
    questionImage:null,
    fontIndex:1,
    answerArray:null,
    answerLabel:null,
    gameScore:0,
    gameModel:1,

    init:function ()
    {
        //初始化父类
        this._super();
        this.winsize = cc.Director.getInstance().getWinSize();
        this.setColor(cc.c3(220,70,70));

        //答题数量
        this.sp_count=cc.LabelTTF.create("1/10","黑体",32);
        this.sp_count.setAnchorPoint(cc.p(0.5,0.5));
        this.sp_count.setColor(cc.c3(255,220,135));
        this.sp_count.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.95));
        this.addChild(this.sp_count,1);

        //白板
        var questionBack=cc.Sprite.create(s_img17);
        questionBack.setScale(1.42);
        questionBack.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.68));
        this.addChild(questionBack,1);

        //答案数组
        this.answerArray=[3,3,2,2,2,3,4,3,3,4];

        cc.SpriteFrameCache.getInstance().addSpriteFrames(s_img16);
        this.questionImage=cc.Sprite.createWithSpriteFrameName("1.png");
        this.questionImage.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.67));
        this.addChild(this.questionImage,1);

        //若之前分享过，则显示查看答案
        if(this.gameModel==2)
        {
            var huanyigeItem = cc.MenuItemImage.create(s_img07,s_img07,this.chakanDaAn,this);
            var huanyigemenu = cc.Menu.create(huanyigeItem);
            huanyigemenu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.28));
            this.addChild(huanyigemenu, 1);

            var answer="答案:C,按图形形状由大到小或由小到大的规律选择.";
            this.answerLabel=cc.LabelTTF.create(answer,"黑体",25);
            this.answerLabel.setAnchorPoint(cc.p(0,0.5));
            this.answerLabel.setColor(cc.c3(255,220,135));
            this.answerLabel.setPosition(cc.p(this.winsize.width*0.02,this.winsize.height*0.39));
            this.addChild(this.answerLabel,1);
        }
        else
        {
            var fangqiItem = cc.MenuItemImage.create(s_img04, s_img04, this.gotoOverLayer, this);
            var fangqimenu = cc.Menu.create(fangqiItem);
            fangqimenu.setPosition(cc.p(this.winsize.width * 0.5, this.winsize.height * 0.1));
            this.addChild(fangqimenu, 1);

            var AItem = cc.MenuItemImage.create(s_img11, s_img11, this.chooseA, this);
            var Amenu = cc.Menu.create(AItem);
            Amenu.setPosition(cc.p(this.winsize.width * 0.3, this.winsize.height * 0.35));
            this.addChild(Amenu, 1);

            var BItem = cc.MenuItemImage.create(s_img12, s_img12, this.chooseB, this);
            var Bmenu = cc.Menu.create(BItem);
            Bmenu.setPosition(cc.p(this.winsize.width * 0.7, this.winsize.height * 0.35));
            this.addChild(Bmenu, 1);

            var CItem = cc.MenuItemImage.create(s_img13, s_img13, this.chooseC, this);
            var Cmenu = cc.Menu.create(CItem);
            Cmenu.setPosition(cc.p(this.winsize.width * 0.3, this.winsize.height * 0.25));
            this.addChild(Cmenu, 1);

            var DItem = cc.MenuItemImage.create(s_img14, s_img14, this.chooseD, this);
            var Dmenu = cc.Menu.create(DItem);
            Dmenu.setPosition(cc.p(this.winsize.width * 0.7, this.winsize.height * 0.25));
            this.addChild(Dmenu, 1);

        }
        //开启触摸
        this.setTouchEnabled(true);
        //开启schedule
        //this.scheduleUpdate();
    },

    onEnterTransitionDidFinish:function()
    {

    },

    reLoadFontInfo:function()
    {
        this.fontIndex+=1;
        if(this.fontIndex==11)
        {
            if(this.gameModel==1)
                this.gotoOverLayer();
            else
                this.gotoBeginLayer();
            return;
        }
        this.sp_count.setString(this.fontIndex+"/10");

        switch(this.fontIndex)
        {
            case 1:this.questionImage.initWithSpriteFrameName("1.png");break;
            case 2:this.questionImage.initWithSpriteFrameName("2.png");break;
            case 3:this.questionImage.initWithSpriteFrameName("3.png");break;
            case 4:this.questionImage.initWithSpriteFrameName("4.png");break;
            case 5:this.questionImage.initWithSpriteFrameName("5.png");break;
            case 6:this.questionImage.initWithSpriteFrameName("6.png");break;
            case 7:this.questionImage.initWithSpriteFrameName("7.png");break;
            case 8:this.questionImage.initWithSpriteFrameName("8.png");break;
            case 9:this.questionImage.initWithSpriteFrameName("9.png");break;
            case 10:this.questionImage.initWithSpriteFrameName("10.png");break;
            default:break;
        }
    },

    chakanDaAn:function()
    {
        var answer="";
        switch (this.fontIndex+1) {
            case 1:answer="答案:C,按图形由大到小或由小到大的规律选择.";break;
            case 2:answer="答案:C,按图形某一部分变化的规律选择.";break;
            case 3:answer="答案:B,按图形的边或阴影递减的方向性规律选择.";break;
            case 4:answer="答案:B,按图形能否一笔画成的规律选择.";break;
            case 5:answer="答案:B,按图形笔画数,第一组笔画数为3;第二组为4.";break;
            case 6:answer="答案:C,按图形笔画数依次递减或递增的规律选择.";break;
            case 7:answer="答案:D,按相似性,第1图第3个和第2图第3个应相似.";break;
            case 8:answer="答案:C,按图形组合规律选择.";break;
            case 9:answer="答案:C,按图形拆分规律选择.";break;
            case 10:answer="答案:D,按图形去掉相同部分的规律选择.";break;
            default:break;
        }
        this.answerLabel.setString(answer);
        this.reLoadFontInfo();
    },

    checkChoice:function(_fontIndex,_yourCoice)
    {
        if(this.answerArray[this.fontIndex-1]==_yourCoice)
        {
            this.gameScore+=1;
        }
        else
        {
        }
        this.reLoadFontInfo();
    },

    chooseA:function()
    {
        this.checkChoice(this.fontIndex,1);
    },

    chooseB:function()
    {
        this.checkChoice(this.fontIndex,2);
    },

    chooseC:function()
    {
        this.checkChoice(this.fontIndex,3);
    },

    chooseD:function()
    {
        this.checkChoice(this.fontIndex,4);
    },

    gotoOverLayer:function()
    {
        var scene=overLayer.create(this.gameScore,0);
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,scene));
    },

    gotoBeginLayer:function()
    {
        var scene=beginLayer.create();
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,scene));
    },

    update:function(dt)
    {
        //游戏主要刷新函数
    },

    onTouchesMoved:function(touches, event)
    {
    },

    onTouchesEnded:function(touches, event)
    {
    },

    onTouchesBegan:function(touches, event)
    {
    },

    setGameModel:function(_model)
    {
        this.gameModel=_model;
    }
})

//构造函数create
mainLayer.create=function(_model)
{
    var _mainLayer=new mainLayer();
    _mainLayer.setGameModel(_model);
    _mainLayer.init();
    var _scene=cc.Scene.create();
    _scene.addChild(_mainLayer);
    return _scene;
}