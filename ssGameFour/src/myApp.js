/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var beginLayer = cc.LayerColor.extend({
    winsize:null,
    audio:null,
    testLabel:null,
    sp_shake:null,
    isShaking:false,
    isShaked:0,
    x:0.0,
    y:0.0,
    z:0.0,
    lastX:0.0,
    lastY:0.0,
    lastZ:0.0,
    speed:0.0,
    lastUpdate:0.0,
    SHAKE_THRESHOLD:280,
    fontCNTL:0,
    fontShow:true,
    textField:null,

    init:function()
    {
        this._super();
        this.winsize = cc.Director.getInstance().getWinSize();
        this.audio=cc.AudioEngine.getInstance();

        this.textField=cc.TextFieldTTF.create("click here for input", "Arial", 32);
        this.textField.setPosition(cc.p(320,780));
        //textField.attachWithIME();
        this.addChild(this.textField,1);

        var back=cc.Sprite.create(s_img01);
        back.setAnchorPoint(cc.p(0.5,0.0));
        back.setPosition(cc.p(320,0));
        this.addChild(back,0);

        this.testLabel=cc.LabelTTF.create(">>  用力摇起来  <<","Arial",35);
        this.testLabel.setAnchorPoint(cc.p(0.5,0.5));
        this.testLabel.setPosition(cc.p(320,680));
        this.testLabel.setColor(cc.c3(255,0,0));
        this.addChild(this.testLabel,1);
        this.testLabel.runAction(cc.Repeat.create(cc.Sequence.create(cc.DelayTime.create(1.5),cc.RotateBy.create(0.1,10),cc.RotateBy.create(0.1,-10),cc.RotateBy.create(0.1,-10),cc.RotateBy.create(0.1,10)),999999));

        this.sp_shake=cc.Sprite.create(s_img02);
        this.sp_shake.setScale(0.65);
        this.sp_shake.setPosition(cc.p(330,420));
        this.addChild(this.sp_shake,1);

        this.lastUpdate=new Date().getTime();

        this.setTouchEnabled(true);
        this.setAccelerometerEnabled(true);
        this.schedule(this.updateGame,0.05,999999,0.1);
        return true;
    },

    getRandom:function(maxsize)
    {
        return Math.floor(Math.random() * maxsize) % maxsize;
    },

    removeSprite:function(_sprite)
    {
        _sprite.stopAllActions();
        this.removeChild(_sprite,true);
    },

    restart:function()
    {
        this.audio.stopMusic();
        var scene=beginLayer.create();
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,scene));
    },

    onTouchesEnded:function(touches, event)
    {

    },

    onTouchesBegan:function(touches, event)
    {
        var touch = touches[0];
        var location = touch.getLocation();

        if(cc.rectContainsPoint(this.textField.getBoundingBox(),location))
        {
            this.textField.attachWithIME();
        }
    },

    didAttachWithIME:function()
    {
        var cnt=this.textField.getContentText();
        this.textField.setString(cnt);
    },

    updateGame:function()
    {
        if(this.speed>this.SHAKE_THRESHOLD&&this.isShaking==false)
        {
            this.isShaking=true;
            this.isShaked+=1;
            //摇一摇
            var ac1=cc.Sequence.create(cc.RotateBy.create(0.15,20),cc.RotateBy.create(0.15,-20),cc.RotateBy.create(0.15,-20),cc.RotateBy.create(0.15,20),cc.DelayTime.create(0.4),cc.CallFunc.create(this.setShaking,this));
            this.sp_shake.runAction(ac1);
            //音效
            this.audio.playEffect(s_effect);
        }

        //if(this.isShaked==0)
        //if(this.speed<this.SHAKE_THRESHOLD&&this.isShaked==1)
        {

        }

        if(this.fontShow)
        {
            if(this.fontCNTL==0)
            {
                this.testLabel.setString(">>  用力摇起来  <<");
            }
            else if(this.fontCNTL==2)
            {
                this.testLabel.setString("> > 用力摇起来 < <");
            }
            else if(this.fontCNTL==4)
            {
                this.testLabel.setString(">  >用力摇起来<  <");
            }
            else
            {

            }
            if(this.fontCNTL>6)
            {
                this.fontCNTL=0;
            }
            else
            {
                this.fontCNTL+=1;
            }
        }
        else
        {
            this.removeChild(this.testLabel,true);
        }
    },

    setShaking:function(_sprite)
    {
        //this.isShaking=false;

        this.audio.playEffect(s_effect1);
        this.fontShow=false;
        this.removeChild(this.sp_shake,true);
        this.removeChild(this.testLabel,true);

        this.isShaked=0;
        var result=cc.Sprite.create(s_img05);
        result.setPosition(cc.p(320,480));
        result.setScale(0.9);
        result.setOpacity(0);
        //this.addChild(result,1);
        //result.runAction(cc.Spawn.create(cc.EaseBackOut.create(cc.ScaleTo.create(0.5,1.2)),cc.FadeIn.create(0.5)));

        var id=this.getRandom(17);
        var tag="";
        var content="";
        var label=cc.LabelTTF.create("tag","Arial",50);
        label.setPosition(cc.p(320,730));
        label.setColor(cc.c3(221,173,130));
        label.setOpacity(0);
        this.addChild(label,1);

        var label1=cc.LabelTTF.create("content","Arial",35,cc.Size(500,500),cc.TEXT_ALIGNMENT_CENTER);
        label1.setAnchorPoint(cc.p(0.5,1.0));
        label1.setPosition(cc.p(320,620));
        label1.setColor(cc.c3(221,173,130));
        label1.setOpacity(0);
        this.addChild(label1,1);

        var kaishiItem = cc.MenuItemImage.create(s_img06,s_img06,this.restart,this);
        var menu = cc.Menu.create(kaishiItem);
        menu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.25));
        //menu.setColor(cc.c3(250,0,0));
        menu.setOpacity(0);
        this.addChild(menu, 1);

        var shareContent="";
        switch(id)
        {
            case 0:
                tag="有钱";
                content="  喝酸奶只舔盖子上的，\n  剩下的扔掉！\n  吃薯片只吸手指，\n  薯片扔掉！\n  别问为什么，\n  今年的你有钱，任性！\n  全年只用做一件事情：\n安静地散发有钱的气息";
                shareContent="我抽到的新年签是《有钱》，来抽取属于你的那一签吧！";
                break;
            case 1:
                tag="零花钱花不完";
                content="  不上缴不外扣、不断有人给；\n  你的零花钱你自己做主；\n  口袋里的钞票厚度永远踏实安心！";
                shareContent="我抽到的新年签是《零花钱花不完》，来抽取属于你的那一签吧！";
                break;
            case 2:
                tag="加薪三次";
                content="  “薪”的一年对有实力的你来说，\n  是体现更高价值的一年；\n  “薪”的一年“薪”年快乐，\n  加薪三次不是梦！";
                shareContent="我抽到的新年签是《加薪三次》，来抽取属于你的那一签吧！";
                break;
            case 3:
                tag="钱多活儿少";
                content="  涨薪升职都有你；\n  加班熬夜没你事；\n  新一年钱多活儿少；\n  就这个feel倍儿爽！";
                shareContent="我抽到的新年签是《钱多活儿少》，来抽取属于你的那一签吧！";
                break;
            case 4:
                tag="发票中大奖";
                content="刮发票没中过奖的人生是不完整的；\n新的一年，你逢刮必中；\n发票都能中奖，别的还会远吗？";
                shareContent="我抽到的新年签是《发票中大奖》，来抽取属于你的那一签吧！";
                break;
            case 5:
                tag="走路捡钱";
                content="身体与心灵总有一个在路上；\n财运和钞票总是不期而遇；\n捡的不仅是钱；\n是一年的好运常在！";
                shareContent="我抽到的新年签是《走路捡钱》，来抽取属于你的那一签吧！";
                break;
            case 6:
                tag="创业必赚";
                content="这一次不为别人努力；\n只为自己心中的坚持；\n许你一年的创业财运；\n是时候干一件说做就做的大事了！";
                shareContent="我抽到的新年签是《创业必赚》，来抽取属于你的那一签吧！";
                break;
            case 7:
                tag="钱包撑爆";
                content="你的钱包时尚时尚最时尚；\n一张两张，钞票数也数不完；\n那跳跃的心情似魔鬼的步伐！";
                shareContent="我抽到的新年签是《钱包撑爆》，来抽取属于你的那一签吧！";
                break;
            case 8:
                tag="刷卡不用还";
                content="有钱才会放肆；\n没钱只能克制；\n刷卡总有人帮你还；\n今年就是这么羊气！";
                shareContent="我抽到的新年签是《刷卡不用还》，来抽取属于你的那一签吧！";
                break;
            case 9:
                tag="逢赌必赢";
                content="赌智商、赌人品，赌啥啥赢！\n和（hu）遍麻坛无敌手，大赢四方！";
                shareContent="我抽到的新年签是《逢赌必赢》，来抽取属于你的那一签吧！";
                break;
            case 10:
                tag="财气爆棚";
                content="瞪谁谁发财；\n摸谁谁捡钱；\n小伙伴们都来抢着请你吃饭；\n根本停不下来！";
                shareContent="我抽到的新年签是《财气爆棚》，来抽取属于你的那一签吧！";
                break;
            case 11:
                tag="遇到贵人";
                content="人脉就是钱脉；\n人缘就是财缘；\n人脉决定命脉；\n这一年，留意身边的人，\n转角处有贵人相助。";
                shareContent="我抽到的新年签是《遇到贵人》，来抽取属于你的那一签吧！";
                break;
            case 12:
                tag="奖金翻十倍";
                content="业绩飙升，奖金翻十倍；\n新一年迎娶白富美；\n嫁个高富帅走上人生巅峰！";
                shareContent="我抽到的新年签是《奖金翻十倍》，来抽取属于你的那一签吧！";
                break;
            case 13:
                tag="中彩票";
                content="传说中的人品爆发就是你；\n买了就中！体彩福彩样样都有戏；\n2015奔跑吧！小伙伴！";
                shareContent="我抽到的新年签是《中彩票》，来抽取属于你的那一签吧！";
                break;
            case 14:
                tag="买一送三";
                content="想买啥啥打折；\n要买啥啥降价；\n同样的东西，\n就是比别人买得便宜！";
                shareContent="我抽到的新年签是《买一送三》，来抽取属于你的那一签吧！";
                break;
            case 15:
                tag="财务自由";
                content="今天马尔代夫，明天欧洲十国游；\n想上班上班，想休息休息；\n闭着眼睛投资都大赚；\n不及时行乐都对不起自己。";
                shareContent="我抽到的新年签是《财务自由》，来抽取属于你的那一签吧！";
                break;
            case 16:
                tag="存款多个零";
                content="你积累的努力和好运，\n将在这一年得到丰厚的回报；\n存款多个零，\n是给你爱的人最好的安全感！";
                shareContent="我抽到的新年签是《存款多个零》，来抽取属于你的那一签吧！";
                break;
            default :break;
        }
        document.title = window.wxData.desc = shareContent;
        document.title = window.wxFriend.desc = shareContent;
        label.setString(tag);
        label1.setString(content);
        label.runAction(cc.Sequence.create(cc.DelayTime.create(0.5),cc.FadeIn.create(0.5)));
        label1.runAction(cc.Sequence.create(cc.DelayTime.create(0.5),cc.FadeIn.create(0.5)));
        menu.runAction(cc.Sequence.create(cc.DelayTime.create(0.5),cc.FadeIn.create(0.5)));
    },

    onAccelerometer:function(accelerationValue)
    {
        var curTime = new Date().getTime();

        if (curTime-this.lastUpdate>100)
        {
            var diffTime = curTime - this.lastUpdate;
            this.lastUpdate = curTime;
            this.x = accelerationValue.x;
            this.y = accelerationValue.y;
            this.z = accelerationValue.z;
            this.speed = Math.abs(this.x+this.y+this.z-this.lastX-this.lastY-this.lastZ) / diffTime * 10000;
            this.lastX = this.x;
            this.lastY = this.y;
            this.lastZ = this.z;
        }
    }

});

beginLayer.create=function()
{
    var _beginLayer=new beginLayer();
    _beginLayer.init();
    var _scene=cc.Scene.create();
    _scene.addChild(_beginLayer);
    return _scene;
};

var MyScene = cc.Scene.extend({
    onEnter:function ()
    {
        this._super();
        var layer = new beginLayer();
        this.addChild(layer);
        layer.init();
    }
});
