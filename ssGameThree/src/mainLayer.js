var mainLayer = cc.LayerColor.extend({
    winsize:null,
    sp_catch:null,
    itemSpeed:1.5,
    schdSpeed:1.0,
    gameTime:0,
    gameScore:0,
    gameOver:false,
    scoreLabel:null,
    timeLabel:null,
    score:0,
    onClickFlag:false,
    _tag1:200,
    _tag2:240,
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
        //云彩循环移动
        var cloud=cc.Sprite.create(s_img09);
        cloud.setPosition(cc.p(-cloud.getContentSize().width*0.5,this.winsize.height*0.8));
        this.addChild(cloud,1);
        var acc=cc.Repeat.create(cc.Sequence.create(cc.MoveTo.create(6,cc.p(this.winsize.width+cloud.getContentSize().width*0.5,this.winsize.height*0.8)),cc.DelayTime.create(1.0),cc.MoveTo.create(6,cc.p(-cloud.getContentSize().width*0.5,this.winsize.height*0.8))),999);
        cloud.runAction(acc);
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
        this.holeArray=[0,0,0,0,0,0];
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

    getNextHole:function(_posId)
    {
        for(var i=_posId;i<6;i++)
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
        //cc.log("addSheep");
        var sheep=null;
        var itemid = this.getRandom(3);
        var _tag = 0;
        switch (itemid) {
            case 0:
            case 1:
                _tag = this._tag1;
                sheep = cc.Sprite.create(s_img07);
                sheep.setScale(0.42);
                break;
            default:
                _tag = this._tag2;
                sheep = cc.Sprite.create(s_img08);
                sheep.setScale(0.42);
                break;
        }

        if(_tag>=200&&_tag<240)
        {
            this._tag1+=1;
            if(this._tag1==239)
            {
                this._tag1=200;
            }
        }
        if(_tag>=240&&_tag<260)
        {
            this._tag2+=1;
            if(this._tag2==259)
            {
                this._tag2=240;
            }
        }
        sheep.setTag(_tag);
        sheep.setPosition(_pos);
        this.addChild(sheep, 1);
        var ac=cc.Sequence.create(cc.DelayTime.create(1.5),cc.FadeOut.create(0.2),cc.CallFunc.create(this.removeItem,this));
        sheep.runAction(ac);
    },

    addSheepByPatern:function(_patern,_pos)
    {
        //cc.log("addSheepByPatern");
        var dis=50;
       switch(_patern)
       {
           case 1:
               this.addSheep(cc.p(_pos.x-dis,_pos.y));
               this.addSheep(cc.p(_pos.x+dis,_pos.y));
               break;
           case 2:
               this.addSheep(cc.p(_pos.x-dis,_pos.y-dis));
               this.addSheep(cc.p(_pos.x,_pos.y+dis));
               this.addSheep(cc.p(_pos.x+dis,_pos.y-dis));
               break;
           case 3:
               this.addSheep(cc.p(_pos.x-dis,_pos.y+dis));
               this.addSheep(cc.p(_pos.x-dis,_pos.y-dis));
               this.addSheep(cc.p(_pos.x+dis,_pos.y+dis));
               this.addSheep(cc.p(_pos.x+dis,_pos.y-dis));
               break;
           case 4:
               this.addSheep(cc.p(_pos.x-dis*1.2,_pos.y));
               this.addSheep(cc.p(_pos.x+dis*1.2,_pos.y));
               this.addSheep(cc.p(_pos.x,_pos.y+dis*1.2));
               this.addSheep(cc.p(_pos.x,_pos.y-dis*1.2));
               break;
           default:
               break;
       }
    },

    addDropItems:function()
    {
        var ptId = this.getRandom(4)+1;
        var psId= this.getRandom(6);
        var pos=null;
        //cc.log(psId);
        if(this.holeArray[psId]>0)
        {
            psId=this.getNextHole(psId);
        }
        this.holeArray[psId]=1;
        cc.log("psId:"+psId);
        switch(psId)
        {
            case 0:
                pos=cc.p(this.winsize.width*0.16,this.winsize.height*0.6);
                break;
            case 1:
                pos=cc.p(this.winsize.width*0.50,this.winsize.height*0.6);
                break;
            case 2:
                pos=cc.p(this.winsize.width*0.82,this.winsize.height*0.6);
                break;
            case 3:
                pos=cc.p(this.winsize.width*0.16,this.winsize.height*0.32);
                break;
            case 4:
                pos=cc.p(this.winsize.width*0.50,this.winsize.height*0.32);
                break;
            default:
                pos=cc.p(this.winsize.width*0.82,this.winsize.height*0.32);
                break;

        }
        this.addSheepByPatern(ptId,pos);
        var lb=cc.LabelTTF.create("","Arial",20);
        lb.setPosition(cc.p(0,0));
        lb.setTag(psId);
        this.addChild(lb,0);
        lb.runAction(cc.Sequence.create(cc.DelayTime.create(1.9),cc.CallFunc.create(this.setHole,this)));
    },

    removeItem:function(sprite)
    {
        this.removeChild(sprite,true);
    },

    removeItem1:function(sprite)
    {
        this.inWarning=false;
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
        if(this.gameTime==1800)
        {
            this.gotoOverLayer();
        }
        else
        {
            if(this.gameTime==300)
            {
                this.schdSpeed=0.8;
                this.schedule(this.addDropItems,this.schdSpeed);
            }
            else if(this.gameTime==600)
            {
                this.schdSpeed=0.6;
                this.schedule(this.addDropItems,this.schdSpeed);
            }
            else
            {

            }
        }
        this.timeCntl+=1;
        this.timeLabel.setString(Math.round(30-this.gameTime/60));
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

        if(_tag>=200&&_tag<240)
        {
            sp1 = cc.Sprite.create(s_img12);
            sp2 = cc.Sprite.create(s_img12);
            sp3 = cc.Sprite.create(s_img12);
            sp1.setScale(0.4);
            sp2.setScale(0.4);
            sp3.setScale(0.4);

            sp1.setPosition(_pos);
            this.addChild(sp1,2);
            ac1=cc.Spawn.create(cc.MoveBy.create(0.4,cc.p(-20,20)),cc.RotateBy.create(0.4,180));
            ac2 = cc.CallFunc.create(this.removeItem, this);
            ac3=cc.Sequence.create(ac1,ac2);
            sp1.runAction(ac3);

            sp2.setPosition(_pos);
            this.addChild(sp2,2);
            ac1=cc.Spawn.create(cc.MoveBy.create(0.4,cc.p(20,20)),cc.RotateBy.create(0.4,180));
            ac2 = cc.CallFunc.create(this.removeItem, this);
            ac3=cc.Sequence.create(ac1,ac2);
            sp2.runAction(ac3);

            sp3.setPosition(_pos);
            this.addChild(sp3,2);
            ac1=cc.Spawn.create(cc.MoveBy.create(0.4,cc.p(0,-20)),cc.RotateBy.create(0.4,180));
            ac2 = cc.CallFunc.create(this.removeItem, this);
            ac3=cc.Sequence.create(ac1,ac2);
            sp3.runAction(ac3);

            var _r=this.getRandom(3);
            this.gameScore+=(_r+3);
            this.scoreLabel.setString(this.gameScore);
            this.scoreLabel.runAction(cc.Sequence.create(cc.ScaleTo.create(0.1,0.5),cc.ScaleTo.create(0.1,0.4)));
            var _sclabel=cc.LabelAtlas.create(_r+3,s_img18,64,86,'0');
            _sclabel.setScale(0.3);
            _sclabel.setAnchorPoint(cc.p(0.5,0.5));
            _sclabel.setPosition(_pos);
            this.addChild(_sclabel,4);
            _sclabel.runAction(cc.Sequence.create(cc.Spawn.create(cc.FadeOut.create(0.8),cc.MoveBy.create(0.8,cc.p(0,60))),cc.CallFunc.create(this.removeItem,this)));
        }
    },

    onTouchesMoved:function(touches, event)
    {
        var touch = touches[0];
        var location = touch.getLocation();
        if(this.timeCntl<26&&!this.inWarning)
        {
            for(var i=200;i<260;i++)
            {
                var sheep=this.getChildByTag(i);
                if(sheep!=null)
                {
                    var _rect=sheep.getBoundingBox();
                    if(cc.rectContainsPoint(_rect,location))
                    {
                        if(i<240)
                        {
                            this.removeSheep(i);
                        }
                        else
                        {
                            if(!this.inWarning)
                            {
                                this.inWarning=true;
                                var shld=cc.Sprite.create(s_img10);
                                shld.setPosition(cc.p(320,480));
                                this.addChild(shld,5);
                                var ac=cc.Sequence.create(cc.DelayTime.create(1.0),cc.CallFunc.create(this.removeItem,this));
                                shld.runAction(ac);
                                var ac1=cc.Sequence.create(cc.Place.create(cc.p(320,450)),cc.DelayTime.create(1.0),cc.CallFunc.create(this.removeItem1,this));
                                sheep.stopAllActions();
                                sheep.setOpacity(255);
                                sheep.setScale(0.8);
                                sheep.setZOrder(20);
                                sheep.runAction(ac1);
                                var label=cc.LabelTTF.create("呜呜，我早被剪光了","黑体",35);
                                label.setAnchorPoint(cc.p(0.5,0.5));
                                label.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.73));
                                label.setColor(cc.c3(255,255,255));
                                this.addChild(label,5);
                                var ac2=cc.Sequence.create(cc.DelayTime.create(1.0),cc.CallFunc.create(this.removeItem,this));
                                label.runAction(ac2);
                                if(this.sound)
                                {
                                    this.audio.playEffect(s_effect);
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    onTouchesEnded:function(touches, event)
    {
        var touch = touches[0];
        var location = touch.getLocation();
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
            sn.setPosition(cc.p(this.winsize.width,this.winsize.height*0.75));
        }
        this.timeCntl=0;
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