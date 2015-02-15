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
    winSize:null,
    startTouch:0.0,
    endTouch:0.0,
    pageIndex:2,//page编号，从2开始
    pageCount:10,//page数量
    imgPerPage:10,//每个page的图片数量
    isPlaying:false,//page正在播放
    isTop:false,//是否到第一张
    isBottom:false,//是否到最后一张
    isTouched:false,//开始触摸
    isShared:false,
    scoreLabel:null,
    gameScore:0,
    money:1000,
    sound:false,
    //audio:null,

    init:function ()
    {
        this._super();
        this.winSize = cc.Director.getInstance().getWinSize();
        this.audio=cc.AudioEngine.getInstance();
        this.setColor(cc.c4(255,202,57,255));
        document.body.style.backgroundColor="#FFCA39";

        //设置分享内容
        document.title =  "随手记·喜乐汇（随手记，理财第一步）";
        //提示用户翻页
        var imageUp=cc.Sprite.create(point);
        imageUp.setPosition(cc.p(320,40));
        imageUp.setTag(89);
        this.addChild(imageUp,10);
        var ac0=cc.Repeat.create(cc.Sequence.create(cc.MoveBy.create(0.8,cc.p(0,10)),cc.MoveBy.create(0.8,cc.p(0,-10))),999999);
        imageUp.runAction(ac0);

        var image01=cc.Sprite.create(back1);
        image01.setPosition(cc.p(this.winSize.width*0.5,this.winSize.height*0.65));
        image01.setTag(90);
        this.addChild(image01,1);

        var image02=cc.Sprite.create(back2);
        image02.setPosition(cc.p(this.winSize.width*0.5,this.winSize.height*0.65));
        image02.setTag(91);
        this.addChild(image02,1);
        image02.runAction(cc.Repeat.create(cc.Sequence.create(cc.RotateBy.create(30.0,-360)),99999999));

        var image03=cc.Sprite.create(back3);
        image03.setPosition(cc.p(this.winSize.width*0.5,this.winSize.height*0.65));
        image03.setTag(92);
        this.addChild(image03,1);

        var image04=cc.Sprite.create(back4);
        image04.setPosition(cc.p(this.winSize.width*0.5,this.winSize.height*0.65));
        image04.setTag(93);
        this.addChild(image04,1);
        image04.runAction(cc.Repeat.create(cc.Sequence.create(cc.RotateBy.create(30.0,360)),99999999));

        var soundImage=cc.MenuItemImage.create(s_img3,s_img3,this.setMusicOn,this);
        soundImage.setAnchorPoint(cc.p(1.0,0.3));
        soundImage.setTag(87);
        var soundMenu=cc.Menu.create(soundImage);
        soundMenu.setTag(88);
        soundMenu.setPosition(cc.p(this.winSize.width,45));
        this.addChild(soundMenu,15);
        soundImage.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.RotateBy.create(0.5,6.0),cc.RotateBy.create(0.5,-6.0),cc.RotateBy.create(0.5,-6.0),cc.RotateBy.create(0.5,6.0))));
        //开启触摸
        this.setTouchEnabled(true);
        //播放第一张page
        this.page1Action();
        return true;
    },

    setMusicOn:function()
    {
        cc.log("music");
        if(this.getChildByTag(87))this.removeChildByTag(87,true);
        if(this.getChildByTag(88))this.removeChildByTag(88,true);
        if (this.sound == false)
        {
            this.sound = true;
            var soundImage=cc.MenuItemImage.create(s_img4,s_img4,this.setMusicOn,this);
            soundImage.setAnchorPoint(cc.p(1.0,0.3));
            soundImage.setTag(87);
            var soundMenu=cc.Menu.create(soundImage);
            soundMenu.setTag(88);
            soundMenu.setPosition(cc.p(this.winSize.width,45));
            this.addChild(soundMenu,15);
            soundImage.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.RotateBy.create(0.5,6.0),cc.RotateBy.create(0.5,-6.0),cc.RotateBy.create(0.5,-6.0),cc.RotateBy.create(0.5,6.0))));
            this.audio.playMusic(s_music, true);
        }
        else
        {
            this.sound = false;
            var soundImage=cc.MenuItemImage.create(s_img3,s_img3,this.setMusicOn,this);
            soundImage.setAnchorPoint(cc.p(1.0,0.3));
            soundImage.setTag(87);
            var soundMenu=cc.Menu.create(soundImage);
            soundMenu.setTag(88);
            soundMenu.setPosition(cc.p(this.winSize.width,45));
            this.addChild(soundMenu,15);
            soundImage.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.RotateBy.create(0.5,6.0),cc.RotateBy.create(0.5,-6.0),cc.RotateBy.create(0.5,-6.0),cc.RotateBy.create(0.5,6.0))));
            this.audio.stopMusic();
        }
        //sn.setAnchorPoint(cc.p(1.0,0.3));
        //sn.setPosition(cc.p(this.winSize.width,45));
    },

    pageCallBack:function(_sp)
    {
        var tag=_sp.getTag();
        if(tag==10000)
        {

        }
        else if(tag==10001)
        {

        }
        else
        {

        }
    },

    page1Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();

        var image01=cc.Sprite.create(p0102);
        image01.setPosition(cc.p(winsize.width*0.5,winsize.height*0.65));
        image01.setScale(0.2);
        image01.setTag(100);
        this.addChild(image01,1);

        var image02=cc.Sprite.create(p0103);
        image02.setPosition(cc.p(winsize.width*0.42,winsize.height*0.72));
        image02.setTag(101);
        this.addChild(image02,2);

        var image03=cc.Sprite.create(p0101);
        image03.setPosition(cc.p(winsize.width*0.5,winsize.height*0.63));
        image03.setScale(1.5);
        image03.setOpacity(50);
        image03.setTag(102);
        this.addChild(image03,2);

        var image04=cc.Sprite.create(logo);
        image04.setPosition(cc.p(winsize.width*0.5,winsize.height*0.48));
        image04.setScale(1.5);
        image04.setOpacity(0);
        image04.setTag(103);
        this.addChild(image04,2);

        var image05=cc.Sprite.create(p0104);
        image05.setPosition(cc.p(winsize.width*0.58,winsize.height*0.7));
        image05.setScale(0.2);
        image05.setTag(104);
        this.addChild(image05,1);

        var image06=cc.Sprite.create(p0105);
        image06.setPosition(cc.p(winsize.width*0.42,winsize.height*0.7));
        image06.setScale(0.2);
        image06.setTag(105);
        this.addChild(image06,1);

        var image07=cc.Sprite.create(p0106);
        image07.setPosition(cc.p(winsize.width*0.42,winsize.height*0.7));
        image07.setOpacity(0);
        image07.setTag(106);
        this.addChild(image07,1);

        this.getChildByTag(92).initWithFile(back3);
        this.money=1000;

        //执行动作
        image03.runAction(cc.Sequence.create(cc.Spawn.create(cc.FadeIn.create(0.2),cc.EaseBackOut.create(cc.ScaleTo.create(0.2,1.0))),cc.Repeat.create(cc.Sequence.create(cc.DelayTime.create(1.0),cc.RotateBy.create(0.1,-5.0),cc.RotateBy.create(0.1,5.0),cc.RotateBy.create(0.1,5.0),cc.RotateBy.create(0.1,-5.0)),9999999)));
        image04.runAction(cc.Sequence.create(cc.DelayTime.create(0.4),cc.Spawn.create(cc.FadeIn.create(0.2),cc.EaseBackOut.create(cc.ScaleTo.create(0.2,1.0)))));
        image01.runAction(cc.Sequence.create(cc.DelayTime.create(0.3),cc.ScaleTo.create(0.2,1.0)));
        image06.runAction(cc.Sequence.create(cc.DelayTime.create(0.5),cc.ScaleTo.create(0.2,1.0),cc.Repeat.create(cc.Sequence.create(cc.ScaleTo.create(0.6,0.95),cc.ScaleTo.create(0.1,1.0)),9999999)));
        image05.runAction(cc.Sequence.create(cc.DelayTime.create(0.7),cc.ScaleTo.create(0.2,1.0),cc.Repeat.create(cc.Sequence.create(cc.ScaleTo.create(0.8,0.95),cc.ScaleTo.create(0.2,1.0)),9999999)));
        image07.runAction(cc.Sequence.create(cc.DelayTime.create(0.9),cc.FadeIn.create(0.1),cc.Repeat.create(cc.Sequence.create(cc.FadeOut.create(0.5),cc.FadeIn.create(0.1)),9999999)));
    },

    page2Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();

        this.getChildByTag(92).initWithFile(p0201);

        var image01=cc.Sprite.create(p0202);
        image01.setPosition(cc.p(winsize.width*0.505,winsize.height*0.65));
        image01.setOpacity(0);
        image01.setTag(201);
        this.addChild(image01,2);

        var image02=cc.LabelTTF.create("1000","",60);
        image02.setAnchorPoint(cc.p(0.5,0.5));
        image02.setPosition(cc.p(winsize.width*0.5,winsize.height*0.65));
        image02.setColor(cc.c3(255,234,0));
        image02.setOpacity(0);
        image02.setScale(2.5);
        image02.setTag(202);
        this.addChild(image02,2);

        var image03=cc.Sprite.create(p0208);
        image03.setPosition(cc.p(winsize.width*0.39,winsize.height*0.65));
        image03.setOpacity(0);
        image03.setScale(0.1);
        image03.setTag(203);
        this.addChild(image03,1);

        var progress=cc.ProgressTimer.create(cc.Sprite.create(zi1));
        progress.setPosition(cc.p(winsize.width*0.5,winsize.height*0.25));
        progress.setType(cc.PROGRESS_TIMER_TYPE_BAR);
        progress.setMidpoint(cc.p(0,0.5));
        progress.setBarChangeRate(cc.p(1, 1));
        progress.setTag(204);
        this.addChild(progress);
        var proto = cc.ProgressTo.create(0.6, 100);
        progress.runAction(proto);

        //执行动作
        image01.runAction(cc.Sequence.create(cc.Spawn.create(cc.FadeIn.create(0.2),cc.MoveBy.create(0.2,cc.p(0,-80))),cc.DelayTime.create(1.2),cc.CallFunc.create(this.callPage2SCHD,this)));
        image02.runAction(cc.Sequence.create(cc.DelayTime.create(0.3),cc.Spawn.create(cc.FadeIn.create(0.2),cc.ScaleTo.create(0.2,1.0)),cc.DelayTime.create(0.2),cc.CallFunc.create(this.callPage2SCHD,this),cc.Repeat.create(cc.Sequence.create(cc.DelayTime.create(1.0),cc.ScaleTo.create(0.1,1.1),cc.ScaleTo.create(0.1,1.0)),9999999)));
        image03.runAction(cc.Sequence.create(cc.DelayTime.create(0.7),cc.Spawn.create(cc.FadeIn.create(0.2),cc.ScaleTo.create(0.2,1.0)),cc.Repeat.create(cc.Sequence.create(cc.ScaleTo.create(0.8,0.95),cc.ScaleTo.create(0.2,1.0)),9999999)));

    },

    callPage2SCHD:function(_sp)
    {
        if(_sp.getTag()==202)
        {
            this.schedule(this.page2SCHD1,0.05,30,0.1);
        }
        else
        {
            cc.log("s");
            this.schedule(this.page2SCHD2,1.7,8888888,0.1);
        }

    },

    page2SCHD1:function()
    {
        this.money+=3333331;
        if(this.money>=100000000)
        {
            this.money=100000000;
        }
        if(this.getChildByTag(202))
        {
            this.getChildByTag(202).setString(""+this.money);
        }
    },

    page2SCHD2:function()
    {
        for(var i=1;i<6;i++)
        {
            var sp=null;
            switch(i)
            {
                case 1:
                    sp=cc.Sprite.create(p0205);
                    sp.setPosition(cc.p(220,580));
                    sp.setTag(205);
                    this.addChild(sp,1);
                    sp.runAction(cc.Sequence.create(cc.DelayTime.create(0.1),cc.MoveBy.create(0.5,cc.p(-100,130)),cc.FadeOut.create(0.1),cc.CallFunc.create(this.removeSprite,this)));
                    break;
                case 2:
                    sp=cc.Sprite.create(p0205);
                    sp.setPosition(cc.p(270,580));
                    sp.setScale(0.7);
                    sp.setRotation(15);
                    sp.setTag(206);
                    this.addChild(sp,1);
                    sp.runAction(cc.Sequence.create(cc.DelayTime.create(0.2),cc.MoveBy.create(0.5,cc.p(-60,197)),cc.FadeOut.create(0.1),cc.CallFunc.create(this.removeSprite,this)));
                    break;
                case 3:
                    sp=cc.Sprite.create(p0203);
                    sp.setPosition(cc.p(320,580));
                    sp.setRotation(-30);
                    sp.setTag(207);
                    this.addChild(sp,1);
                    sp.runAction(cc.Sequence.create(cc.DelayTime.create(0.3),cc.MoveBy.create(0.5,cc.p(0,230)),cc.FadeOut.create(0.1),cc.CallFunc.create(this.removeSprite,this)));
                    break;
                case 4:
                    sp=cc.Sprite.create(p0204);
                    sp.setPosition(cc.p(370,580));
                    sp.setTag(208);
                    this.addChild(sp,1);
                    sp.runAction(cc.Sequence.create(cc.DelayTime.create(0.4),cc.MoveBy.create(0.5,cc.p(60,197)),cc.FadeOut.create(0.1),cc.CallFunc.create(this.removeSprite,this)));
                    break;
                case 5:
                    sp=cc.Sprite.create(p0206);
                    sp.setPosition(cc.p(420,580));
                    sp.setTag(209);
                    this.addChild(sp,1);
                    sp.runAction(cc.Sequence.create(cc.DelayTime.create(0.5),cc.MoveBy.create(0.5,cc.p(100,130)),cc.FadeOut.create(0.1),cc.CallFunc.create(this.removeSprite,this)));
                    break;
                default:break;
            }
        }
    },

    page3Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();
        this.money=1000;

        this.getChildByTag(92).initWithFile(b8);
        this.getChildByTag(90).setZOrder(0);
        this.getChildByTag(91).setZOrder(0);
        this.getChildByTag(93).setZOrder(0);

        var image01=cc.Sprite.create(b5);
        image01.setPosition(cc.p(winsize.width*0.5,winsize.height*0.65));
        image01.setScale(2.5);
        image01.setOpacity(0);
        image01.setTag(300);
        this.addChild(image01,1);
        image01.runAction(cc.Sequence.create(cc.Spawn.create(cc.FadeIn.create(0.2),cc.ScaleTo.create(0.2,1.0))));

        var progress=cc.ProgressTimer.create(cc.Sprite.create(zi2));
        progress.setPosition(cc.p(winsize.width*0.5,winsize.height*0.25));
        progress.setType(cc.PROGRESS_TIMER_TYPE_BAR);
        progress.setMidpoint(cc.p(0,1));
        progress.setBarChangeRate(cc.p(1, 1));
        progress.setTag(301);
        this.addChild(progress);
        var proto = cc.ProgressTo.create(0.6, 100);
        progress.runAction(proto);

        var image02=cc.Sprite.create(b7);
        image02.setPosition(cc.p(winsize.width*0.5,winsize.height*0.65));
        image02.setScale(2.0);
        image02.setOpacity(0);
        image02.setTag(302);
        this.addChild(image02,1);
        image02.runAction(cc.Sequence.create(cc.DelayTime.create(0.3),cc.Spawn.create(cc.FadeIn.create(0.2),cc.ScaleTo.create(0.2,1.0))));

        var image03=cc.Sprite.create(b7);
        image03.setPosition(cc.p(winsize.width*0.58,winsize.height*0.65));
        image03.setScale(2.0);
        image03.setOpacity(0);
        image03.setTag(303);
        this.addChild(image03,1);
        image03.runAction(cc.Sequence.create(cc.DelayTime.create(0.4),cc.Spawn.create(cc.FadeIn.create(0.2),cc.ScaleTo.create(0.2,1.0))));

        var image04=cc.Sprite.create(b7);
        image04.setPosition(cc.p(winsize.width*0.65,winsize.height*0.65));
        image04.setScale(2.0);
        image04.setOpacity(0);
        image04.setTag(304);
        this.addChild(image04,1);
        image04.runAction(cc.Sequence.create(cc.DelayTime.create(0.5),cc.Spawn.create(cc.FadeIn.create(0.2),cc.ScaleTo.create(0.2,1.0))));

        var image05=cc.Sprite.create(b7);
        image05.setPosition(cc.p(winsize.width*0.73,winsize.height*0.65));
        image05.setScale(2.0);
        image05.setOpacity(0);
        image05.setTag(305);
        this.addChild(image05,1);
        image05.runAction(cc.Sequence.create(cc.DelayTime.create(0.6),cc.Spawn.create(cc.FadeIn.create(0.2),cc.ScaleTo.create(0.2,1.0))));

        var image06=cc.Sprite.create(b7);
        image06.setPosition(cc.p(winsize.width*0.28,winsize.height*0.61));
        image06.setScale(2.0);
        image06.setOpacity(0);
        image06.setTag(306);
        this.addChild(image06,1);
        image06.runAction(cc.Sequence.create(cc.DelayTime.create(0.7),cc.Spawn.create(cc.FadeIn.create(0.2),cc.ScaleTo.create(0.2,1.0))));

        var image07=cc.Sprite.create(b7);
        image07.setPosition(cc.p(winsize.width*0.36,winsize.height*0.61));
        image07.setScale(2.0);
        image07.setOpacity(0);
        image07.setTag(307);
        this.addChild(image07,1);
        image07.runAction(cc.Sequence.create(cc.DelayTime.create(0.8),cc.Spawn.create(cc.FadeIn.create(0.2),cc.ScaleTo.create(0.2,1.0))));

        var image08=cc.Sprite.create(b7);
        image08.setPosition(cc.p(winsize.width*0.43,winsize.height*0.61));
        image08.setScale(3.0);
        image08.setOpacity(0);
        image08.setTag(308);
        this.addChild(image08,1);
        image08.runAction(cc.Sequence.create(cc.DelayTime.create(1.0),cc.Spawn.create(cc.FadeIn.create(0.2),cc.ScaleTo.create(0.2,1.0)),cc.DelayTime.create(0.3),cc.CallFunc.create(this.page3CallBack,this)));
    },

    page3CallBack:function()
    {
        for(var i=303;i<309;i++)
        {
            this.removeChildByTag(i,true);
        }
        var image01=cc.Sprite.create(b2);
        image01.setPosition(cc.p(this.winSize.width*0.5,this.winSize.height*0.65));
        image01.setScale(0.1);
        image01.setOpacity(0);
        image01.setTag(303);
        this.addChild(image01,1);
        image01.runAction(cc.Sequence.create(cc.Spawn.create(cc.FadeIn.create(0.2),cc.ScaleTo.create(0.2,1.0))));

        var image02=cc.Sprite.create(b3);
        image02.setPosition(cc.p(this.winSize.width*0.5,this.winSize.height*0.65));
        image02.setScale(2.0);
        image02.setOpacity(0);
        image02.setTag(304);
        this.addChild(image02,1);
        image02.runAction(cc.Sequence.create(cc.DelayTime.create(0.2),cc.Spawn.create(cc.FadeIn.create(0.2),cc.ScaleTo.create(0.2,0.85))));

        var image03=cc.Sprite.create(b4);
        image03.setPosition(cc.p(-this.winSize.width*0.2,this.winSize.height*0.47));
        image03.setOpacity(0);
        image03.setTag(305);
        this.addChild(image03,1);
        image03.runAction(cc.Sequence.create(cc.DelayTime.create(0.5),cc.Spawn.create(cc.FadeIn.create(0.2),cc.EaseBackOut.create(cc.MoveTo.create(0.2,cc.p(this.winSize.width*0.5,this.winSize.height*0.47))))));

        var image05=cc.Sprite.create(b1);
        image05.setPosition(cc.p(this.winSize.width*0.38,this.winSize.height*0.49));
        image05.setScale(3.0);
        image05.setOpacity(0);
        image05.setTag(307);
        this.addChild(image05,1);
        image05.runAction(cc.Sequence.create(cc.DelayTime.create(0.8),cc.Spawn.create(cc.FadeIn.create(0.2),cc.ScaleTo.create(0.2,0.85))));

        var image04=cc.Sprite.create(b1);
        image04.setPosition(cc.p(this.winSize.width*0.5,this.winSize.height*0.5));
        image04.setScale(4.0);
        image04.setOpacity(0);
        image04.setTag(306);
        this.addChild(image04,1);
        image04.runAction(cc.Sequence.create(cc.DelayTime.create(0.9),cc.Spawn.create(cc.FadeIn.create(0.2),cc.ScaleTo.create(0.2,1.0))));

        var image06=cc.Sprite.create(b1);
        image06.setPosition(cc.p(this.winSize.width*0.62,this.winSize.height*0.49));
        image06.setScale(3.0);
        image06.setOpacity(0);
        image06.setTag(308);
        this.addChild(image06,1);
        image06.runAction(cc.Sequence.create(cc.DelayTime.create(1.0),cc.Spawn.create(cc.FadeIn.create(0.2),cc.ScaleTo.create(0.2,0.85))));
    },

    page4Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();
        this.getChildByTag(92).initWithFile(f3);
        this.getChildByTag(90).setZOrder(10);
        this.getChildByTag(91).setZOrder(10);
        this.getChildByTag(93).setZOrder(10);

        var progress=cc.ProgressTimer.create(cc.Sprite.create(zi10));
        progress.setPosition(cc.p(winsize.width*0.5,winsize.height*0.25));
        progress.setType(cc.PROGRESS_TIMER_TYPE_BAR);
        progress.setMidpoint(cc.p(0,0.5));
        progress.setBarChangeRate(cc.p(1, 1));
        progress.setTag(400);
        this.addChild(progress,9);
        var proto = cc.ProgressTo.create(0.6, 100);
        progress.runAction(proto);

        var image01=cc.Sprite.create(e3);
        image01.setPosition(cc.p(winsize.width*0.5,winsize.height*0.52));
        image01.setTag(401);
        this.addChild(image01,5);

        var image02=cc.Sprite.create(j3);
        image02.setPosition(cc.p(winsize.width*0.2,winsize.height*0.65));
        image02.setTag(402);
        this.addChild(image02,1);
        image02.runAction(cc.Repeat.create(cc.Sequence.create(cc.MoveBy.create(0.5,cc.p(0,-25)),cc.MoveBy.create(0.5,cc.p(0,25))),9999999));

        var image03=cc.Sprite.create(j2);
        image03.setPosition(cc.p(winsize.width*0.5,winsize.height*0.66));
        image03.setTag(403);
        this.addChild(image03,1);
        image03.runAction(cc.Repeat.create(cc.Sequence.create(cc.DelayTime.create(0.1),cc.MoveBy.create(0.4,cc.p(0,-22)),cc.MoveBy.create(0.4,cc.p(0,22))),9999999));

        var image04=cc.Sprite.create(j1);
        image04.setPosition(cc.p(winsize.width*0.8,winsize.height*0.65));
        image04.setTag(404);
        this.addChild(image04,1);
        image04.runAction(cc.Repeat.create(cc.Sequence.create(cc.MoveBy.create(0.45,cc.p(0,-23)),cc.MoveBy.create(0.45,cc.p(0,23))),9999999));
    },

    page5Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();

        this.getChildByTag(92).initWithFile(c1);
        this.getChildByTag(90).setZOrder(0);
        this.getChildByTag(91).setZOrder(0);
        this.getChildByTag(93).setZOrder(0);

        var image01=cc.Sprite.create(c3);
        image01.setPosition(cc.p(winsize.width*0.5,winsize.height*0.53));
        image01.setScale(0.1);
        image01.setOpacity(0);
        image01.setTag(500);
        this.addChild(image01,3);
        image01.runAction(cc.Sequence.create(cc.Spawn.create(cc.FadeIn.create(0.2),cc.ScaleTo.create(0.2,0.7))));

        var progress=cc.ProgressTimer.create(cc.Sprite.create(zi3));
        progress.setPosition(cc.p(winsize.width*0.5,winsize.height*0.25));
        progress.setType(cc.PROGRESS_TIMER_TYPE_BAR);
        progress.setMidpoint(cc.p(0,0.5));
        progress.setBarChangeRate(cc.p(1, 1));
        progress.setTag(501);
        this.addChild(progress);
        var proto = cc.ProgressTo.create(0.6, 100);
        progress.runAction(proto);

        var image02=cc.Sprite.create(c2);
        image02.setPosition(cc.p(winsize.width*0.5,winsize.height));
        image02.setOpacity(0);
        image02.setTag(502);
        this.addChild(image02,2);
        image02.runAction(cc.Sequence.create(cc.Spawn.create(cc.FadeIn.create(0.5),cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(320,winsize.height*0.67)))),cc.DelayTime.create(0.1),cc.Repeat.create(cc.Sequence.create(cc.DelayTime.create(0.8),cc.RotateBy.create(0.1,10),cc.RotateBy.create(0.1,-10),cc.RotateBy.create(0.1,-10),cc.RotateBy.create(0.1,10)),9999999)));

        var image03=cc.Sprite.create(c4);
        image03.setAnchorPoint(cc.p(0.5,0));
        image03.setPosition(cc.p(winsize.width*0.46,winsize.height*0.56));
        image03.setScale(2.0);
        image03.setOpacity(0);
        image03.setTag(503);
        this.addChild(image03,1);
        image03.runAction(cc.Sequence.create(cc.DelayTime.create(0.5),cc.Spawn.create(cc.FadeIn.create(0.2),cc.ScaleTo.create(0.2,1.0)),cc.Repeat.create(cc.Sequence.create(cc.DelayTime.create(0.8),cc.RotateBy.create(0.1,5),cc.RotateBy.create(0.1,-5),cc.RotateBy.create(0.1,-5),cc.RotateBy.create(0.1,5)),9999999)));

        var image04=cc.Sprite.create(c4);
        image04.setAnchorPoint(cc.p(0.5,0));
        image04.setPosition(cc.p(winsize.width*0.48,winsize.height*0.57));
        image04.setScale(2.0);
        image04.setRotation(10);
        image04.setOpacity(0);
        image04.setTag(504);
        this.addChild(image04,1);
        image04.runAction(cc.Sequence.create(cc.DelayTime.create(0.6),cc.Spawn.create(cc.FadeIn.create(0.2),cc.ScaleTo.create(0.2,1.0)),cc.Repeat.create(cc.Sequence.create(cc.DelayTime.create(0.8),cc.RotateBy.create(0.1,6),cc.RotateBy.create(0.1,-6),cc.RotateBy.create(0.1,-6),cc.RotateBy.create(0.1,6)),9999999)));

        var image05=cc.Sprite.create(c5);
        image05.setPosition(cc.p(winsize.width*0.3,winsize.height*0.75));
        image05.setOpacity(0);
        image05.setTag(505);
        this.addChild(image05,3);
        image05.runAction(cc.Sequence.create(cc.DelayTime.create(1.1),cc.Repeat.create(cc.Sequence.create(cc.FadeIn.create(0.5),cc.FadeOut.create(0.4),cc.DelayTime.create(1.0)),99999999)));

        var image06=cc.Sprite.create(c5);
        image06.setPosition(cc.p(winsize.width*0.7,winsize.height*0.70));
        image06.setOpacity(0);
        image06.setTag(506);
        this.addChild(image06,3);
        image06.runAction(cc.Sequence.create(cc.DelayTime.create(1.0),cc.Repeat.create(cc.Sequence.create(cc.FadeIn.create(0.5),cc.FadeOut.create(0.4),cc.DelayTime.create(0.8)),99999999)));

        var image07=cc.Sprite.create(c5);
        image07.setPosition(cc.p(winsize.width*0.3,winsize.height*0.72));
        image07.setOpacity(0);
        image07.setScale(0.3);
        image07.setTag(507);
        this.addChild(image07,3);
        image07.runAction(cc.Sequence.create(cc.DelayTime.create(1.1),cc.Repeat.create(cc.Sequence.create(cc.FadeIn.create(0.2),cc.FadeOut.create(0.1),cc.DelayTime.create(1.0)),99999999)));

        var image08=cc.Sprite.create(c5);
        image08.setPosition(cc.p(winsize.width*0.7,winsize.height*0.73));
        image08.setOpacity(0);
        image08.setScale(0.3);
        image08.setTag(508);
        this.addChild(image08,3);
        image08.runAction(cc.Sequence.create(cc.DelayTime.create(1.0),cc.Repeat.create(cc.Sequence.create(cc.FadeIn.create(0.3),cc.FadeOut.create(0.2),cc.DelayTime.create(1.1)),99999999)));

    },

    page6Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();
        this.getChildByTag(92).initWithFile(d6);
        this.getChildByTag(90).setZOrder(0);
        this.getChildByTag(91).setZOrder(0);
        this.getChildByTag(93).setZOrder(0);

        var image01=cc.Sprite.create(d7);
        image01.setPosition(cc.p(winsize.width*0.5,winsize.height*0.65));
        image01.setTag(600);
        this.addChild(image01,1);

        var progress=cc.ProgressTimer.create(cc.Sprite.create(zi4));
        progress.setPosition(cc.p(winsize.width*0.5,winsize.height*0.25));
        progress.setType(cc.PROGRESS_TIMER_TYPE_BAR);
        progress.setMidpoint(cc.p(1,1));
        progress.setBarChangeRate(cc.p(1, 1));
        progress.setTag(601);
        this.addChild(progress);
        var proto = cc.ProgressTo.create(0.6, 100);
        progress.runAction(proto);

        var image02=cc.Sprite.create(d1);
        image02.setPosition(cc.p(winsize.width*0.5,winsize.height*0.49));
        image02.setScale(0.1);
        image02.setOpacity(0);
        image02.setTag(602);
        this.addChild(image02,2);
        image02.runAction(cc.Sequence.create(cc.DelayTime.create(0.2),cc.Spawn.create(cc.FadeIn.create(0.2),cc.ScaleTo.create(0.2,1.0)),cc.Repeat.create(cc.Sequence.create(cc.MoveBy.create(0.7,cc.p(0,20)),cc.MoveBy.create(0.7,cc.p(0,-20))),999999)));

        var image03=cc.Sprite.create(d3);
        image03.setPosition(cc.p(winsize.width*0.35,winsize.height*0.5));
        image03.setScale(0.1);
        image03.setOpacity(0);
        image03.setTag(603);
        this.addChild(image03,1);
        image03.runAction(cc.Sequence.create(cc.DelayTime.create(0.3),cc.Spawn.create(cc.FadeIn.create(0.2),cc.ScaleTo.create(0.2,1.0)),cc.Repeat.create(cc.Sequence.create(cc.MoveBy.create(0.5,cc.p(0,-10)),cc.MoveBy.create(0.5,cc.p(0,10))),999999)));

        var image04=cc.Sprite.create(d2);
        image04.setPosition(cc.p(winsize.width*0.65,winsize.height*0.5));
        image04.setScale(0.1);
        image04.setOpacity(0);
        image04.setTag(604);
        this.addChild(image04,1);
        image04.runAction(cc.Sequence.create(cc.DelayTime.create(0.4),cc.Spawn.create(cc.FadeIn.create(0.2),cc.ScaleTo.create(0.2,1.0)),cc.Repeat.create(cc.Sequence.create(cc.MoveBy.create(0.6,cc.p(0,15)),cc.MoveBy.create(0.6,cc.p(0,-15))),999999)));

        var image05=cc.Sprite.create(p0205);
        image05.setPosition(cc.p(winsize.width*0.7,winsize.height*0.75));
        image05.setScale(0.1);
        image05.setFlippedX(true);
        image05.setOpacity(0);
        image05.setTag(605);
        this.addChild(image05,1);
        image05.runAction(cc.Sequence.create(cc.DelayTime.create(0.8),cc.Spawn.create(cc.FadeIn.create(0.2),cc.ScaleTo.create(0.2,0.6)),cc.Repeat.create(cc.Sequence.create(cc.MoveBy.create(0.6,cc.p(0,15)),cc.MoveBy.create(0.6,cc.p(0,-15))),999999)));

        var image06=cc.Sprite.create(p0206);
        image06.setPosition(cc.p(winsize.width*0.24,winsize.height*0.7));
        image06.setScale(0.1);
        image06.setFlippedX(true);
        image06.setOpacity(0);
        image06.setTag(606);
        this.addChild(image06,1);
        image06.runAction(cc.Sequence.create(cc.DelayTime.create(0.7),cc.Spawn.create(cc.FadeIn.create(0.2),cc.ScaleTo.create(0.2,0.8)),cc.Repeat.create(cc.Sequence.create(cc.MoveBy.create(0.5,cc.p(0,10)),cc.MoveBy.create(0.5,cc.p(0,-10))),999999)));

    },

    page7Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();
        this.getChildByTag(92).initWithFile(e1);
        this.getChildByTag(90).setZOrder(10);
        this.getChildByTag(91).setZOrder(10);
        this.getChildByTag(93).setZOrder(10);

        var progress=cc.ProgressTimer.create(cc.Sprite.create(zi5));
        progress.setPosition(cc.p(winsize.width*0.5,winsize.height*0.25));
        progress.setType(cc.PROGRESS_TIMER_TYPE_BAR);
        progress.setMidpoint(cc.p(0,0.5));
        progress.setBarChangeRate(cc.p(1, 1));
        progress.setTag(700);
        this.addChild(progress,9);
        var proto = cc.ProgressTo.create(0.6, 100);
        progress.runAction(proto);

        var image02=cc.Sprite.create(e2);
        image02.setAnchorPoint(cc.p(0.5,0));
        image02.setPosition(cc.p(winsize.width*0.6,winsize.height*0.55));
        image02.setScale(0.1);
        image02.setOpacity(0);
        image02.setTag(702);
        this.addChild(image02,1);
        image02.runAction(cc.Sequence.create(cc.DelayTime.create(1.1),cc.Spawn.create(cc.FadeIn.create(0.2),cc.ScaleTo.create(0.2,1.0))));

        var image03=cc.Sprite.create(e2);
        image03.setAnchorPoint(cc.p(0.5,0));
        image03.setPosition(cc.p(winsize.width*0.68,winsize.height*0.55));
        image03.setScale(0.1);
        image03.setOpacity(0);
        image03.setTag(703);
        this.addChild(image03,1);
        image03.runAction(cc.Sequence.create(cc.DelayTime.create(1.3),cc.Spawn.create(cc.FadeIn.create(0.2),cc.ScaleTo.create(0.2,0.8))));

        var image04=cc.Sprite.create(e4);
        image04.setPosition(cc.p(-winsize.width*0.3,winsize.height*0.5));
        image04.setTag(704);
        this.addChild(image04,3);
        image04.runAction(cc.Sequence.create(cc.DelayTime.create(0.2),cc.EaseElasticOut.create(cc.MoveTo.create(0.3,cc.p(winsize.width*0.35,winsize.height*0.5))),cc.DelayTime.create(0.5),cc.CallFunc.create(this.page7CallBack,this)));

        var image01=cc.Sprite.create(e3);
        image01.setPosition(cc.p(winsize.width*0.5,winsize.height*0.52));
        image01.setTag(701);
        this.addChild(image01,5);
    },

    page7CallBack:function(sp)
    {
        sp.initWithFile(e6);
        var image01=cc.Sprite.create(e7);
        image01.setPosition(cc.p(this.winSize.width*0.27,this.winSize.height*0.5));
        image01.setTag(705);
        this.addChild(image01,4);

        var image03=cc.Sprite.create(e9);
        image03.setPosition(cc.p(this.winSize.width*0.34,this.winSize.height*0.6));
        image03.setTag(707);
        this.addChild(image03,3);
        image03.runAction(cc.Sequence.create(cc.Spawn.create(cc.MoveBy.create(1.2,cc.p(-120,120)),cc.RotateBy.create(1.2,360),cc.ScaleTo.create(1.2,0.3)),cc.CallFunc.create(this.removeSprite,this)));

        var image04=cc.Sprite.create(e9);
        image04.setPosition(cc.p(this.winSize.width*0.4,this.winSize.height*0.58));
        image04.setTag(708);
        this.addChild(image04,3);
        image04.runAction(cc.Sequence.create(cc.Spawn.create(cc.MoveBy.create(1.2,cc.p(120,120)),cc.RotateBy.create(1.2,-360),cc.ScaleTo.create(1.2,0.3)),cc.CallFunc.create(this.removeSprite,this)));

        var image05=cc.Sprite.create(e9);
        image05.setPosition(cc.p(this.winSize.width*0.4,this.winSize.height*0.50));
        image05.setTag(709);
        this.addChild(image05,3);
        image05.runAction(cc.Sequence.create(cc.Spawn.create(cc.MoveBy.create(1.2,cc.p(120,-120)),cc.RotateBy.create(1.2,360),cc.ScaleTo.create(1.2,0.3)),cc.CallFunc.create(this.removeSprite,this)));

        var image02=cc.Sprite.create(e5);
        image02.setPosition(cc.p(this.winSize.width*0.34,this.winSize.height*0.61));
        image02.setScale(0.92);
        image02.setTag(706);
        this.addChild(image02,3);
        image02.runAction(cc.Sequence.create(cc.DelayTime.create(0.8),cc.Repeat.create(cc.Sequence.create(cc.MoveBy.create(0.1,cc.p(0,-10)),cc.MoveBy.create(0.2,cc.p(0,10))),9999999)));
    },

    page8Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();
        this.getChildByTag(92).initWithFile(f3);
        this.getChildByTag(90).setZOrder(0);
        this.getChildByTag(91).setZOrder(0);
        this.getChildByTag(93).setZOrder(0);

        var progress=cc.ProgressTimer.create(cc.Sprite.create(zi6));
        progress.setPosition(cc.p(winsize.width*0.5,winsize.height*0.25));
        progress.setType(cc.PROGRESS_TIMER_TYPE_BAR);
        progress.setMidpoint(cc.p(1,0));
        progress.setBarChangeRate(cc.p(1, 1));
        progress.setTag(800);
        this.addChild(progress,9);
        var proto = cc.ProgressTo.create(0.6, 100);
        progress.runAction(proto);

        var image02=cc.Sprite.create(f1);
        image02.setPosition(cc.p(winsize.width*0.5,winsize.height*0.65));
        image02.setScale(2.0);
        image02.setOpacity(0);
        image02.setTag(801);
        this.addChild(image02,1);
        image02.runAction(cc.Sequence.create(cc.Spawn.create(cc.FadeIn.create(0.2),cc.ScaleTo.create(0.2,1.0)),cc.DelayTime.create(0.8),cc.Repeat.create(cc.RotateBy.create(25,360),999999)));

        var image03=cc.Sprite.create(f2);
        image03.setPosition(cc.p(350,330));
        image03.setScale(2.0);
        image03.setOpacity(0);
        image03.setTag(802);
        image02.addChild(image03,1);
        image03.runAction(cc.Sequence.create(cc.DelayTime.create(0.4),cc.Spawn.create(cc.FadeIn.create(0.2),cc.ScaleTo.create(0.2,1.0))));

        var image04=cc.Sprite.create(f2);
        image04.setPosition(cc.p(320,90));
        image04.setRotation(60);
        image04.setScale(2.0);
        image04.setOpacity(0);
        image04.setTag(803);
        image02.addChild(image04,1);
        image04.runAction(cc.Sequence.create(cc.DelayTime.create(0.6),cc.Spawn.create(cc.FadeIn.create(0.2),cc.ScaleTo.create(0.2,1.0))));

        var image05=cc.Sprite.create(f2);
        image05.setPosition(cc.p(50,170));
        image05.setRotation(-185);
        image05.setScale(2.0);
        image05.setOpacity(0);
        image05.setTag(804);
        image02.addChild(image05,1);
        image05.runAction(cc.Sequence.create(cc.DelayTime.create(0.8),cc.Spawn.create(cc.FadeIn.create(0.2),cc.ScaleTo.create(0.2,1.0))));
    },

    page9Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();
        this.getChildByTag(92).initWithFile(g1);

        var progress=cc.ProgressTimer.create(cc.Sprite.create(zi7));
        progress.setPosition(cc.p(winsize.width*0.5,winsize.height*0.25));
        progress.setType(cc.PROGRESS_TIMER_TYPE_BAR);
        progress.setMidpoint(cc.p(0.5,0.5));
        progress.setBarChangeRate(cc.p(1, 1));
        progress.setTag(900);
        this.addChild(progress,9);
        var proto = cc.ProgressTo.create(0.6, 100);
        progress.runAction(proto);

        var image01=cc.Sprite.create(g2);
        image01.setPosition(cc.p(winsize.width*0.52,winsize.height*0.605));
        image01.setScale(0.1);
        image01.setOpacity(0);
        image01.setTag(901);
        this.addChild(image01,1);
        image01.runAction(cc.Sequence.create(cc.Spawn.create(cc.FadeIn.create(0.3),cc.ScaleTo.create(0.3,1.0))));

        var image02=cc.Sprite.create(g4);
        image02.setPosition(cc.p(winsize.width*0.5,winsize.height*0.5));
        image02.setScale(0.1);
        image02.setOpacity(0);
        image02.setTag(902);
        this.addChild(image02,1);
        image02.runAction(cc.Sequence.create(cc.DelayTime.create(0.4),cc.Spawn.create(cc.FadeIn.create(0.5),cc.ScaleTo.create(0.5,1.0),cc.MoveBy.create(0.5,cc.p(-150,220))),cc.Repeat.create(cc.Sequence.create(cc.MoveBy.create(0.7,cc.p(0,10)),cc.MoveBy.create(0.7,cc.p(0,-10))),999999)));

        var image03=cc.Sprite.create(g4);
        image03.setPosition(cc.p(winsize.width*0.5,winsize.height*0.5));
        image03.setScale(0.1);
        image03.setOpacity(0);
        image03.setTag(903);
        this.addChild(image03,1);
        image03.runAction(cc.Sequence.create(cc.DelayTime.create(0.5),cc.Spawn.create(cc.FadeIn.create(0.5),cc.ScaleTo.create(0.5,1.0),cc.MoveBy.create(0.5,cc.p(160,120))),cc.Repeat.create(cc.Sequence.create(cc.MoveBy.create(0.7,cc.p(0,10)),cc.MoveBy.create(0.7,cc.p(0,-10))),999999)));

        var image04=cc.Sprite.create(g3);
        image04.setPosition(cc.p(winsize.width*0.5,winsize.height*0.5));
        image04.setScale(0.1);
        image04.setOpacity(0);
        image04.setTag(904);
        this.addChild(image04,1);
        image04.runAction(cc.Sequence.create(cc.DelayTime.create(0.6),cc.Spawn.create(cc.FadeIn.create(0.5),cc.ScaleTo.create(0.5,1.0),cc.MoveBy.create(0.5,cc.p(-120,280))),cc.Repeat.create(cc.Sequence.create(cc.MoveBy.create(0.7,cc.p(0,10)),cc.MoveBy.create(0.7,cc.p(0,-10))),999999)));

        var image05=cc.Sprite.create(g5);
        image05.setPosition(cc.p(winsize.width*0.5,winsize.height*0.43));
        image05.setScale(3.0);
        image05.setOpacity(0);
        image05.setTag(905);
        this.addChild(image05,1);
        image05.runAction(cc.Sequence.create(cc.DelayTime.create(0.7),cc.Spawn.create(cc.FadeIn.create(0.2),cc.ScaleTo.create(0.2,1.0))));

        var image06=cc.Sprite.create(g5);
        image06.setPosition(cc.p(winsize.width*0.4,winsize.height*0.44));
        image06.setScale(3.0);
        image06.setOpacity(0);
        image06.setTag(906);
        this.addChild(image06,1);
        image06.runAction(cc.Sequence.create(cc.DelayTime.create(0.8),cc.Spawn.create(cc.FadeIn.create(0.2),cc.ScaleTo.create(0.2,1.0))));

        var image07=cc.Sprite.create(g5);
        image07.setPosition(cc.p(winsize.width*0.6,winsize.height*0.44));
        image07.setScale(3.0);
        image07.setOpacity(0);
        image07.setTag(907);
        this.addChild(image07,1);
        image07.runAction(cc.Sequence.create(cc.DelayTime.create(0.9),cc.Spawn.create(cc.FadeIn.create(0.2),cc.ScaleTo.create(0.2,1.0))));

    },

    page10Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();
        this.getChildByTag(92).initWithFile(h1);

        var progress=cc.ProgressTimer.create(cc.Sprite.create(zi8));
        progress.setPosition(cc.p(winsize.width*0.5,winsize.height*0.25));
        progress.setType(cc.PROGRESS_TIMER_TYPE_BAR);
        progress.setMidpoint(cc.p(0.5,0));
        progress.setBarChangeRate(cc.p(1, 1));
        progress.setTag(1000);
        this.addChild(progress,9);
        var proto = cc.ProgressTo.create(0.6, 100);
        progress.runAction(proto);

        var image01=cc.Sprite.create(h5);
        image01.setPosition(cc.p(winsize.width*0.4,winsize.height*0.52));
        image01.setTag(1001);
        this.addChild(image01,1);

        var image02=cc.Sprite.create(h3);
        image02.setPosition(cc.p(winsize.width*0.52,winsize.height*0.608));
        image02.setScale(0.1);
        image02.setOpacity(0);
        image02.setTag(1002);
        this.addChild(image02,1);
        image02.runAction(cc.Sequence.create(cc.DelayTime.create(0.3),cc.Spawn.create(cc.FadeIn.create(0.1),cc.ScaleTo.create(0.1,1.0)),cc.DelayTime.create(0.7),cc.CallFunc.create(this.page10CallBack,this)));

        var image03=cc.Sprite.create(h2);
        image03.setAnchorPoint(cc.p(1,0));
        image03.setPosition(cc.p(winsize.width*0.67,winsize.height*0.65));
        image03.setRotation(30);
        image03.setOpacity(0);
        image03.setTag(1003);
        this.addChild(image03,1);
        image03.runAction(cc.Sequence.create(cc.DelayTime.create(0.5),cc.FadeIn.create(0.2),cc.RotateBy.create(0.2,-30)));

        var image04=cc.Sprite.create(b1);
        image04.setPosition(cc.p(winsize.width*0.52,winsize.height*0.62));
        image04.setScale(0.1);
        image04.setVisible(false);
        image04.setTag(1004);
       this.addChild(image04,1);
       image04.runAction(cc.Sequence.create(cc.DelayTime.create(0.9),cc.Spawn.create(cc.Show.create(),cc.ScaleTo.create(0.5,0.5),cc.MoveBy.create(0.5,cc.p(-60,60)),cc.RotateBy.create(0.5,360)),cc.CallFunc.create(this.removeSprite,this)));

        var image05=cc.Sprite.create(b1);
        image05.setPosition(cc.p(winsize.width*0.52,winsize.height*0.62));
        image05.setScale(0.1);
        image05.setVisible(false);
        image05.setTag(1005);
       this.addChild(image05,1);
        image05.runAction(cc.Sequence.create(cc.DelayTime.create(0.9),cc.Spawn.create(cc.Show.create(),cc.ScaleTo.create(0.5,0.5),cc.MoveBy.create(0.5,cc.p(60,60)),cc.RotateBy.create(0.5,360)),cc.CallFunc.create(this.removeSprite,this)));

        var image06=cc.Sprite.create(b1);
        image06.setPosition(cc.p(winsize.width*0.52,winsize.height*0.62));
        image06.setScale(0.1);
        image06.setVisible(false);
        image06.setTag(1006);
       this.addChild(image06,1);
        image06.runAction(cc.Sequence.create(cc.DelayTime.create(0.9),cc.Spawn.create(cc.Show.create(),cc.ScaleTo.create(0.5,0.5),cc.MoveBy.create(0.5,cc.p(0,-60)),cc.RotateBy.create(0.5,360)),cc.CallFunc.create(this.removeSprite,this)));
    },

    page10CallBack:function(sp)
    {
          sp.initWithFile(h4);
    },

    page11Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();
        this.getChildByTag(92).initWithFile(i1);

        var progress=cc.ProgressTimer.create(cc.Sprite.create(zi9));
        progress.setPosition(cc.p(winsize.width*0.5,winsize.height*0.25));
        progress.setType(cc.PROGRESS_TIMER_TYPE_BAR);
        progress.setMidpoint(cc.p(0,0.5));
        progress.setBarChangeRate(cc.p(1, 1));
        progress.setTag(1100);
        this.addChild(progress,9);
        var proto = cc.ProgressTo.create(0.6, 100);
        progress.runAction(proto);

        var image01=cc.Sprite.create(i3);
        image01.setPosition(cc.p(winsize.width*0.5,winsize.height*0.6));
        image01.setTag(1101);
        this.addChild(image01,1);

        var image02=cc.Sprite.create(i4);
        image02.setPosition(cc.p(winsize.width*0.34,winsize.height*0.71));
        image02.setScale(0.1);
        image02.setOpacity(0);
        image02.setTag(1102);
        this.addChild(image02,1);
        image02.runAction(cc.Repeat.create(cc.Sequence.create(cc.DelayTime.create(0.5),cc.Spawn.create(cc.FadeIn.create(0.8),cc.ScaleTo.create(0.8,1.3),cc.MoveBy.create(0.8,cc.p(-40,40))),cc.Spawn.create(cc.FadeOut.create(0.05),cc.ScaleTo.create(0.05,0.1)),cc.Place.create(cc.p(winsize.width*0.34,winsize.height*0.71))),999999));

        var image03=cc.Sprite.create(i2);
        image03.setAnchorPoint(cc.p(1,0));
        image03.setPosition(cc.p(winsize.width*0.83,winsize.height*0.62));
        image03.setScale(0.1);
        image03.setOpacity(0);
        image03.setTag(1103);
        this.addChild(image03,1);
        image03.runAction(cc.Sequence.create(cc.DelayTime.create(0.4),cc.Spawn.create(cc.FadeIn.create(0.6),cc.ScaleTo.create(0.6,1.0)),cc.Repeat.create(cc.Sequence.create(cc.ScaleTo.create(0.6,0.7),cc.ScaleTo.create(0.6,1.0)),9999999)));
    },

    page12Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();
        this.getChildByTag(92).initWithFile(k1);

        var image02=cc.Sprite.create(k2);
        image02.setPosition(cc.p(winsize.width*0.32,winsize.height*0.7));
        image02.setTag(1202);
        this.addChild(image02,1);

        var image03=cc.Sprite.create(k8);
        image03.setAnchorPoint(cc.p(0.5,1.0));
        image03.setPosition(cc.p(winsize.width*0.72,winsize.height*0.88));
        image03.setTag(1203);
        this.addChild(image03,1);
        image03.runAction(cc.Repeat.create(cc.Sequence.create(cc.RotateBy.create(1.0,12),cc.RotateBy.create(1.0,-12)),9999999));

        var image04=cc.Sprite.create(k7);
        image04.setAnchorPoint(cc.p(0.5,1.0));
        image04.setPosition(cc.p(winsize.width*0.5,winsize.height*0.88));
        image04.setTag(1206);
        this.addChild(image04,1);
        image04.runAction(cc.Repeat.create(cc.Sequence.create(cc.Spawn.create(cc.MoveBy.create(2.0,cc.p(-20,-350)),cc.RotateBy.create(2.0,360)),cc.Place.create(cc.p(winsize.width*0.5,winsize.height*0.88))),9999999));

        var image09=cc.Sprite.create(c5);
        image09.setPosition(cc.p(winsize.width*0.25,winsize.height*0.88));
        image09.setTag(1209);
        image09.setScale(0.1);
        image09.setOpacity(0);
        this.addChild(image09,1);
        image09.runAction(cc.Sequence.create(cc.DelayTime.create(0.3),cc.Repeat.create(cc.Sequence.create(cc.Spawn.create(cc.ScaleTo.create(0.6,1.0),cc.RotateBy.create(0.6,180),cc.FadeIn.create(0.6)),cc.Spawn.create(cc.ScaleTo.create(0.6,0.1),cc.RotateBy.create(0.6,180),cc.FadeOut.create(0.6)),cc.DelayTime.create(0.8)),9999999)));

        var image10=cc.Sprite.create(c5);
        image10.setPosition(cc.p(winsize.width*0.39,winsize.height*0.525));
        image10.setTag(1204);
        image10.setScale(0.1);
        image10.setOpacity(0);
        this.addChild(image10,1);
        image10.runAction(cc.Sequence.create(cc.DelayTime.create(0.7),cc.Repeat.create(cc.Sequence.create(cc.Spawn.create(cc.ScaleTo.create(0.6,1.0),cc.RotateBy.create(0.6,180),cc.FadeIn.create(0.6)),cc.Spawn.create(cc.ScaleTo.create(0.6,0.1),cc.RotateBy.create(0.6,180),cc.FadeOut.create(0.6)),cc.DelayTime.create(0.8)),9999999)));

        var image05=cc.Sprite.create(k6);
        image05.setAnchorPoint(cc.p(0.5,1.0));
        image05.setPosition(cc.p(winsize.width*0.17,winsize.height*0.88));
        image05.setTag(1207);
        this.addChild(image05,1);
        image05.runAction(cc.Repeat.create(cc.Sequence.create(cc.Spawn.create(cc.MoveBy.create(3.0,cc.p(-20,-300)),cc.RotateBy.create(3.0,360)),cc.Place.create(cc.p(winsize.width*0.17,winsize.height*0.88))),9999999));

        var image06=cc.Sprite.create(k9);
        image06.setAnchorPoint(cc.p(0.5,1.0));
        image06.setPosition(cc.p(winsize.width*0.8,winsize.height*0.88));
        image06.setTag(1208);
        this.addChild(image06,1);
        image06.runAction(cc.Repeat.create(cc.Sequence.create(cc.Spawn.create(cc.MoveBy.create(2.8,cc.p(-20,-330)),cc.RotateBy.create(2.8,360)),cc.Place.create(cc.p(winsize.width*0.8,winsize.height*0.88))),9999999));

        var xiangImage=cc.MenuItemImage.create(k3,k3,this.enterBBS,this);
        var xiangMenu=cc.Menu.create(xiangImage);
        xiangMenu.setPosition(cc.p(winsize.width*0.5,winsize.height*0.45));
        xiangMenu.setTag(1200);
        this.addChild(xiangMenu,1);

        var shareImage=cc.MenuItemImage.create(k4,k4,this.share2Friend,this);
        var shareMenu=cc.Menu.create(shareImage);
        shareMenu.setPosition(cc.p(winsize.width*0.5,winsize.height*0.15));
        shareMenu.setTag(1201);
        this.addChild(shareMenu,1);
    },

    removePage:function(_pageIndex)
    {
        //根据Tag移除pageN所有图片
        var img=null;
        for(var i=_pageIndex*100;i<=_pageIndex*100+this.imgPerPage;i++)
        {
            img=this.getChildByTag(i);
            if(img!=null)
            {
                cc.log("remove:"+img.getTag());
                img.stopAllActions();
                this.removeChildByTag(i,true);
            }
            else
            {
                //break;
            }
        }
        this.removeChild(img,true);
    },

    pageFinished:function()
    {
        //每张page播放完后，设置isPlaying为false
        this.isPlaying=false;
    },

    removeSprite:function(sp)
    {
        sp.stopAllActions();
        this.removeChild(sp,true);
    },

    switchToNextPage:function(_pageIndex)
    {
        //切换下一个page
        switch(_pageIndex)
        {
            case 2:this.removePage(1);this.page2Action();break;
            case 3:this.unschedule(this.page2SCHD2);this.removePage(2);this.page3Action();break;
            case 4:this.removePage(3);this.page4Action();break;
            case 5:this.removePage(4);this.page5Action();break;
            case 6:this.removePage(5);this.page6Action();break;
            case 7:this.removePage(6);this.page7Action();break;
            case 8:this.removePage(7);this.page8Action();break;
            case 9:this.removePage(8);this.page9Action();break;
            case 10:this.removePage(9);this.page10Action();break;
            case 11:this.removePage(10);this.page11Action();break;
            case 12:this.removePage(11);this.page12Action();break;
            default:break;
        }
        if(this.pageIndex<13)
        {
            this.pageIndex+=1;
        }
        else
        {
            this.isBottom=true;
        }
        if(this.pageIndex==13)
        {
            this.getChildByTag(89).setVisible(false);
        }
        cc.log("index:"+this.pageIndex);
    },

    switchToPrePage:function(_pageIndex)
    {
        //切换上一个page
        switch(_pageIndex)
        {
            case 3:this.unschedule(this.page2SCHD2);this.removePage(2);this.page1Action();break;
            case 4:this.removePage(3);this.page2Action();break;
            case 5:this.removePage(4);this.page3Action();break;
            case 6:this.removePage(5);this.page4Action();break;
            case 7:this.removePage(6);this.page5Action();break;
            case 8:this.removePage(7);this.page6Action();break;
            case 9:this.removePage(8);this.page7Action();break;
            case 10:this.removePage(9);this.page8Action();break;
            case 11:this.removePage(10);this.page9Action();break;
            case 12:this.removePage(11);this.page10Action();break;
            case 13:this.removePage(12);this.page11Action();break;
            default:break;
        }
        if(this.pageIndex>2)
        {
            this.pageIndex-=1;
        }
        else
        {
            this.isTop=true;
        }
        cc.log("index:"+this.pageIndex);
    },

    enterBBS:function()
    {
        var newURL="http://a.app.qq.com/o/simple.jsp?pkgname=com.mymoney&g_f=992857#rd";
        window.location.href=newURL;
    },

    share2Friend:function()
    {
        if(this.isShared==false)
        {
            document.body.style.backgroundColor="#4D3D11";
            var shield1=cc.Sprite.create(s_img2);
            shield1.setPosition(cc.p(this.winSize.width*0.5,this.winSize.height*0.5));
            shield1.setTag(1300);
            this.addChild(shield1,5);
            var shield2=cc.Sprite.create(s_img1);
            shield2.setPosition(cc.p(this.winSize.width*0.8,this.winSize.height*0.9));
            shield2.setTag(1301);
            this.addChild(shield2,5);
            var label=cc.LabelTTF.create("点击这里分享","黑体",35);
            label.setAnchorPoint(cc.p(0.5,0.5));
            label.setPosition(cc.p(this.winSize.width*0.5,this.winSize.height*0.78));
            label.setColor(cc.c3(255,255,255));
            label.setTag(1302);
            this.addChild(label,5);
            if(this.getChildByTag(1200))this.getChildByTag(1200).setEnabled(false);
            if(this.getChildByTag(1201))this.getChildByTag(1201).setEnabled(false);
            this.getChildByTag(88).setEnabled(false);
            this.isShared=true;
        }
    },

    reStart:function()
    {
        //从头开始播放
        var scene=beginLayer.create();
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,scene));
    },

    onTouchesEnded:function(touches, event)
    {
        if(!this.isTouched)
        {
            cc.log("unTouched");
            return;
        }
        var touch = touches[0];
        this.endTouch = touch.getLocation().y;
        //往后翻
        if(Math.abs(this.endTouch-this.startTouch)>=this.winSize.height*0.05&&(this.endTouch-this.startTouch)>0)
        {
            if(this.isBottom)
            {
                //this.getChildByTag(89).setVisible(false);
            }
            else
            {
                if(this.isShared==false)
                {
                    cc.log("Next Page");
                    this.switchToNextPage(this.pageIndex);
                    this.isTop=false;
                }
                //this.getChildByTag(89).setVisible(true);
            }
        }
        //往前翻
        if(Math.abs(this.endTouch-this.startTouch)>=this.winSize.height*0.05&&(this.endTouch-this.startTouch)<0)
        {
            if(this.isTop)
            {

            }
            else
            {
                if(this.isShared==false)
                {
                    cc.log("Pre Page");
                    this.switchToPrePage(this.pageIndex);
                    this.getChildByTag(89).setVisible(true);
                    this.isBottom=false;
                }
            }
        }
    },

    onTouchesBegan:function(touches, event)
    {
        var touch = touches[0];
        var location = touch.getLocation();
        if(location.y>=0&&location.y<=this.winSize.height)
        {
            this.startTouch=location.y;
            this.isTouched=true;
        }
        else
        {
            this.isTouched=false;
        }

        if(this.isShared==true&&this.pageIndex==13)
        {
            if(this.getChildByTag(1200))this.getChildByTag(1200).setEnabled(true);
            if(this.getChildByTag(1201))this.getChildByTag(1201).setEnabled(true);
            this.getChildByTag(88).setEnabled(true);
            this.removeChildByTag(1300,true);
            this.removeChildByTag(1301,true);
            this.removeChildByTag(1302,true);
            this.isShared=false;
            document.body.style.backgroundColor="#FFCA39";
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
}

var MyScene = cc.Scene.extend({

    onEnter:function ()
    {
        this._super();
        var layer = new beginLayer();
        this.addChild(layer);
        layer.init();
    }
});
