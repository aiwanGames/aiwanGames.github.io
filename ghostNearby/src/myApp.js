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
    inSearch:false,
    curHour:0,
    searchCount:0,
    ghostIndex:0,

    init:function ()
    {
        //初始化父类
        this._super();
        this.winsize = cc.Director.getInstance().getWinSize();
        this.setColor(cc.c3(0,0,0));

        var myDate=new Date();
        this.curHour=myDate.getHours();

        //sys.localStorage.setItem("isGhostShared","0");
        //sys.localStorage.setItem("ghostIndex",5);
        var isShared=sys.localStorage.getItem("isGhostShared");
        var ghostindex=sys.localStorage.getItem("ghostIndex");
        if(isShared=="0"&&ghostindex==6)
        {
            this.ghostIndex=6;
            this.gotoGameOver();
        }
        else
        {
            //搜索
            var search=cc.Sprite.create(s_img01);
            search.setPosition(this.winsize.width*0.5,this.winsize.height*0.4);
            search.setScale(0.8);
            search.setTag(100);
            this.addChild(search,2);
            var curt="";
            var gn=0;
            switch(this.curHour)
            {
                case 23:
                case 0:curt="子时";gn=4;break;
                case 1:
                case 2:curt="丑时";gn=5;break;
                case 3:
                case 4:curt="寅时";gn=4;break;
                case 5:
                case 6:curt="卯时";gn=3;break;
                case 7:
                case 8:curt="辰时";gn=2;break;
                case 9:
                case 10:curt="巳时";gn=1;break;
                case 11:
                case 12:curt="午时";gn=1;break;
                case 13:
                case 14:curt="未时";gn=1;break;
                case 15:
                case 16:curt="申时";gn=1;break;
                case 17:
                case 18:curt="酉时";gn=2;break;
                case 19:
                case 20:curt="戌时";gn=2;break;
                case 21:
                case 22:curt="亥时";gn=3;break;
            }

            //分数背景
            var scback=cc.Sprite.create(s_img08);
            scback.setPosition(this.winsize.width*0.5,this.winsize.height-scback.getContentSize().height*0.5);
            scback.setOpacity(180);
            this.addChild(scback,1);

            var shichen=cc.LabelTTF.create("当前时辰:"+curt, "Arial",25);
            shichen.setColor(cc.c3(245,245,50));
            shichen.setAnchorPoint(cc.p(0.5,0.5));
            shichen.setPosition(cc.p(this.winsize.width*0.25,scback.getContentSize().height*0.5));
            scback.addChild(shichen,1);

            var ghosts=cc.LabelTTF.create("周围共有"+(gn+this.getRandom(2))+"只鬼", "Arial",25);
            ghosts.setColor(cc.c3(245,245,50));
            ghosts.setAnchorPoint(cc.p(0.5,0.5));
            ghosts.setPosition(cc.p(this.winsize.width*0.75,scback.getContentSize().height*0.5));
            scback.addChild(ghosts,1);

            var gh=cc.Sprite.create(s_img09);
            gh.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height-gh.getContentSize().height*0.5));
            this.addChild(gh,1);

            var tishi=cc.LabelTTF.create("按住按钮开始探测", "Arial",25);
            tishi.setColor(cc.c3(245,245,50));
            tishi.setAnchorPoint(cc.p(0.5,0.5));
            tishi.setPosition(cc.p(this.winsize.width*0.5,tishi.getContentSize().height*0.3));
            tishi.setTag(150);
            this.addChild(tishi,1);

            var ac2=cc.FadeOut.create(1.0);
            var ac3=cc.FadeIn.create(0.1);
            tishi.runAction(cc.RepeatForever.create(cc.Sequence.create(ac2,ac3)));

            this.schedule(this.updateLight,1.5);
        }

        //墓地背景
        var back1=cc.Sprite.create(s_img07);
        back1.setPosition(this.winsize.width*0.5,this.winsize.height*0.5);
        this.addChild(back1,0);

        //红色背景框
        var back=cc.Sprite.create(s_img03);
        back.setPosition(this.winsize.width*0.5,this.winsize.height*0.5);
        back.setScaleX(1.2);
        back.setScaleY(1.05);
        this.addChild(back,2);
        var ac0=cc.FadeOut.create(1.0);
        var ac1=cc.FadeIn.create(0.4);
        back.runAction(cc.RepeatForever.create(cc.Sequence.create(ac0,ac1,null)));

        this.setTouchEnabled(true);
        return true;
    },

    updateLight: function()
    {
        var px,py;
        px=this.getRandom(500)+50;
        py=this.getRandom(700)+100;
        var light=cc.Sprite.create(s_img10);
        light.setPosition(cc.p(px,py));
        this.addChild(light,1);

        var ac0=cc.FadeOut.create(0.5);
        var ac1=cc.CallFunc.create(this.removeSprite,this);
        light.runAction(cc.Sequence.create(ac0,ac1,null));
    },

    updateCircle:function()
    {
        var circle=cc.Sprite.create(s_img02);
        circle.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.4));
        circle.setOpacity(200);
        circle.setScale(0.1);
        this.addChild(circle,0);

        var ac0=cc.ScaleTo.create(2.3,2.5);
        var ac1=cc.CallFunc.create(this.removeSprite,this);
        circle.runAction(cc.Sequence.create(ac0,ac1,null));

        var rate=0;
        if(this.curHour>=6&&this.curHour<=16)
        {
            rate=15;
        }
        else if(this.curHour>=17&&this.curHour<=22)
        {
            rate=10;
        }
        else if(this.curHour>=0&&this.curHour<=5)
        {
            rate=5;
        }
        else
        {
            rate=8;
        }

        if(this.getRandom(rate)==1&&this.searchCount>3)
        {
            var index=this.getRandom(3);
            if(index==1)
            {
                this.ghostIndex=6;
            }
            else
            {
                this.ghostIndex=this.getRandom(6)+1;
            }
            this.searchCount=0;
            this.gotoGameOver();
        }

        if(this.searchCount==11)
        {
            this.ghostIndex=0;
            this.searchCount=0;
            this.gotoGameOver();
        }
        this.searchCount+=1;
    },

    removeSprite:function(_sprite)
    {
        _sprite.stopAction();
        this.removeChild(_sprite,true);
    },

    getRandom:function(maxNum)
    {
        return Math.floor(Math.random() * maxNum) % maxNum;
    },

    onTouchesEnded:function(touches, event)
    {
        this.inSearch=false;
        this.searchCount=0;
        this.unschedule(this.updateCircle);
    },

    onTouchesBegan:function(touches, event)
    {
        var touch = touches[0];
        var location = touch.getLocation();
        var search=this.getChildByTag(100);
        if(search==null)
        {
            return;
        }
        if (!this.inSearch&&(cc.rectContainsPoint(search.getBoundingBox(),location)))
        {
            this.inSearch = true;
            this.removeChildByTag(150,true);
            this.schedule(this.updateCircle,1.0,9999,0.0);
        }
    },

    gotoGameOver:function()
    {
        var scene=overLayer.create(this.ghostIndex);
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
