var mainLayer = cc.LayerColor.extend({
    winsize:null,
    sp_catch:null,
    itemSpeed:1.5,
    schdSpeed:0.3,
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
        //时间、分数图标
        var timer=cc.Sprite.create(s_img17);
        timer.setScale(0.5);
        timer.setPosition(cc.p(this.winsize.width*0.1,this.winsize.height*0.95));
        this.addChild(timer,0);
        var score=cc.Sprite.create(s_img16);
        score.setScale(0.5);
        score.setPosition(cc.p(this.winsize.width*0.7,this.winsize.height*0.95));
        this.addChild(score,0);
        //时间
        this.timeLabel=cc.LabelAtlas.create(this.gameScore,s_img18,64,86,'0');
        this.timeLabel.setScale(0.4);
        this.timeLabel.setAnchorPoint(cc.p(0.0,0.5));
        this.timeLabel.setPosition(cc.p(this.winsize.width*0.18,this.winsize.height*0.95));
        this.addChild(this.timeLabel,1);
        this.scoreLabel=cc.LabelAtlas.create(this.gameScore,s_img18,64,86,'0');
        this.scoreLabel.setScale(0.4);
        this.scoreLabel.setAnchorPoint(cc.p(0.0,0.5));
        this.scoreLabel.setPosition(cc.p(this.winsize.width*0.78,this.winsize.height*0.95));
        this.addChild(this.scoreLabel,1);
        //音效开关
        var sound=null;
        if(this.sound==false)
        {
            sound=cc.Sprite.create(s_img15);
        }
        else
            sound=cc.Sprite.create(s_img14);
        sound.setScale(0.7);
        sound.setTag(300);
        sound.setAnchorPoint(cc.p(1.0,0));
        sound.setPosition(cc.p(this.winsize.width,this.winsize.height*0.6));
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

    },

    removeStar:function(sprite)
    {
        this.removeChild(sprite,true);
    },

    removeItem:function(sprite)
    {

    },

    setStop:function()
    {
        this.isStop=false;
        this.sp_catch.initWithFile(s_img05);
    },

    update:function(dt)
    {
        this.gameTime+=1;
        if(this.gameTime==360)
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

            }
            else
            {

            }
        }
        this.timeLabel.setString(Math.round(6-this.gameTime/60));
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
            sn.setPosition(cc.p(this.winsize.width,this.winsize.height*0.6));
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