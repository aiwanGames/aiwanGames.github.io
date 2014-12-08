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

    init:function ()
    {
        this._super();
        this.winSize = cc.Director.getInstance().getWinSize();
        this.setColor(cc.c4(255,204,0,255));
        //开启触摸
        this.setTouchEnabled(true);
        //播放音乐
        //cc.SimpleAudioEngine.getInstance().preloadMusic(music);
        cc.AudioEngine.getInstance().playMusic("res/audio/music.mp3",true);
        //播放第一张page
        this.page1Action();
        //设置分享内容
        document.title = window.wxData.desc = "一部令数千万年轻人潸然泪下的动画短片，献给在我们身后默默付出的父母。";
        document.title = window.wxFriend.desc = "一部令数千万年轻人潸然泪下的动画短片，献给在我们身后默默付出的父母。";
        return true;
    },

    page1Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();
        var image01=cc.Sprite.create(page01_1);
        image01.setPosition(cc.p(winsize.width*0.5,-winsize.height*0.2));
        image01.setTag(100);
        this.addChild(image01,1);

        var image02=cc.Sprite.create(page01_2);
        image02.setPosition(cc.p(winsize.width*0.25,winsize.height*0.42));
        image02.setTag(101);
        image02.setOpacity(0);
        this.addChild(image02,1);

        var image03=cc.Sprite.create(page01_3);
        image03.setPosition(cc.p(winsize.width*0.8,winsize.height*0.42));
        image03.setTag(102);
        image03.setOpacity(0);
        this.addChild(image03,1);

        var image04=cc.Sprite.create(page01_4);
        image04.setPosition(cc.p(winsize.width*0.5,winsize.height*0.065));
        image04.setScale(0.4);
        //image04.setTag(103);
        this.addChild(image04,1);
        //执行动作
        var ac0=cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(winsize.width*0.5,winsize.height*0.5)));
        image01.runAction(cc.Sequence.create(ac0));
        var ac1=cc.Sequence.create(cc.DelayTime.create(0.5),cc.FadeIn.create(0.3),cc.Repeat.create(cc.Sequence.create(cc.MoveBy.create(0.7,cc.p(0,10)),cc.MoveBy.create(0.7,cc.p(0,-10))),888));
        image02.runAction(ac1);
        var ac2=cc.Sequence.create(cc.DelayTime.create(0.6),cc.FadeIn.create(0.6),cc.Repeat.create(cc.Sequence.create(cc.MoveBy.create(0.7,cc.p(0,10)),cc.MoveBy.create(0.7,cc.p(0,-10))),888));
        image03.runAction(ac2);
        var ac3=cc.Repeat.create(cc.Sequence.create(cc.MoveBy.create(0.7,cc.p(0,10)),cc.MoveBy.create(0.7,cc.p(0,-10))),999);
        image04.runAction(ac3);
        //提示用户翻页
        var Label1=cc.LabelTTF.create("向上滑动翻页","黑体",23);
        Label1.setColor(cc.c3(0,0,0));
        Label1.setPosition(cc.p(winsize.width*0.5,Label1.getContentSize().height));
        //Label1.setTag(104);
        this.addChild(Label1,1);
    },

    page2Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();
        var image01=cc.Sprite.create(page02_1);
        image01.setPosition(cc.p(winsize.width*0.5,-winsize.height*0.2));
        image01.setTag(200);
        this.addChild(image01,1);

        var image02=cc.Sprite.create(page02_2);
        image02.setPosition(cc.p(-image02.getContentSize().width*0.5,winsize.height*0.6));
        image02.setTag(201);
        this.addChild(image02,1);

        var image03=cc.Sprite.create(page02_3);
        image03.setPosition(cc.p(winsize.width+image03.getContentSize().width*0.5,winsize.height*0.6));
        image03.setTag(202);
        this.addChild(image03,1);
        //执行动作
        var ac0=cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(winsize.width*0.5,winsize.height*0.5)));
        image01.runAction(cc.Sequence.create(ac0));
        var ac1=cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(winsize.width*0.3,winsize.height*0.6)));
        image02.runAction(cc.Sequence.create(cc.DelayTime.create(0.4),ac1));
        var ac2=cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(winsize.width*0.7,winsize.height*0.6)));
        image03.runAction(cc.Sequence.create(cc.DelayTime.create(0.6),ac2));
        },

    page3Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();
        var image01=cc.Sprite.create(page03_1);
        image01.setPosition(cc.p(winsize.width*0.5,-winsize.height*0.2));
        image01.setTag(300);
        this.addChild(image01,1);

        var image02=cc.Sprite.create(page03_2);
        image02.setPosition(cc.p(winsize.width*0.3,winsize.height*0.52));
        image02.setTag(301);
        image02.setScale(0.5);
        image02.setOpacity(0);
        this.addChild(image02,1);

        var image03=cc.Sprite.create(page03_3);
        image03.setPosition(cc.p(-image03.getContentSize().width*0.5,winsize.height*0.65));
        image03.setTag(302);
        this.addChild(image03,1);
        //执行动作
        var ac0=cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(winsize.width*0.5,winsize.height*0.5)));
        image01.runAction(cc.Sequence.create(ac0));
        var ac1=cc.Sequence.create(cc.DelayTime.create(0.6),cc.Spawn.create(cc.FadeIn.create(0.8),cc.RotateBy.create(0.8,360),cc.ScaleTo.create(0.8,1.2)));
        image02.runAction(ac1);
        var ac2=cc.Sequence.create(cc.DelayTime.create(0.3),cc.JumpTo.create(0.8,cc.p(winsize.width*0.5,winsize.height*0.65),80,3));
        image03.runAction(ac2);
    },

    page4Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();
        var image01=cc.Sprite.create(page04_1);
        image01.setPosition(cc.p(winsize.width*0.5,-winsize.height*0.2));
        image01.setTag(400);
        this.addChild(image01,1);

        var image02=cc.Sprite.create(page04_2);
        image02.setPosition(cc.p(-image02.getContentSize().width*0.5,winsize.height*0.6));
        image02.setTag(401);
        this.addChild(image02,1);

        var image03=cc.Sprite.create(page04_3);
        image03.setPosition(cc.p(winsize.width+image03.getContentSize().width*0.5,winsize.height*0.6));
        image03.setTag(402);
        this.addChild(image03,1);
        //执行动作
        var ac0=cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(winsize.width*0.5,winsize.height*0.5)));
        image01.runAction(cc.Sequence.create(ac0));
        var ac1=cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(winsize.width*0.3,winsize.height*0.6)));
        image02.runAction(cc.Sequence.create(cc.DelayTime.create(0.4),ac1));
        var ac2=cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(winsize.width*0.7,winsize.height*0.6)));
        image03.runAction(cc.Sequence.create(cc.DelayTime.create(0.6),ac2));
    },

    page5Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();
        var image01=cc.Sprite.create(page05_1);
        image01.setPosition(cc.p(winsize.width*0.5,-winsize.height*0.2));
        image01.setTag(500);
        this.addChild(image01,1);

        var image02=cc.Sprite.create(page05_2);
        image02.setAnchorPoint(cc.p(0.5,0.5));
        image02.setPosition(cc.p(winsize.width*0.3,winsize.height*0.6));
        image02.setTag(501);
        image02.setScale(0.5);
        image02.setOpacity(0);
        this.addChild(image02,1);

        var image03=cc.Sprite.create(page05_3);
        image03.setPosition(cc.p(winsize.width*0.7,winsize.height*0.6));
        image03.setTag(502);
        image03.setScale(0.5);
        image03.setOpacity(0);
        this.addChild(image03,1);
        //执行动作
        var ac0=cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(winsize.width*0.5,winsize.height*0.5)));
        image01.runAction(cc.Sequence.create(ac0));
        var ac1=cc.Sequence.create(cc.DelayTime.create(0.2),cc.Spawn.create(cc.FadeIn.create(0.8),cc.EaseElasticOut.create(cc.ScaleTo.create(0.8,1.0))));
        image02.runAction(ac1);
        var ac2=cc.Sequence.create(cc.DelayTime.create(0.4),cc.Spawn.create(cc.FadeIn.create(0.8),cc.EaseElasticOut.create(cc.ScaleTo.create(0.8,1.0))));
        image03.runAction(ac2);
    },

    page6Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();
        var image01=cc.Sprite.create(page06_1);
        image01.setPosition(cc.p(winsize.width*0.5,-winsize.height*0.2));
        image01.setTag(600);
        this.addChild(image01,1);

        var image02=cc.Sprite.create(page06_2);
        image02.setPosition(cc.p(winsize.width*0.5,winsize.height*0.6));
        image02.setTag(601);
        image02.setScale(0.1);
        image02.setOpacity(0);
        this.addChild(image02,1);

        //执行动作
        var ac0=cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(winsize.width*0.5,winsize.height*0.5)));
        image01.runAction(cc.Sequence.create(ac0));
        var ac1=cc.Sequence.create(cc.DelayTime.create(0.2),cc.Spawn.create(cc.FadeIn.create(0.7),cc.EaseElasticOut.create(cc.ScaleTo.create(0.7,1.0))));
        image02.runAction(ac1);
    },

    page7Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();
        var image01=cc.Sprite.create(page07_1);
        image01.setPosition(cc.p(winsize.width*0.5,-winsize.height*0.2));
        image01.setTag(700);
        this.addChild(image01,1);

        var image02=cc.Sprite.create(page07_2);
        image02.setAnchorPoint(cc.p(0.5,0.5));
        image02.setPosition(cc.p(winsize.width*0.38,winsize.height*0.55));
        image02.setTag(701);
        image02.setOpacity(0);
        this.addChild(image02,1);

        var image03=cc.Sprite.create(page07_3);
        image03.setPosition(cc.p(winsize.width*0.6,winsize.height*0.52));
        image03.setTag(702);
        image03.setOpacity(0);
        this.addChild(image03,1);
        //执行动作
        var ac0=cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(winsize.width*0.5,winsize.height*0.5)));
        image01.runAction(cc.Sequence.create(ac0));
        var ac1=cc.Sequence.create(cc.DelayTime.create(0.2),cc.FadeIn.create(0.8));
        image02.runAction(ac1);
        var ac2=cc.Sequence.create(cc.DelayTime.create(0.4),cc.FadeIn.create(0.8));
        image03.runAction(ac2);
    },

    page8Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();
        var image01=cc.Sprite.create(page08_1);
        image01.setPosition(cc.p(winsize.width*0.5,-winsize.height*0.2));
        image01.setTag(800);
        this.addChild(image01,1);

        var image02=cc.Sprite.create(page08_2);
        image02.setAnchorPoint(cc.p(0.5,0.5));
        image02.setPosition(cc.p(winsize.width*0.5,winsize.height*0.6));
        image02.setTag(801);
        image02.setOpacity(0);
        this.addChild(image02,1);

        var image03=cc.Sprite.create(page08_3);
        image03.setPosition(cc.p(winsize.width*0.34,winsize.height*0.65));
        image03.setTag(802);
        image03.setScale(0.1);
        image03.setOpacity(0);
        this.addChild(image03,1);

        var image04=cc.Sprite.create(page08_4);
        image04.setPosition(cc.p(winsize.width*0.57,winsize.height*0.65));
        image04.setTag(803);
        image04.setOpacity(0);
        this.addChild(image04,1);
        //执行动作
        var ac0=cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(winsize.width*0.5,winsize.height*0.5)));
        image01.runAction(cc.Sequence.create(ac0));
        var ac1=cc.Sequence.create(cc.DelayTime.create(0.2),cc.FadeIn.create(0.8));
        image02.runAction(ac1);
        var ac2=cc.Sequence.create(cc.DelayTime.create(0.2),cc.Spawn.create(cc.FadeIn.create(0.3),cc.ScaleTo.create(0.3,1.0)));
        image03.runAction(ac2);
        var ac3=cc.Sequence.create(cc.DelayTime.create(0.7),cc.FadeIn.create(0.3));
        image04.runAction(ac3);
    },

    page9Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();
        var image01=cc.Sprite.create(page09_1);
        image01.setPosition(cc.p(winsize.width*0.5,-winsize.height*0.2));
        image01.setTag(900);
        this.addChild(image01,1);

        var image02=cc.Sprite.create(page09_2);
        image02.setAnchorPoint(cc.p(0.5,0.5));
        image02.setPosition(cc.p(-image02.getContentSize().width*0.5,winsize.height*0.6));
        image02.setTag(901);
        this.addChild(image02,1);

        var image03=cc.Sprite.create(page09_3);
        image03.setPosition(cc.p(winsize.width*0.6,winsize.height*1.2));
        image03.setTag(902);
        this.addChild(image03,1);

        var image04=cc.Sprite.create(page09_4);
        image04.setPosition(cc.p(winsize.width*0.7,winsize.height*0.7));
        image04.setTag(903);
        image04.setOpacity(0);
        this.addChild(image04,1);
        //执行动作
        var ac0=cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(winsize.width*0.5,winsize.height*0.5)));
        image01.runAction(cc.Sequence.create(ac0));
        var ac1=cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(winsize.width*0.3,winsize.height*0.5)));
        image02.runAction(cc.Sequence.create(cc.DelayTime.create(0.2),ac1));
        var ac2=cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(winsize.width*0.6,winsize.height*0.6)));
        image03.runAction(cc.Sequence.create(cc.DelayTime.create(0.5),ac2));
        var ac3=cc.Sequence.create(cc.DelayTime.create(1.0),cc.FadeIn.create(0.5));
        image04.runAction(ac3);
    },

    page10Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();
        var image01=cc.Sprite.create(page10_1);
        image01.setPosition(cc.p(winsize.width*0.5,-winsize.height*0.2));
        image01.setTag(1000);
        this.addChild(image01,1);

        var image02=cc.Sprite.create(page10_2);
        image02.setAnchorPoint(cc.p(0.5,0.5));
        image02.setPosition(cc.p(winsize.width*0.5,winsize.height*0.6));
        image02.setTag(1001);
        image02.setOpacity(0);
        image02.setScale(0.1);
        this.addChild(image02,1);

        //执行动作
        var ac0=cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(winsize.width*0.5,winsize.height*0.5)));
        image01.runAction(cc.Sequence.create(ac0));
        var ac1=cc.Spawn.create(cc.FadeIn.create(1.0),cc.ScaleBy.create(1.0,10),cc.RotateBy.create(1.0,360));
        image02.runAction(cc.Sequence.create(cc.DelayTime.create(0.2),ac1));
    },

    page11Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();
        var image01=cc.Sprite.create(page11_1);
        image01.setPosition(cc.p(winsize.width*0.5,-winsize.height*0.2));
        image01.setTag(1100);
        this.addChild(image01,1);

        var image02=cc.Sprite.create(page11_2);
        image02.setPosition(cc.p(winsize.width*0.5,winsize.height*0.57));
        image02.setTag(1101);
        image02.setOpacity(0);
        this.addChild(image02,1);

        var image03=cc.Sprite.create(page11_3);
        image03.setPosition(cc.p(winsize.width*0.4,winsize.height*1.2));
        image03.setTag(1102);
        this.addChild(image03,1);

        //执行动作
        var ac0=cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(winsize.width*0.5,winsize.height*0.5)));
        image01.runAction(cc.Sequence.create(ac0));
        var ac1=cc.FadeIn.create(0.5);
        image02.runAction(cc.Sequence.create(cc.DelayTime.create(0.3),ac1));
        var ac2=cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(winsize.width*0.4,winsize.height*0.77)));
        image03.runAction(cc.Sequence.create(cc.DelayTime.create(0.5),ac2));
    },

    page12Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();
        var image01=cc.Sprite.create(page12_1);
        image01.setPosition(cc.p(winsize.width*0.5,-winsize.height*0.2));
        image01.setTag(1200);
        this.addChild(image01,1);

        var image02=cc.Sprite.create(page12_2);
        image02.setPosition(cc.p(winsize.width*0.5,winsize.height*0.59));
        image02.setTag(1201);
        image02.setOpacity(0);
        this.addChild(image02,1);

        var image03=cc.Sprite.create(page12_3);
        image03.setPosition(cc.p(winsize.width*0.53,winsize.height*1.2));
        image03.setTag(1202);
        this.addChild(image03,1);

        //执行动作
        var ac0=cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(winsize.width*0.5,winsize.height*0.5)));
        image01.runAction(cc.Sequence.create(ac0));
        var ac1=cc.FadeIn.create(0.5);
        image02.runAction(cc.Sequence.create(cc.DelayTime.create(0.3),ac1));
        var ac2=cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(winsize.width*0.53,winsize.height*0.75)));
        image03.runAction(cc.Sequence.create(cc.DelayTime.create(0.5),ac2));
    },

    page13Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();
        var image01=cc.Sprite.create(page13_1);
        image01.setPosition(cc.p(winsize.width*0.5,-winsize.height*0.2));
        image01.setTag(1300);
        this.addChild(image01,1);

        var image02=cc.Sprite.create(page13_2);
        image02.setPosition(cc.p(winsize.width*0.35,winsize.height*0.65));
        image02.setTag(1301);
        //image02.setOpacity(0);
        this.addChild(image02,1);

        var image03=cc.Sprite.create(page13_3);
        image03.setPosition(cc.p(winsize.width*0.65,winsize.height*0.55));
        image03.setTag(1302);
        image03.setOpacity(0);
        this.addChild(image03,1);

        //执行动作
        var ac0=cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(winsize.width*0.5,winsize.height*0.5)));
        image01.runAction(cc.Sequence.create(ac0));
        var ac1=cc.Repeat.create(cc.Sequence.create(cc.RotateBy.create(0.9,-10.0),cc.RotateBy.create(0.9,10.0)),999);
        image02.runAction(ac1);
        var ac2=cc.FadeIn.create(0.5);
        image03.runAction(cc.Sequence.create(cc.DelayTime.create(0.5),ac2));
    },

    page14Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();
        var image01=cc.Sprite.create(page14_1);
        image01.setPosition(cc.p(winsize.width*0.5,-winsize.height*0.2));
        image01.setTag(1400);
        this.addChild(image01,1);

        var image02=cc.Sprite.create(page14_2);
        image02.setPosition(cc.p(-image02.getContentSize().width*0.5,winsize.height*0.6));
        image02.setTag(1401);
        this.addChild(image02,1);

        var image03=cc.Sprite.create(page14_3);
        image03.setPosition(cc.p(winsize.width+image03.getContentSize().width*0.5,winsize.height*0.6));
        image03.setTag(1402);
        this.addChild(image03,1);
        //执行动作
        var ac0=cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(winsize.width*0.5,winsize.height*0.5)));
        image01.runAction(cc.Sequence.create(ac0));
        var ac1=cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(winsize.width*0.3,winsize.height*0.6)));
        image02.runAction(cc.Sequence.create(cc.DelayTime.create(0.4),ac1));
        var ac2=cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(winsize.width*0.7,winsize.height*0.6)));
        image03.runAction(cc.Sequence.create(cc.DelayTime.create(0.6),ac2));
    },

    page15Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();
        var image01=cc.Sprite.create(page15_1);
        image01.setPosition(cc.p(winsize.width*0.5,-winsize.height*0.2));
        image01.setTag(1500);
        this.addChild(image01,1);

        var image02=cc.Sprite.create(page15_2);
        image02.setAnchorPoint(cc.p(0.5,0.5));
        image02.setPosition(cc.p(winsize.width*0.3,winsize.height*0.6));
        image02.setTag(1501);
        image02.setScale(0.5);
        image02.setOpacity(0);
        this.addChild(image02,1);

        var image03=cc.Sprite.create(page15_3);
        image03.setPosition(cc.p(winsize.width*0.7,winsize.height*0.6));
        image03.setTag(1502);
        image03.setScale(0.5);
        image03.setOpacity(0);
        this.addChild(image03,1);
        //执行动作
        var ac0=cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(winsize.width*0.5,winsize.height*0.5)));
        image01.runAction(cc.Sequence.create(ac0));
        var ac1=cc.Sequence.create(cc.DelayTime.create(0.2),cc.Spawn.create(cc.FadeIn.create(0.8),cc.EaseElasticOut.create(cc.ScaleTo.create(0.8,1.0))));
        image02.runAction(ac1);
        var ac2=cc.Sequence.create(cc.DelayTime.create(0.4),cc.Spawn.create(cc.FadeIn.create(0.8),cc.EaseElasticOut.create(cc.ScaleTo.create(0.8,1.0))));
        image03.runAction(ac2);
    },

    page16Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();
        var image01=cc.Sprite.create(page16_1);
        image01.setPosition(cc.p(winsize.width*0.5,-winsize.height*0.2));
        image01.setTag(1600);
        this.addChild(image01,1);

        var image02=cc.Sprite.create(page16_2);
        image02.setAnchorPoint(cc.p(0.5,0.5));
        image02.setPosition(cc.p(-image02.getContentSize().width*0.5,winsize.height*0.65));
        image02.setTag(1601);
        this.addChild(image02,1);

        var image03=cc.Sprite.create(page16_3);
        image03.setPosition(cc.p(-image03.getContentSize().width*0.5,winsize.height*0.43));
        image03.setTag(1602);
        this.addChild(image03,1);
        //执行动作
        var ac0=cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(winsize.width*0.5,winsize.height*0.5)));
        image01.runAction(cc.Sequence.create(ac0));
        var ac1=cc.Sequence.create(cc.DelayTime.create(0.5),cc.JumpTo.create(0.8,cc.p(winsize.width*0.3,winsize.height*0.65),30,3));
        image02.runAction(ac1);
        var ac2=cc.Sequence.create(cc.DelayTime.create(1.0),cc.JumpTo.create(0.8,cc.p(winsize.width*0.3,winsize.height*0.43),30,3));
        image03.runAction(ac2);
    },

    page17Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();
        var image01=cc.Sprite.create(page17_1);
        image01.setPosition(cc.p(winsize.width*0.5,-winsize.height*0.2));
        image01.setTag(1700);
        this.addChild(image01,1);

        var image02=cc.Sprite.create(page17_2);
        image02.setPosition(cc.p(winsize.width*0.3,winsize.height*0.5));
        image02.setTag(1701);
        image02.setOpacity(0);
        this.addChild(image02,1);

        var image03=cc.Sprite.create(page17_3);
        image03.setPosition(cc.p(winsize.width*0.5,winsize.height*0.35));
        image03.setTag(1702);
        image03.setOpacity(0);
        this.addChild(image03,1);

        var image04=cc.Sprite.create(page17_4);
        image04.setPosition(cc.p(winsize.width*0.5,winsize.height*0.7));
        image04.setTag(1703);
        image04.setOpacity(0);
        this.addChild(image04,1);
        //执行动作
        var ac0=cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(winsize.width*0.5,winsize.height*0.5)));
        image01.runAction(cc.Sequence.create(ac0));
        var ac1=cc.Sequence.create(cc.DelayTime.create(0.5),cc.FadeIn.create(0.8));
        image02.runAction(ac1);
        var ac2=cc.Sequence.create(cc.DelayTime.create(1.0),cc.FadeIn.create(0.5));
        image03.runAction(ac2);
        var ac3=cc.Sequence.create(cc.DelayTime.create(1.5),cc.FadeIn.create(0.5),cc.Repeat.create(cc.Sequence.create(cc.ScaleTo.create(0.1,1.1),cc.ScaleTo.create(0.1,1.0),cc.DelayTime.create(0.8)),999));
        image04.runAction(ac3);
    },

    page18Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();
        var image01=cc.Sprite.create(page18_1);
        image01.setPosition(cc.p(winsize.width*0.5,-winsize.height*0.2));
        image01.setTag(1800);
        this.addChild(image01,1);

        var image02=cc.Sprite.create(page18_2);
        image02.setAnchorPoint(cc.p(0.5,0));
        image02.setPosition(cc.p(winsize.width*0.7,winsize.height*0.4));
        image02.setTag(1801);
        image02.setOpacity(0);
        this.addChild(image02,1);

        //执行动作
        var ac0=cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(winsize.width*0.5,winsize.height*0.5)));
        image01.runAction(cc.Sequence.create(ac0));
        var ac1=cc.Sequence.create(cc.DelayTime.create(0.5),cc.FadeIn.create(0.5),cc.Repeat.create(cc.Sequence.create(cc.RotateTo.create(1.0,-5),cc.RotateTo.create(1.0,5)),999));
        image02.runAction(ac1);
    },

    page19Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();
        var image01=cc.Sprite.create(page19_1);
        image01.setPosition(cc.p(winsize.width*0.5,-winsize.height*0.2));
        image01.setTag(1900);
        this.addChild(image01,1);

        var image02=cc.Sprite.create(page19_2);
        image02.setPosition(cc.p(winsize.width*0.3,winsize.height*0.5));
        image02.setTag(1901);
        image02.setOpacity(0);
        this.addChild(image02,1);

        //执行动作
        var ac0=cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(winsize.width*0.5,winsize.height*0.5)));
        image01.runAction(cc.Sequence.create(ac0));
        var ac1=cc.Sequence.create(cc.DelayTime.create(0.5),cc.FadeIn.create(1.0));
        image02.runAction(ac1);
    },

    page20Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();
        var image01=cc.Sprite.create(page20_1);
        image01.setPosition(cc.p(winsize.width*0.5,-winsize.height*0.2));
        image01.setTag(2000);
        this.addChild(image01,1);

        var image02=cc.Sprite.create(page20_2);
        image02.setPosition(cc.p(winsize.width*0.5,-winsize.height*0.2));
        image02.setTag(2001);
        this.addChild(image02,1);

        var image03=cc.Sprite.create(page20_3);
        image03.setPosition(cc.p(winsize.width*0.5,winsize.height*0.61));
        image03.setTag(2002);
        image03.setScale(0.1);
        image03.setOpacity(0);
        this.addChild(image03,1);

        var image04=cc.Sprite.create(page20_4);
        image04.setPosition(cc.p(winsize.width*0.5,winsize.height*0.6));
        image04.setTag(2003);
        image04.setScale(0.1);
        image04.setOpacity(0);
        this.addChild(image04,1);

        var image05=cc.Sprite.create(page20_5);
        image05.setPosition(cc.p(winsize.width*0.64,winsize.height*0.61));
        image05.setTag(2004);
        image05.setScale(0.1);
        image05.setOpacity(0);
        this.addChild(image05,1);
        //执行动作
        var ac0=cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(winsize.width*0.5,winsize.height*0.5)));
        image01.runAction(cc.Sequence.create(ac0,cc.DelayTime.create(0.5),cc.FadeOut.create(0.5)));
        var ac1=cc.Sequence.create(cc.DelayTime.create(1.0),cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(winsize.width*0.5,winsize.height*0.5))));
        image02.runAction(ac1);
        var ac2=cc.Sequence.create(cc.DelayTime.create(1.2),cc.Spawn.create(cc.FadeIn.create(1.0),cc.EaseElasticOut.create(cc.ScaleTo.create(1.0,1.35))));
        image03.runAction(ac2);
        var ac3=cc.Sequence.create(cc.DelayTime.create(1.5),cc.Spawn.create(cc.FadeIn.create(1.1),cc.EaseElasticOut.create(cc.ScaleTo.create(1.1,1.0))));
        image04.runAction(ac3);
        var ac4=cc.Sequence.create(cc.DelayTime.create(1.8),cc.Spawn.create(cc.FadeIn.create(1.0),cc.EaseElasticOut.create(cc.ScaleTo.create(1.0,1.0))));
        image05.runAction(ac4);
    },

    page21Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();
        var image01=cc.Sprite.create(page21_1);
        image01.setPosition(cc.p(winsize.width*0.5,winsize.height*0.5));
        image01.setOpacity(0);
        image01.setTag(2100);
        this.addChild(image01,1);

        //执行动作
        var ac0=cc.FadeIn.create(1.0);
        image01.runAction(cc.Sequence.create(ac0));
    },

    page22Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();
        var image01=cc.Sprite.create(page22_1);
        image01.setPosition(cc.p(winsize.width*0.5,winsize.height*0.6));
        image01.setTag(2200);
        this.addChild(image01,1);

        var label1=cc.LabelTTF.create("图片：来源于网络.\n动画：AW传媒制作.\n推广合作公众号：aiwanGames","黑体",30);
        label1.setColor(cc.c3(0,0,0));
        label1.setAnchorPoint(cc.p(0.5,0.5));
        label1.setPosition(cc.p(winsize.width*0.5,winsize.height*0.35));
        this.addChild(label1,1);

        //提示用户分享
        var shareLabel=cc.LabelTTF.create("点击右上角[分享至朋友圈]推荐给好友.","黑体",25,cc.size(500,150),cc.TEXT_ALIGNMENT_CENTER);
        shareLabel.setColor(cc.c3(0,0,0));
        shareLabel.setPosition(cc.p(winsize.width*0.5,winsize.height*0.76));
        this.addChild(shareLabel,1);
        var ac0=cc.RotateTo.create(0.1,7);
        var ac1=cc.RotateTo.create(0.1,0);
        var ac2=cc.RotateTo.create(0.1,-7);
        var ac3=cc.RotateTo.create(0.1,0);
        var ac4=cc.DelayTime.create(1.0);
        shareLabel.runAction(cc.RepeatForever.create(cc.Sequence.create(ac0,ac1,ac2,ac3,ac4)));
        //执行动作

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
                break;
            }
        }
        this.removeChild(img,true);
    },

    pageFinished:function()
    {
        //每张page播放完后，设置isPlaying为false
        this.isPlaying=false;
    },

    switchToNextPage:function(_pageIndex)
    {
        //切换下一个page
        switch(_pageIndex)
        {
            case 2:this.removePage(1);this.page2Action();break;
            case 3:this.removePage(2);this.page3Action();break;
            case 4:this.removePage(3);this.page4Action();break;
            case 5:this.removePage(4);this.page5Action();break;
            case 6:this.removePage(5);this.page6Action();break;
            case 7:this.removePage(6);this.page7Action();break;
            case 8:this.removePage(7);this.page8Action();break;
            case 9:this.removePage(8);this.page9Action();break;
            case 10:this.removePage(9);this.page10Action();break;
            case 11:this.removePage(10);this.page11Action();break;
            case 12:this.removePage(11);this.page12Action();break;
            case 13:this.removePage(12);this.page13Action();break;
            case 14:this.removePage(13);this.page14Action();break;
            case 15:this.removePage(14);this.page15Action();break;
            case 16:this.removePage(15);this.page16Action();break;
            case 17:this.removePage(16);this.page17Action();break;
            case 18:this.removePage(17);this.page18Action();break;
            case 19:this.removePage(18);this.page19Action();break;
            case 20:this.removePage(19);this.page20Action();break;
            case 21:this.removePage(20);this.page21Action();break;
            case 22:this.removePage(21);this.page22Action();break;
            default:break;
        }
        if(this.pageIndex<23)
        {
            this.pageIndex+=1;
        }
        else
        {
            this.isBottom=true;
        }
        cc.log("index:"+this.pageIndex);
    },

    switchToPrePage:function(_pageIndex)
    {
        //切换上一个page
        switch(_pageIndex)
        {
            case 3:this.removePage(2);this.page1Action();break;
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
            case 14:this.removePage(13);this.page12Action();break;
            case 15:this.removePage(14);this.page13Action();break;
            case 16:this.removePage(15);this.page14Action();break;
            case 17:this.removePage(16);this.page15Action();break;
            case 18:this.removePage(17);this.page16Action();break;
            case 19:this.removePage(18);this.page17Action();break;
            case 20:this.removePage(19);this.page18Action();break;
            case 21:this.removePage(20);this.page19Action();break;
            case 22:this.removePage(21);this.page20Action();break;
            case 23:this.removePage(22);this.page21Action();break;
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

            }
            else
            {
                cc.log("Next Page");
                this.switchToNextPage(this.pageIndex);
                this.isTop=false;
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
                cc.log("Pre Page");
                this.switchToPrePage(this.pageIndex);
                this.isBottom=false;
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
