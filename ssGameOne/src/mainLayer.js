var mainLayer = cc.LayerColor.extend({
    winsize:null,
    sp_catch:null,
    itemSpeed:2.3,//图标下落时间
    schdSpeed:0.7,//生成图标间隔
    gameTime:0,
    gameScore:0,
    gameOver:false,
    scoreLabel:null,
    timeLabel:null,
    score:0,
    onClickFlag:false,
    _tag1:200,
    _tag2:210,
    _tag3:220,

    init:function ()
    {
        this._super();
        this.winsize = cc.Director.getInstance().getWinSize();
        //背景
        var sp_back=cc.Sprite.create(s_img01);
        sp_back.setAnchorPoint(cc.p(0.5,0));
        sp_back.setPosition(cc.p(this.winsize.width*0.5,0));
        this.addChild(sp_back,0);
        //添加聚宝盆
        this.sp_catch=cc.Sprite.create(s_img05);
        this.sp_catch.setPosition(cc.p(this.winsize.width*0.5,this.sp_catch.getContentSize().height*0.5));
        this.addChild(this.sp_catch,10);
        //分数时间
        this.timeLabel=cc.LabelTTF.create("Time: "+this.gameTime,"Arial",35);
        this.timeLabel.setAnchorPoint(cc.p(0.0,0.5));
        this.timeLabel.setPosition(cc.p(this.winsize.width*0.1,this.winsize.height*0.95));
        this.timeLabel.setColor(cc.c3(235,90,55));
        this.addChild(this.timeLabel,1);

        this.scoreLabel=cc.LabelTTF.create("Score: "+this.gameScore,"Arial",35);
        this.scoreLabel.setAnchorPoint(cc.p(0.0,0.5));
        this.scoreLabel.setPosition(cc.p(this.winsize.width*0.7,this.winsize.height*0.95));
        this.scoreLabel.setColor(cc.c3(235,90,55));
        this.addChild(this.scoreLabel,1);
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
    },

    addDropItems:function()
    {
        var itemid = this.getRandom(5);
        var rec = null;
        var item=null;
        var _tag = 0;
        switch (itemid) {
            case 0:
            case 1:
                _tag = this._tag1;
                item = cc.Sprite.create(s_img08);
                break;
            case 2:
            case 3:
                _tag = this._tag2;
                item = cc.Sprite.create(s_img09);
                break;
            default:
                _tag = this._tag3;
                item = cc.Sprite.create(s_img07);
                item.setScale(0.6);
                break;
        }

        if(_tag>=200&&_tag<210)
        {
            this._tag1+=1;
            if(this._tag1==209)
            {
                this._tag1=200;
            }
        }
        if(_tag>=210&&_tag<220)
        {
            this._tag2+=1;
            if(this._tag2==219)
            {
                this._tag2=210;
            }
        }
        if(_tag>=220&&_tag<230)
        {
            this._tag3+=1;
            if(this._tag3==229)
            {
                this._tag3=220;
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
        var ac0 = cc.MoveTo.create(this.itemSpeed, cc.p(item.getPositionX(), item.getContentSize().height * 0.5));
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
        var pos=cc.p(_pos.x,_pos.y-sprite.getContentSize().height*0.3);
        var ac1=null,ac2=null,ac3=null;

        var sp1=cc.Sprite.create(s_img12);
        sp1.setScale(0.6);
        sp1.setPosition(pos);
        this.addChild(sp1,2);
        ac1=cc.Spawn.create(cc.MoveBy.create(0.35,cc.p(-60,50)),cc.RotateBy.create(0.35,180));
        ac2 = cc.CallFunc.create(this.removeStar, this);
        ac3=cc.Sequence.create(ac1,ac2);
        sp1.runAction(ac3);

        var sp2=cc.Sprite.create(s_img12);
        sp2.setScale(0.6);
        sp2.setPosition(pos);
        this.addChild(sp2,2);
        ac1=cc.Spawn.create(cc.MoveBy.create(0.35,cc.p(0,70)),cc.RotateBy.create(0.35,180));
        ac2 = cc.CallFunc.create(this.removeStar, this);
        ac3=cc.Sequence.create(ac1,ac2);
        sp2.runAction(ac3);

        var sp3=cc.Sprite.create(s_img12);
        sp3.setScale(0.6);
        sp3.setPosition(pos);
        this.addChild(sp3,2);
        ac1=cc.Spawn.create(cc.MoveBy.create(0.35,cc.p(60,50)),cc.RotateBy.create(0.35,180));
        ac2 = cc.CallFunc.create(this.removeStar, this);
        ac3=cc.Sequence.create(ac1,ac2);
        sp3.runAction(ac3);

        this.removeChild(sprite,true);
    },

    update:function(dt)
    {
        //游戏主要刷新函数
        for(var i=200;i<=230;i++)
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
            if(iy-cy>ih*0.5&&iy-cy<ih*0.5+ch*0.35&&Math.abs(ix-cx)<cw*0.5)
            {
                var _iTag=_item.getTag();
                var ac1=cc.ScaleTo.create(0.1,1.2);
                var ac2=cc.ScaleTo.create(0.1,1.0);
                var ac3=cc.Sequence.create(ac1,ac2);
                this.scoreLabel.runAction(ac3);

                this.removeItem(_item);
                if(_iTag>=200&&_iTag<210)
                {
                    this.gameScore+=10;
                }
                else if(_iTag>=210&&_iTag<220)
                {
                    this.gameScore+=20;
                }
                else
                {
                    this.gameScore+=50;
                }
            }
        }

        this.gameTime+=1;
        if(this.gameTime==2100)
        {
            this.gotoOverLayer();
        }
        else
        {
            if(this.gameTime%400==0)
            {
                this.schdSpeed-=0.10;
                this.itemSpeed-=0.30;
                this.schedule(this.addDropItems,this.schdSpeed);
            }
        }
        this.timeLabel.setString("Time: "+Math.round(35-this.gameTime/60));
        this.scoreLabel.setString("Score: "+this.gameScore);
    },

    getRandom:function(maxsize)
    {
        return Math.floor(Math.random() * maxsize) % maxsize;
    },

    onTouchesMoved:function(touches, event)
    {
        var touch = touches[0];
        var location = touch.getLocation();
        if(this.onClickFlag)
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
    }
});

//构造函数create
mainLayer.create=function()
{
    var _mainLayer=new mainLayer();
    _mainLayer.init();
    var _scene=cc.Scene.create();
    _scene.addChild(_mainLayer);
    return _scene;
};