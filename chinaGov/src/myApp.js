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

    init:function ()
    {
        //初始化父类
        this._super();
        this.winsize = cc.Director.getInstance().getWinSize();
        this.setColor(cc.c3(220,70,70));
        //字
        var sp_ui01=cc.Sprite.create(s_img10);
        sp_ui01.setPosition(this.winsize.width*0.5,this.winsize.height*0.7);
        this.addChild(sp_ui01,1);
        //前言
        var tips=cc.LabelTTF.create(" 规则(1):从第1张图中寻找潜在规律.\n规则(2):匹配第2张图中空缺的部分.","黑体",25,cc.size(500,120),cc.TEXT_ALIGNMENT_CENTER);
        tips.setAnchorPoint(cc.p(0.5,0.5));
        tips.setColor(cc.c3(255,220,135));
        tips.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.42));
        this.addChild(tips,1);
        //按钮
        var kaishiItem = cc.MenuItemImage.create(s_img01,s_img01,this.startGameModel01,this);
        var menu = cc.Menu.create(kaishiItem);
        menu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.3));
        this.addChild(menu, 1);

        //若之前分享过，则显示查看答案
        //sys.localStorage.setItem("isChinaWordsShared","0");
        var hasSharedBefore=sys.localStorage.getItem("isChinaGovShared");
        if(hasSharedBefore=="1")
        {
            var chakankaishiItem = cc.MenuItemImage.create(s_img02,s_img02,this.startGameModel02,this);
            var chakanmenu = cc.Menu.create(chakankaishiItem);
            chakanmenu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.15));
            this.addChild(chakanmenu, 1);
        }

        return true;
    },

    startGameModel01:function()
    {
        var scene=mainLayer.create(1);
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,scene));
    },

    startGameModel02:function()
    {
        var scene=mainLayer.create(2);
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,scene));
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

var myScene = cc.Scene.extend({

    onEnter:function ()
    {
        this._super();
        var layer = new beginLayer();
        this.addChild(layer);
        layer.init();
    }
});
