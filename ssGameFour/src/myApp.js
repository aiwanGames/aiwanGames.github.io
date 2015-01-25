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
    audio:null,

    init:function ()
    {
        this._super();
        this.setColor(cc.c4(240,20,20,255));
        this.winsize = cc.Director.getInstance().getWinSize();
        this.audio=cc.AudioEngine.getInstance();

        this.setTouchEnabled(true);
        this.setAccelerometerEnabled(true);
        return true;
    },

    getRandom:function(maxsize)
    {
        return Math.floor(Math.random() * maxsize) % maxsize;
    },

    removeSprite:function(_sprite)
    {
        _sprite.stopAllActions();
        this.removeChild(_sprite,true);
    },

    restart:function()
    {
        this.audio.stopMusic();
        var scene=beginLayer.create();
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,scene));
    },

    share2Friend:function()
    {
        var back02=cc.Sprite.create(s_img08);
        back02.setTag(107);
        back02.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.5));
        this.addChild(back02,6);
        var arrow=cc.Sprite.create(s_img09);
        arrow.setTag(109);
        arrow.setPosition(cc.p(this.winsize.width*0.8,this.winsize.height*0.9));
        this.addChild(arrow,6);
        var label=cc.LabelTTF.create("点击这里分享","黑体",35);
        label.setAnchorPoint(cc.p(0.5,0.5));
        label.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.78));
        label.setColor(cc.c3(255,255,255));
        label.setTag(108);
        this.addChild(label,6);
        this.getChildByTag(120).setEnabled(false);
        this.getChildByTag(121).setEnabled(false);
        this.getChildByTag(122).setEnabled(false);
        this.canTouch=false;
    },

    onTouchesEnded:function(touches, event)
    {

    },

    onTouchesBegan:function(touches, event)
    {
        var touch = touches[0];
        var location = touch.getLocation();
        var sn=this.getChildByTag(100);
        var soundRect=sn.getBoundingBox();
        if(cc.rectContainsPoint(soundRect,location)&&this.canTouch)
        {
            if(this.sound==false)
            {
                this.sound=true;
                sn.initWithFile(s_img10);
                this.audio.playMusic(s_music,true);
            }
            else
            {
                this.sound=false;
                sn.initWithFile(s_img11);
                this.audio.stopMusic();
            }
        }
    },

    onAccelerometer:function(accelerationValue)
    {
        var SHAKE_THRESHOLD = 3000;
        var lastUpdate = 0;
        var x, y, z, lastX, lastY, lastZ;
        var curTime = new Date().getTime();

        if (curTime-lastUpdate>100)
        {
            var diffTime = curTime - lastUpdate;
            lastUpdate = curTime;
            x = accelerationValue.x;
            y = accelerationValue.y;
            z = accelerationValue.z;
            var speed = Math.abs(x +y + z - lastX - lastY - lastZ) / diffTime * 10000;
            if (speed > SHAKE_THRESHOLD)
            {
                var arrow=cc.Sprite.create(s_img09);
                arrow.setTag(109);
                arrow.setPosition(cc.p(this.winsize.width*0.8,this.winsize.height*0.9));
                this.addChild(arrow,6);
            }
            lastX = x;
            lastY = y;
            lastZ = z;
        }
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

var MyScene = cc.Scene.extend({
    onEnter:function ()
    {
        this._super();
        var layer = new beginLayer();
        this.addChild(layer);
        layer.init();
    }
});
