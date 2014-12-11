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
        this.setColor(cc.c3(130,200,252));

        //背景图片
        var sp_backGround1=cc.Sprite.create(s_img13);
        sp_backGround1.setAnchorPoint(cc.p(0,0));
        sp_backGround1.setPosition(cc.p(0,0));
        this.addChild(sp_backGround1,0);
        var ac0=cc.MoveBy.create(10.0,cc.p(-sp_backGround1.getContentSize().width,0));
        var ac1=cc.Place.create(cc.p(sp_backGround1.getContentSize().width,0));
        var ac2=cc.MoveBy.create(20.0,cc.p(-sp_backGround1.getContentSize().width*2,0));
        var ac3=cc.Place.create(cc.p(sp_backGround1.getContentSize().width,0));
        var ac4=cc.Sequence.create(ac0,ac1,cc.Repeat.create(cc.Sequence.create(ac2,ac3),999));
        sp_backGround1.runAction(ac4);

        var sp_backGround2=cc.Sprite.create(s_img13);
        sp_backGround2.setAnchorPoint(cc.p(0,0));
        sp_backGround2.setPosition(cc.p(sp_backGround2.getContentSize().width,0));
        this.addChild(sp_backGround2,0);
        ac0=cc.MoveBy.create(20.0,cc.p(-sp_backGround2.getContentSize().width*2,0));
        ac1=cc.Place.create(cc.p(sp_backGround2.getContentSize().width,0));
        ac2=cc.RepeatForever.create(cc.Sequence.create(ac0,ac1));
        sp_backGround2.runAction(ac2);

        //按钮
        var kaishiItem = cc.MenuItemImage.create(s_img01,s_img02,this.startGame,this);
        var menu = cc.Menu.create(kaishiItem);
        menu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.4));
        this.addChild(menu, 1);

        //主角飞机
        var sp_me=cc.Sprite.create(s_img14);
        sp_me.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.8));
        this.addChild(sp_me,1);
        ac0=cc.MoveBy.create(1.2,cc.p(0,-this.winsize.height*0.07));
        ac1=cc.MoveBy.create(1.2,cc.p(0,this.winsize.height*0.07));
        ac2=cc.RepeatForever.create(cc.Sequence.create(ac0,ac1));
        sp_me.runAction(ac2);

        //调用update与自定义回调函数
        //this.scheduleUpdate();
        //this.schedule(this.addBlocks,3.0,cc.REPEAT_FOREVER,0.2);
        return true;
    },

    startGame:function()
    {
        var scene=mainLayer.create();
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,scene));
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
