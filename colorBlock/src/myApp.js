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

var beginLayer = cc.Layer.extend({
    winsize:null,

    init:function ()
    {
        // 1. super init first
        this._super();
        this.winsize = cc.Director.getInstance().getWinSize();
        //背景图片
        var sp_back=cc.Sprite.create(s_img01);
        sp_back.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.5));
        this.addChild(sp_back,1);
        //30秒
        var kaishiItem = cc.MenuItemImage.create(s_img02,s_img03,this.startGame,this);
        var menu = cc.Menu.create(kaishiItem);
        menu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.36));
        this.addChild(menu, 1);
        //疯狂模式
        var kaishiItem1 = cc.MenuItemImage.create(s_img12,s_img13,this.startGameCrazy,this);
        var menu1 = cc.Menu.create(kaishiItem1);
        menu1.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.25));
        this.addChild(menu1, 1);
        //logo
        var sp_logo=cc.Sprite.create(s_img09);
        sp_logo.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.6));
        this.addChild(sp_logo,1);
        return true;
    },

    startGame:function()
    {
        cc.log("go");
        var scene=mainLayer.create(1);
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,scene));
    },

    startGameCrazy:function()
    {
        cc.log("go");
        var scene=mainLayer.create(2);
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,scene));
    }
});

MyScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new beginLayer();
        this.addChild(layer);
        layer.init();
    }
});

MyScene.create=function()
{
    var _beginLayer=new beginLayer();
    _beginLayer.init();
    var _scene=cc.Scene.create();
    _scene.addChild(_beginLayer);
    return _scene;
}