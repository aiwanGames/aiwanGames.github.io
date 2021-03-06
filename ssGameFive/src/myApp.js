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
        document.body.style.backgroundColor="#98D8FB";
        var content="啪啪啪，与小伙伴击掌，一起Give me five！";
        document.title = window.wxData.desc = content;
        document.title = window.wxFriend.desc = content;

        var sp_back1=cc.Sprite.create(s_00);
        sp_back1.setAnchorPoint(cc.p(0.5,0));
        sp_back1.setPosition(cc.p(this.winsize.width*0.5,0));
        this.addChild(sp_back1,0);

        var kaishiItem = cc.MenuItemImage.create(s_04,s_05,this.startGame,this);
        kaishiItem.setOpacity(0);
        var menu = cc.Menu.create(kaishiItem);
        menu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.33));
        this.addChild(menu, 1);
        kaishiItem.runAction(cc.FadeIn.create(0.6));

        var sp_back2=cc.Sprite.create(s_03);
        sp_back2.setScale(0.01);
        sp_back2.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.7));
        this.addChild(sp_back2, 1);
        var ac=cc.Sequence.create(cc.DelayTime.create(0.4),cc.EaseElasticOut.create(cc.ScaleTo.create(0.7,1)),cc.Repeat.create(cc.RotateBy.create(5,360),9999));
        sp_back2.runAction(ac);

        var sp_back3=cc.Sprite.create(s_01);
        sp_back3.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.67));
        this.addChild(sp_back3, 1);

        var sp_back4=cc.Sprite.create(s_02);
        sp_back4.setAnchorPoint(cc.p(0.5,0));
        sp_back4.setPosition(cc.p(this.winsize.width*0.5,0));
        this.addChild(sp_back4, 1);

        var sp_star=cc.Sprite.create(s_06);
        sp_star.setScale(0.01);
        sp_star.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.85));
        this.addChild(sp_star, 2);
        var ae=cc.Sequence.create(cc.DelayTime.create(0.6),cc.Repeat.create(cc.Sequence.create(cc.EaseElasticOut.create(cc.ScaleTo.create(0.3,1)),cc.DelayTime.create(1.0),cc.ScaleTo.create(0.02,0.01)),9999));
        sp_star.runAction(ae);

        var sp_logo=cc.Sprite.create(s_07);
        sp_logo.setPosition(cc.p(-this.winsize.width*0.3,this.winsize.height*0.12));
        this.addChild(sp_logo, 2);
        sp_logo.runAction(cc.Sequence.create(cc.DelayTime.create(0.3),cc.EaseElasticOut.create(cc.MoveTo.create(0.3,cc.p(this.winsize.width*0.5,this.winsize.height*0.12)))));

        var soundImage=cc.MenuItemImage.create(s_09,s_09,this.setMusicOn,this);
        soundImage.setAnchorPoint(cc.p(1.0,0.0));
        soundImage.setTag(87);
        soundImage.setScale(0.5);
        var soundMenu=cc.Menu.create(soundImage);
        soundMenu.setTag(88);
        soundMenu.setPosition(cc.p(this.winsize.width-5,-this.winsize.height*0.2));
        this.addChild(soundMenu,15);
        soundMenu.runAction(cc.Sequence.create(cc.DelayTime.create(0.5),cc.EaseElasticOut.create(cc.MoveTo.create(0.3,cc.p(this.winsize.width-5,this.winsize.height*0.01)))));

        this.setTouchEnabled(true);
        return true;
    },

    musicOn:function()
    {
        this.audio.playMusic(s_music, true);
    },

    setMusicOn:function()
    {
        if(this.getChildByTag(87))this.removeChildByTag(87,true);
        if(this.getChildByTag(88))this.removeChildByTag(88,true);
        if (this.sound == false)
        {
            this.sound = true;
            var soundImage=cc.MenuItemImage.create(s_09,s_09,this.setMusicOn,this);
            soundImage.setAnchorPoint(cc.p(1.0,0.0));
            soundImage.setScale(0.5);
            soundImage.setTag(87);
            var soundMenu=cc.Menu.create(soundImage);
            soundMenu.setTag(88);
            soundMenu.setPosition(cc.p(this.winsize.width-5,this.winsize.height*0.01));
            this.addChild(soundMenu,15);
        }
        else
        {
            this.sound = false;
            var soundImage=cc.MenuItemImage.create(s_08,s_08,this.setMusicOn,this);
            soundImage.setAnchorPoint(cc.p(1.0,0.0));
            soundImage.setScale(0.5);
            soundImage.setTag(87);
            var soundMenu=cc.Menu.create(soundImage);
            soundMenu.setTag(88);
            soundMenu.setPosition(cc.p(this.winsize.width-5,this.winsize.height*0.01));
            this.addChild(soundMenu,15);
        }
    },

    startGame:function()
    {
        if (this.sound)
        {
            if(navigator.userAgent.indexOf('Android')>-1)
            {

            }
            else
            {
                this.audio.playEffect(s_button);
            }
        }
        var scene=mainLayer.create(this.sound);
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,scene));
        if (this.sound == true)
        {
            this.musicOn();
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
