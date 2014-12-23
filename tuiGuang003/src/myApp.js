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
    canTouch:true,
    sound:false,
    deerIn:false,
    spTag:200,
    Score:0,
    scoreLabel:null,
    gameTime:5,
    countSp:null,

    init:function ()
    {
        this._super();
        this.winsize = cc.Director.getInstance().getWinSize();
        this.audio=cc.AudioEngine.getInstance();

        //背景
        var back=cc.Sprite.create(s_img01);
        back.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.5));
        this.addChild(back,0);
        //圣诞树
        var tree=cc.Sprite.create(s_img17);
        tree.setScale(0.8);
        tree.setPosition(cc.p(this.winsize.width-tree.getContentSize().width*0.43*0.8,tree.getContentSize().height*0.4*0.8));
        this.addChild(tree,1);
        //圣诞老人
        var man=cc.Sprite.create(s_img06);
        man.setScale(0.8);
        man.setPosition(cc.p(man.getContentSize().width*0.5*0.8,man.getContentSize().height*0.5*0.8));
        this.addChild(man,1);
        //花
        var flower=cc.Sprite.create(s_img05);
        flower.setScale(0.8);
        flower.setAnchorPoint(cc.p(0.5,1));
        flower.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.88));
        this.addChild(flower,1);
        var ac0=cc.RotateBy.create(0.5,15.0);
        var ac1=cc.RotateBy.create(0.5,-15.0);
        var ac2=cc.RotateBy.create(0.5,-15.0);
        var ac3=cc.RotateBy.create(0.5,15.0);
        var ac4=cc.Sequence.create(ac0,ac1,ac2,ac3);
        flower.runAction(cc.RepeatForever.create(ac4));
        //音效开关
        var sound=cc.Sprite.create(s_img11);
        sound.setScale(0.3);
        sound.setTag(100);
        sound.setPosition(cc.p(this.winsize.width-sound.getContentSize().width*0.5*0.3,this.winsize.height*0.64));
        this.addChild(sound,1);
        //分数
        this.scoreLabel=cc.LabelTTF.create("0","Arial",44);
        this.scoreLabel.setAnchorPoint(cc.p(0.5,0.5));
        this.scoreLabel.setPosition(cc.p(flower.getContentSize().width*0.5,flower.getContentSize().height*0.57));
        this.scoreLabel.setColor(cc.c3(255,230,40));
        flower.addChild(this.scoreLabel,1);
        //倒计时
        this.countSp=cc.Sprite.create(s_img13);
        this.countSp.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.5));
        this.countSp.setVisible(false);
        this.addChild(this.countSp,5);
        //提示
        var label=cc.LabelTTF.create("收集驯鹿洒落的许愿币，\n圣诞愿望就会实现哦！","黑体",35);
        label.setAnchorPoint(cc.p(0.5,0.5));
        label.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.53));
        label.setTag(106);
        label.setColor(cc.c3(255,230,40));
        this.addChild(label,5);
        //开始按钮
        var kaishiItem=cc.MenuItemImage.create(s_img07,s_img07,this.startGame,this);
        kaishiItem.setScale(0.8);
        var kaishiMenu=cc.Menu.create(kaishiItem);
        kaishiMenu.setTag(105);
        kaishiMenu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.35));
        this.addChild(kaishiMenu, 6);

        //开启触摸
        this.setTouchEnabled(true);
        var shareText="我正在猛抢许愿币，圣诞礼物快到碗里来！一起来抢吧！";
        document.title = window.wxData.desc = shareText;
        document.title = window.wxFriend.desc = shareText;

        return true;
    },

    startGame:function()
    {
        this.schedule(this.deerUpdate,6.0,9999,0.1);
        this.schedule(this.updateScore,0.7,9999,0.1);
        this.schedule(this.timeTicking,1.0);
        this.sound=true;
        var sn=this.getChildByTag(100);
        sn.initWithFile(s_img10);
        this.audio.playMusic(s_music,true);
        this.removeChildByTag(105,true);
        this.removeChildByTag(106,true);
    },

    timeTicking:function()
    {
        if(this.gameTime==0)
        {
            this.removeChildByTag(101,true);
            this.removeChild(this.countSp,true);
            this.unschedule(this.timeTicking);
            this.unschedule(this.deerUpdate);
            this.unschedule(this.updateScore);
            var zailaiItem=cc.MenuItemImage.create(s_img18,s_img18,this.restart,this);
            zailaiItem.setScale(0.8);
            var zailaiMenu=cc.Menu.create(zailaiItem);
            zailaiMenu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.35));
            zailaiMenu.setTag(120);
            this.addChild(zailaiMenu, 6);
            var guanzhuItem=cc.MenuItemImage.create(s_img19,s_img19,this.guanzhu,this);
            guanzhuItem.setScale(0.8);
            var guanzhuMenu=cc.Menu.create(guanzhuItem);
            guanzhuMenu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.26));
            guanzhuMenu.setTag(121);
            this.addChild(guanzhuMenu, 6);
            var fenxiangItem=cc.MenuItemImage.create(s_img04,s_img04,this.share2Friend,this);
            fenxiangItem.setScale(0.8);
            var fenxiangMenu=cc.Menu.create(fenxiangItem);
            fenxiangMenu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.17));
            fenxiangMenu.setTag(122);
            this.addChild(fenxiangMenu, 6);

            var label=cc.LabelTTF.create("恭喜你收集到"+this.Score+"个许愿币！","黑体",40);
            label.setAnchorPoint(cc.p(0.5,0.5));
            label.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.55));
            label.setColor(cc.c3(255,230,40));
            this.addChild(label,5);
            var ac0=cc.RotateTo.create(0.1,7);
            var ac1=cc.RotateTo.create(0.1,0);
            var ac2=cc.RotateTo.create(0.1,-7);
            var ac3=cc.RotateTo.create(0.1,0);
            var ac4=cc.DelayTime.create(1.0);
            label.runAction(cc.RepeatForever.create(cc.Sequence.create(ac0,ac1,ac2,ac3,ac4)));
            var shareText="我收集到了"+this.Score+"个许愿币，圣诞礼物快到碗里来！一起来抢吧！";
            document.title = window.wxData.desc = shareText;
            document.title = window.wxFriend.desc = shareText;
        }
        else
        {
            this.gameTime-=1;
            if(this.gameTime==3)
            {
                this.countSp.setVisible(true);
            }
            if(this.gameTime==2)
            {
                this.countSp.initWithFile(s_img14);
            }
            if(this.gameTime==1)
            {
                this.countSp.initWithFile(s_img15);
            }
            if(this.gameTime==0)
            {
                this.countSp.initWithFile(s_img16);
            }
        }
    },

    updateScore:function()
    {
        if(this.getChildByTag(101))
        {
            var deerp=this.getChildByTag(101).getPosition();
            var ac0,ac1,ac2,ac3,ac4;
            for(var i=1;i<=5;i++)
            {
                var sp=cc.Sprite.create(s_img12);
                sp.setPosition(deerp);
                sp.setScale(0.1);
                sp.setTag(this.spTag);
                this.spTag+=1;
                if(this.spTag==280)this.spTag=200;
                this.addChild(sp,2);
                switch(i)
                {
                    case 1:
                        ac4=cc.ScaleTo.create(0.3,1.0);
                        ac0=cc.MoveBy.create(0.3,cc.p(80,0));
                        ac1=cc.MoveBy.create(2.3,cc.p(80,-this.winsize.height));
                        ac3=cc.RotateBy.create(2.3,360);
                        ac2=cc.CallFunc.create(this.removeSprite,this);
                        sp.runAction(cc.Sequence.create(cc.Spawn.create(ac0,ac4),cc.Spawn.create(ac1,ac3),ac2));
                        break;
                    case 2:
                        ac4=cc.ScaleTo.create(0.3,1.0);
                        ac0=cc.MoveBy.create(0.3,cc.p(60,60));
                        ac1=cc.MoveBy.create(2.3,cc.p(60,-this.winsize.height));
                        ac3=cc.RotateBy.create(2.3,360);
                        ac2=cc.CallFunc.create(this.removeSprite,this);
                        sp.runAction(cc.Sequence.create(cc.Spawn.create(ac0,ac4),cc.Spawn.create(ac1,ac3),ac2));
                        break;
                    case 3:
                        ac4=cc.ScaleTo.create(0.3,1.0);
                        ac0=cc.MoveBy.create(0.3,cc.p(0,80));
                        ac1=cc.MoveBy.create(2.3,cc.p(0,-this.winsize.height));
                        ac3=cc.RotateBy.create(2.3,360);
                        ac2=cc.CallFunc.create(this.removeSprite,this);
                        sp.runAction(cc.Sequence.create(cc.Spawn.create(ac0,ac4),cc.Spawn.create(ac1,ac3),ac2));
                        break;
                    case 4:
                        ac4=cc.ScaleTo.create(0.3,1.0);
                        ac0=cc.MoveBy.create(0.3,cc.p(-60,60));
                        ac1=cc.MoveBy.create(2.3,cc.p(-40,-this.winsize.height));
                        ac3=cc.RotateBy.create(2.3,360);
                        ac2=cc.CallFunc.create(this.removeSprite,this);
                        sp.runAction(cc.Sequence.create(cc.Spawn.create(ac0,ac4),cc.Spawn.create(ac1,ac3),ac2));
                        break;
                    case 5:
                        ac4=cc.ScaleTo.create(0.3,1.0);
                        ac0=cc.MoveBy.create(0.3,cc.p(-80,0));
                        ac1=cc.MoveBy.create(2.3,cc.p(-40,-this.winsize.height));
                        ac3=cc.RotateBy.create(2.3,360);
                        ac2=cc.CallFunc.create(this.removeSprite,this);
                        sp.runAction(cc.Sequence.create(cc.Spawn.create(ac0,ac4),cc.Spawn.create(ac1,ac3),ac2));
                        break;
                    default:break;
                }
            }
        }
    },

    deerUpdate:function()
    {
        this.deerIn=true;
        var rd1=this.getRandom(2);
        var deer=cc.Sprite.create(s_img02);
        deer.setTag(101);
        var ac0,ac1,ac2;
        if(rd1)
        {
            deer.setPosition(cc.p(-deer.getContentSize().width*0.5,this.winsize.height*0.4));
            deer.setFlippedX(true);
            deer.setRotation(-20.0);
            this.addChild(deer,3);
            ac0=cc.MoveTo.create(5.0,cc.p(this.winsize.width+deer.getContentSize().width*0.5,this.winsize.height*0.85));
            ac1=cc.ScaleTo.create(5.0,0.4);
        }
        else
        {
            deer.setPosition(cc.p(this.winsize.width+deer.getContentSize().width*0.5,this.winsize.height*0.4));
            deer.setFlippedX(false);
            deer.setRotation(20.0);
            this.addChild(deer,1);
            ac0=cc.MoveTo.create(5.0,cc.p(-deer.getContentSize().width*0.5,this.winsize.height*0.85));
            ac1=cc.ScaleTo.create(5.0,0.4);
        }
        ac2=cc.CallFunc.create(this.removeSprite,this);
        deer.runAction(cc.Sequence.create(cc.Spawn.create(ac0,ac1),ac2));
    },

    getRandom:function(maxsize)
    {
        //生成随机数
        return Math.floor(Math.random() * maxsize) % maxsize;
    },

    removeSprite:function(_sprite)
    {
        //this.deerIn=false;
        _sprite.stopAllActions();
        this.removeChild(_sprite,true);
    },

    restart:function()
    {
        this.audio.stopMusic();
        var scene=beginLayer.create();
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,scene));
    },

    guanzhu:function()
    {
        var newURL="http://mp.weixin.qq.com/s?__biz=MjM5NzAwNDAyMA==&mid=202683154&idx=1&sn=30c8c2dea75cc6729e017eaf8c745c56#rd";
        window.location.href=newURL;
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
        if(this.canTouch==false)
        {
            this.getChildByTag(120).setEnabled(true);
            this.getChildByTag(121).setEnabled(true);
            this.getChildByTag(122).setEnabled(true);
            this.canTouch=true;
            this.removeChildByTag(107,true);
            this.removeChildByTag(108,true);
            this.removeChildByTag(109,true);
        }
        for(var i=200;i<=300;i++)
        {
            var sp=this.getChildByTag(i);
            if(sp!=null)
            {
                var spp=sp.getBoundingBox();
                if(cc.rectContainsPoint(spp,location))
                {
                    this.removeChildByTag(i,true);
                    this.Score+=1;
                    this.scoreLabel.setString(""+this.Score);
                    this.scoreLabel.runAction(cc.Sequence.create(cc.ScaleTo.create(0.1,1.3),cc.ScaleTo.create(0.1,1.0)));
                }
            }
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
}

var MyScene = cc.Scene.extend({

    onEnter:function ()
    {
        this._super();
        var layer = new beginLayer();
        this.addChild(layer);
        layer.init();
    }
});
