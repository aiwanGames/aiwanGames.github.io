var mainLayer = cc.LayerColor.extend({
    winsize:null,
    poemText:null,
    chooseA:null,
    chooseB:null,
    chooseC:null,
    yourChoise:0,
    answerSprite:null,
    fontIndex:1,
    anserArray:null,
    gameScore:0,
    sp_label1:null,
    sp_label2:null,
    ischakan:false,
    sp_count:1,
    gameModel:1,

    init:function ()
    {
        //初始化父类
        this._super();
        this.winsize = cc.Director.getInstance().getWinSize();
        var img_back=cc.Sprite.create(s_img10);
        img_back.setPosition(this.winsize.width*0.5,this.winsize.height*0.5);
        this.addChild(img_back,1);

        this.poemText=cc.LabelTTF.create("孤帆远影碧空尽\n\n唯见长江天际流","Arial",45);
        this.poemText.setAnchorPoint(cc.p(0.5,0.5));
        this.poemText.setColor(cc.c3(0,0,0));
        this.poemText.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.7));
        this.addChild(this.poemText,1);

        //若之前分享过，则显示查看答案
        if(this.gameModel==2)
        {
            var huanyigeItem = cc.MenuItemImage.create(s_img07,s_img07,this.chakanDaAn,this);
            var huanyigemenu = cc.Menu.create(huanyigeItem);
            huanyigemenu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.31));
            this.addChild(huanyigemenu, 1);

            this.sp_label1=cc.LabelTTF.create("题目：《登鹳雀楼》","Arial",35);
            this.sp_label1.setAnchorPoint(cc.p(0.5,0.5));
            this.sp_label1.setColor(cc.c3(0,0,0));
            this.sp_label1.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.45));
            this.addChild(this.sp_label1,1);
        }
        else
        {
            var fangqiItem = cc.MenuItemImage.create(s_img04, s_img04, this.gotoOverLayer, this);
            var fangqimenu = cc.Menu.create(fangqiItem);
            fangqimenu.setPosition(cc.p(this.winsize.width * 0.5, this.winsize.height * 0.15));
            this.addChild(fangqimenu, 1);

            this.chooseA=cc.LabelTTF.create("A.《登鹳雀楼》","Arial",35);
            this.chooseA.setAnchorPoint(cc.p(0.5,0.5));
            this.chooseA.setColor(cc.c3(0,0,0));
            this.chooseA.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.45));
            this.addChild(this.chooseA,1);
            this.chooseB=cc.LabelTTF.create("B.《黄鹤楼送孟浩然之广陵》","Arial",35);
            this.chooseB.setAnchorPoint(cc.p(0.5,0.5));
            this.chooseB.setColor(cc.c3(0,0,0));
            this.chooseB.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.37));
            this.addChild(this.chooseB,1);
            this.chooseC=cc.LabelTTF.create("C.《送孟浩然之广陵》","Arial",35);
            this.chooseC.setAnchorPoint(cc.p(0.5,0.5));
            this.chooseC.setColor(cc.c3(0,0,0));
            this.chooseC.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.29));
            this.addChild(this.chooseC,1);
        }
        //答案数组
        this.anserArray=[2,2,3,3,1,2,1,3,3,1,3,1,2,3,1];
        this.answerSprite=cc.Sprite.create(s_img12);
        this.answerSprite.setScale(0.7);
        this.answerSprite.setVisible(false);
        this.addChild(this.answerSprite,1);

        //答题数量
        this.sp_count=cc.LabelTTF.create("01/15","Arial",32);
        this.sp_count.setAnchorPoint(cc.p(0.5,0.5));
        this.sp_count.setColor(cc.c3(0,0,0));
        this.sp_count.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.95));
        this.addChild(this.sp_count,1);
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
        if(this.fontIndex==16)
        {
            if(this.gameModel==1)
                this.gotoOverLayer();
            else
                this.gotoBeginLayer();
            return;
        }
        if(this.yourChoise>0)
        {
            return;
        }
        if(this.fontIndex<10)
            this.sp_count.setString("0"+this.fontIndex+"/15");
        else
            this.sp_count.setString(this.fontIndex+"/15");
        this.answerSprite.setVisible(false);

        var poem="";
        var Alabel="";
        var Blabel="";
        var Clabel="";
        switch(this.fontIndex)
        {
            case 1:poem="孤帆远影碧空尽\n\n唯见长江天际流";Alabel="A.《登鹳雀楼》";Blabel="B.《黄鹤楼送孟浩然之广陵》";Clabel="C.《送孟浩然之广陵》";break;
            case 2:poem="海内存知己\n\n天涯若比邻";Alabel="A.《渡荆门送别》";Blabel="B.《送杜少府之任蜀州》";Clabel="C.《赠孟浩然》";break;
            case 3:poem="欲穷千里目\n\n更上一层楼";Alabel="A.《黄鹤楼》";Blabel="B.《汉江临眺》";Clabel="C.《登鹳雀楼》";break;
            case 4:poem="只在此山中\n\n云深不知处";Alabel="A.《山中送别》";Blabel="B.《月夜》";Clabel="C.《寻隐者不遇》";break;
            case 5:poem="不知何处吹芦管\n\n一夜征人尽望乡";Alabel="A.《夜上受降城闻笛》";Blabel="B.《渡江汉》";Clabel="C.《月夜》";break;
            case 6:poem="商女不知亡国恨\n\n隔江犹唱后庭花";Alabel="A.《商女》";Blabel="B.《泊秦淮》";Clabel="C.《夜雨寄北》";break;
            case 7:poem="浮云游子意\n\n落日故人情";Alabel="A.《送友人》";Blabel="B.《赠孟浩然》";Clabel="C.《赠内人》";break;
            case 8:poem="烽火连三月\n\n家书抵万金";Alabel="A.《秋夕》";Blabel="B.《逢入京使》";Clabel="C.《春望》";break;
            case 9:poem="仍怜故乡水\n\n万里送行舟";Alabel="A.《汉江临眺》";Blabel="B.《送杜少府之任蜀州》";Clabel="C.《渡荆门送别》";break;
            case 10:poem="戎马关山北\n\n凭轩涕泗流";Alabel="A.《登岳阳楼》";Blabel="B.《登鹳雀楼》";Clabel="C.《黄鹤楼》";break;
            case 11:poem="欲投人处宿\n\n隔水问樵夫";Alabel="A.《归嵩山作》";Blabel="B.《寄南山下》";Clabel="C.《终南山》";break;
            case 12:poem="遥怜小儿女\n\n未解忆长安";Alabel="A.《月夜》";Blabel="B.《春词》";Clabel="C.《征人怨》";break;
            case 13:poem="待到重阳日\n\n还来就菊花";Alabel="A.《九月九日忆山东兄弟》";Blabel="B.《过故人庄》";Clabel="C.《芙蓉楼送辛渐》";break;
            case 14:poem="海上生明月\n\n天涯共此时";Alabel="A.《月夜》";Blabel="B.《渡荆门送别》";Clabel="C.《望月怀远》";break;
            case 15:poem="星垂平野阔\n\n月涌大江流";Alabel="A.《旅夜书怀》";Blabel="B.《送人东游》";Clabel="C.《章台夜思》";break;
        }
        this.poemText.setString(poem,"Arial",35);
        if(this.gameModel==1)
        {
            this.chooseA.setString(Alabel,"Arial",35);
            this.chooseB.setString(Blabel,"Arial",35);
            this.chooseC.setString(Clabel,"Arial",35);
        }
    },

    chakanDaAn:function()
    {
        if(this.yourChoise>0)
        {
            return;
        }
        else {
            this.reLoadFontInfo();
            var label1 = "";
            switch (this.fontIndex) {
                case 1:label1 = "题目：《黄鹤楼送孟浩然之广陵》";break;
                case 2:label1 = "题目：《送杜少府之任蜀州》";break;
                case 3:label1 = "题目：《登鹳雀楼》";break;
                case 4:label1 = "题目：《寻隐者不遇》";break;
                case 5:label1 = "题目：《夜上受降城闻笛》";break;
                case 6:label1 = "题目：《泊秦淮》";break;
                case 7:label1 = "题目：《送友人》";break;
                case 8:label1 = "题目：《春望》";break;
                case 9:label1 = "题目：《渡荆门送别》";break;
                case 10:label1 = "题目：《登岳阳楼》";break;
                case 11:label1 = "题目：《终南山》";break;
                case 12:label1 = "题目：《月夜》";break;
                case 13:label1 = "题目：《过故人庄》";break;
                case 14:label1 = "题目：《望月怀远》";break;
                case 15:label1 = "题目：《旅夜书怀》";break;
            }
            this.sp_label1.setString(label1);
        }
    },

    checkChoice:function(_fontIndex,_yourCoice,_pos)
    {
        this.answerSprite.setScale(0.6);
        this.answerSprite.setVisible(true);
        if(this.anserArray[this.fontIndex-1]==_yourCoice)
        {
            this.gameScore+=1;
            this.answerSprite.initWithFile(s_img12);
        }
        else
        {
            this.answerSprite.initWithFile(s_img13);
        }
        this.answerSprite.setPosition(_pos);
        var ac0=cc.ScaleTo.create(0.5,1.0);
        var ac1=cc.EaseElasticOut.create(ac0);
        var ac2=cc.DelayTime.create(0.2);
        var ac3=cc.CallFunc.create(this.nextFont,this);
        this.answerSprite.runAction(cc.Sequence.create(ac1,ac2,ac3));
    },

    nextFont: function ()
    {
        this.yourChoise=0;
        this.reLoadFontInfo();
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
        var touch = touches[0];
        var location = touch.getLocation();
        var pos=null;
        if(this.yourChoise>0)return;
        if(cc.rectContainsPoint(this.chooseA.getBoundingBox(),location))
        {
            if(this.ischakan)
            {
                return;
            }
            this.yourChoise=1;
            pos=this.chooseA.getPosition();
            //检查答案
            this.checkChoice(this.fontIndex,this.yourChoise,pos);
        }
        else if(cc.rectContainsPoint(this.chooseB.getBoundingBox(),location))
        {
            if(this.ischakan)
            {
                return;
            }
            this.yourChoise=2;
            pos=this.chooseB.getPosition();
            //检查答案
            this.checkChoice(this.fontIndex,this.yourChoise,pos);
        }
        else if(cc.rectContainsPoint(this.chooseC.getBoundingBox(),location))
        {
            if(this.ischakan)
            {
                return;
            }
            this.yourChoise=3;
            pos=this.chooseC.getPosition();
            //检查答案
            this.checkChoice(this.fontIndex,this.yourChoise,pos);
        }
        else
        {

        }
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