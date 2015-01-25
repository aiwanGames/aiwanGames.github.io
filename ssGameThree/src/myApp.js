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
    sound:true,

    init:function ()
    {
        this._super();
        this.winsize = cc.Director.getInstance().getWinSize();
        this.audio=cc.AudioEngine.getInstance();
        //背景
        var sp_back1=cc.Sprite.create(s_img01);
        sp_back1.setAnchorPoint(cc.p(0.5,0));
        sp_back1.setPosition(cc.p(this.winsize.width*0.5,0));
        this.addChild(sp_back1,0);
        //提示
        var tips=cc.LabelTTF.create("手指划过，羊毛飞飞","Arial",35);
        tips.setAnchorPoint(cc.p(0.5,0.5));
        tips.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.385));
        tips.setColor(cc.c3(235,90,55));
        this.addChild(tips,1);
        //开始按钮
        var kaishiItem = cc.MenuItemImage.create(s_img02,s_img02,this.startGame,this);
        var menu = cc.Menu.create(kaishiItem);
        menu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.25));
        this.addChild(menu, 1);
        //logo
        var sp_back2=cc.Sprite.create(s_img07);
        sp_back2.setAnchorPoint(cc.p(0.5,0.0));
        sp_back2.setScale(0.8);
        sp_back2.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.45));
        this.addChild(sp_back2, 2);
        var ac=cc.Repeat.create(cc.Sequence.create(cc.DelayTime.create(1.2),cc.RotateBy.create(0.1,-20),cc.RotateBy.create(0.1,20),cc.RotateBy.create(0.1,20),cc.RotateBy.create(0.1,-20)),999);
        sp_back2.runAction(ac);
        //音效开关
        var sound=cc.Sprite.create(s_img14);
        sound.setScale(0.7);
        sound.setTag(100);
        sound.setAnchorPoint(cc.p(1.0,0));
        sound.setPosition(cc.p(this.winsize.width,this.winsize.height*0.75));
        this.addChild(sound,1);

        var ac0=cc.RotateBy.create(0.5,10.0);
        var ac1=cc.RotateBy.create(0.5,-10.0);
        var ac2=cc.RotateBy.create(0.5,-10.0);
        var ac3=cc.RotateBy.create(0.5,10.0);
        var ac4=cc.Sequence.create(ac0,ac1,ac2,ac3);
        sound.runAction(cc.RepeatForever.create(ac4));

        this.setTouchEnabled(true);
        //this.schedule(this.scheduleMao,2.0,9999,0.5);
        return true;
    },

    scheduleMao:function()
    {
        //羊毛飞溅
        var sp1 = cc.Sprite.create(s_img12);
        var sp2 = cc.Sprite.create(s_img12);
        var sp3 = cc.Sprite.create(s_img12);
        var ac1=null,ac2=null,ac3=null;
        sp1.setScale(0.5);
        sp2.setScale(0.5);
        sp3.setScale(0.5);

        sp1.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.5));
        this.addChild(sp1,0);
        ac1=cc.Spawn.create(cc.MoveBy.create(0.4,cc.p(-60,60)),cc.RotateBy.create(0.4,180));
        ac2 = cc.CallFunc.create(this.removeItem, this);
        ac3=cc.Sequence.create(ac1,ac2);
        sp1.runAction(ac3);

        sp2.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.5));
        this.addChild(sp2,0);
        ac1=cc.Spawn.create(cc.MoveBy.create(0.4,cc.p(60,60)),cc.RotateBy.create(0.4,180));
        ac2 = cc.CallFunc.create(this.removeItem, this);
        ac3=cc.Sequence.create(ac1,ac2);
        sp2.runAction(ac3);

        sp3.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.5));
        this.addChild(sp3,0);
        ac1=cc.Spawn.create(cc.MoveBy.create(0.4,cc.p(0,-60)),cc.RotateBy.create(0.4,180));
        ac2 = cc.CallFunc.create(this.removeItem, this);
        ac3=cc.Sequence.create(ac1,ac2);
        sp3.runAction(ac3);
     },

    startGame:function()
    {
        var scene=mainLayer.create(this.sound);
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,scene));
        if (this.sound == true)
        {
            this.audio.playMusic(s_music, true);
        }
    },

    onTouchesBegan:function(touches, event)
    {
        var touch = touches[0];
        var location = touch.getLocation();
        var sn = this.getChildByTag(100);
        var soundRect = sn.getBoundingBox();
        if (cc.rectContainsPoint(soundRect, location))
        {
            if (this.sound == false)
            {
                this.sound = true;
                sn.initWithFile(s_img14);
            }
            else
            {
                this.sound = false;
                sn.initWithFile(s_img15);
            }
            sn.setAnchorPoint(cc.p(1.0,0));
            sn.setPosition(cc.p(this.winsize.width,this.winsize.height*0.75));
        }
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

beginLayer.create=function()
{
    var _beginLayer=new beginLayer();
    _beginLayer.init();
    var _scene=cc.Scene.create();
    _scene.addChild(_beginLayer);
    return _scene;
};
