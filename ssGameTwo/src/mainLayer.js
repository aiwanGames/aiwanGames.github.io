var mainLayer = cc.LayerColor.extend({
    winsize:null,
    sp_catch:null,
    showTime:1.5,
    schdTime:2.0,
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
            sound=cc.Sprite.create(s_img10);
        }
        else
        {
            sound=cc.Sprite.create(s_img09);
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
        this.schedule(this.addItems,this.schdTime,999,0.1);
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
        var pos = null;
        if (itemid)
        {
            _tag = this._tag1;
            item = cc.Sprite.create(s_img06);
            var posid1 = this.getRandom(8);
            switch (posid1) {
                case 0:pos = cc.p(94, 672);break;
                case 1:pos = cc.p(418, 672);break;
                case 2:pos = cc.p(94, 482);break;
                case 3:pos = cc.p(418, 482);break;
                case 4:pos = cc.p(67, 293);break;
                case 5:pos = cc.p(441, 293);break;
                case 6:pos = cc.p(250, 575);break;
                case 7:pos = cc.p(250, 387);break;
                default:break;
            }
        }
        else
        {
            _tag = this._tag2;
            item = cc.Sprite.create(s_img07);
            var posid2 = this.getRandom(8);
            switch (posid2) {
                case 0:pos = cc.p(120, 679);break;
                case 1:pos = cc.p(445, 679);break;
                case 2:pos = cc.p(121, 491);break;
                case 3:pos = cc.p(445, 491);break;
                case 4:pos = cc.p(94, 303);break;
                case 5:pos = cc.p(469, 303);break;
                case 6:pos = cc.p(278, 587);break;
                case 7:pos = cc.p(278, 399);break;
                default:break;
            }
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
        item.setTag(_tag);
        item.setPosition(cc.p(pos.x+item.getContentSize().width*0.5,pos.y-item.getContentSize().height*0.6));
        item.setScale(0.5);
        this.addChild(item, 2);

        var ac0 = cc.Sequence.create(cc.Spawn.create(cc.MoveBy.create(0.1,cc.p(0.0,item.getContentSize().height*0.1)),cc.ScaleTo.create(0.1,1.0)),cc.DelayTime.create(1.5),cc.CallFunc.create(this.removeItem, this));
        item.runAction(ac0);
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
                this.schdTime=0.20;
                this.showTime=1.00;
                this.schedule(this.addItems,this.schdTime);
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