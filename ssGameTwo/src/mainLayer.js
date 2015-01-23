var mainLayer = cc.LayerColor.extend({
    winsize:null,
    sp_catch:null,
    showTime:1.0,
    schdTime:0.8,
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
    holeArray:null,
    canHit:true,

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
        //初始化数组
        this.holeArray=[0,0,0,0,0,0,0,0];
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
        var itemid = this.getRandom(3);
        var item=null;
        var posid=0;
        var _tag = 0;
        var pos = null;
        if (itemid==0)
        {
            _tag = this._tag1;
            item = cc.Sprite.create(s_img06);
            posid = this.getRandom(8);
            if(this.holeArray[posid]==0)
            {
                this.holeArray[posid]=_tag;
            }
            else
            {
                posid=this.getNextHole(posid);
                this.holeArray[posid]=_tag;
            }
            //cc.log("holeId:"+posid+"，tag:"+_tag);
            switch (posid) {
                case 0:pos = cc.p(94, 670);break;
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
            posid = this.getRandom(8);
            if(this.holeArray[posid]==0)
            {
                this.holeArray[posid]=_tag;
            }
            else
            {
                posid=this.getNextHole(posid);
                this.holeArray[posid]=_tag;
            }
            //cc.log("holeId:"+posid+"，tag:"+_tag);
            switch (posid) {
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

        var ac0 = cc.Sequence.create(cc.Spawn.create(cc.MoveBy.create(0.1,cc.p(0.0,item.getContentSize().height*0.1)),cc.ScaleTo.create(0.1,1.0)),cc.DelayTime.create(this.showTime),cc.CallFunc.create(this.removeItem, this));
        item.runAction(ac0);
    },

    getNextHole:function(_posId)
    {
        for(var i=_posId;i<8;i++)
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

    removeSprite:function(sprite)
    {
        this.canHit=true;
        var _tag=sprite.getTag();
        for(var i=0;i<8;i++)
        {
            if(this.holeArray[i]==_tag)
            {
                var lb=cc.LabelTTF.create("","Arial",20);
                lb.setPosition(cc.p(0,0));
                this.addChild(lb,0);
                lb.runAction(cc.Sequence.create(cc.DelayTime.create(this.schdTime-0.3),cc.CallFunc.create(this.setHole(i),this)));
                break;
            }
        }
        this.removeChild(sprite,true);
    },

    removeItem:function(sprite)
    {
        var _tag=sprite.getTag();
        for(var i=0;i<8;i++)
        {
            if(this.holeArray[i]==_tag)
            {
                var lb=cc.LabelTTF.create("","Arial",20);
                lb.setPosition(cc.p(0,0));
                this.addChild(lb,0);
                lb.runAction(cc.Sequence.create(cc.DelayTime.create(this.schdTime-0.3),cc.CallFunc.create(this.setHole(i),this)));
                break;
            }
        }
        this.removeChild(sprite,true);
    },

    setHole:function(_id)
    {
        this.holeArray[_id]=0;
        //cc.log("set hole["+_id+"]");
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
            if(this.gameTime==300)
            {
                this.schdTime=0.6;
                this.showTime=1.0;
                this.schedule(this.addItems,this.schdTime);
            }
            if(this.gameTime==600)
            {
                this.schdTime=0.5;
                this.showTime=1.0;
                this.schedule(this.addItems,this.schdTime);
            }
            if(this.gameTime==1200)
            {
                this.schdTime=0.4;
                this.showTime=1.0;
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
        cc.log("x:"+location.x+",y:"+location.y);
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
        if(location.x>this.winsize.width*0.1&&location.x<this.winsize.width*0.9
        &&location.y>this.winsize.height*0.15&&location.y<this.winsize.height*0.8)
        {
            for(var i=200;i<240;i++)
            {
                var sp=this.getChildByTag(i);
                if(sp!=null)
                {
                    var rect=sp.getBoundingBox();
                    var pos=sp.getPosition();
                    var _tag=sp.getTag();
                    if(cc.rectContainsPoint(rect,location)&&this.canHit==true)
                    {
                        var chuizi=null;
                        var _sclabel=cc.LabelTTF.create("","Arial",30);
                        _sclabel.setPosition(pos);
                        _sclabel.setColor(cc.c3(255,140,115));
                        this.addChild(_sclabel,6);
                        if(_tag>=200&&_tag<220)
                        {
                            this.canHit=false;
                            if(this.sound==true)
                            {
                                this.audio.playEffect(s_effect);
                            }
                            chuizi=cc.Sprite.create(s_img16);
                            chuizi.setAnchorPoint(cc.p(1.0,0.0));
                            chuizi.setRotation(30.0);
                            chuizi.setPosition(cc.p(pos.x+chuizi.getContentSize().width*0.5+10,pos.y-10));
                            this.addChild(chuizi,5);
                            _sclabel.setString("-20");
                            //_sclabel.setColor(cc.c3(190,130,45));
                            this.gameScore-=20;
                            this.getChildByTag(_tag).stopAllActions();
                            this.getChildByTag(_tag).runAction(cc.Sequence.create(cc.DelayTime.create(1.1),cc.CallFunc.create(this.removeSprite,this)));
                            chuizi.runAction(cc.Sequence.create(cc.RotateBy.create(0.1,-30.0),cc.DelayTime.create(1.0),cc.CallFunc.create(this.removeChuizi,this)));
                        }
                        else
                        {
                            chuizi=cc.Sprite.create(s_img05);
                            chuizi.setAnchorPoint(cc.p(1.0,0.0));
                            chuizi.setRotation(30.0);
                            chuizi.setPosition(cc.p(pos.x+chuizi.getContentSize().width*0.5+10,pos.y-10));
                            this.addChild(chuizi,5);
                            chuizi.runAction(cc.Sequence.create(cc.RotateBy.create(0.1,-30.0),cc.DelayTime.create(0.15),cc.CallFunc.create(this.removeChuizi,this)));
                            this.getChildByTag(_tag).initWithFile(s_img08);
                            _sclabel.setString("+10");
                            this.gameScore+=10;
                        }
                        this.scoreLabel.setString("Score: "+this.gameScore);
                        this.scoreLabel.runAction(cc.Sequence.create(cc.ScaleTo.create(0.1,1.1),cc.ScaleTo.create(0.1,1.0)));
                        _sclabel.runAction(cc.Sequence.create(cc.Spawn.create(cc.FadeOut.create(0.8),cc.MoveBy.create(0.8,cc.p(0,70))),cc.CallFunc.create(this.removeStar,this)));
                    }
                }
            }
        }
    },

    removeChuizi:function(sprite)
    {
        this.removeChild(sprite,true);
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