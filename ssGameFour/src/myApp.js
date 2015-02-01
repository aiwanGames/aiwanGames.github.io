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
            stick.setScale(0.1);
            stick.setOpacity(0);
            stick.setAnchorPoint(cc.p(0.5,0.0));
            switch(i)
            {
                case 1:stick.setPosition(cc.p(230,600));stick.setTag(100);break;
                case 2:stick.setPosition(cc.p(260,600));stick.setTag(101);break;
                case 3:stick.setPosition(cc.p(290,600));stick.setTag(102);break;
                case 4:stick.setPosition(cc.p(320,600));stick.setTag(103);break;
                case 5:stick.setPosition(cc.p(350,600));stick.setTag(104);break;
                case 6:stick.setPosition(cc.p(380,600));stick.setTag(105);break;
                case 7:stick.setPosition(cc.p(410,600));stick.setTag(106);break;
                default:break;
            }
            this.addChild(stick,0);
            stick.runAction(cc.Sequence.create(cc.DelayTime.create(i*0.1),cc.Spawn.create(cc.ScaleTo.create(0.5,0.9),cc.MoveBy.create(0.5,cc.p(0,-450)),cc.FadeIn.create(0.5))));

            var spt=cc.LabelTTF.create("","Arial",10);
            spt.setPosition(cc.p(0,0));
            this.addChild(spt,1);
            spt.runAction(cc.CallFunc.create(this.setCanShake,this));
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
        //音效
        this.audio.playEffect(s_effect1);
        //摇一摇
        var ac1=cc.Sequence.create(cc.RotateBy.create(0.15,13),cc.RotateBy.create(0.15,-13),cc.RotateBy.create(0.15,-13),cc.RotateBy.create(0.15,13),cc.DelayTime.create(0.4),cc.CallFunc.create(this.resultPre,this));
        this.sp_shake.runAction(ac1);

        for(var i=100;i<=106;i++)
        {
            var dir=this.getRandom(2);
            var offset=this.getRandom(8);
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
        //this.shakeCup();
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

        var id=this.getRandom(17);
        var result=null;
        var content="";

        switch(id)
        {
            case 1:result=cc.Sprite.create(s_img12);content="有钱";break;
            case 2:result=cc.Sprite.create(s_img13);content="零钱花不完";break;
            case 3:result=cc.Sprite.create(s_img14);content="加薪三次";break;
            case 4:result=cc.Sprite.create(s_img15);content="钱多活少";break;
            case 5:result=cc.Sprite.create(s_img16);content="发票中大奖";break;
            case 6:result=cc.Sprite.create(s_img17);content="走路捡钱";break;
            case 7:result=cc.Sprite.create(s_img18);content="创业必赚";break;
            case 8:result=cc.Sprite.create(s_img19);content="钱包撑爆";break;
            case 9:result=cc.Sprite.create(s_img20);content="刷卡不用还";break;
            case 10:result=cc.Sprite.create(s_img21);content="逢赌必赢";break;
            case 11:result=cc.Sprite.create(s_img22);content="财气爆棚";break;
            case 12:result=cc.Sprite.create(s_img23);content="遇到贵人";break;
            case 13:result=cc.Sprite.create(s_img24);content="奖金翻十倍";break;
            case 14:result=cc.Sprite.create(s_img25);content="中彩票";break;
            case 15:result=cc.Sprite.create(s_img26);content="买一送三";break;
            case 16:result=cc.Sprite.create(s_img27);content="财务自由";break;
            case 17:result=cc.Sprite.create(s_img28);content="存款多个零";break;
            default :break;
        }

        result.setPosition(cc.p(320,480));
        result.setScale(0.5);
        result.setOpacity(0);
        this.addChild(result,1);
        result.runAction(cc.Spawn.create(cc.EaseBackOut.create(cc.ScaleTo.create(0.5,1.0)),cc.FadeIn.create(0.5)));

        var zailaiItem = cc.MenuItemImage.create(s_img04,s_img05,this.restart,this);
        var zailaimenu = cc.Menu.create(zailaiItem);
        zailaimenu.setPosition(cc.p(165,-100));
        this.addChild(zailaimenu,1);
        zailaimenu.runAction(cc.Sequence.create(cc.DelayTime.create(0.5),cc.EaseBackOut.create(cc.MoveBy.create(0.6,cc.p(0,180)))));

        var moreItem = cc.MenuItemImage.create(s_img06,s_img07,this.enterBBS,this);
        var moremenu = cc.Menu.create(moreItem);
        moremenu.setPosition(cc.p(440,-100));
        this.addChild(moremenu,1);
        moremenu.runAction(cc.Sequence.create(cc.DelayTime.create(0.5),cc.EaseBackOut.create(cc.MoveBy.create(0.6,cc.p(0,180)))));

        var logo=cc.Sprite.create(s_img11);
        logo.setScale(2.5);
        logo.setOpacity(0);
        logo.setPosition(cc.p(320,420));
        this.addChild(logo,1);
        logo.runAction(cc.Sequence.create(cc.DelayTime.create(1.0),cc.Spawn.create(cc.MoveTo.create(0.5,cc.p(100,220)),cc.ScaleTo.create(0.5,1.2),cc.FadeIn.create(0.5))));

        this.getChildByTag(110).setPosition(cc.p(20,800));
        this.getChildByTag(111).setPosition(cc.p(620,600));
        this.getChildByTag(113).setPosition(cc.p(600,130));
        //this.getChildByTag(114).setPosition(cc.p(320,20));

        document.title = window.wxData.desc = "我抽到了财运签-"+content+"，新年新气象，快来抽一签！";
        document.title = window.wxFriend.desc = "我给你抽到了财运签-"+content+"，新年新气象，快来抽一签！";
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
