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
    touched:false,
    idx:0,
    showed:false,
    content:null,
    isShared:false,

    init:function ()
    {
        this._super();
        this.winsize = cc.Director.getInstance().getWinSize();
        this.audio=cc.AudioEngine.getInstance();
        document.body.style.backgroundColor="#FFF6E2";
        var content="七夕到了，为什么你还没有桃花！";
        document.title = window.wxData.desc = content;
        document.title = window.wxFriend.desc = content;

        this.setColor(cc.c4(255,246,226,255));

        var stop1=cc.Sprite.create(top1);
        stop1.setAnchorPoint(cc.p(0.5,1));
        stop1.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height + 100));
        this.addChild(stop1,1);
        stop1.runAction(cc.Sequence.create(cc.DelayTime.create(0.2),cc.EaseBackOut.create(cc.MoveBy.create(0.4,cc.p(0,-100)))));

        var stop2=cc.Sprite.create(top2);
        stop2.setAnchorPoint(cc.p(0.5,0));
        stop2.setPosition(cc.p(this.winsize.width*0.5,-100));
        this.addChild(stop2,1);
        stop2.runAction(cc.Sequence.create(cc.DelayTime.create(0.2),cc.EaseBackOut.create(cc.MoveBy.create(0.4,cc.p(0,100)))));

        var stop3=cc.Sprite.create(top3);
        stop3.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.83));
        stop3.setScale(0.1);
        stop3.setOpacity(0);
        stop3.setTag(18);
        this.addChild(stop3,1);
        stop3.runAction(cc.Sequence.create(cc.DelayTime.create(0.2),cc.Spawn.create(cc.FadeIn.create(0.3),cc.EaseBackOut.create(cc.ScaleTo.create(0.4,1)))));

        var stop4=cc.Sprite.create(top4);
        stop4.setAnchorPoint(cc.p(0.5,0));
        stop4.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.7));
        stop4.setScale(5);
        stop4.setOpacity(0);
        stop4.setTag(19);
        this.addChild(stop4,1);
        stop4.runAction(cc.Sequence.create(cc.DelayTime.create(0.6),cc.Spawn.create(cc.FadeIn.create(0.3),cc.EaseBackOut.create(cc.ScaleTo.create(0.35,1)))));

        var snum1=cc.Sprite.create(num1);
        snum1.setPosition(cc.p(this.winsize.width*0.25,this.winsize.height*0.6));
        snum1.setScale(0.0);
        snum1.setOpacity(0);
        snum1.setTag(20);
        this.addChild(snum1,3);
        snum1.runAction(cc.Sequence.create(cc.DelayTime.create(0.7),cc.Spawn.create(cc.FadeIn.create(0.3),cc.EaseBackOut.create(cc.ScaleTo.create(0.3,1)))));

        var snum2=cc.Sprite.create(num2);
        snum2.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.6));
        snum2.setScale(0.0);
        snum2.setOpacity(0);
        snum2.setTag(21);
        this.addChild(snum2,3);
        snum2.runAction(cc.Sequence.create(cc.DelayTime.create(0.8),cc.Spawn.create(cc.FadeIn.create(0.3),cc.EaseBackOut.create(cc.ScaleTo.create(0.3,1)))));

        var snum3=cc.Sprite.create(num3);
        snum3.setPosition(cc.p(this.winsize.width*0.75,this.winsize.height*0.6));
        snum3.setScale(0.0);
        snum3.setOpacity(0);
        snum3.setTag(22);
        this.addChild(snum3,3);
        snum3.runAction(cc.Sequence.create(cc.DelayTime.create(0.9),cc.Spawn.create(cc.FadeIn.create(0.3),cc.EaseBackOut.create(cc.ScaleTo.create(0.3,1)))));

        var snum4=cc.Sprite.create(num4);
        snum4.setPosition(cc.p(this.winsize.width*0.25,this.winsize.height*0.45));
        snum4.setScale(0.0);
        snum4.setOpacity(0);
        snum4.setTag(23);
        this.addChild(snum4,3);
        snum4.runAction(cc.Sequence.create(cc.DelayTime.create(1.0),cc.Spawn.create(cc.FadeIn.create(0.3),cc.EaseBackOut.create(cc.ScaleTo.create(0.3,1)))));

        var snum5=cc.Sprite.create(num5);
        snum5.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.45));
        snum5.setScale(0.0);
        snum5.setOpacity(0);
        snum5.setTag(24);
        this.addChild(snum5,3);
        snum5.runAction(cc.Sequence.create(cc.DelayTime.create(1.1),cc.Spawn.create(cc.FadeIn.create(0.3),cc.EaseBackOut.create(cc.ScaleTo.create(0.3,1)))));

        var snum6=cc.Sprite.create(num6);
        snum6.setPosition(cc.p(this.winsize.width*0.75,this.winsize.height*0.45));
        snum6.setScale(0.0);
        snum6.setOpacity(0);
        snum6.setTag(25);
        this.addChild(snum6,3);
        snum6.runAction(cc.Sequence.create(cc.DelayTime.create(1.2),cc.Spawn.create(cc.FadeIn.create(0.3),cc.EaseBackOut.create(cc.ScaleTo.create(0.3,1)))));

        var snum7=cc.Sprite.create(num7);
        snum7.setPosition(cc.p(this.winsize.width*0.25,this.winsize.height*0.3));
        snum7.setScale(0.0);
        snum7.setOpacity(0);
        snum7.setTag(26);
        this.addChild(snum7,3);
        snum7.runAction(cc.Sequence.create(cc.DelayTime.create(1.3),cc.Spawn.create(cc.FadeIn.create(0.3),cc.EaseBackOut.create(cc.ScaleTo.create(0.3,1)))));

        var snum8=cc.Sprite.create(num8);
        snum8.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.3));
        snum8.setScale(0.0);
        snum8.setOpacity(0);
        snum8.setTag(27);
        this.addChild(snum8,3);
        snum8.runAction(cc.Sequence.create(cc.DelayTime.create(1.4),cc.Spawn.create(cc.FadeIn.create(0.3),cc.EaseBackOut.create(cc.ScaleTo.create(0.3,1)))));

        var snum9=cc.Sprite.create(num9);
        snum9.setPosition(cc.p(this.winsize.width*0.75,this.winsize.height*0.3));
        snum9.setScale(0.0);
        snum9.setOpacity(0);
        snum9.setTag(28);
        this.addChild(snum9,3);
        snum9.runAction(cc.Sequence.create(cc.DelayTime.create(1.5),cc.Spawn.create(cc.FadeIn.create(0.3),cc.EaseBackOut.create(cc.ScaleTo.create(0.3,1)))));

        var sflower4=cc.Sprite.create(flower4);
        sflower4.setPosition(cc.p(this.winsize.width*0.88,this.winsize.height*0.3));
        sflower4.setScale(0.0);
        sflower4.setOpacity(0);
        this.addChild(sflower4,2);
        sflower4.runAction(cc.Sequence.create(cc.DelayTime.create(0.5),cc.Spawn.create(cc.FadeIn.create(0.3),cc.ScaleTo.create(0.3,1.0),cc.EaseBackOut.create(cc.ScaleTo.create(0.3,1)))));

        var sflower5=cc.Sprite.create(flower5);
        sflower5.setPosition(cc.p(this.winsize.width*0.7,this.winsize.height*0.12));
        sflower5.setScale(0.0);
        sflower5.setOpacity(0);
        this.addChild(sflower5,2);
        sflower5.runAction(cc.Sequence.create(cc.DelayTime.create(0.6),cc.Spawn.create(cc.FadeIn.create(0.4),cc.ScaleTo.create(0.4,1.0),cc.EaseBackOut.create(cc.ScaleTo.create(0.4,1))),cc.Repeat.create(cc.Sequence.create(cc.RotateBy.create(10,360)),9999)));

        var sflower6=cc.Sprite.create(flower6);
        sflower6.setPosition(cc.p(this.winsize.width*0.15,this.winsize.height*0.1));
        sflower6.setScale(0.0);
        sflower6.setOpacity(0);
        this.addChild(sflower6,2);
        sflower6.runAction(cc.Sequence.create(cc.DelayTime.create(0.4),cc.Spawn.create(cc.FadeIn.create(0.3),cc.ScaleTo.create(0.3,1.0),cc.EaseBackOut.create(cc.ScaleTo.create(0.3,1)))));

        this.addDropItems();
        this.addDropItems();
        this.addDropItems();
        this.addDropItems();
        this.schedule(this.addDropItems,1);

        this.setTouchEnabled(true);
        return true;
    },

    addDropItems:function()
    {
        var id=this.getRandom(3);
        if(id==0)
        {
            var sflower=cc.Sprite.create(flower1);
            sflower.setPosition(cc.p(this.winsize.width*1.3,this.winsize.height*0.85));
            this.addChild(sflower,4);
            sflower.runAction(cc.Sequence.create(cc.Spawn.create(cc.RotateBy.create(3,360),cc.MoveTo.create(3,cc.p(this.winsize.width*0.1,this.winsize.height*0.2))),cc.CallFunc.create(this.removeItem,this)));
        }
        else if(id==1)
        {
            var sflower=cc.Sprite.create(flower2);
            sflower.setPosition(cc.p(this.winsize.width*1.3,this.winsize.height*0.85));
            this.addChild(sflower,4);
            sflower.runAction(cc.Sequence.create(cc.Spawn.create(cc.RotateBy.create(5,360),cc.MoveTo.create(5,cc.p(this.winsize.width*0.1,0))),cc.CallFunc.create(this.removeItem,this)));
        }
        else if(id==2)
        {
            var sflower=cc.Sprite.create(flower3);
            sflower.setPosition(cc.p(this.winsize.width*1.3,this.winsize.height*0.85));
            this.addChild(sflower,4);
            sflower.runAction(cc.Sequence.create(cc.Spawn.create(cc.RotateBy.create(6,360),cc.MoveTo.create(6,cc.p(this.winsize.width*0.1,300))),cc.CallFunc.create(this.removeItem,this)));
        }
    },

    removeItem:function(sprite)
    {
        this.removeChild(sprite,true);
    },

    getRandom:function(maxsize)
    {
        return Math.floor(Math.random() * maxsize) % maxsize;
    },

    musicOn:function()
    {
        this.audio.playMusic(s_music, true);
    },

    onTouchesBegan:function(touches, event)
    {
        var touch = touches[0];
        var location = touch.getLocation();

        if(this.isShared==true)
        {
            this.audio.playEffect(s_button);
            document.body.style.backgroundColor="#FFF6E2";
            if(this.getChildByTag(100))this.getChildByTag(100).setEnabled(true);
            this.removeChildByTag(102,true);
            this.removeChildByTag(103,true);
            this.removeChildByTag(104,true);
            this.isShared=false;
        }

        if(this.touched == false)
        {
            for (var i = 20; i <= 28; i++)
            {
                var sp = this.getChildByTag(i);
                if (sp != null)
                {
                    var _rect = sp.getBoundingBox();
                    if (cc.rectContainsPoint(_rect, location))
                    {
                        this.touched=true;
                        this.idx=this.getRandom(5);

                        this.audio.playEffect(s_button);

                        if(this.showed == false)
                        {
                            this.showed=true;

                            this.unschedule(this.addDropItems);

                            for(var j=18;j<=28;j++)
                            {
                                this.removeItem(this.getChildByTag(j));
                            }

                            var btn = cc.MenuItemImage.create(btn0,btn0,this.share,this);
                            var btnmenu = cc.Menu.create(btn);
                            btnmenu.setPosition(cc.p(-this.winsize.width*0.5,this.winsize.height*0.40));
                            btnmenu.setTag(100);
                            this.addChild(btnmenu, 5);
                            btnmenu.runAction(cc.Sequence.create(cc.DelayTime.create(0.1),cc.EaseBackOut.create(cc.MoveBy.create(0.4,cc.p(this.winsize.width,0)))));


                            if(this.idx==0)
                            {
                                this.content="终于明白我单身的原因：太忙，整个人都被承包！你也来看看吧~";
                                document.title = window.wxData.desc =  this.content;
                                document.title = window.wxFriend.desc =  this.content;
                                var result1=cc.Sprite.create(gzk2);
                                result1.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.63));
                                result1.setScale(0.0);
                                result1.setOpacity(0);
                                this.addChild(result1,5);
                                result1.runAction(cc.Sequence.create(cc.DelayTime.create(0.2),cc.Spawn.create(cc.FadeIn.create(0.3),cc.EaseBackOut.create(cc.ScaleTo.create(0.3,1)))));

                                var result2=cc.Sprite.create(gzk1);
                                result2.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.8 + 300));
                                this.addChild(result2,5);
                                result2.runAction(cc.Sequence.create(cc.EaseBackOut.create(cc.MoveBy.create(0.4,cc.p(0,-300)))));

                                var btn2 = cc.MenuItemImage.create(gzk3,gzk3,this.gzk,this);
                                var btn2menu = cc.Menu.create(btn2);
                                btn2menu.setPosition(cc.p(this.winsize.width*1.5,this.winsize.height*0.3));
                                this.addChild(btn2menu, 5);
                                btn2menu.runAction(cc.Sequence.create(cc.DelayTime.create(0.1),cc.EaseBackOut.create(cc.MoveBy.create(0.4,cc.p(-this.winsize.width,0)))));

                            }
                            else if(this.idx==1)
                            {
                                this.content="不要问我为啥单身，我懒得回答！懒人没桃花，太准！你也来看看吧~";
                                document.title = window.wxData.desc =  this.content;
                                document.title = window.wxFriend.desc =  this.content;
                                var result1=cc.Sprite.create(l2);
                                result1.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.63));
                                result1.setScale(0.0);
                                result1.setOpacity(0);
                                this.addChild(result1,5);
                                result1.runAction(cc.Sequence.create(cc.DelayTime.create(0.2),cc.Spawn.create(cc.FadeIn.create(0.3),cc.EaseBackOut.create(cc.ScaleTo.create(0.3,1)))));

                                var result2=cc.Sprite.create(l1);
                                result2.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.8 + 300));
                                this.addChild(result2,5);
                                result2.runAction(cc.Sequence.create(cc.EaseBackOut.create(cc.MoveBy.create(0.4,cc.p(0,-300)))));

                                var btn2 = cc.MenuItemImage.create(l3,l3,this.lan,this);
                                var btn2menu = cc.Menu.create(btn2);
                                btn2menu.setPosition(cc.p(this.winsize.width*1.5,this.winsize.height*0.3));
                                this.addChild(btn2menu, 5);
                                btn2menu.runAction(cc.Sequence.create(cc.DelayTime.create(0.1),cc.EaseBackOut.create(cc.MoveBy.create(0.4,cc.p(-this.winsize.width,0)))));
                            }
                            else if(this.idx==2)
                            {
                                this.content="喵了个咪，我的脱单良方居然是：买买买！你也来看看吧~";
                                document.title = window.wxData.desc =  this.content;
                                document.title = window.wxFriend.desc =  this.content;
                                var result1=cc.Sprite.create(m2);
                                result1.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.63));
                                result1.setScale(0.0);
                                result1.setOpacity(0);
                                this.addChild(result1,5);
                                result1.runAction(cc.Sequence.create(cc.DelayTime.create(0.2),cc.Spawn.create(cc.FadeIn.create(0.3),cc.EaseBackOut.create(cc.ScaleTo.create(0.3,1)))));

                                var result2=cc.Sprite.create(m1);
                                result2.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.8 + 300));
                                this.addChild(result2,5);
                                result2.runAction(cc.Sequence.create(cc.EaseBackOut.create(cc.MoveBy.create(0.4,cc.p(0,-300)))));

                                var btn2 = cc.MenuItemImage.create(m3,m3,this.mmm,this);
                                var btn2menu = cc.Menu.create(btn2);
                                btn2menu.setPosition(cc.p(this.winsize.width*1.5,this.winsize.height*0.3));
                                this.addChild(btn2menu, 5);
                                btn2menu.runAction(cc.Sequence.create(cc.DelayTime.create(0.1),cc.EaseBackOut.create(cc.MoveBy.create(0.4,cc.p(-this.winsize.width,0)))));
                            }
                            else if(this.idx==3)
                            {
                                this.content="终于明白我为啥单身：没钱是硬伤！你也来看看吧~";
                                document.title = window.wxData.desc =  this.content;
                                document.title = window.wxFriend.desc =  this.content;
                                var result1=cc.Sprite.create(mq2);
                                result1.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.63));
                                result1.setScale(0.0);
                                result1.setOpacity(0);
                                this.addChild(result1,5);
                                result1.runAction(cc.Sequence.create(cc.DelayTime.create(0.2),cc.Spawn.create(cc.FadeIn.create(0.3),cc.EaseBackOut.create(cc.ScaleTo.create(0.3,1)))));

                                var result2=cc.Sprite.create(mq1);
                                result2.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.8 + 300));
                                this.addChild(result2,5);
                                result2.runAction(cc.Sequence.create(cc.EaseBackOut.create(cc.MoveBy.create(0.4,cc.p(0,-300)))));

                                var btn2 = cc.MenuItemImage.create(mq3,mq3,this.mq,this);
                                var btn2menu = cc.Menu.create(btn2);
                                btn2menu.setPosition(cc.p(this.winsize.width*1.5,this.winsize.height*0.3));
                                this.addChild(btn2menu, 5);
                                btn2menu.runAction(cc.Sequence.create(cc.DelayTime.create(0.1),cc.EaseBackOut.create(cc.MoveBy.create(0.4,cc.p(-this.winsize.width,0)))));
                            }
                            else if(this.idx==4)
                            {
                                this.content="终于明白我为啥单身：太爱家里蹲！你也来看看吧~";
                                document.title = window.wxData.desc =  this.content;
                                document.title = window.wxFriend.desc =  this.content;
                                var result1=cc.Sprite.create(z2);
                                result1.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.63));
                                result1.setScale(0.0);
                                result1.setOpacity(0);
                                this.addChild(result1,5);
                                result1.runAction(cc.Sequence.create(cc.DelayTime.create(0.5),cc.Spawn.create(cc.FadeIn.create(0.3),cc.EaseBackOut.create(cc.ScaleTo.create(0.3,1)))));

                                var result2=cc.Sprite.create(z1);
                                result2.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.8 + 300));
                                this.addChild(result2,5);
                                result2.runAction(cc.Sequence.create(cc.DelayTime.create(0.3),cc.EaseBackOut.create(cc.MoveBy.create(0.4,cc.p(0,-300)))));

                                var btn2 = cc.MenuItemImage.create(z3,z3,this.zhai,this);
                                var btn2menu = cc.Menu.create(btn2);
                                btn2menu.setPosition(cc.p(this.winsize.width*1.5,this.winsize.height*0.3));
                                this.addChild(btn2menu, 5);
                                btn2menu.runAction(cc.Sequence.create(cc.DelayTime.create(0.1),cc.EaseBackOut.create(cc.MoveBy.create(0.4,cc.p(-this.winsize.width,0)))));
                            }
                            break;
                        }
                    }
                }
            }
        }
    },

    share:function()
    {
        this.audio.playEffect(s_button);
        // 弹出箭头的地方
        if(this.isShared==false)
        {
            document.body.style.backgroundColor="#4D4A44";
            var shield1=cc.Sprite.create(s_shld);
            shield1.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.5));
            shield1.setTag(102);
            shield1.setScaleY(1.5);
            this.addChild(shield1,6);
            var shield2=cc.Sprite.create(s_arrow);
            shield2.setPosition(cc.p(this.winsize.width*0.8,this.winsize.height*0.9));
            shield2.setTag(103);
            this.addChild(shield2,6);
            var shield3=cc.Sprite.create(s_tip);
            shield3.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.8));
            shield3.setTag(104);
            this.addChild(shield3,6);

            if(this.getChildByTag(100))this.getChildByTag(100).setEnabled(false);
            this.isShared=true;
        }
    },

    gzk:function()
    {
        this.audio.playEffect(s_button);
        var newURL="http://mp.weixin.qq.com/s?__biz=MzA5NjEyOTYyNw==&mid=209668841&idx=1&sn=e69ed21d648fec07605dbc6f77295855&scene=0#rd";
        window.location.href=newURL;
    },

    lan:function()
    {
        this.audio.playEffect(s_button);
        var newURL="http://goto.hupu.com/?a=goClick&id=11285";
        window.location.href=newURL;
    },

    mmm:function()
    {
        this.audio.playEffect(s_button);
        var newURL="http://m.yhd.com/downloads/10600518746/TheStoreApp.apk";
        window.location.href=newURL;
    },

    mq:function()
    {
        this.audio.playEffect(s_button);
        var newURL="http://mp.weixin.qq.com/s?__biz=MjM5NzAwNDAyMA==&mid=209520556&idx=1&sn=4dea83deb4ee134e1640adb0dbd6866a#rd";
        window.location.href=newURL;
    },

    zhai:function()
    {
        this.audio.playEffect(s_button);
        var newURL="http://mp.weixin.qq.com/s?__biz=MjM5NjEzMDk2MA==&mid=211220890&idx=1&sn=20536d3446e8942e094aed64b3d97d3a#rd";
        window.location.href=newURL;
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
