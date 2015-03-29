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
        this._super();
        this.winsize = cc.Director.getInstance().getWinSize();
        //document.body.style.backgroundColor="#FFEEAC";

        var ma=cc.Sprite.create(s01);
        ma.setAnchorPoint(cc.p(0.5,0));
        ma.setPosition(cc.p(this.winsize.width*0.5,0));
        this.addChild(ma,0);

        var mb = cc.MenuItemImage.create(s02,s02,this.startGame,this);
        var mc = cc.Menu.create(mb);
        mc.setPosition(cc.p(this.winsize.width*0.5,-this.winsize.height*0.1));
        this.addChild(mc, 1);
        mc.runAction(cc.Sequence.create(cc.DelayTime.create(0.3),cc.EaseBackOut.create(cc.MoveTo.create(0.3,cc.p(this.winsize.width*0.5,this.winsize.height*0.1)))));

        var md=cc.Sprite.create(s03);
        md.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.65));
        this.addChild(md,1);

        var me=cc.Sprite.create(s04);
        me.setPosition(cc.p(this.winsize.width*0.85,this.winsize.height*0.95));
        me.setScale(0.1);
        this.addChild(me,1);
        me.runAction(cc.Sequence.create(cc.DelayTime.create(0.6),cc.EaseBackOut.create(cc.ScaleTo.create(0.35,1.0)),cc.Repeat.create(cc.Sequence.create(cc.DelayTime.create(1.3),cc.ScaleTo.create(0.2,0.1),cc.EaseBackOut.create(cc.ScaleTo.create(0.1,1.0))),999999)));

        var mf=cc.Sprite.create(s20);
        mf.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.3));
        mf.setScale(2.5);
        this.addChild(mf,1);
        mf.runAction(cc.Sequence.create(cc.EaseBackOut.create(cc.ScaleTo.create(0.3,1.0)),cc.DelayTime.create(1.5),cc.Repeat.create(cc.Sequence.create(cc.RotateBy.create(0.1,7),cc.RotateBy.create(0.1,-7),cc.RotateBy.create(0.1,-7),cc.RotateBy.create(0.1,7),cc.DelayTime.create(1.2)),99999999)));

        this.setTouchEnabled(true);
        return true;
    },

    startGame:function()
    {
        var scene=mainLayer.create(this.sound);
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

beginLayer.create=function()
{
    var _beginLayer=new beginLayer();
    _beginLayer.init();
    var _scene=cc.Scene.create();
    _scene.addChild(_beginLayer);
    return _scene;
};
