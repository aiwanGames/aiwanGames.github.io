var mainLayer = cc.LayerColor.extend({
    winsize:null,
    sp_catch:null,
    itemSpeed:1.5,//图标下落时间
    schdSpeed:0.3,//生成图标间隔
    gameTime:0,
    gameScore:0,
    gameOver:false,
    scoreLabel:null,
    timeLabel:null,
    score:0,
    onClickFlag:false,
    _tag1:200,
    _tag2:220,
    _tag3:240,
    _tag4:260,
    sound:false,
    isStop:false,

    init:function ()
    {
        this._super();
        this.winsize = cc.Director.getInstance().getWinSize();
        this.audio=cc.AudioEngine.getInstance();
        //背景
        var sp_back=cc.Sprite.create(s_img01);
        sp_back.setAnchorPoint(cc.p(0.5,0));
        sp_back.setPosition(cc.p(this.winsize.width*0.5,0));
        this.addChild(sp_back,0);
        //添加聚宝盆
        this.sp_catch=cc.Sprite.create(s_img05);
        this.sp_catch.setPosition(cc.p(this.winsize.width*0.5,this.sp_catch.getContentSize().height*0.5));
        this.addChild(this.sp_catch,10);
        //时间
        this.timeLabel=cc.LabelTTF.create("Time: "+this.gameTime,"Arial",32);
        this.timeLabel.setAnchorPoint(cc.p(0.0,0.5));
        this.timeLabel.setPosition(cc.p(this.winsize.width*0.1,this.winsize.height*0.95));
        this.timeLabel.setColor(cc.c3(235,90,55));
        this.addChild(this.timeLabel,1);

        this.scoreLabel=cc.LabelTTF.create("Score: "+this.gameScore,"Arial",32);
        this.scoreLabel.setAnchorPoint(cc.p(0.0,0.5));
        this.scoreLabel.setPosition(cc.p(this.winsize.width*0.63,this.winsize.height*0.95));
        this.scoreLabel.setColor(cc.c3(235,90,55));
        this.addChild(this.scoreLabel,1);

        //音效开关
        var sound=null;
        if(this.sound==false)
        {
            sound=cc.Sprite.create(s_img15);
            cc.log("sound off");
        }
        else
            sound=cc.Sprite.create(s_img14);
        sound.setScale(0.7);
        sound.setTag(300);
        sound.setAnchorPoint(cc.p(1.0,0));
        sound.setPosition(cc.p(this.winsize.width,this.winsize.height*0.75));
        this.addChild(sound,5);

        var ac0=cc.RotateBy.create(0.5,10.0);
        var ac1=cc.RotateBy.create(0.5,-10.0);
        var ac2=cc.RotateBy.create(0.5,-10.0);
        var ac3=cc.RotateBy.create(0.5,10.0);
        var ac4=cc.Sequence.create(ac0,ac1,ac2,ac3);
        sound.runAction(cc.RepeatForever.create(ac4));
    },

    onEnterTransitionDidFinish:function()
    {
        //开启触摸
        this.setTouchEnabled(true);
        //开启schedule
        this.schedule(this.addDropItems,this.schdSpeed);
        this.scheduleUpdate();
    },

    gotoOverLayer:function()
    {
        var scene=overLayer.create(this.gameScore);
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,scene));
        this.audio.stopMusic();
    },

    addDropItems:function()
    {
        var itemid = this.getRandom(6);
        var item=null;
        var _tag = 0;
        switch (itemid) {
            case 0:
            case 1:
                _tag = this._tag1;
                item = cc.Sprite.create(s_img19);
                break;
            case 2:
            case 3:
                _tag = this._tag2;
                item = cc.Sprite.create(s_img20);
                break;
            case 4:
                _tag = this._tag3;
                item = cc.Sprite.create(s_img17);
                break;
            default:
                _tag = this._tag4;
                item = cc.Sprite.create(s_img18);
                break;
        }

        if(_tag>=200&&_tag<220)
        {
            this._tag1+=1;
            if(this._tag1==219)
            {
                this._tag1=200;
            }
        }
        if(_tag>=220&&_tag<240)
        {
            this._tag2+=1;
            if(this._tag2==239)
            {
                this._tag2=220;
            }
        }
        if(_tag>=240&&_tag<260)
        {
            this._tag3+=1;
            if(this._tag3==259)
            {
                this._tag3=240;
            }
        }
        if(_tag>=260&&_tag<280)
        {
            this._tag4+=1;
            if(this._tag4==279)
            {
                this._tag4=260;
            }
        }
        var posid = this.getRandom(6);
        var pos = null;
        switch (posid) {
            case 0:pos = cc.p(this.winsize.width * 0.1, this.winsize.height + item.getContentSize().height*0.5);break;
            case 1:pos = cc.p(this.winsize.width * 0.26, this.winsize.height + item.getContentSize().height*0.5);break;
            case 2:pos = cc.p(this.winsize.width * 0.42, this.winsize.height + item.getContentSize().height*0.5);break;
            case 3:pos = cc.p(this.winsize.width * 0.58, this.winsize.height + item.getContentSize().height*0.5);break;
            case 4:pos = cc.p(this.winsize.width * 0.75, this.winsize.height + item.getContentSize().height*0.5);break;
            case 5:pos = cc.p(this.winsize.width * 0.9, this.winsize.height + item.getContentSize().height*0.5);break;
            default:break;
        }
        item.setTag(_tag);
        item.setPosition(pos);
        this.addChild(item, 2);
        //图标向下掉落
        var ac0 = cc.MoveBy.create(this.itemSpeed, cc.p(0, -this.winsize.height));
        var ac1 = cc.CallFunc.create(this.removeItem, this);
        var ac2 = cc.Sequence.create(ac0, ac1);
        item.runAction(ac2);
    },

    removeStar:function(sprite)
    {
        this.removeChild(sprite,true);
    },

    removeItem:function(sprite)
    {
        var _pos=sprite.getPosition();
        var pos=cc.p(_pos.x,_pos.y-sprite.getContentSize().height*0.35);//+sprite.getContentSize().height*0.5
        var ac1=null,ac2=null,ac3=null;
        var sp1=null,sp2=null,sp3=null;

        if(sprite.getTag()>=260&&sprite.getTag()<280)
        {
            sp1=cc.Sprite.create(s_img16);
            sp2=cc.Sprite.create(s_img16);
            sp3=cc.Sprite.create(s_img16);
            sp1.setScale(0.5);
            sp2.setScale(0.5);
            sp3.setScale(0.5);
        }
        else
        {
            sp1=cc.Sprite.create(s_img12);
            sp2=cc.Sprite.create(s_img12);
            sp3=cc.Sprite.create(s_img12);
            sp1.setScale(0.6);
            sp2.setScale(0.6);
            sp3.setScale(0.6);
        }
        sp1.setPosition(pos);
        this.addChild(sp1,2);
        ac1=cc.Spawn.create(cc.MoveBy.create(0.4,cc.p(-50,60)),cc.RotateBy.create(0.4,180));
        ac2 = cc.CallFunc.create(this.removeStar, this);
        ac3=cc.Sequence.create(ac1,ac2);
        sp1.runAction(ac3);

        sp2.setPosition(pos);
        this.addChild(sp2,2);
        ac1=cc.Spawn.create(cc.MoveBy.create(0.4,cc.p(0,70)),cc.RotateBy.create(0.4,180));
        ac2 = cc.CallFunc.create(this.removeStar, this);
        ac3=cc.Sequence.create(ac1,ac2);
        sp2.runAction(ac3);

        sp3.setPosition(pos);
        this.addChild(sp3,2);
        ac1=cc.Spawn.create(cc.MoveBy.create(0.4,cc.p(50,60)),cc.RotateBy.create(0.4,180));
        ac2 = cc.CallFunc.create(this.removeStar, this);
        ac3=cc.Sequence.create(ac1,ac2);
        sp3.runAction(ac3);

        this.removeChild(sprite,true);
    },

    setStop:function()
    {
        this.isStop=false;
        this.sp_catch.initWithFile(s_img05);
    },

    update:function(dt)
    {
        //游戏主要刷新函数
        for(var i=200;i<=280;i++)
        {
            var _item=this.getChildByTag(i);
            if(_item==null)
            {
                continue;
            }
            var ix=_item.getPositionX();
            var iy=_item.getPositionY();
            var iw=_item.getContentSize().width;
            var ih=_item.getContentSize().height;
            var cx=this.sp_catch.getPositionX();
            var cy=this.sp_catch.getPositionY();
            var cw=this.sp_catch.getContentSize().width;
            var ch=this.sp_catch.getContentSize().height;
            //发生碰撞则移除
            if(iy-cy>ch*0.45&&iy-cy<ih*0.3+ch*0.45&&Math.abs(ix-cx)<cw*0.43&&!this.isStop)
            {
                var _iTag=_item.getTag();
                var _pos=cc.p(_item.getPositionX(),_item.getPositionY());

                var _sclabel=cc.LabelTTF.create("","Arial",35);
                _sclabel.setPosition(_pos);
                _sclabel.setColor(cc.c3(235,90,55));
                this.addChild(_sclabel,3);

                if(_iTag>=200&&_iTag<220)
                {
                    this.gameScore+=10;
                    _sclabel.setString("+10");
                }
                if(_iTag>=220&&_iTag<240)
                {
                    this.gameScore+=30;
                    _sclabel.setString("+30");
                }
                if(_iTag>=240&&_iTag<260)
                {
                    this.gameScore+=50;
                    _sclabel.setString("+50");
                }
                if(_iTag>=260&&_iTag<280)
                {
                    this.gameScore-=50;
                    _sclabel.setString("-50");
                    _sclabel.setColor(cc.c3(195,135,45));
                    this.isStop=true;
                    this.sp_catch.initWithFile(s_img06);
                    this.sp_catch.runAction(cc.Sequence.create(cc.DelayTime.create(1.0),cc.CallFunc.create(this.setStop,this)));
                    if(this.sound)
                    {
                        this.audio.playEffect(s_effect);
                    }
                }
                _sclabel.runAction(cc.Sequence.create(cc.Spawn.create(cc.FadeOut.create(0.8),cc.MoveBy.create(0.8,cc.p(0,70))),cc.CallFunc.create(this.removeStar,this)));
                var ac1=cc.ScaleTo.create(0.1,1.1);
                var ac2=cc.ScaleTo.create(0.1,1.0);
                var ac3=cc.Sequence.create(ac1,ac2);
                this.scoreLabel.runAction(ac3);
                this.removeItem(_item);
                this.scoreLabel.setString("Score: "+this.gameScore);
                //this.scoreLabel.setString(this.gameScore);
                //this.scoreLabel.runAction(cc.Sequence.create(cc.ScaleTo.create(0.1,1.3),cc.ScaleTo.create(0.1,1.0)));
            }
        }

        this.gameTime+=1;
        if(this.gameTime==1800)
        {
            this.gotoOverLayer();
        }
        else
        {
            if(this.gameTime==900)
            {
                this.schdSpeed=0.20;
                this.itemSpeed=1.00;
                this.schedule(this.addDropItems,this.schdSpeed);
            }
            else if(this.gameTime==1200)
            {
                //this.schdSpeed=0.15;
                //this.itemSpeed=1.00;
                //this.schedule(this.addDropItems,this.schdSpeed);
            }
            else
            {

            }
        }
        this.timeLabel.setString("Time: "+Math.round(30-this.gameTime/60));
    },

    getRandom:function(maxsize)
    {
        return Math.floor(Math.random() * maxsize) % maxsize;
    },

    onTouchesMoved:function(touches, event)
    {
        var touch = touches[0];
        var location = touch.getLocation();
        if(this.onClickFlag&&this.isStop==false)
        {
            this.sp_catch.setPosition(cc.p(location.x, this.sp_catch.getPositionY()));
            if(this.sp_catch.getPositionX() < this.sp_catch.getContentSize().width * 0.5)
            {
                this.sp_catch.setPosition(cc.p(this.sp_catch.getContentSize().width * 0.5, this.sp_catch.getPositionY()));
            }
            if(this.sp_catch.getPositionX() > this.winsize.width-this.sp_catch.getContentSize().width * 0.5)
            {
                this.sp_catch.setPosition(cc.p(this.winsize.width-this.sp_catch.getContentSize().width * 0.5, this.sp_catch.getPositionY()));
            }
        }
    },

    onTouchesEnded:function(touches, event)
    {
        this.onClickFlag = false;
    },

    onTouchesBegan:function(touches, event)
    {
        var touch = touches[0];
        var location = touch.getLocation();
        if(cc.rectContainsPoint(this.sp_catch.getBoundingBox(),location))
        {
            this.onClickFlag = true;
        }
        var sn = this.getChildByTag(300);
        var soundRect = sn.getBoundingBox();
        if (cc.rectContainsPoint(soundRect, location))
        {
            if (this.sound == false)
            {
                this.sound = true;
                sn.initWithFile(s_img14);
                this.audio.playMusic(s_music,true);
            }
            else
            {
                this.sound = false;
                sn.initWithFile(s_img15);
                this.audio.stopMusic();
            }
            sn.setAnchorPoint(cc.p(1.0,0));
            sn.setPosition(cc.p(this.winsize.width,this.winsize.height*0.75));
        }
    },
    setSound:function(_sound)
    {
        this.sound=_sound;
    }
});

//构造函数create
mainLayer.create=function(_sound)
{
    var _mainLayer=new mainLayer();
    _mainLayer.setSound(_sound);
    _mainLayer.init();
    var _scene=cc.Scene.create();
    _scene.addChild(_mainLayer);
    return _scene;
};