var mainLayer = cc.LayerColor.extend({
    winsize:null,
    sp_catch:null,
    schdSpeed:0.7,
    gameTime:35,
    gameScore:0,
    gameOver:false,
    scoreLabel:null,
    timeLabel:null,
    score:0,
    onClickFlag:false,
    _tag1:200,
    _tag2:215,
    _tag3:230,
    _tag4:245,
    sound:false,
    isStop:false,
    holeArray:null,
    timeCntl:0,
    beginCntl:false,
    inWarning:false,

    init:function ()
    {
        this._super();
        this.winsize = cc.Director.getInstance().getWinSize();
        this.audio=cc.AudioEngine.getInstance();
        document.body.style.backgroundColor="#98D8FB";

        var sp_back1=cc.Sprite.create(s_00);
        sp_back1.setAnchorPoint(cc.p(0.5,0));
        sp_back1.setPosition(cc.p(this.winsize.width*0.5,0));
        this.addChild(sp_back1,0);

        var sp_back4=cc.Sprite.create(s_02);
        sp_back4.setAnchorPoint(cc.p(0.5,0));
        sp_back4.setPosition(cc.p(this.winsize.width*0.5,0));
        this.addChild(sp_back4, 1);

        var soundImage=null;
        if(this.sound==true)
        {
            soundImage=cc.MenuItemImage.create(s_09,s_09,this.setMusicOn,this);
        }
        else
        {
            soundImage=cc.MenuItemImage.create(s_08,s_08,this.setMusicOn,this);
        }
        soundImage.setAnchorPoint(cc.p(1.0,0.0));
        soundImage.setTag(87);
        soundImage.setScale(0.5);
        var soundMenu=cc.Menu.create(soundImage);
        soundMenu.setTag(88);
        soundMenu.setPosition(cc.p(this.winsize.width-5,this.winsize.height*0.01));
        this.addChild(soundMenu,15);

        var goldsp=cc.Sprite.create(s_10);
        goldsp.setPosition(cc.p(this.winsize.width*0.1,this.winsize.height*0.92));
        this.addChild(goldsp, 1);

        var gold1sp=cc.Sprite.create(s_12);
        gold1sp.setPosition(cc.p(this.winsize.width*0.17,this.winsize.height*0.92));
        //this.addChild(gold1sp, 1);

        var timesp=cc.Sprite.create(s_11);
        timesp.setPosition(cc.p(this.winsize.width*0.73,this.winsize.height*0.92));
        this.addChild(timesp, 1);

        //this.timeLabel=cc.LabelAtlas.create(this.gameScore,s_13,25,38,'0');
        //this.timeLabel.setScale(0.4);
        this.timeLabel=cc.LabelTTF.create(this.gameTime+"s","Arial",34);
        this.timeLabel.setColor(cc.c3(248,206,58));
        this.timeLabel.setAnchorPoint(cc.p(0.0,0.5));
        this.timeLabel.setPosition(cc.p(this.winsize.width*0.82,this.winsize.height*0.92));
        this.addChild(this.timeLabel,1);
       // this.scoreLabel=cc.LabelAtlas.create(this.gameScore,s_13,30,38,'0');
        //this.scoreLabel.setScale(0.4);
        this.scoreLabel=cc.LabelTTF.create(" × "+this.gameScore,"Arial",34);
        this.scoreLabel.setColor(cc.c3(248,206,58));
        this.scoreLabel.setAnchorPoint(cc.p(0.0,0.5));
        this.scoreLabel.setPosition(cc.p(this.winsize.width*0.14,this.winsize.height*0.92));
        this.addChild(this.scoreLabel,1);
        this.holeArray=[0,0,0,0,0,0,0,0,0];
    },

    onEnterTransitionDidFinish:function()
    {
        this.setTouchEnabled(true);
        this.schedule(this.addDropItems,this.schdSpeed);
        this.scheduleUpdate();
    },

    setMusicOn:function() {
        if (this.getChildByTag(87))this.removeChildByTag(87, true);
        if (this.getChildByTag(88))this.removeChildByTag(88, true);
        if (this.sound == false) {
            this.sound = true;
            var soundImage = cc.MenuItemImage.create(s_09, s_09, this.setMusicOn, this);
            soundImage.setAnchorPoint(cc.p(1.0, 0.0));
            soundImage.setScale(0.5);
            soundImage.setTag(87);
            var soundMenu = cc.Menu.create(soundImage);
            soundMenu.setTag(88);
            soundMenu.setPosition(cc.p(this.winsize.width - 5, this.winsize.height * 0.01));
            this.addChild(soundMenu, 15);
            cc.AudioEngine.getInstance().playMusic(s_music, true);
        }
        else {
            this.sound = false;
            var soundImage = cc.MenuItemImage.create(s_08, s_08, this.setMusicOn, this);
            soundImage.setAnchorPoint(cc.p(1.0, 0.0));
            soundImage.setScale(0.5);
            soundImage.setTag(87);
            var soundMenu = cc.Menu.create(soundImage);
            soundMenu.setTag(88);
            soundMenu.setPosition(cc.p(this.winsize.width - 5, this.winsize.height * 0.01));
            this.addChild(soundMenu, 15);
            cc.AudioEngine.getInstance().stopMusic();
        }
    },

    gotoOverLayer:function()
    {
        var scene=overLayer.create(this.gameScore,this.sound);
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,scene));
        this.audio.stopMusic();
    },

    getNextHole:function(_posId)
    {
        for(var i=_posId;i<9;i++)
        {
            if(this.holeArray[i]==0)
            {
                return i;
            }
        }
        for(var j=0;j<_posId;j++)
        {
            if(this.holeArray[j]==0)
            {
                return j;
            }
        }
    },

    addSheep:function(_pos)
    {
        var sheep=null;
        var itemid = this.getRandom(4);
        var _tag = 0;
        switch (itemid) {
            case 0:
                _tag = this._tag1;
                sheep = cc.Sprite.create(s_14);
                break;
            case 1:
                _tag = this._tag2;
                sheep = cc.Sprite.create(s_15);
                break
            case 2:
                _tag = this._tag3;
                sheep = cc.Sprite.create(s_16);
                break;
            default:
                _tag = this._tag4;
                sheep = cc.Sprite.create(s_17);
                break;
        }

        if(_tag>=200&&_tag<215)
        {
            this._tag1+=1;
            if(this._tag1==215)
            {
                this._tag1=200;
            }
        }
        if(_tag>=215&&_tag<230)
        {
            this._tag2+=1;
            if(this._tag2==230)

            {
                this._tag2=215;
            }
        }
        if(_tag>=230&&_tag<245)
        {
            this._tag3+=1;
            if(this._tag3==245)

            {
                this._tag3=230;
            }
        }
        if(_tag>=245&&_tag<260)
        {
            this._tag4+=1;
            if(this._tag4==260)

            {
                this._tag4=245;
            }
        }
        sheep.setTag(_tag);
        sheep.setScale(0.01);
        sheep.setPosition(_pos);
        this.addChild(sheep, 3);
        var ac=cc.Sequence.create(cc.ScaleTo.create(0.1,1.0),cc.DelayTime.create(0.6+this.schdSpeed*0.5),cc.FadeOut.create(0.1),cc.CallFunc.create(this.removeItem,this));
        sheep.runAction(ac);
    },

    addDropItems:function()
    {
        var psId= this.getRandom(6);
        var pos=null;
        if(this.holeArray[psId]>0)
        {
            psId=this.getNextHole(psId);
        }
        this.holeArray[psId]=1;
        switch(psId)
        {
            case 0:
                pos=cc.p(this.winsize.width*0.16,this.winsize.height*0.73);
                break;
            case 1:
                pos=cc.p(this.winsize.width*0.50,this.winsize.height*0.73);
                break;
            case 2:
                pos=cc.p(this.winsize.width*0.82,this.winsize.height*0.73);
                break;
            case 3:
                pos=cc.p(this.winsize.width*0.16,this.winsize.height*0.5);
                break;
            case 4:
                pos=cc.p(this.winsize.width*0.50,this.winsize.height*0.5);
                break;
            case 5:
                pos=cc.p(this.winsize.width*0.82,this.winsize.height*0.5);
                break;
            case 6:
                pos=cc.p(this.winsize.width*0.16,this.winsize.height*0.27);
                break;
            case 7:
                pos=cc.p(this.winsize.width*0.50,this.winsize.height*0.27);
                break;
            case 8:
                pos=cc.p(this.winsize.width*0.82,this.winsize.height*0.27);
                break;
        }
        this.addSheep(pos);
        var lb=cc.LabelTTF.create("","Arial",20);
        lb.setPosition(cc.p(0,0));
        lb.setTag(psId);
        this.addChild(lb,0);
        lb.runAction(cc.Sequence.create(cc.DelayTime.create(1.35),cc.CallFunc.create(this.setHole,this)));
    },

    removeItem:function(sprite)
    {
        this.removeChild(sprite,true);
    },

    removeItem1:function(sprite)
    {
        this.inWarning=false;
        if(this.getChildByTag(87))this.getChildByTag(87).setEnabled(true);
        if(this.getChildByTag(88))this.getChildByTag(88).setEnabled(true);
        this.removeChild(sprite,true);
    },

    setHole:function(_lb)
    {
        this.holeArray[_lb.getTag()]=0;
        this.removeChild(_lb,true);
    },

    update:function(dt)
    {
        this.gameTime+=1;
        if(this.gameTime==2100)
        {
            this.gotoOverLayer();
        }
        else
        {
            if(this.gameTime==300)
            {
                this.schdSpeed=0.6;
                this.schedule(this.addDropItems,this.schdSpeed);
            }
            else if(this.gameTime==600)
            {
                this.schdSpeed=0.5;
                this.schedule(this.addDropItems,this.schdSpeed);
            }
            else if(this.gameTime==900)
            {
                this.schdSpeed=0.4;
                this.schedule(this.addDropItems,this.schdSpeed);
            }
            else if(this.gameTime==1200)
            {
                this.schdSpeed=0.3;
                this.schedule(this.addDropItems,this.schdSpeed);
            }
            else
            {

            }
        }
        this.timeLabel.setString(Math.round(35-this.gameTime/60)+"s");
    },

    getRandom:function(maxsize)
    {
        return Math.floor(Math.random() * maxsize) % maxsize;
    },

    removeSheep:function(_tag)
    {
        var _pos=this.getChildByTag(_tag).getPosition();
        this.removeChildByTag(_tag,true);
        var ac1=null,ac2=null,ac3=null;
        var sp1=null,sp2=null,sp3=null;

        if(_tag>=200&&_tag<260)
        {
            sp1 = cc.Sprite.create(s_star);
            sp2 = cc.Sprite.create(s_star);
            sp3 = cc.Sprite.create(s_star);
            sp1.setScale(0.5);
            sp2.setScale(0.5);
            sp3.setScale(0.5);

            sp1.setPosition(_pos);
            this.addChild(sp1,1);
            ac1=cc.Spawn.create(cc.MoveBy.create(0.4,cc.p(-70,70)),cc.RotateBy.create(0.4,180));
            ac2 = cc.CallFunc.create(this.removeItem, this);
            ac3=cc.Sequence.create(ac1,ac2);
            sp1.runAction(ac3);

            sp2.setPosition(_pos);
            this.addChild(sp2,1);
            ac1=cc.Spawn.create(cc.MoveBy.create(0.4,cc.p(70,70)),cc.RotateBy.create(0.4,-180));
            ac2 = cc.CallFunc.create(this.removeItem, this);
            ac3=cc.Sequence.create(ac1,ac2);
            sp2.runAction(ac3);

            sp3.setPosition(_pos);
            this.addChild(sp3,1);
            ac1=cc.Spawn.create(cc.MoveBy.create(0.4,cc.p(0,-70)),cc.RotateBy.create(0.4,180));
            ac2 = cc.CallFunc.create(this.removeItem, this);
            ac3=cc.Sequence.create(ac1,ac2);
            sp3.runAction(ac3);

            var scoresp=null;
            if(_tag>=200&&_tag<215)
            {
                scoresp=cc.Sprite.create(s_add50);
                this.gameScore+=50;
                if (this.sound)
                {
                    this.audio.playEffect(s_gold);
                }
            }
            if(_tag>=215&&_tag<230)
            {
                scoresp=cc.Sprite.create(s_add20);
                this.gameScore+=20;
                if (this.sound)
                {
                    this.audio.playEffect(s_bird);
                }
            }
            if(_tag>=230&&_tag<245)
            {
                scoresp=cc.Sprite.create(s_add30);
                this.gameScore+=30;
                if (this.sound)
                {
                    this.audio.playEffect(s_cat);
                }
            }
            if(_tag>=245&&_tag<260)
            {

            }
            this.scoreLabel.setString(" × "+this.gameScore);
            this.scoreLabel.runAction(cc.Sequence.create(cc.ScaleTo.create(0.1,1.2),cc.ScaleTo.create(0.1,1.0)));
            scoresp.setAnchorPoint(cc.p(0.5,0.5));
            scoresp.setPosition(_pos);
            this.addChild(scoresp,4);
            scoresp.runAction(cc.Sequence.create(cc.Spawn.create(cc.FadeOut.create(0.8),cc.MoveBy.create(0.8,cc.p(0,60))),cc.CallFunc.create(this.removeItem,this)));
        }
    },

    onTouchesBegan:function(touches, event)
    {
        var touch = touches[0];
        var location = touch.getLocation();

        if(!this.inWarning)
        {
            for (var i = 200; i < 260; i++)
            {
                var sheep = this.getChildByTag(i);
                if (sheep != null) {
                    var _rect = sheep.getBoundingBox();
                    if (cc.rectContainsPoint(_rect, location))
                    {
                        if (i < 245)
                        {
                            this.removeSheep(i);
                        }
                        else
                        {
                            if (!this.inWarning)
                            {
                                this.inWarning = true;
                                if(this.getChildByTag(87))this.getChildByTag(87).setEnabled(false);
                                if(this.getChildByTag(88))this.getChildByTag(88).setEnabled(false);
                                var shld = cc.Sprite.create(s_shld);
                                shld.setScaleY(1.5);
                                shld.setPosition(cc.p(this.winsize.width * 0.5, this.winsize.height * 0.5));
                                this.addChild(shld, 50);
                                var ac = cc.Sequence.create(cc.DelayTime.create(2.0), cc.CallFunc.create(this.removeItem1, this));
                                shld.runAction(ac);
                                var ac1 = cc.Sequence.create(cc.Place.create(cc.p(this.winsize.width * 0.5, this.winsize.height * 0.5)), cc.DelayTime.create(2.0), cc.CallFunc.create(this.removeItem, this));
                                sheep.stopAllActions();
                                sheep.setOpacity(255);
                                sheep.setZOrder(60);
                                sheep.runAction(ac1);
                                var tip = cc.Sprite.create(s_18);
                                tip.setPosition(cc.p(this.winsize.width * 0.5, this.winsize.height * 0.8));
                                this.addChild(tip, 52);
                                tip.runAction(cc.Sequence.create(cc.DelayTime.create(2.0), cc.CallFunc.create(this.removeItem, this)));
                                var clip = cc.Sprite.create(s_19);
                                clip.setScale(0.001);
                                clip.setPosition(cc.p(this.winsize.width * 0.5, this.winsize.height * 0.5));
                                clip.runAction(cc.Sequence.create(cc.DelayTime.create(0.5),cc.EaseElasticOut.create(cc.ScaleTo.create(0.5,1.0)),cc.DelayTime.create(0.5),cc.Spawn.create(cc.FadeOut.create(0.7),cc.ScaleTo.create(0.7,7.0)),cc.CallFunc.create(this.removeItem, this)));
                                this.addChild(clip, 52);
                                clip.setZOrder(61);
                                if (this.sound)
                                {
                                    this.audio.playEffect(s_qin);
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    setSound:function(_sound)
    {
        this.sound=_sound;
    }
});

mainLayer.create=function(_sound)
{
    var _mainLayer=new mainLayer();
    _mainLayer.setSound(_sound);
    _mainLayer.init();
    var _scene=cc.Scene.create();
    _scene.addChild(_mainLayer);
    return _scene;
};