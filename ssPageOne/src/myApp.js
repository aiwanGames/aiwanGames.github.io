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

    init:function ()
    {
        this._super();
        this.winSize = cc.Director.getInstance().getWinSize();
        this.setColor(cc.c4(250,250,250,255));
        //开启触摸
        this.setTouchEnabled(true);
        //播放第一张page
        this.page1Action();
        //设置分享内容
        document.title = window.wxData.desc = "随手记，理财第一步";
        document.title = window.wxFriend.desc = "随手记，理财第一步";
        //提示用户翻页
        var imageUp=cc.Sprite.create(s_point);
        imageUp.setPosition(cc.p(320,60));
        imageUp.setScaleX(0.15);
        imageUp.setScaleY(0.1);
        this.addChild(imageUp,1);
        var ac0=cc.Repeat.create(cc.Sequence.create(cc.MoveBy.create(0.6,cc.p(0,10)),cc.MoveBy.create(0.6,cc.p(0,-10))),999999);
        imageUp.runAction(ac0);
        var Label1=cc.LabelTTF.create("向上或向下滑动翻页","黑体",23);
        Label1.setColor(cc.c3(0,0,0));
        Label1.setPosition(cc.p(320,Label1.getContentSize().height));
        this.addChild(Label1,1);
        return true;
    },

    page1Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();
        var image01=cc.Sprite.create(p0101);
        image01.setAnchorPoint(cc.p(0.5,0.0));
        image01.setPosition(cc.p(winsize.width*0.5,0));
        image01.setTag(100);
        this.addChild(image01,1);

        var image02=cc.Sprite.create(p0102);
        image02.setPosition(cc.p(winsize.width*1.3,winsize.height*0.1));
        image02.setTag(101);
        this.addChild(image02,2);

        var image03=cc.Sprite.create(p0103);
        image03.setPosition(cc.p(winsize.width*0.5,winsize.height*0.5));
        image03.setTag(102);
        image03.setScale(0.1);
        image03.setOpacity(0);
        this.addChild(image03,2);

        var image04=cc.Sprite.create(p0104);
        image04.setAnchorPoint(cc.p(0.5,0.0));
        image04.setPosition(cc.p(winsize.width*0.5,0));
        image04.setTag(103);
        image04.setOpacity(0);
        this.addChild(image04,1);

        //执行动作
        var ac0=cc.Sequence.create(cc.DelayTime.create(0.5),cc.EaseElasticOut.create(cc.MoveTo.create(1.0,cc.p(winsize.width*0.6,winsize.height*0.35))));
        image02.runAction(cc.Sequence.create(ac0));
        var ac1=cc.Sequence.create(cc.DelayTime.create(1.0),cc.Spawn.create(cc.FadeIn.create(0.5),cc.EaseElasticOut.create(cc.ScaleTo.create(0.5,1.0))));
        image03.runAction(ac1);
        var ac2=cc.Sequence.create(cc.DelayTime.create(1.0),cc.FadeIn.create(0.5));
        image04.runAction(ac2);
    },

    page2Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();
        var image01=cc.Sprite.create(p0201);
        image01.setPosition(cc.p(winsize.width*0.7,winsize.height*0.35));
        image01.setOpacity(0);
        image01.setTag(200);
        this.addChild(image01,1);

        var image02=cc.Sprite.create(p0202);
        image02.setPosition(cc.p(winsize.width*0.1,winsize.height*0.35));
        image02.setOpacity(0);
        image02.setTag(201);
        this.addChild(image02,1);

        var image03=cc.Sprite.create(p0203);
        image03.setPosition(cc.p(winsize.width*0.5,winsize.height*0.75));
        image03.setOpacity(0);
        image03.setScale(0.1);
        image03.setTag(202);
        this.addChild(image03,1);
        //执行动作
        var ac0=cc.Sequence.create(cc.DelayTime.create(0.2),cc.FadeIn.create(0.5),cc.DelayTime.create(0.5),cc.MoveBy.create(0.5,cc.p(130,0)));
        image01.runAction(ac0);
        var ac1=cc.Sequence.create(cc.DelayTime.create(0.7),cc.FadeIn.create(0.5),cc.MoveBy.create(0.5,cc.p(70,0)),cc.Repeat.create(cc.Sequence.create(cc.MoveBy.create(0.8,cc.p(0,-10)),cc.MoveBy.create(0.6,cc.p(0,10))),9999));
        image02.runAction(ac1);
        var ac2=cc.Sequence.create(cc.DelayTime.create(1.0),cc.Spawn.create(cc.FadeIn.create(0.6),cc.ScaleTo.create(0.6,1.0),cc.RotateBy.create(0.6,360)));
        image03.runAction(ac2);
        },

    page3Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();
        var image01=cc.Sprite.create(p0301);
        image01.setPosition(cc.p(winsize.width*0.5,winsize.height*0.65));
        image01.setTag(300);
        this.addChild(image01,1);

        var image02=cc.Sprite.create(p0302);
        image02.setPosition(cc.p(-image02.getContentSize().width*0.5,winsize.height*0.7));
        image02.setTag(301);
        image02.setScale(0.25);
        image02.setOpacity(0);
        this.addChild(image02,1);

        var image03=cc.Sprite.create(p0303);
        image03.setPosition(cc.p(winsize.width*0.93,winsize.height*0.8));
        image03.setOpacity(0);
        image03.setTag(302);
        this.addChild(image03,1);

        var image04=cc.Sprite.create(p0304);
        image04.setPosition(cc.p(winsize.width*0.5,-image04.getContentSize().height*0.5));
        image04.setTag(303);
        image04.setOpacity(0);
        this.addChild(image04,1);
        //执行动作
        var ac0=cc.Sequence.create(cc.Spawn.create(cc.FadeIn.create(1.0),cc.ScaleTo.create(1.0,1.0),cc.JumpTo.create(1.0,cc.p(winsize.width*0.4,winsize.height*0.6),50,3)));
        image02.runAction(ac0);
        var ac1=cc.Repeat.create(cc.Sequence.create(cc.FadeIn.create(0.4),cc.FadeOut.create(0.5)),99999);
        image03.runAction(ac1);
        var ac2=cc.Sequence.create(cc.DelayTime.create(1.0),cc.Spawn.create(cc.FadeIn.create(0.5),cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(winsize.width*0.5,winsize.height*0.2)))));
        image04.runAction(ac2);
    },

    page4Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();
        var image01=cc.Sprite.create(p0401);
        image01.setPosition(cc.p(winsize.width*0.5,winsize.height*1.2));
        image01.setTag(400);
        this.addChild(image01,1);

        var image02=cc.Sprite.create(p0402);
        image02.setPosition(cc.p(-winsize.width*0.2,winsize.height*0.45));
        image02.setTag(401);
        this.addChild(image02,1);

        var image03=cc.Sprite.create(p0403);
        image03.setPosition(cc.p(winsize.width*1.4,winsize.height*0.4));
        image03.setTag(402);
        this.addChild(image03,1);

        var image04=cc.Sprite.create(p0404);
        image04.setAnchorPoint(cc.p(0.5,0.0));
        image04.setPosition(cc.p(winsize.width*0.2,winsize.height*0.6));
        image04.setOpacity(0);
        image04.setTag(403);
        this.addChild(image04,1);

        var image05=cc.Sprite.create(p0405);
        image05.setPosition(cc.p(winsize.width*0.5,winsize.height*0.87));
        image05.setScale(0.1);
        image05.setOpacity(0);
        image05.setTag(404);
        this.addChild(image05,1);

        var image06=cc.Sprite.create(p0406);
        image06.setPosition(cc.p(winsize.width*0.54,winsize.height*0.6));
        image06.setOpacity(0);
        image06.setTag(405);
        this.addChild(image06,1);

        var image07=cc.Sprite.create(p0406);
        image07.setFlippedX(true);
        image07.setPosition(cc.p(winsize.width*0.74,winsize.height*0.6));
        image07.setOpacity(0);
        image07.setTag(406);
        this.addChild(image07,1);
        //执行动作
        var ac0=cc.Sequence.create(cc.EaseElasticOut.create(cc.MoveTo.create(0.6,cc.p(winsize.width*0.5,winsize.height*0.6))));
        image01.runAction(ac0);
        var ac1=cc.Sequence.create(cc.EaseElasticOut.create(cc.MoveTo.create(1.0,cc.p(winsize.width*0.5,winsize.height*0.45))));
        image02.runAction(ac1);
        var ac2=cc.Sequence.create(cc.DelayTime.create(0.5),cc.EaseElasticOut.create(cc.MoveTo.create(1.0,cc.p(winsize.width*0.7,winsize.height*0.4))));
        image03.runAction(ac2);
        var ac3=cc.Sequence.create(cc.DelayTime.create(1.5),cc.Spawn.create(cc.FadeIn.create(0.7),cc.EaseElasticOut.create(cc.MoveTo.create(0.7,cc.p(winsize.width*0.2,winsize.height*0.2)))));
        image04.runAction(ac3);
        var ac4=cc.Sequence.create(cc.DelayTime.create(1.5),cc.Spawn.create(cc.FadeIn.create(0.5),cc.EaseElasticOut.create(cc.ScaleTo.create(0.5,1.0))));
        image05.runAction(ac4);
        var ac5=cc.Sequence.create(cc.DelayTime.create(1.5),cc.Repeat.create(cc.Sequence.create(cc.Spawn.create(cc.FadeIn.create(0.5),cc.ScaleTo.create(0.5,1.1)),cc.Spawn.create(cc.FadeOut.create(0.5),cc.ScaleTo.create(0.5,0.9))),9999));
        image06.runAction(ac5);
        var ac6=cc.Sequence.create(cc.DelayTime.create(1.5),cc.Repeat.create(cc.Sequence.create(cc.Spawn.create(cc.FadeIn.create(0.5),cc.ScaleTo.create(0.5,1.1)),cc.Spawn.create(cc.FadeOut.create(0.5),cc.ScaleTo.create(0.5,0.9))),9999));
        image07.runAction(ac6);
    },

    page5Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();
        var image01=cc.Sprite.create(p0501);
        image01.setPosition(cc.p(winsize.width*0.5,winsize.height*0.7));
        image01.setOpacity(0);
        image01.setTag(500);
        this.addChild(image01,1);

        var image02=cc.Sprite.create(p0502);
        image02.setPosition(cc.p(winsize.width*0.5,winsize.height*0.4));
        image02.setOpacity(0);
        image02.setScale(0.1);
        image02.setTag(501);
        this.addChild(image02,1);

        var image03=cc.Sprite.create(p0503);
        image03.setPosition(cc.p(winsize.width*0.5,winsize.height*0.2));
        image03.setOpacity(0);
        image03.setTag(502);
        this.addChild(image03,1);

        var image04=cc.Sprite.create(p0504);
        image04.setAnchorPoint(cc.p(0.5,0.0));
        image04.setPosition(cc.p(winsize.width*0.5,winsize.height*0.8));
        image04.setOpacity(0);
        image04.setTag(503);
        this.addChild(image04,1);
        //执行动作
        var ac0=cc.Sequence.create(cc.FadeIn.create(1.0));
        image01.runAction(ac0);
        var ac1=cc.Sequence.create(cc.DelayTime.create(0.5),cc.Spawn.create(cc.FadeIn.create(0.5),cc.EaseElasticOut.create(cc.ScaleTo.create(0.5,1.0))));
        image02.runAction(ac1);
        var ac2=cc.Sequence.create(cc.DelayTime.create(0.8),cc.FadeIn.create(0.5));
        image03.runAction(ac2);
        var ac3=cc.Sequence.create(cc.DelayTime.create(1.0),cc.FadeIn.create(0.5),cc.Repeat.create(cc.Sequence.create(cc.RotateBy.create(0.5,5),cc.RotateBy.create(0.5,-5),cc.RotateBy.create(0.5,-5),cc.RotateBy.create(0.5,5)),99999));
        image04.runAction(ac3);
    },

    page6Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();
        var image01=cc.Sprite.create(p0601);
        image01.setPosition(cc.p(winsize.width*0.5,winsize.height*0.82));
        image01.setOpacity(0);
        image01.setTag(600);
        this.addChild(image01,1);

        var image02=cc.Sprite.create(p0602);
        image02.setPosition(cc.p(-winsize.width*0.2,winsize.height*0.6));
        image02.setTag(601);
        this.addChild(image02,1);

        var image03=cc.Sprite.create(p0603);
        image03.setPosition(cc.p(winsize.width*1.2,winsize.height*0.6));
        image03.setTag(602);
        this.addChild(image03,1);

        var image04=cc.Sprite.create(p0606);
        image04.setPosition(cc.p(winsize.width*0.5,-winsize.height*0.2));
        image04.setOpacity(0);
        image04.setTag(603);
        this.addChild(image04,1);
        //执行动作
        var ac0=cc.Sequence.create(cc.FadeIn.create(1.0));
        image01.runAction(ac0);
        var ac1=cc.Sequence.create(cc.DelayTime.create(0.7),cc.JumpTo.create(0.6,cc.p(winsize.width*0.39,winsize.height*0.6),50,2));
        image02.runAction(ac1);
        var ac2=cc.Sequence.create(cc.DelayTime.create(1.0),cc.JumpTo.create(0.6,cc.p(winsize.width*0.61,winsize.height*0.6),50,2));
        image03.runAction(ac2);
        var ac3=cc.Sequence.create(cc.DelayTime.create(1.5),cc.Spawn.create(cc.FadeIn.create(0.5),cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(winsize.width*0.5,winsize.height*0.2)))));
        image04.runAction(ac3);
    },

    page7Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();
        var image01=cc.Sprite.create(p0601);
        image01.setPosition(cc.p(winsize.width*0.5,winsize.height*0.82));
        image01.setTag(700);
        this.addChild(image01,1);

        var image02=cc.Sprite.create(p0602);
        image02.setPosition(cc.p(winsize.width*0.39,winsize.height*0.6));
        image02.setTag(701);
        this.addChild(image02,1);

        var image03=cc.Sprite.create(p0603);
        image03.setPosition(cc.p(winsize.width*0.61,winsize.height*0.6));
        image03.setTag(702);
        this.addChild(image03,1);

        var image04=cc.Sprite.create(p0704);
        image04.setPosition(cc.p(winsize.width*0.5,winsize.height*0.2));
        image04.setTag(703);
        this.addChild(image04,1);

        var image05=cc.Sprite.create(p0701);
        image05.setPosition(cc.p(winsize.width*0.5,winsize.height*0.65));
        image05.setOpacity(0);
        image05.setScale(0.1);
        image05.setTag(704);
        this.addChild(image05,1);
        //执行动作
        var ac0=cc.Sequence.create(cc.DelayTime.create(0.8),cc.CallFunc.create(this.pageCallBack,this));
        image01.runAction(ac0);
        var ac1=cc.Sequence.create(cc.DelayTime.create(1.5),cc.MoveTo.create(0.5,cc.p(winsize.width*0.2,winsize.height*0.6)),cc.CallFunc.create(this.pageCallBack,this));
        image02.runAction(ac1);
        var ac2=cc.Sequence.create(cc.DelayTime.create(1.5),cc.MoveTo.create(0.5,cc.p(winsize.width*0.8,winsize.height*0.6)));
        image03.runAction(ac2);
        var ac3=cc.Sequence.create(cc.DelayTime.create(0.8),cc.Spawn.create(cc.FadeIn.create(0.5),cc.EaseElasticOut.create(cc.ScaleTo.create(0.5,0.8))));
        image05.runAction(ac3);
    },

    pageCallBack:function(_sp)
    {
        var tag=_sp.getTag();
        if(tag==700)
        {
            _sp.initWithFile(p0705);
            _sp.setPosition(cc.p(this.winSize.width*0.5,this.winSize.height*0.765));
        }

        if(tag==701)
        {
            _sp.initWithFile(p0702);
        }
    },

    page8Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();
        var image01=cc.Sprite.create(p0801);
        image01.setPosition(cc.p(winsize.width*0.5,winsize.height*0.765));
        image01.setTag(800);
        this.addChild(image01,1);

        var image02=cc.Sprite.create(p0803);
        image02.setPosition(cc.p(winsize.width*0.5,winsize.height*0.6));
        image02.setOpacity(0);
        image02.setTag(801);
        this.addChild(image02,2);

        var image03=cc.Sprite.create(p0804);
        image03.setPosition(cc.p(winsize.width*0.5,winsize.height*0.2));
        image03.setTag(802);
        this.addChild(image03,1);

        var image04=cc.Sprite.create(p0802);
        image04.setPosition(cc.p(winsize.width*1.4,winsize.height*0.72));
        image04.setTag(803);
        this.addChild(image04,1);

        var image05=cc.Sprite.create(p0805);
        image05.setPosition(cc.p(winsize.width*0.5,winsize.height*0.37));
        image05.setOpacity(0);
        image05.setScale(0.1);
        image05.setTag(804);
        this.addChild(image05,1);
        //执行动作
        var ac0=cc.Sequence.create(cc.FadeIn.create(1.0));
        image02.runAction(ac0);
        var ac1=cc.Sequence.create(cc.DelayTime.create(0.5),cc.FadeOut.create(1.5),cc.FadeIn.create(0.5));
        image03.runAction(ac1);
        var ac2=cc.Sequence.create(cc.DelayTime.create(0.9),cc.MoveTo.create(0.8,cc.p(winsize.width*0.4,winsize.height*0.72)),cc.MoveTo.create(0.4,cc.p(winsize.width*0.6,winsize.height*0.72)),cc.MoveTo.create(0.2,cc.p(winsize.width*0.5,winsize.height*0.72)));
        image04.runAction(ac2);
        var ac3=cc.Sequence.create(cc.DelayTime.create(1.7),cc.Spawn.create(cc.FadeIn.create(0.5),cc.EaseElasticOut.create(cc.ScaleTo.create(0.5,1.0))));
        image05.runAction(ac3);
    },

    page9Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();
        var image01=cc.Sprite.create(p0901);
        image01.setPosition(cc.p(winsize.width*0.5,winsize.height*0.7));
        image01.setTag(900);
        this.addChild(image01,1);

        var image02=cc.Sprite.create(p0905);
        image02.setPosition(cc.p(winsize.width*0.5,winsize.height*0.5));
        image02.setOpacity(0);
        image02.setTag(901);
        this.addChild(image02,2);

        var image03=cc.Sprite.create(p0908);
        image03.setPosition(cc.p(winsize.width*0.5,winsize.height*1.2));
        image03.setTag(902);
        this.addChild(image03,1);

        var image04=cc.Sprite.create(p0909);
        image04.setPosition(cc.p(winsize.width*0.5,winsize.height*1.2));
        image04.setTag(903);
        this.addChild(image04,1);

        var image05=cc.Sprite.create(p0910);
        image05.setPosition(cc.p(winsize.width*0.5,winsize.height*1.2));
        image05.setTag(904);
        this.addChild(image05,1);

        var image06=cc.Sprite.create(p0903);
        image06.setPosition(cc.p(winsize.width*0.5,winsize.height*1.2));
        image06.setTag(905);
        this.addChild(image06,1);

        var image07=cc.Sprite.create(p0904);
        image07.setPosition(cc.p(winsize.width*0.5,-winsize.height*0.4));
        image07.setTag(906);
        this.addChild(image07,0);

        var image08=cc.Sprite.create(p0906);
        image08.setPosition(cc.p(winsize.width*1.2,winsize.height*0.5));
        image08.setTag(907);
        this.addChild(image08,2);

        var image09=cc.Sprite.create(p0907);
        image09.setPosition(cc.p(winsize.width*0.5,winsize.height*0.5));
        image09.setOpacity(0);
        image09.setScale(0.1);
        image09.setTag(908);
        this.addChild(image09,1);

        var image10=cc.Sprite.create(p0902);
        image10.setPosition(cc.p(winsize.width*0.5,winsize.height*0.6));
        image10.setOpacity(0);
        image10.setScale(0.1);
        image10.setTag(909);
        this.addChild(image10,1);
        //执行动作
        var ac0=cc.Sequence.create(cc.FadeIn.create(0.8));
        image02.runAction(ac0);
        var ac1=cc.Sequence.create(cc.DelayTime.create(0.5),cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(winsize.width*0.5,winsize.height*0.9))),cc.FadeOut.create(0.5));
        image03.runAction(ac1);
        var ac2=cc.Sequence.create(cc.DelayTime.create(1.8),cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(winsize.width*0.5,winsize.height*0.9))),cc.FadeOut.create(0.5));
        image04.runAction(ac2);
        var ac3=cc.Sequence.create(cc.DelayTime.create(3.0),cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(winsize.width*0.5,winsize.height*0.9))));
        image05.runAction(ac3);
        var ac4=cc.Sequence.create(cc.DelayTime.create(1.8),cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(winsize.width*0.5,winsize.height*0.95))),cc.FadeOut.create(0.5));
        image06.runAction(ac4);
        var ac5=cc.Sequence.create(cc.DelayTime.create(1.8),cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(winsize.width*0.5,winsize.height*0.25))));
        image07.runAction(ac5);
        var ac6=cc.Sequence.create(cc.DelayTime.create(1.8),cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(winsize.width*0.62,winsize.height*0.5))));
        image08.runAction(ac6);
        var ac7=cc.Sequence.create(cc.DelayTime.create(1.8),cc.Spawn.create(cc.EaseElasticOut.create(cc.ScaleTo.create(0.5,1.0)),cc.FadeIn.create(0.5)));
        image09.runAction(ac7);
        var ac8=cc.Sequence.create(cc.DelayTime.create(1.8),cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(winsize.width*0.38,winsize.height*0.5))));
        image02.runAction(ac8);
        var ac9=cc.Sequence.create(cc.DelayTime.create(3.0),cc.Spawn.create(cc.EaseElasticOut.create(cc.ScaleTo.create(0.5,1.0)),cc.FadeIn.create(0.5)));
        image10.runAction(ac9);
    },

    page10Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();
        var image01=cc.Sprite.create(p1007);
        image01.setPosition(cc.p(winsize.width*0.5,winsize.height*0.9));
        image01.setOpacity(0);
        image01.setTag(1000);
        this.addChild(image01,1);

        var image02=cc.Sprite.create(p1001);
        image02.setPosition(cc.p(-winsize.width*0.3,winsize.height*0.5));
        image02.setScale(0.7);
        image02.setTag(1001);
        this.addChild(image02,1);

        var image03=cc.Sprite.create(p1002);
        image03.setPosition(cc.p(-winsize.width*0.3,winsize.height*0.5));
        image03.setScale(0.7);
        image03.setTag(1002);
        this.addChild(image03,1);

        var image04=cc.Sprite.create(p1003);
        image04.setPosition(cc.p(-winsize.width*0.3,winsize.height*0.5));
        image04.setScale(0.7);
        image04.setTag(1003);
        //this.addChild(image04,1);

        var image05=cc.Sprite.create(p1004);
        image05.setPosition(cc.p(-winsize.width*0.3,winsize.height*0.5));
        image05.setScale(0.7);
        image05.setTag(1004);
        this.addChild(image05,1);

        var image06=cc.Sprite.create(p1005);
        image06.setPosition(cc.p(-winsize.width*0.3,winsize.height*0.5));
        image06.setScale(0.7);
        image06.setTag(1005);
        this.addChild(image06,1);

        var image07=cc.Sprite.create(p1006);
        image07.setPosition(cc.p(-winsize.width*0.3,winsize.height*0.5));
        image07.setScale(0.7);
        image07.setTag(1006);
        this.addChild(image07,1);
        //执行动作
        var ac0=cc.Sequence.create(cc.FadeIn.create(1.0));
        image01.runAction(ac0);
        var ac1=cc.Sequence.create(cc.DelayTime.create(0.5),cc.MoveTo.create(2.0,cc.p(winsize.width*1.3,winsize.height*0.5)));
        image02.runAction(ac1);
        var ac2=cc.Sequence.create(cc.DelayTime.create(1.0),cc.MoveTo.create(2.0,cc.p(winsize.width*1.3,winsize.height*0.5)));
        image03.runAction(ac2);
        var ac3=cc.Sequence.create(cc.DelayTime.create(1.0),cc.MoveTo.create(2.0,cc.p(winsize.width*1.3,winsize.height*0.5)));
        //image04.runAction(ac3);
        var ac4=cc.Sequence.create(cc.DelayTime.create(1.5),cc.MoveTo.create(2.0,cc.p(winsize.width*1.3,winsize.height*0.5)));
        image05.runAction(ac4);
        var ac5=cc.Sequence.create(cc.DelayTime.create(2.0),cc.MoveTo.create(2.0,cc.p(winsize.width*1.3,winsize.height*0.5)));
        image06.runAction(ac5);
        var ac6=cc.Sequence.create(cc.DelayTime.create(2.4),cc.MoveTo.create(1.0,cc.p(winsize.width*0.5,winsize.height*0.5)));
        image07.runAction(ac6);
    },

    page11Action:function()
    {
        //每个页面10个图片
        //初始化
        var winsize = cc.Director.getInstance().getWinSize();
        var image01=cc.Sprite.create(p1101);
        image01.setPosition(cc.p(winsize.width*0.5,winsize.height*0.5));
        image01.setTag(1100);
        this.addChild(image01,1);

        var image02=cc.Sprite.create(p1102);
        image02.setAnchorPoint(cc.p(0.5,0.0));
        image02.setPosition(cc.p(winsize.width*0.5,0));
        image02.setOpacity(0);
        image02.setTag(1101);
        this.addChild(image02,1);

        var image03=cc.Sprite.create(p1103);
        image03.setAnchorPoint(cc.p(0.5,0.0));
        image03.setPosition(cc.p(winsize.width*0.5,0));
        image03.setOpacity(0);
        image03.setTag(1102);
        this.addChild(image03,2);

        var moreItem = cc.MenuItemImage.create(p1104,p1104,this.enterBBS,this);
        var moremenu = cc.Menu.create(moreItem);
        moremenu.setPosition(cc.p(160,-100));
        this.addChild(moremenu,3);
        moremenu.setTag(1103);
        moremenu.runAction(cc.Sequence.create(cc.DelayTime.create(2.0),cc.EaseBackOut.create(cc.MoveBy.create(0.5,cc.p(0,255)))));

        var shareItem = cc.MenuItemImage.create(p1105,p1105,this.share2Friend,this);
        var sharemenu = cc.Menu.create(shareItem);
        sharemenu.setPosition(cc.p(470,-100));
        this.addChild(sharemenu,3);
        sharemenu.setTag(1104);
        sharemenu.runAction(cc.Sequence.create(cc.DelayTime.create(2.0),cc.EaseBackOut.create(cc.MoveBy.create(0.5,cc.p(0,255)))));

        //执行动作
        var ac0=cc.Sequence.create(cc.DelayTime.create(0.5),cc.FadeOut.create(0.2));
        image01.runAction(ac0);
        var ac1=cc.Sequence.create(cc.DelayTime.create(0.8),cc.FadeIn.create(0.2));
        image02.runAction(ac1);
        var ac2=cc.Sequence.create(cc.DelayTime.create(1.5),cc.FadeIn.create(0.2));
        image03.runAction(ac2);
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
            default:break;
        }
        if(this.pageIndex<12)
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
            var shield1=cc.Sprite.create(s_img1);
            shield1.setPosition(cc.p(this.winSize.width*0.5,this.winSize.height*0.5));
            shield1.setTag(1200);
            this.addChild(shield1,5);
            var shield2=cc.Sprite.create(s_img2);
            shield2.setPosition(cc.p(this.winSize.width*0.8,this.winSize.height*0.9));
            shield2.setTag(1201);
            this.addChild(shield2,5);
            var label=cc.LabelTTF.create("点击这里分享","黑体",35);
            label.setAnchorPoint(cc.p(0.5,0.5));
            label.setPosition(cc.p(this.winSize.width*0.5,this.winSize.height*0.78));
            label.setColor(cc.c3(255,255,255));
            label.setTag(1202);
            this.addChild(label,5);
            if(this.getChildByTag(1103))this.getChildByTag(1103).setEnabled(false);
            if(this.getChildByTag(1104))this.getChildByTag(1104).setEnabled(false);
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
        if(Math.abs(this.endTouch-this.startTouch)>=this.winSize.height*0.05&&(this.endTouch-this.startTouch)>0&&this.isShared==false)
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
        if(Math.abs(this.endTouch-this.startTouch)>=this.winSize.height*0.05&&(this.endTouch-this.startTouch)<0&&this.isShared==false)
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

        if(this.isShared==true&&this.pageIndex==12)
        {
            if(this.getChildByTag(1103))this.getChildByTag(1103).setEnabled(true);
            if(this.getChildByTag(1104))this.getChildByTag(1104).setEnabled(true);
            this.removeChildByTag(1200,true);
            this.removeChildByTag(1201,true);
            this.removeChildByTag(1202,true);
            this.isShared=false;
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
