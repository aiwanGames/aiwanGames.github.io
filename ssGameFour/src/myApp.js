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
    sp_shake:null,
    isShaking:false,
    canShake:false,
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
    isShared:false,
    isTest:false,

    init:function()
    {
        this._super();
        this.winsize = cc.Director.getInstance().getWinSize();
        this.audio=cc.AudioEngine.getInstance();

        var back=cc.Sprite.create(s_img01);
        back.setAnchorPoint(cc.p(0.5,0.0));
        back.setPosition(cc.p(320,0));
        this.addChild(back,0);

        this.sp_shake=cc.Sprite.create(s_img02);
        this.sp_shake.setPosition(cc.p(320,170));
        this.addChild(this.sp_shake,1);

        var tip1=cc.Sprite.create(s_img08);
        tip1.setPosition(cc.p(320,65));
        tip1.setTag(90);
        this.addChild(tip1,1);

        var tip2=cc.Sprite.create(s_img09);
        tip2.setPosition(cc.p(320,750));
        tip2.setTag(91);
        this.addChild(tip2,1);
        tip2.runAction(cc.Repeat.create(cc.Sequence.create(cc.DelayTime.create(1.5),cc.RotateBy.create(0.1,10),cc.RotateBy.create(0.1,-10),cc.RotateBy.create(0.1,-10),cc.RotateBy.create(0.1,10)),999999));

        this.lastUpdate=new Date().getTime();

        this.loadStars();
        this.loadStick();

        this.setTouchEnabled(true);
        this.setAccelerometerEnabled(true);
        this.schedule(this.updateGame,0.05,999999,0.1);
        return true;
    },

    getRandom:function(maxsize)
    {
        return Math.floor(Math.random() * maxsize) % maxsize;
    },

    loadStick:function()
    {
        for(var i=1;i<=7;i++)
        {
            var stick=cc.Sprite.create(s_img03);
            var act=null;
            stick.setScale(0.1);
            stick.setOpacity(0);
            stick.setAnchorPoint(cc.p(0.5,0.0));
            switch(i)
            {
                case 1:
                    stick.setPosition(cc.p(250,600));
                    stick.setTag(100);
                    act=cc.Sequence.create(cc.DelayTime.create(i*0.1),cc.Spawn.create(cc.ScaleTo.create(0.3,0.9),cc.MoveBy.create(0.3,cc.p(0,-450)),cc.FadeIn.create(0.3)),cc.RotateBy.create(0.4,-12));
                    break;
                case 2:
                    stick.setPosition(cc.p(270,600));
                    stick.setTag(101);
                    act=cc.Sequence.create(cc.DelayTime.create(i*0.1),cc.Spawn.create(cc.ScaleTo.create(0.3,0.9),cc.MoveBy.create(0.3,cc.p(0,-450)),cc.FadeIn.create(0.3)),cc.RotateBy.create(0.2,-6));
                    break;
                case 3:
                    stick.setPosition(cc.p(290,600));
                    stick.setTag(102);
                    act=cc.Sequence.create(cc.DelayTime.create(i*0.1),cc.Spawn.create(cc.ScaleTo.create(0.3,0.9),cc.MoveBy.create(0.3,cc.p(0,-450)),cc.FadeIn.create(0.3)),cc.RotateBy.create(0.1,-2));
                    break;
                case 4:
                    stick.setPosition(cc.p(320,600));
                    stick.setTag(103);
                    act=cc.Sequence.create(cc.DelayTime.create(i*0.1),cc.Spawn.create(cc.ScaleTo.create(0.3,0.9),cc.MoveBy.create(0.3,cc.p(0,-450)),cc.FadeIn.create(0.3)));
                    break;
                case 5:
                    stick.setPosition(cc.p(350,600));
                    stick.setTag(104);
                    act=cc.Sequence.create(cc.DelayTime.create(i*0.1),cc.Spawn.create(cc.ScaleTo.create(0.3,0.9),cc.MoveBy.create(0.3,cc.p(0,-450)),cc.FadeIn.create(0.3)),cc.RotateBy.create(0.3,3));
                    break;
                case 6:
                    stick.setPosition(cc.p(370,600));
                    stick.setTag(105);
                    act=cc.Sequence.create(cc.DelayTime.create(i*0.1),cc.Spawn.create(cc.ScaleTo.create(0.3,0.9),cc.MoveBy.create(0.3,cc.p(0,-450)),cc.FadeIn.create(0.3)),cc.RotateBy.create(0.2,5));
                    break;
                case 7:
                    stick.setPosition(cc.p(390,600));
                    stick.setTag(106);
                    act=cc.Sequence.create(cc.DelayTime.create(i*0.1),cc.Spawn.create(cc.ScaleTo.create(0.3,0.9),cc.MoveBy.create(0.3,cc.p(0,-450)),cc.FadeIn.create(0.3)),cc.RotateBy.create(0.2,12));
                    break;
                default:break;
            }
            this.addChild(stick,0);
            stick.runAction(act);
            var spt=cc.LabelTTF.create("","Arial",10);
            spt.setPosition(cc.p(0,0));
            this.addChild(spt,1);
            spt.runAction(cc.Sequence.create(cc.DelayTime.create(2.5),cc.CallFunc.create(this.setCanShake,this)));
        }
    },

    setCanShake:function(sp)
    {
        this.removeChild(sp,true);
        this.canShake=true;
    },

    loadStars:function()
    {
        for(var i=1;i<6;i++)
        {
            var star1=cc.Sprite.create(s_img10);
            star1.setScale(0.1);
            star1.setOpacity(0);
            switch(i)
            {
                case 1:star1.setPosition(cc.p(160,300));star1.setTag(110);break;
                case 2:star1.setPosition(cc.p(120,480));star1.setTag(111);break;
                case 3:star1.setPosition(cc.p(50,140));star1.setTag(112);break;
                case 4:star1.setPosition(cc.p(550,420));star1.setTag(113);break;
                case 5:star1.setPosition(cc.p(540,200));star1.setTag(114);break;
                default:break;
            }
            this.addChild(star1,1);
            star1.runAction(cc.Repeat.create(cc.Sequence.create(cc.DelayTime.create(i%2*0.4+0.1),cc.Spawn.create(cc.ScaleTo.create(1.0,0.8),cc.RotateBy.create(1.0,180),cc.FadeIn.create(1.0)),cc.Spawn.create(cc.ScaleTo.create(1.0,0.1),cc.RotateBy.create(1.0,180),cc.FadeOut.create(1.0))),999999,0.1));
        }
    },

    shakeCup:function()
    {
        this.audio.playEffect(s_effect1);
        var ac1=cc.Sequence.create(cc.RotateBy.create(0.15,13),cc.RotateBy.create(0.15,-13),cc.RotateBy.create(0.15,-13),cc.RotateBy.create(0.15,13),cc.DelayTime.create(0.5),cc.CallFunc.create(this.resultPre,this));
        this.sp_shake.runAction(ac1);

        for(var i=100;i<=106;i++)
        {
            var dir=this.getRandom(2);
            var offset=this.getRandom(4);
            var act=null;
            if(dir==0)
            {
                act=cc.Sequence.create(cc.RotateBy.create(0.15,-5-offset),cc.RotateBy.create(0.15,5+offset),cc.RotateBy.create(0.15,5+offset),cc.RotateBy.create(0.15,-5-offset));
            }
            else
            {
                act=cc.Sequence.create(cc.RotateBy.create(0.15,5+offset),cc.RotateBy.create(0.15,-5-offset),cc.RotateBy.create(0.15,-5-offset),cc.RotateBy.create(0.15,5+offset));
            }
            var st=this.getChildByTag(i);
            st.runAction(act);
        }
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
        //test shake
        if(this.isTest==false)
        {
            //this.shakeCup();
            this.isTest = true;
        }

        if(cc.rectContainsPoint(this.sp_shake.getBoundingBox(),location)&&this.isShared==false&&this.canShake==true&&this.isShaking==false)
        {
            this.shakeCup();
            this.isShaking=true;
        }

        if(this.isShared==true)
        {
            if(this.getChildByTag(150))this.getChildByTag(150).setEnabled(true);
            if(this.getChildByTag(151))this.getChildByTag(151).setEnabled(true);
            if(this.getChildByTag(152))this.getChildByTag(152).setEnabled(true);
            this.removeChildByTag(153,true);
            this.removeChildByTag(154,true);
            this.removeChildByTag(155,true);
            this.isShared=false;
        }
    },

    updateGame:function()
    {
        if(this.speed>this.SHAKE_THRESHOLD&&this.isShaking==false&&this.canShake==true)
        {
            this.isShaking=true;
            this.shakeCup();
        }
    },

    enterBBS:function()
    {
        var newURL="http://bbs.feidee.com";
        window.location.href=newURL;
    },

    resultPre:function()
    {
        var left=this.getRandom(7)+100;
        for(var i=100;i<=106;i++)
        {
            if(i!=left)
            {
                this.getChildByTag(i).runAction(cc.Sequence.create(cc.DelayTime.create((i-100)*0.1),cc.FadeOut.create(0.3),cc.CallFunc.create(this.removeSprite,this)));
            }
        }
        var leftSt=this.getChildByTag(left);
        leftSt.runAction(cc.Sequence.create(cc.DelayTime.create(1.0),cc.Spawn.create(cc.ScaleTo.create(0.6,0.1),cc.FadeOut.create(0.6),cc.MoveTo.create(0.6,cc.p(320,420))),cc.CallFunc.create(this.result,this)));
    },

    result:function(_sprite)
    {
        this.audio.playEffect(s_effect2);

        this.removeChild(_sprite,true);
        this.removeChild(this.sp_shake,true);
        this.removeChildByTag(90,true);
        this.removeChildByTag(91,true);

        var result0=cc.Sprite.create(s_img26);
        result0.setScale(2.5);
        result0.setOpacity(0);
        result0.setPosition(cc.p(320,480));
        this.addChild(result0,1);
        result0.runAction(cc.Spawn.create(cc.EaseBackOut.create(cc.ScaleTo.create(0.5,1.0)),cc.FadeIn.create(0.5)));

        var id=this.getRandom(14)+1;
        var result=null;
        var content="";
       var img="";
        switch(id)
        {
            case 1:
                result=cc.Sprite.create(s_img12);
                content="必赚";
                img="http://aiwangames.com/ssGameFour/res/HD/bizhuan1.png";
                break;
            case 2:
                result=cc.Sprite.create(s_img13);
                content="旺财";
                img="http://aiwangames.com/ssGameFour/res/HD/renxing1.png";
                break;
            case 3:
                result=cc.Sprite.create(s_img14);
                content="多金";
                img="http://aiwangames.com/ssGameFour/res/HD/duojin1.png";
                break;
            case 4:
                result=cc.Sprite.create(s_img15);
                content="发财";
                img="http://aiwangames.com/ssGameFour/res/HD/facai1.png";
                break;
            case 5:
                result=cc.Sprite.create(s_img16);
                content="贵人";
                img="http://aiwangames.com/ssGameFour/res/HD/guiren1.png";
                break;
            case 6:
                result=cc.Sprite.create(s_img17);
                content="横财";
                img="http://aiwangames.com/ssGameFour/res/HD/hengcai1.png";
                break;
            case 7:
                result=cc.Sprite.create(s_img18);
                content="加薪";
                img="http://aiwangames.com/ssGameFour/res/HD/jiaxin1.png";
                break;
            case 8:
                result=cc.Sprite.create(s_img19);
                content="捡漏";
                img="http://aiwangames.com/ssGameFour/res/HD/jianlou1.png";
                break;
            case 9:
                result=cc.Sprite.create(s_img20);
                content="捡钱";
                img="http://aiwangames.com/ssGameFour/res/HD/jianqian1.png";
                break;
            case 10:
                result=cc.Sprite.create(s_img21);
                content="钱多";
                img="http://aiwangames.com/ssGameFour/res/HD/qianduo1.png";
                break;
            case 11:
                result=cc.Sprite.create(s_img22);
                content="任性";
                img="http://aiwangames.com/ssGameFour/res/HD/renxing1.png";
                break;
            case 12:
                result=cc.Sprite.create(s_img23);
                content="土豪";
                img="http://aiwangames.com/ssGameFour/res/HD/renxing1.png";
                break;
            case 13:
                result=cc.Sprite.create(s_img24);
                content="赢钱";
                img="http://aiwangames.com/ssGameFour/res/HD/renxing1.png";
                break;
            case 14:
                result=cc.Sprite.create(s_img25);
                content="中奖";
                img="http://aiwangames.com/ssGameFour/res/HD/renxing1.png";
                break;
            default :break;
        }

        result.setPosition(cc.p(320,480));
        result.setScale(0.5);
        result.setOpacity(0);
        this.addChild(result,1);
        result.runAction(cc.Spawn.create(cc.EaseBackOut.create(cc.ScaleTo.create(0.5,1.0)),cc.FadeIn.create(0.5)));

        var zailaiItem = cc.MenuItemImage.create(s_img04,s_img05,this.restart,this);
        zailaiItem.setScale(0.75);
        var zailaimenu = cc.Menu.create(zailaiItem);
        zailaimenu.setPosition(cc.p(135,-100));
        this.addChild(zailaimenu,1);
        zailaimenu.setTag(150);
        zailaimenu.runAction(cc.Sequence.create(cc.DelayTime.create(0.5),cc.EaseBackOut.create(cc.MoveBy.create(0.6,cc.p(0,180)))));

        var moreItem = cc.MenuItemImage.create(s_img06,s_img07,this.enterBBS,this);
        moreItem.setScale(0.75);
        var moremenu = cc.Menu.create(moreItem);
        moremenu.setPosition(cc.p(505,-100));
        this.addChild(moremenu,1);
        moremenu.setTag(151);
        moremenu.runAction(cc.Sequence.create(cc.DelayTime.create(0.5),cc.EaseBackOut.create(cc.MoveBy.create(0.6,cc.p(0,180)))));

        var shareItem = cc.MenuItemImage.create(s_img29,s_img30,this.share2Friend,this);
        shareItem.setScale(0.75);
        var sharemenu = cc.Menu.create(shareItem);
        sharemenu.setPosition(cc.p(320,-100));
        this.addChild(sharemenu,1);
        sharemenu.setTag(152);
        sharemenu.runAction(cc.Sequence.create(cc.DelayTime.create(0.5),cc.EaseBackOut.create(cc.MoveBy.create(0.6,cc.p(0,180)))));

        var logo=cc.Sprite.create(s_img11);
        logo.setScale(2.5);
        logo.setOpacity(0);
        logo.setPosition(cc.p(320,420));
        this.addChild(logo,1);
        logo.runAction(cc.Sequence.create(cc.DelayTime.create(1.0),cc.Spawn.create(cc.MoveTo.create(0.5,cc.p(100,225)),cc.ScaleTo.create(0.5,1.2),cc.FadeIn.create(0.5))));

        this.getChildByTag(110).setPosition(cc.p(20,800));
        this.getChildByTag(111).setPosition(cc.p(620,600));
        this.getChildByTag(113).setPosition(cc.p(600,130));
        //this.getChildByTag(114).setPosition(cc.p(320,20));

        window.wxData.imgUrl=img;
        window.wxFriend.imgUrl=img;
        document.getElementById("shareImage").src=img;
        document.title = window.wxData.desc = "我抽到了财运签-"+content+"，新年新气象，快来抽一签！";
        document.title = window.wxFriend.desc = "我给你抽到了财运签-"+content+"，新年新气象，快来抽一签！";
    },

    share2Friend:function()
    {
        var ua = navigator.userAgent;
        if(/MyMoneySms/i.test(ua))
        {
            FS.NB("requestShare", JSON.stringify({"title":"新年财运签", "content":"天灵灵地灵灵，财神来显灵！", "url":"http://bbs.feidee.net/m/"}), '', '');
        }
        else if(/feideeAndroid|MyMoney/i.test(ua))
        {
            FS.NB("requestShare", JSON.stringify({"title":"新年财运签", "content":"天灵灵地灵灵，财神来显灵！", "url":"http://bbs.feidee.net/m/"}), '', '');
        }
        else
        {
            if(this.isShared==false)
            {
                var shield1=cc.Sprite.create(s_img32);
                shield1.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.5));
                shield1.setTag(153);
                this.addChild(shield1,5);
                var shield2=cc.Sprite.create(s_img31);
                shield2.setPosition(cc.p(this.winsize.width*0.8,this.winsize.height*0.9));
                shield2.setTag(154);
                this.addChild(shield2,5);
                var label=cc.LabelTTF.create("点击这里分享","黑体",35);
                label.setAnchorPoint(cc.p(0.5,0.5));
                label.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.78));
                label.setColor(cc.c3(255,255,255));
                label.setTag(155);
                this.addChild(label,5);
                if(this.getChildByTag(150))this.getChildByTag(150).setEnabled(false);
                if(this.getChildByTag(151))this.getChildByTag(151).setEnabled(false);
                if(this.getChildByTag(152))this.getChildByTag(152).setEnabled(false);
                this.isShared=true;
            }
        }
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
