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
    imageIndex:1,
    imageCount:2,
    playOver:false,
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

    init:function ()
    {
        //初始化父类
        this._super();
        this.winsize = cc.Director.getInstance().getWinSize();
        this.setColor(cc.c4(242,176,79,255));
        //this.scheduleUpdate();
        this.setTouchEnabled(true);
        this.initImages();
        this.page1Action();
        document.title = window.wxData.desc = "随手记HTML5分享内容（分享朋友圈）";
        document.title = window.wxFriend.desc = "随手记HTML5分享内容（分享好友）";
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
        this.image01.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.43));
        this.image02.setPosition(cc.p(this.winsize.width+this.image02.getContentSize().width,this.winsize.height*0.5));
        this.image03.setPosition(cc.p(this.winsize.width*0.5,-this.image03.getContentSize().height*0.5));
        this.image04.setPosition(cc.p(this.winsize.width*0.5,-this.image04.getContentSize().height*0.5));
        this.image05.setPosition(cc.p(this.winsize.width*0.5,-this.image05.getContentSize().height*0.5));
        this.image06.setPosition(cc.p(this.winsize.width+this.image06.getContentSize().width,this.winsize.height*0.6));
        this.image07.setPosition(cc.p(-this.image07.getContentSize().width*0.5,this.winsize*0.23));
        this.image08.setPosition(cc.p(this.winsize.width+this.image08.getContentSize().width*0.5,this.winsize*0.13));
        this.image09.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.43));
        this.image01.setOpacity(0);
        this.image09.setVisible(false);
        this.addChild(this.image01,1);
        this.addChild(this.image02,1);
        this.addChild(this.image03,1);
        this.addChild(this.image04,1);
        this.addChild(this.image05,1);
        this.addChild(this.image06,1);
        this.addChild(this.image07,1);
        this.addChild(this.image08,1);
        this.addChild(this.image09,0);
    },

    page1Action:function()
    {
        var ac0=cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(this.winsize.width*0.5,this.winsize.height*0.7)));
        var ac1=cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(this.winsize.width*0.5,this.winsize.height*0.63)));
        var ac2=cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(this.winsize.width*0.45,this.winsize.height*0.57)));
        var ac3=cc.JumpTo.create(1.0,cc.p(this.winsize.width*0.72,this.winsize.height*0.57),100,3);
        var ac4=cc.Sequence.create(cc.ScaleTo.create(0.15,1.2),cc.ScaleTo.create(0.1,1.0));
        this.image03.runAction(cc.Sequence.create(cc.DelayTime.create(0.5),ac0));
        this.image04.runAction(cc.Sequence.create(cc.DelayTime.create(0.8),ac1));
        this.image05.runAction(cc.Sequence.create(cc.DelayTime.create(1.1),ac2));
        this.image06.runAction(cc.Sequence.create(cc.DelayTime.create(1.6),ac3,ac4));
        this.image01.runAction(cc.Sequence.create(cc.DelayTime.create(2.7),cc.FadeIn.create(1.0)));
        this.image09.runAction(cc.Sequence.create(cc.DelayTime.create(3.5),cc.Show.create(),cc.Repeat.create(cc.RotateBy.create(3.0,180),999)));
    },

    page2Action:function()
    {
        var ac0=cc.MoveTo.create(0.5,cc.p(this.winsize.width*0.5,this.winsize.height*0.9));
        var ac1=cc.MoveTo.create(0.5,cc.p(this.winsize.width*0.5,this.winsize.height*0.83));
        var ac2=cc.MoveTo.create(0.5,cc.p(this.winsize.width*0.45,this.winsize.height*0.77));
        var ac3=cc.Spawn.create(cc.MoveTo.create(0.5,cc.p(this.winsize.width*0.72,this.winsize.height*0.77)),cc.RotateBy.create(0.5,360));
        var ac5=cc.Spawn.create(cc.ScaleTo.create(0.5,0.5),cc.MoveTo.create(0.5,cc.p(this.winsize.width*0.32,this.winsize.height*0.63)),cc.RotateBy.create(0.5,-50.0));
        var ac6=cc.Sequence.create(cc.DelayTime.create(0.7),cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(this.winsize.width*0.5,this.winsize.height*0.5))));
        var ac7=cc.Sequence.create(cc.DelayTime.create(0.7),cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(this.winsize.width*0.5,this.winsize.height*0.23))));
        var ac8=cc.Sequence.create(cc.DelayTime.create(0.7),cc.EaseElasticOut.create(cc.MoveTo.create(0.5,cc.p(this.winsize.width*0.65,this.winsize.height*0.13))));
        this.image01.runAction(ac5);
        this.image02.runAction(ac6);
        this.image03.runAction(ac0);
        this.image04.runAction(ac1);
        this.image05.runAction(ac2);
        this.image06.runAction(ac3);
        this.image07.runAction(ac7);
        this.image08.runAction(ac8);
        this.image09.runAction(cc.FadeOut.create(0.2));

        var zailaiItem=cc.MenuItemImage.create(s_img10,s_img10,this.reStart,this);
        var zailaiMenu=cc.Menu.create(zailaiItem);
        zailaiMenu.setPosition(cc.p(this.winsize.width*0.5,zailaiItem.getContentSize().height*0.5));
        this.addChild(zailaiMenu,1);
        },

    reStart:function()
    {
        var scene=beginLayer.create();
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,scene));
    },

    onTouchesEnded:function(touches, event)
    {
        var touch = touches[0];
        this.endTouch = touch.getLocation().y;
        this.imageIndex+=1;
        if(this.imageIndex>this.imageCount)
        {
            this.playOver=true;
        }
        if((this.endTouch-this.startTouch)>=this.winsize.height*0.05&&!this.playOver)
        {
            this.page2Action();
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
