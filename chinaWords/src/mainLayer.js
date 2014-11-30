var mainLayer = cc.LayerColor.extend({
    winsize:null,
    fontSprite:null,
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
        this.setColor(cc.c4(255,204,0,255));
        //文字背景
        var fontBack=cc.Sprite.create(s_img11);
        fontBack.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.7));
        this.addChild(fontBack,1);
        //添加文字plist
        cc.SpriteFrameCache.getInstance().addSpriteFrames(s_img08);
        //载入文字
        this.fontSprite=cc.Sprite.createWithSpriteFrameName("img_ben.png");
        this.fontSprite.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.7));
        this.fontSprite.setScale(1.5);
        this.addChild(this.fontSprite,1);
        //若之前分享过，则显示查看答案
        if(this.gameModel==2)
        {
            var huanyigeItem = cc.MenuItemImage.create(s_img15,s_img15,this.chakanDaAn,this);
            var huanyigemenu = cc.Menu.create(huanyigeItem);
            huanyigemenu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.3));
            this.addChild(huanyigemenu, 1);
            //发音和字义
            this.sp_label1=cc.LabelTTF.create("发音: ben(一声)","Arial",27);
            this.sp_label1.setAnchorPoint(cc.p(0.5,0.5));
            this.sp_label1.setColor(cc.c3(255,30,30));
            this.sp_label1.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.81));
            this.addChild(this.sp_label1,1);
            this.sp_label2=cc.LabelTTF.create("字义: 同'奔',奔跑","Arial",27);
            this.sp_label2.setAnchorPoint(cc.p(0.5,0.5));
            this.sp_label2.setColor(cc.c3(255,30,30));
            this.sp_label2.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.59));
            this.addChild(this.sp_label2,1);
        }
        else
        {
            var fangqiItem = cc.MenuItemImage.create(s_img04, s_img04, this.gotoOverLayer, this);
            var fangqimenu = cc.Menu.create(fangqiItem);
            fangqimenu.setPosition(cc.p(this.winsize.width * 0.5, this.winsize.height * 0.3));
            this.addChild(fangqimenu, 1);
            //拼音选项
            this.chooseA=cc.LabelTTF.create("A.ben","Arial",34);
            this.chooseA.setAnchorPoint(cc.p(0.5,0.5));
            this.chooseA.setColor(cc.c3(0,0,0));
            this.chooseA.setPosition(cc.p(this.winsize.width*0.2,this.winsize.height*0.42));
            this.addChild(this.chooseA,1);
            this.chooseB=cc.LabelTTF.create("B.mou","Arial",34);
            this.chooseB.setAnchorPoint(cc.p(0.5,0.5));
            this.chooseB.setColor(cc.c3(0,0,0));
            this.chooseB.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.42));
            this.addChild(this.chooseB,1);
            this.chooseC=cc.LabelTTF.create("C.niu","Arial",34);
            this.chooseC.setAnchorPoint(cc.p(0.5,0.5));
            this.chooseC.setColor(cc.c3(0,0,0));
            this.chooseC.setPosition(cc.p(this.winsize.width*0.8,this.winsize.height*0.42));
            this.addChild(this.chooseC,1);
        }
        //答案数组
        this.anserArray=[1,3,1,2,2,3,1,2,3,1,1,2,3,3,2,2,2,1,2,2,1,3,1,2,3,1,3,1,1,2];
        this.answerSprite=cc.Sprite.create(s_img12);
        this.answerSprite.setScale(0.6);
        this.answerSprite.setVisible(false);
        this.addChild(this.answerSprite,1);

        //答题数量
        this.sp_count=cc.LabelTTF.create("01/20","Arial",32);
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
        if(this.fontIndex==21)
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
            this.sp_count.setString("0"+this.fontIndex+"/20");
        else
            this.sp_count.setString(this.fontIndex+"/20");
        this.answerSprite.setVisible(false);

        var fontName="";
        var Alabel="";
        var Blabel="";
        var Clabel="";
        switch(this.fontIndex)
        {
            case 1:fontName="img_ben.png";Alabel="A.ben";Blabel="B.mou";Clabel="C.niu";break;
            case 2:fontName="img_biao1.png";Alabel="A.mu";Blabel="B.ma";Clabel="C.biao";break;
            case 3:fontName="img_biao2.png";Alabel="A.biao";Blabel="B.fei";Clabel="C.xiao";break;
            case 4:fontName="img_bing.png";Alabel="A.lei";Blabel="B.bing";Clabel="C.beng";break;
            case 5:fontName="img_zhuan.png";Alabel="A.sun";Blabel="B.zhuan";Clabel="C.zhuang";break;
            case 6:fontName="img_cu.png";Alabel="A.lu";Blabel="B.chui";Clabel="C.cu";break;
            case 7:fontName="img_cui.png";Alabel="A.cui";Blabel="B.zui";Clabel="C.chui";break;
            case 8:fontName="img_da.png";Alabel="A.long";Blabel="B.da";Clabel="C.teng";break;
            case 9:fontName="img_fei.png";Alabel="A.xiang";Blabel="B.ao";Clabel="C.fei";break;
            case 10:fontName="img_hua.png";Alabel="A.hua";Blabel="B.chuo";Clabel="C.shuo";break;
            case 11:fontName="img_lei.png";Alabel="A.lei";Blabel="B.duo";Clabel="C.shi";break;
            case 12:fontName="img_zhuang.png";Alabel="A.shi";Blabel="B.zhuang";Clabel="C.yi";break;
            case 13:fontName="img_li.png";Alabel="A.dao";Blabel="B.kan";Clabel="C.li";break;
            case 14:fontName="img_xun.png";Alabel="A.quan";Blabel="B.tang";Clabel="C.xun";break;
            case 15:fontName="img_mo.png";Alabel="A.xiao";Blabel="B.mo";Clabel="C.wei";break;
            case 16:fontName="img_pa.png";Alabel="A.pai";Blabel="B.pa";Clabel="C.pu";break;
            case 17:fontName="img_ruo.png";Alabel="A.zai";Blabel="B.ruo";Clabel="C.fu";break;
            case 18:fontName="img_se.png";Alabel="A.se";Blabel="B.zhi";Clabel="C.ting";break;
            case 19:fontName="img_ta.png";Alabel="A.yan";Blabel="B.ta";Clabel="C.shui";break;
            case 20:fontName="img_xian.png";Alabel="A.yu";Blabel="B.xian";Clabel="C.xuan";break;
            //case 21:fontName="img_sen.png";Alabel="A.sen";Blabel="B.mu";Clabel="C.lin";break;
            //case 22:fontName="img_xiao.png";Alabel="A.bai";Blabel="B.mo";Clabel="C.xiao";break;
            //case 23:fontName="img_shan.png";Alabel="A.shan";Blabel="B.yang";Clabel="C.rong";break;
            //case 24:fontName="img_yan.png";Alabel="A.dan";Blabel="B.yan";Clabel="C.zhi";break;
            //case 25:fontName="img_yao.png";Alabel="A.lei";Blabel="B.duo";Clabel="C.yao";break;
            //case 26:fontName="img_xin1.png";Alabel="A.xin";Blabel="B.jin";Clabel="C.dao";break;
            //case 27:fontName="img_xin2.png";Alabel="A.xiang";Blabel="B.xun";Clabel="C.xin";break;
            //case 28:fontName="img_miao.png";Alabel="A.miao";Blabel="B.shui";Clabel="C.liu";break;
            //case 29:fontName="img_zhe.png";Alabel="A.zhe";Blabel="B.zhen";Clabel="C.zhan";break;
            //case 30:fontName="img_chu.png";Alabel="A.shu";Blabel="B.chu";Clabel="C.chou";break;
        }
        //文字
        this.fontSprite.initWithSpriteFrameName(fontName);
        //拼音选项
        if(this.gameModel==1)
        {
            this.chooseA.setString(Alabel,"Arial",34);
            this.chooseB.setString(Blabel,"Arial",34);
            this.chooseC.setString(Clabel,"Arial",34);
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
            var label2 = "";
            switch (this.fontIndex) {
                case 1:label1 = "发音: ben(一声)";label2 = "字义: 同'奔',奔跑";break;
                case 2:label1 = "发音: biao(一声)";label2 = "字义: 众马奔腾的样子";break;
                case 3:label1 = "发音: biao(一声)";label2 = "字义: 犬跑的样子";break;
                case 4:label1 = "发音: bing(四声)";label2 = "字义: 雷声";break;
                case 5:label1 = "发音: zhuan(三声)";label2 = "字义: 形容谨慎";break;
                case 6:label1 = "发音: cu(一声)";label2 = "字义: 同'粗'";break;
                case 7:label1 = "发音: cui(四声)";label2 = "字义: 鸟兽的细毛";break;
                case 8:label1 = "发音: da(二声)";label2 = "字义: 龙腾飞的样子";break;
                case 9:label1 = "发音: fei(一声)";label2 = "字义: 同'飞'";break;
                case 10:label1 = "发音: hua(四声)";label2 = "字义: 同'话',也指说人坏话";break;
                case 11:label1 = "发音: lei(二声)";label2 = "字义: 古代一种藤制的筐子";break;
                case 12:label1 = "发音: zhuang(四声)"; label2 = "字义: 同'壮',强壮,牢固等";break;
                case 13:label1 = "发音: li(二声)";label2 = "字义: 姓氏,也指抓狂";break;
                case 14:label1 = "发音: xun(二声)";label2 = "字义: 指众泉汇流";break;
                case 15:label1 = "发音: mo(二声)";label2 = "字义: 同'麽',语气词";break;
                case 16:label1 = "发音: pa(二声)";label2 = "字义: 三只手,扒手";break;
                case 17:label1 = "发音: ruo(四声)";label2 = "字义: 同'若'";break;
                case 18:label1 = "发音: se(四声)";label2 = "字义: 同'涩'";break;
                case 19:label1 = "发音: ta(四声)";label2 = "字义: 形容说话快";break;
                case 20:label1 = "发音: xian(一声)";label2 = "字义: 新鲜,味道美";break;
                //case 21:label1 = "发音: sen(一声)";label2 = "字义: 形容树木多";break;
                //case 22:label1 = "发音: xiao(三声)";label2 = "字义: 形容皎洁,明亮";break;
                //case 23:label1 = "发音: shan(一声)";label2 = "字义: 同'膻',羊肉的气味";break;
                //case 24:label1 = "发音: yan(四声)";label2 = "字义: 火花,火焰";break;
                //case 25:label1 = "发音: yao二声)";label2 = "字义: 形容山很高";break;
                //case 26:label1 = "发音: xin(一声)";label2 = "字义: 形容财富兴盛";break;
                //case 27:label1 = "发音: xin(一声)";label2 = "字义: 同'馨'";break;
                //case 28:label1 = "发音: miao(三声)";label2 = "字义: 形容水势很大";break;
                //case 29:label1 = "发音: zhe(二声)";label2 = "字义: 同'哲'";break;
                //case 30:label1 = "发音: chu(四声)";label2 = "字义: 直立,高耸";break;
            }
            this.sp_label1.setString(label1);
            this.sp_label2.setString(label2);
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