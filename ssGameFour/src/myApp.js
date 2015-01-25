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
    testLabel:null,
    x:0.0,
    y:0.0,
    z:0.0,
    speed:0.0,

    init:function ()
    {
        this._super();
        this.setColor(cc.c4(240,20,20,255));
        this.winsize = cc.Director.getInstance().getWinSize();
        this.audio=cc.AudioEngine.getInstance();

        this.testLabel=cc.LabelTTF.create("X:0\nY:0\nZ:0","Arial",35,cc.Size(500,300),cc.TEXT_ALIGNMENT_LEFT);
        this.testLabel.setAnchorPoint(cc.p(0.0,0.5));
        this.testLabel.setPosition(cc.p(50,650));
        this.testLabel.setColor(cc.c3(255,240,70));
        this.addChild(this.testLabel,1);

        this.setTouchEnabled(true);
        this.setAccelerometerEnabled(true);
        this.schedule(this.updateGame,0.5,999,0.1);
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

    updateGame:function()
    {
        this.testLabel.setString("speed:"+this.speed+"\nX:"+this.x+"\nY:"+this.y+"\nZ:"+this.z);
    },

    onAccelerometer:function(accelerationValue)
    {
        var SHAKE_THRESHOLD = 2.5;
        var lastUpdate = 0;
        var lastX=0,lastY=0,lastZ=0;
        var curTime = new Date().getTime();

        if (curTime-lastUpdate>100)
        {
            var diffTime = curTime - lastUpdate;
            lastUpdate = curTime;
            this.x = accelerationValue.x;
            this.y = accelerationValue.y;
            this.z = accelerationValue.z;
            this.speed = Math.abs(this.x+this.y+this.z-lastX-lastY-lastZ) / diffTime * 10000;
            if (this.speed > SHAKE_THRESHOLD)
            {
                this.testLabel.setString("shaked");
                var shk=cc.Sprite.create(s_img01);
                shk.setPosition(cc.p(320,480));
                this.addChild(shk,6);
            }
            lastX = this.x;
            lastY = this.y;
            lastZ = this.z;
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
