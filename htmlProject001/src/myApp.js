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
    startTouch:0.0,
    endTouch:0.0,
    fontSize:28,
    imageIndex:1,
    imageCount:10,
    playOver:false,
    textArray:null,
    image01:null,
    image02:null,
    image03:null,
    image04:null,
    image05:null,
    image06:null,
    image07:null,
    image08:null,
    image09:null,
    image10:null,
    text01:null,
    text02:null,
    text03:null,
    text04:null,
    text05:null,
    text06:null,
    text07:null,
    text08:null,
    text09:null,
    text10:null,
    textBegin:null,
    textEnd:null,
    imageBegin:null,
    imageEnd:null,

    init:function ()
    {
        //初始化父类
        this._super();
        this.winsize = cc.Director.getInstance().getWinSize();
        this.setColor(cc.c4(242,222,187,255));
        //this.scheduleUpdate();
        this.setTouchEnabled(true);
        this.initImages();
        this.beginImage();
        return true;
    },

    initImages:function()
    {
        //初始化图片位置
        this.image01=cc.Sprite.create(s_img01);
        this.image02=cc.Sprite.create(s_img02);
        this.image03=cc.Sprite.create(s_img03);
        this.image04=cc.Sprite.create(s_img04);
        this.image05=cc.Sprite.create(s_img05);
        this.image06=cc.Sprite.create(s_img06);
        this.image07=cc.Sprite.create(s_img07);
        this.image08=cc.Sprite.create(s_img08);
        this.image09=cc.Sprite.create(s_img09);
        this.image10=cc.Sprite.create(s_img10);
        this.image01.setPosition(cc.p(this.winsize.width*0.5,-this.image01.getContentSize().height*0.5));
        this.image02.setPosition(cc.p(this.winsize.width*0.5,-this.image02.getContentSize().height*0.5));
        this.image03.setPosition(cc.p(this.winsize.width*0.5,-this.image03.getContentSize().height*0.5));
        this.image04.setPosition(cc.p(this.winsize.width*0.5,-this.image04.getContentSize().height*0.5));
        this.image05.setPosition(cc.p(this.winsize.width*0.5,-this.image05.getContentSize().height*0.5));
        this.image06.setPosition(cc.p(this.winsize.width*0.5,-this.image06.getContentSize().height*0.5));
        this.image07.setPosition(cc.p(this.winsize.width*0.5,-this.image07.getContentSize().height*0.5));
        this.image08.setPosition(cc.p(this.winsize.width*0.5,-this.image08.getContentSize().height*0.5));
        this.image09.setPosition(cc.p(this.winsize.width*0.5,-this.image09.getContentSize().height*0.5));
        this.image10.setPosition(cc.p(this.winsize.width*0.5,-this.image10.getContentSize().height*0.5));
        this.addChild(this.image01,1);
        this.addChild(this.image02,1);
        this.addChild(this.image03,1);
        this.addChild(this.image04,1);
        this.addChild(this.image05,1);
        this.addChild(this.image06,1);
        this.addChild(this.image07,1);
        this.addChild(this.image08,1);
        this.addChild(this.image09,1);
        this.addChild(this.image10,1);
        var _text01="1、抗揍。不管你是软妹子还是女汉纸，哪怕你受到一点欺负，理工男都会像发了疯一样的保！护！你！哪怕是寡！不！敌！众！被揍完后，还可以和你笑嘻嘻的去吃路边摊，因为他…没钱。";
        var _text02="文字2";
        var _text03="文字3";
        var _text04="文字4";
        var _text05="文字5";
        var _text06="文字6";
        var _text07="文字7";
        var _text08="文字8";
        var _text09="文字9";
        var _text10="文字10";
        this.text01=cc.LabelTTF.create(_text01,"黑体",this.fontSize,cc.size(500,300),cc.TEXT_ALIGNMENT_LEFT);
        this.text02=cc.LabelTTF.create(_text02,"黑体",this.fontSize,cc.size(500,300),cc.TEXT_ALIGNMENT_CENTER);
        this.text03=cc.LabelTTF.create(_text03,"黑体",this.fontSize,cc.size(500,300),cc.TEXT_ALIGNMENT_CENTER);
        this.text04=cc.LabelTTF.create(_text04,"黑体",this.fontSize,cc.size(500,300),cc.TEXT_ALIGNMENT_CENTER);
        this.text05=cc.LabelTTF.create(_text05,"黑体",this.fontSize,cc.size(500,300),cc.TEXT_ALIGNMENT_CENTER);
        this.text06=cc.LabelTTF.create(_text06,"黑体",this.fontSize,cc.size(500,300),cc.TEXT_ALIGNMENT_CENTER);
        this.text07=cc.LabelTTF.create(_text07,"黑体",this.fontSize,cc.size(500,300),cc.TEXT_ALIGNMENT_CENTER);
        this.text08=cc.LabelTTF.create(_text08,"黑体",this.fontSize,cc.size(500,300),cc.TEXT_ALIGNMENT_CENTER);
        this.text09=cc.LabelTTF.create(_text09,"黑体",this.fontSize,cc.size(500,300),cc.TEXT_ALIGNMENT_CENTER);
        this.text10=cc.LabelTTF.create(_text10,"黑体",this.fontSize,cc.size(500,300),cc.TEXT_ALIGNMENT_CENTER);
        this.text01.setAnchorPoint(cc.p(0.5,0.5));
        this.text02.setAnchorPoint(cc.p(0.5,0.5));
        this.text03.setAnchorPoint(cc.p(0.5,0.5));
        this.text04.setAnchorPoint(cc.p(0.5,0.5));
        this.text05.setAnchorPoint(cc.p(0.5,0.5));
        this.text06.setAnchorPoint(cc.p(0.5,0.5));
        this.text07.setAnchorPoint(cc.p(0.5,0.5));
        this.text08.setAnchorPoint(cc.p(0.5,0.5));
        this.text09.setAnchorPoint(cc.p(0.5,0.5));
        this.text10.setAnchorPoint(cc.p(0.5,0.5));
        this.text01.setColor(cc.c3(50,100,180));
        this.text02.setColor(cc.c3(50,100,180));
        this.text03.setColor(cc.c3(50,100,180));
        this.text04.setColor(cc.c3(50,100,180));
        this.text05.setColor(cc.c3(50,100,180));
        this.text06.setColor(cc.c3(50,100,180));
        this.text07.setColor(cc.c3(50,100,180));
        this.text08.setColor(cc.c3(50,100,180));
        this.text09.setColor(cc.c3(50,100,180));
        this.text10.setColor(cc.c3(50,100,180));
        this.text01.setPosition(cc.p(this.winsize.width+this.text01.getContentSize().width*0.5,this.winsize.height*0.6));
        this.text02.setPosition(cc.p(this.winsize.width+this.text02.getContentSize().width*0.5,this.winsize.height*0.6));
        this.text03.setPosition(cc.p(this.winsize.width+this.text03.getContentSize().width*0.5,this.winsize.height*0.6));
        this.text04.setPosition(cc.p(this.winsize.width+this.text04.getContentSize().width*0.5,this.winsize.height*0.6));
        this.text05.setPosition(cc.p(this.winsize.width+this.text05.getContentSize().width*0.5,this.winsize.height*0.6));
        this.text06.setPosition(cc.p(this.winsize.width+this.text06.getContentSize().width*0.5,this.winsize.height*0.6));
        this.text07.setPosition(cc.p(this.winsize.width+this.text07.getContentSize().width*0.5,this.winsize.height*0.6));
        this.text08.setPosition(cc.p(this.winsize.width+this.text08.getContentSize().width*0.5,this.winsize.height*0.6));
        this.text09.setPosition(cc.p(this.winsize.width+this.text09.getContentSize().width*0.5,this.winsize.height*0.6));
        this.text10.setPosition(cc.p(this.winsize.width+this.text10.getContentSize().width*0.5,this.winsize.height*0.6));
        this.addChild(this.text01,1);
        this.addChild(this.text02,1);
        this.addChild(this.text03,1);
        this.addChild(this.text04,1);
        this.addChild(this.text05,1);
        this.addChild(this.text06,1);
        this.addChild(this.text07,1);
        this.addChild(this.text08,1);
        this.addChild(this.text09,1);
        this.addChild(this.text10,1);
    },

    beginImage:function()
    {
        //播放开始
        this.imageBegin=cc.Sprite.create(s_img01);
        this.imageBegin.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.4));
        //this.addChild(this.imageBegin,1);
        var _textBegin="最近，看见朋友圈有好多人吐槽理工男不解风情，说我们木讷古板呆若木鸡的人，你！们！够！了！其实，理工男是最有用的工具（嘿，舍友别打我啊，我只是打个比喻）！\n比如：";
        this.textBegin=cc.LabelTTF.create(_textBegin,"黑体",this.fontSize,cc.size(500,300),cc.TEXT_ALIGNMENT_CENTER);
        this.textBegin.setColor(cc.c3(50,100,180));
        this.textBegin.setAnchorPoint(cc.p(0.5,0.5));
        this.textBegin.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.5));
        this.addChild(this.textBegin,1);
    },

    NextImage:function()
    {
        //换下一张图片
        if(this.playOver)
        {
            return;
        }
        switch(this.imageIndex)
        {
            case 1:
                //this.imageBegin.runAction(this.action02());
                this.image01.runAction(this.action01());
                this.textBegin.runAction(this.action04());
                this.text01.runAction(this.action03());
                break;
            case 2:
                this.image01.runAction(this.action02());
                this.image02.runAction(this.action01());
                this.text01.runAction(this.action04());
                this.text02.runAction(this.action03());
                break;
            case 3:
                this.image02.runAction(this.action02());
                this.image03.runAction(this.action01());
                this.text02.runAction(this.action04());
                this.text03.runAction(this.action03());
                break;
            case 4:
                this.image03.runAction(this.action02());
                this.image04.runAction(this.action01());
                this.text03.runAction(this.action04());
                this.text04.runAction(this.action03());
                break;
            case 5:
                this.image04.runAction(this.action02());
                this.image05.runAction(this.action01());
                this.text04.runAction(this.action04());
                this.text05.runAction(this.action03());
                break;
            case 6:
                this.image05.runAction(this.action02());
                this.image06.runAction(this.action01());
                this.text05.runAction(this.action04());
                this.text06.runAction(this.action03());
                break;
            case 7:
                this.image06.runAction(this.action02());
                this.image07.runAction(this.action01());
                this.text06.runAction(this.action04());
                this.text07.runAction(this.action03());
                break;
            case 8:
                this.image07.runAction(this.action02());
                this.image08.runAction(this.action01());
                this.text07.runAction(this.action04());
                this.text08.runAction(this.action03());
                break;
            case 9:
                this.image08.runAction(this.action02());
                this.image09.runAction(this.action01());
                this.text08.runAction(this.action04());
                this.text09.runAction(this.action03());
                break;
            case 10:
                this.image09.runAction(this.action02());
                this.image10.runAction(this.action01());
                this.text09.runAction(this.action04());
                this.text10.runAction(this.action03());
                break;
        }
        this.imageIndex+=1;
        if(this.imageIndex>this.imageCount+1)
        {
            this.playOver=true;
            this.image10.runAction(this.action02());
            this.text10.runAction(this.action04());
            this.endImage();
        }
    },

    endImage:function()
    {
        //播放结束
        this.imageEnd=cc.Sprite.create(s_img01);
        this.imageEnd.setPosition(cc.p(this.winsize.width*0.5,-this.imageEnd.getContentSize().height*0.5));
        this.addChild(this.imageEnd,1);
        var _textEnd="end";
        this.textEnd=cc.LabelTTF.create(_textEnd,"黑体",this.fontSize,cc.size(500,300),cc.TEXT_ALIGNMENT_CENTER);
        this.textEnd.setColor(cc.c3(50,100,180));
        this.textEnd.setAnchorPoint(cc.p(0.5,0.5));
        this.textEnd.setPosition(cc.p(this.winsize.width+this.textEnd.getContentSize().width*0.5,this.winsize.height*0.6));
        this.addChild(this.textEnd,1);
        this.imageEnd.runAction(this.action01());
        this.textEnd.runAction(this.action03());
    },

    onTouchesEnded:function(touches, event)
    {
        var touch = touches[0];
        this.endTouch = touch.getLocation().y;
        if((this.endTouch-this.startTouch)>=this.winsize.height*0.05&&!this.playOver)
        {
            this.NextImage();
        }
    },

    onTouchesBegan:function(touches, event)
    {
        var touch = touches[0];
        var location = touch.getLocation();
        if(location.y>=0&&location.y<=this.winsize.height*0.4)
        {
            this.startTouch=location.y;
        }
        else
        {
            this.startTouch=this.winsize.height;
        }
    },

    removeSprite:function(sprite)
    {
        sprite.stopAllActions();
        this.removeChild(sprite,true);
    },

    action01:function()
    {
        //由下至上移动到中间
        var ac0=cc.MoveTo.create(0.5,cc.p(this.winsize.width*0.5,this.winsize.height*0.4));
        var ac1=cc.EaseElasticOut.create(ac0);
        //var ac2=cc.ScaleTo.create(0.15,1.2);
        //var ac3=cc.ScaleTo.create(0.1,1.0);
        var acFinal=cc.Sequence.create(ac1);
        return acFinal;
    },

    action02:function()
    {
        //由中间移动到屏幕外并移除
        var ac0=cc.MoveTo.create(0.2,cc.p(this.winsize.width*0.5,this.winsize.height));
        var ac1=cc.FadeOut.create(0.2);
        var ac2=cc.CallFunc.create(this.removeSprite,this);
        var acFinal=cc.Sequence.create(cc.Spawn.create(ac0,ac1),ac2);
        return acFinal;
    },

    action03:function()
    {
        //自右向左移动至中间
        var ac0=cc.MoveTo.create(0.5,cc.p(this.winsize.width*0.5,this.winsize.height*0.6));
        var ac1=cc.EaseElasticOut.create(ac0);
        //var ac2=cc.ScaleTo.create(0.15,1.2);
        //var ac3=cc.ScaleTo.create(0.1,1.0);
        var acFinal=cc.Sequence.create(ac1);
        return acFinal;
    },

    action04:function()
    {
        //由中间移动至屏幕外并移除
        var ac0=cc.MoveTo.create(0.2,cc.p(0,this.winsize.height*0.7));
        var ac1=cc.FadeOut.create(0.2);
        var ac2=cc.CallFunc.create(this.removeSprite,this);
        var acFinal=cc.Sequence.create(cc.Spawn.create(ac0,ac1),ac2);
        return acFinal;
    }

});

var MyScene = cc.Scene.extend({

    onEnter:function ()
    {
        this._super();
        var layer = new beginLayer();
        this.addChild(layer);
        layer.init();
    }
});
