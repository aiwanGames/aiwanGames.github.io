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

        var sp_back1=cc.Sprite.create(s_img01);
        sp_back1.setAnchorPoint(cc.p(0.5,0));
        sp_back1.setPosition(cc.p(this.winsize.width*0.5,0));
        this.addChild(sp_back1,0);

        var sp_logo=cc.Sprite.create(s_img22);
        sp_logo.setPosition(cc.p(this.winsize.width*0.5,64));
        this.addChild(sp_logo,0);

        var tips=cc.LabelTTF.create("移动小羊接财神","Arial",32);
        tips.setAnchorPoint(cc.p(0.5,0.5));
        tips.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.39));
        tips.setColor(cc.c3(153,94,0));
        this.addChild(tips,1);

        var kaishiItem = cc.MenuItemImage.create(s_img02,s_img02,this.startGame,this);
        //kaishiItem.setScale(0.8);
        var menu = cc.Menu.create(kaishiItem);
        menu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.28));
        this.addChild(menu, 1);

        var sp_back2=cc.Sprite.create(s_img05);
        sp_back2.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.58));
        this.addChild(sp_back2, 2);

        var sp_back3=cc.Sprite.create(s_img09);
        sp_back3.setPosition(cc.p(this.winsize.width*0.44,this.winsize.height*0.71));
        this.addChild(sp_back3,1);

        var sp_back4=cc.Sprite.create(s_img09);
        sp_back4.setPosition(cc.p(this.winsize.width*0.56,this.winsize.height*0.71));
        this.addChild(sp_back4,1);

        var sp_back5=cc.Sprite.create(s_img08);
        sp_back5.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.75));
        this.addChild(sp_back5,0);
        var ac=cc.RepeatForever.create(cc.Sequence.create(cc.MoveBy.create(1.0,cc.p(0,15)),cc.MoveBy.create(1.0,cc.p(0,-15))));
        sp_back5.runAction(ac);

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
        return true;
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
