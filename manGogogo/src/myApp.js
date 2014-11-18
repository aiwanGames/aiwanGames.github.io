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
        // 1. super init first
        this._super();
        this.winsize = cc.Director.getInstance().getWinSize();
        this.setColor(cc.c4(255,255,255,255));

        //go按钮
        var kaishiItem = cc.MenuItemImage.create(s_go,s_go2,this.startGame,this);
        var menu = cc.Menu.create(kaishiItem);
        menu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.36));
        this.addChild(menu, 1);

        //主角动画

        var _spriteFrameCache=cc.SpriteFrameCache.getInstance();
        _spriteFrameCache.addSpriteFrames(s_manplist);
       /*
        var _animation=cc.Animation.create();
        _animation.addSpriteFrame(_spriteFrameCache.getSpriteFrame("img_man_01.png"));
        _animation.addSpriteFrame(_spriteFrameCache.getSpriteFrame("img_man_02.png"));
        _animation.addSpriteFrame(_spriteFrameCache.getSpriteFrame("img_man_03.png"));
        _animation.addSpriteFrame(_spriteFrameCache.getSpriteFrame("img_man_04.png"));
        _animation.addSpriteFrame(_spriteFrameCache.getSpriteFrame("img_man_05.png"));
        _animation.setDelayPerUnit(0.125);
        _animation.setLoops(999);
        var _animate=cc.Animate.create(_animation);
        */
        var man=cc.Sprite.createWithSpriteFrameName("img_man_01.png");
        man.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.54));
        this.addChild(man,1);
        //man.runAction(_animate);

        //石块
        var block1 =cc.Sprite.create(s_block1);
        block1.setAnchorPoint(cc.p(0.5,1.0));
        block1.setPosition(cc.p(this.winsize.width*0.5,man.getPositionY()-man.getContentSize().height*0.4));
        this.addChild(block1,1);

        this.schedule(this.addBlocks,3.0,cc.REPEAT_FOREVER,0.2);
        return true;
    },

    addBlocks:function()
    {
        var idx=this.getRandom(2);
        var block_img=idx>0?s_block1:s_block2;
        var block1 =cc.Sprite.create(block_img);
        block1.setPosition(cc.p(this.winsize.width*0.15,this.winsize.height));
        this.addChild(block1,1);
        var ac0=cc.MoveBy.create(this.winsize.height/960*5.0,cc.p(0,-this.winsize.height));
        var ac1=cc.CallFunc.create(this.removeSprite,this);
        block1.runAction(cc.Sequence.create(ac0,ac1));

        idx=this.getRandom(2);
        block_img=idx>0?s_block1:s_block2;
        var block2 =cc.Sprite.create(block_img);
        block2.setPosition(cc.p(this.winsize.width*0.85,0.0));
        this.addChild(block2,1);
        var ac0=cc.MoveBy.create(this.winsize.height/960*5.0,cc.p(0,this.winsize.height));
        var ac1=cc.CallFunc.create(this.removeSprite,this);
        block2.runAction(cc.Sequence.create(ac0,ac1));
    },

    startGame:function()
    {
        cc.log("go");
        var scene=mainLayer.create();
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,scene));
    },

    removeSprite:function(_sprite)
    {
        _sprite.stopAllActions();
          this.removeChild(_sprite,true);
    },

    getRandom:function(maxNum)
    {
        //生成随机数
        return Math.floor(Math.random() * maxNum) % maxNum;
    }

});

var MyScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new beginLayer();
        this.addChild(layer);
        layer.init();
    }
});
