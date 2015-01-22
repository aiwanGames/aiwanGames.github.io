var mainLayer = cc.LayerColor.extend({
    winsize:null,
    sp_catch:null,
    itemSpeed:1.5,
    schdSpeed:0.3,
    gameTime:0,
    gameScore:0,
    scoreLabel:null,
    timeLabel:null,
    score:0,
    onClickFlag:false,
    _tag1:200,
    _tag2:220,
    sound:false,
    isStop:false,

    init:function ()
    {
        this._super();
        this.winsize = cc.Director.getInstance().getWinSize();
        this.audio=cc.AudioEngine.getInstance();
        //背景
        var sp_back=cc.Sprite.create(s_img00);
        sp_back.setAnchorPoint(cc.p(0.5,0));
        sp_back.setPosition(cc.p(this.winsize.width*0.5,0));
        this.addChild(sp_back,0);
        //时间
        this.timeLabel=cc.LabelTTF.create("Time: "+this.gameTime,"Arial",32);
        this.timeLabel.setAnchorPoint(cc.p(0.0,0.5));
        this.timeLabel.setPosition(cc.p(this.winsize.width*0.1,this.winsize.height*0.95));
        this.timeLabel.setColor(cc.c3(235,90,55));
        this.addChild(this.timeLabel,1);
        //分数
        this.scoreLabel=cc.LabelTTF.create("Score: "+this.gameScore,"Arial",32);
        this.scoreLabel.setAnchorPoint(cc.p(0.0,0.5));
        this.scoreLabel.setPosition(cc.p(this.winsize.width*0.63,this.winsize.height*0.95));
        this.scoreLabel.setColor(cc.c3(235,90,55));
        this.addChild(this.scoreLabel,1);

        //音效开关
        var sound=null;
        if(this.sound==false)
        {
            sound=cc.Sprite.create(s_img09);
        }
        else
        {
            sound=cc.Sprite.create(s_img10);
        }
        sound.setScale(0.7);
        sound.setTag(300);
        sound.setAnchorPoint(cc.p(1.0,0));
        sound.setPosition(cc.p(this.winsize.width,this.winsize.height*0.55));
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
        this.schedule(this.addItems,this.schdSpeed);
        this.scheduleUpdate();
    },

    gotoOverLayer:function()
    {
        var scene=overLayer.create(this.gameScore);
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,scene));
        this.audio.stopMusic();
    },

    addItems:function()
    {
        var itemid = this.getRandom(2);
        var item=null;
        var _tag = 0;
        if (itemid)
        {
            _tag = this._tag1;
            item = cc.Sprite.create(s_img06);
        }
        else
        {
            _tag = this._tag2;
            item = cc.Sprite.create(s_img07);
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

        var posid = this.getRandom(8);
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

    removeSprite:function(sprite)
    {
        this.removeChild(sprite,true);
    },

    removeItem:function(sprite)
    {
        this.removeChild(sprite,true);
    },

    update:function(dt)
    {
        //游戏主要刷新函数
        for(var i=200;i<=240;i++)
        {
            var _item = this.getChildByTag(i);
            if (_item == null)
            {

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
        }
        this.timeLabel.setString("Time: "+Math.round(30-this.gameTime/60));
    },

    getRandom:function(maxsize)
    {
        return Math.floor(Math.random() * maxsize) % maxsize;
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
                sn.initWithFile(s_img09);
                this.audio.playMusic(s_music,true);
            }
            else
            {
                this.sound = false;
                sn.initWithFile(s_img10);
                this.audio.stopMusic();
            }
            sn.setAnchorPoint(cc.p(1.0,0));
            sn.setPosition(cc.p(this.winsize.width,this.winsize.height*0.55));
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