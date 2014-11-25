var mainLayer = cc.LayerColor.extend({
    winsize:null,
    gameTime:0,
    gameScore:0,
    sp_gameScore:null,
    sp_plane:null,
    isGameOver:false,
    fallSpeed:0,
    upHeight:0,
    isUpping:false,
    enemyTag:300,
    misTag:401,

    init:function ()
    {
        //初始化父类
        this._super();
        this.winsize = cc.Director.getInstance().getWinSize();
        this.setColor(cc.c3(130,200,252));

        //添加分数
        this.sp_gameScore=cc.LabelTTF.create("分数 "+this.gameScore,"Arial",33);
        this.sp_gameScore.setAnchorPoint(cc.p(0,0.5));
        this.sp_gameScore.setColor(cc.c3(245,245,50));
        this.sp_gameScore.setPosition(cc.p(this.winsize.width*0.02,this.winsize.height*0.96));
        this.addChild(this.sp_gameScore,2);

        //背景图片
        var sp_backGround1=cc.Sprite.create(s_img13);
        sp_backGround1.setAnchorPoint(cc.p(0,0));
        sp_backGround1.setPosition(cc.p(0,0));
        this.addChild(sp_backGround1,0);
        var ac0=cc.MoveBy.create(10.0,cc.p(-sp_backGround1.getContentSize().width,0));
        var ac1=cc.Place.create(cc.p(sp_backGround1.getContentSize().width,0));
        var ac2=cc.MoveBy.create(20.0,cc.p(-sp_backGround1.getContentSize().width*2,0));
        var ac3=cc.Place.create(cc.p(sp_backGround1.getContentSize().width,0));
        var ac4=cc.Sequence.create(ac0,ac1,cc.Repeat.create(cc.Sequence.create(ac2,ac3),999));
        sp_backGround1.runAction(ac4);
        var sp_backGround2=cc.Sprite.create(s_img13);
        sp_backGround2.setAnchorPoint(cc.p(0,0));
        sp_backGround2.setPosition(cc.p(sp_backGround2.getContentSize().width,0));
        this.addChild(sp_backGround2,0);
        ac0=cc.MoveBy.create(20.0,cc.p(-sp_backGround2.getContentSize().width*2,0));
        ac1=cc.Place.create(cc.p(sp_backGround2.getContentSize().width,0));
        ac2=cc.RepeatForever.create(cc.Sequence.create(ac0,ac1));
        sp_backGround2.runAction(ac2);

        //主角飞机并下落
        this.sp_plane=cc.Sprite.create(s_img14);
        this.sp_plane.setScale(0.6);
        this.sp_plane.setPosition(cc.p(this.winsize.width*0.1,this.winsize.height*0.8));
        this.addChild(this.sp_plane,2);

        cc.SpriteFrameCache.getInstance().addSpriteFrames(s_img10);

        //飞机下降速度
        this.fallSpeed=10;
        this.upHeight=5;

        //开启触摸
        this.setTouchEnabled(true);

        //开启schedule
        this.scheduleUpdate();
        this.schedule(this.addPlanes,1.8);
        this.schedule(this.addMissile,2.2);
    },

    onEnterTransitionDidFinish:function()
    {

    },

    addGameOverUIs:function()
    {
        //移除敌机
        for(var i=300;i<=400;i++)
        {
            var _enemy=this.getChildByTag(i);
            if(_enemy)
            {
                this.removeChild(_enemy,true);
            }
        }
        //移除导弹
        for(var i=401;i<=410;i++)
        {
            var _mis=this.getChildByTag(i);
            if(_mis)
            {
                this.removeChild(_mis,true);
            }
        }
        //再来一次
        var zailaiItem = cc.MenuItemImage.create(s_img07,s_img08,this.removeGameOverUIs,this);
        var menu = cc.Menu.create(zailaiItem);
        menu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.4));
        zailaiItem.setTag(200);
        menu.setTag(201);
        this.addChild(menu, 2);
        //手
        var sp_hand=cc.Sprite.create(s_img15);
        sp_hand.setPosition(cc.p(this.winsize.width*0.85,this.winsize.height*0.9));
        sp_hand.setRotation(35.0);
        sp_hand.setTag(202);
        this.addChild(sp_hand,2);
        var ac0=cc.MoveTo.create(0.4,cc.p(this.winsize.width*0.9,this.winsize.height*0.95));
        var ac1=cc.MoveTo.create(0.4,cc.p(this.winsize.width*0.85,this.winsize.height*0.9));
        var ac2=cc.Sequence.create(ac0,ac1);
        var ac3=cc.RepeatForever.create(ac2);
        sp_hand.runAction(ac3);
        //关注公众号
        var guanzhu=cc.LabelTTF.create("更多小游戏,尽在微信订阅号 : aiwanGames", "Arial",20);
        guanzhu.setColor(cc.c3(0, 0, 0));
        guanzhu.setAnchorPoint(cc.p(0.5,0.5));
        guanzhu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.27));
        guanzhu.setTag(204);
        this.addChild(guanzhu,2);
        //小提示
        var sp_tip=cc.Sprite.create(s_img17);
        sp_tip.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.85));
        sp_tip.setTag(209);
        this.addChild(sp_tip,2);
        //游戏结束
        var _over=cc.Sprite.create(s_img18);
        _over.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.73));
        _over.setTag(210);
        this.addChild(_over,2);
        //飞机起火
        var texture = cc.TextureCache.getInstance().addImage(s_img16);
        var particle=cc.ParticleFire.create();
        particle.setTexture(texture);
        particle.setPosition(this.sp_plane.getPosition());
        particle.setAutoRemoveOnFinish(true);
        particle.setScale(0.5);
        particle.setDuration(0.5);
        particle.setRotation(-35.0);
        particle.setTag(205);
        this.addChild(particle,2);

        var _score1=cc.Sprite.create(s_img12);
        _score1.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.58));
        _score1.setTag(206);
        _score1.setColor(cc.c3(0,0,0));
        this.addChild(_score1,2);

        var _score2=cc.Sprite.create(s_img12);
        _score2.setPosition(cc.p(this.winsize.width*0.32,this.winsize.height*0.58));
        _score2.setTag(207);
        _score2.setColor(cc.c3(0,0,0));
        this.addChild(_score2,2);

        var _score3=cc.Sprite.create(s_img12);
        _score3.setPosition(cc.p(this.winsize.width*0.68,this.winsize.height*0.58));
        _score3.setTag(208);
        _score3.setColor(cc.c3(0,0,0));
        this.addChild(_score3,2);

        if(this.gameScore>=1000&&this.gameScore<3000)
        {
            _score2.setColor(cc.WHITE);
        }
        if(this.gameScore>=3000&&this.gameScore<5000)
        {
            _score1.setColor(cc.WHITE);
            _score2.setColor(cc.WHITE);
        }
        if(this.gameScore>=5000)
        {
            _score1.setColor(cc.WHITE);
            _score2.setColor(cc.WHITE);
            _score3.setColor(cc.WHITE);
        }
    },

    removeGameOverUIs:function()
    {
        //移除结束界面UI
        for(var i= 200;i<=210;i++)
        {
            this.removeChild(this.getChildByTag(i),true);
        }
        this.isGameOver=false;
        this.enemyTag=300;
        this.misTag=401;
        this.gameScore=0;
        //重置飞机位置并下落
        this.sp_plane.setPosition(cc.p(this.winsize.width*0.1,this.winsize.height*0.8));
    },

    removeSprite:function(sprite)
    {
        sprite.stopAllActions();
        this.removeChild(sprite,true);
        this.gameScore+=50;
    },

    planeAction:function()
    {
        var ac0=cc.MoveBy.create(0.5,cc.p(0,this.upHeight));
        this.sp_plane.runAction(ac0);
    },

    addMissile:function()
    {
        if(this.isGameOver)return;
        var _id=this.getRandom(2);
        cc.log("mis"+_id);
        if(_id==1)
        {
            var _mis=cc.Sprite.create(s_img19,cc.rect(0,0,64,29));
            _mis.setPosition(cc.p(this.winsize.width+_mis.getContentSize().width*0.5,this.sp_plane.getPositionY()));
            this.addChild(_mis,2);
            _mis.setTag(this.misTag);
            this.misTag+=1;
            this.misTag=(this.misTag==410?401:this.misTag);
            var ac0=cc.MoveTo.create(2.5,cc.p(-_mis.getContentSize().width,this.sp_plane.getPositionY()));
            var ac1=cc.CallFunc.create(this.removeSprite,this);
            var ac2=cc.Animation.create();
            var txt=cc.TextureCache.getInstance().addImage(s_img19);
            ac2.addSpriteFrameWithTexture(txt,cc.rect(0,0,64,29));
            ac2.addSpriteFrameWithTexture(txt,cc.rect(0,29,64,29));
            ac2.addSpriteFrameWithTexture(txt,cc.rect(0,59,64,29));
            ac2.addSpriteFrameWithTexture(txt,cc.rect(0,87,64,29));
            ac2.setDelayPerUnit(0.1);
            ac2.setLoops(8);
            var ac3=cc.Animate.create(ac2);
            _mis.runAction(cc.Sequence.create(cc.Spawn.create(ac3,ac0),ac1));
        }
    },

    addPlanes:function()
    {
        if(this.isGameOver==false) {
            var planeId = this.getRandom(7);
            var _plane = null;
            var ac0 = null;
            switch (planeId) {
                case 0:
                    _plane = cc.Sprite.createWithSpriteFrameName("img_enemy01.png");
                    _plane.setPosition(cc.p(this.winsize.width + _plane.getContentSize().width * 0.5, this.winsize.height * 0.1));
                    _plane.setScale(0.75);
                    ac0 = cc.MoveBy.create(5.0, cc.p(-this.winsize.width - _plane.getContentSize().width, this.winsize.height * 0.8));
                    break;
                case 1:
                    _plane = cc.Sprite.createWithSpriteFrameName("img_enemy02.png");
                    _plane.setPosition(cc.p(this.winsize.width + _plane.getContentSize().width * 0.5, this.winsize.height * 0.2));
                    _plane.setScale(0.7);
                    ac0 = cc.MoveBy.create(5.0, cc.p(-this.winsize.width - _plane.getContentSize().width, 0));
                    break;
                case 2:
                    _plane = cc.Sprite.createWithSpriteFrameName("img_enemy03.png");
                    _plane.setPosition(cc.p(this.winsize.width + _plane.getContentSize().width * 0.5, this.winsize.height * 0.6));
                    _plane.setScale(0.65);
                    ac0 = cc.MoveBy.create(5.0, cc.p(-this.winsize.width - _plane.getContentSize().width, 0));
                    break;
                case 3:
                    _plane = cc.Sprite.createWithSpriteFrameName("img_enemy04.png");
                    _plane.setPosition(cc.p(this.winsize.width + _plane.getContentSize().width * 0.5, this.winsize.height * 0.85));
                    ac0 = cc.MoveBy.create(5.0, cc.p(-this.winsize.width - _plane.getContentSize().width, 0));
                    break;
                case 4:
                    _plane = cc.Sprite.createWithSpriteFrameName("img_enemy05.png");
                    _plane.setPosition(cc.p(this.winsize.width + _plane.getContentSize().width * 0.5, this.winsize.height * 0.7));
                    _plane.setScale(0.7);
                    ac0 = cc.MoveBy.create(5.0, cc.p(-this.winsize.width - _plane.getContentSize().width, -this.winsize.height * 0.7));
                    break;
                case 5:
                    _plane = cc.Sprite.createWithSpriteFrameName("img_enemy06.png");
                    _plane.setPosition(cc.p(this.winsize.width + _plane.getContentSize().width * 0.5, this.winsize.height * 0.5));
                    _plane.setScale(0.7);
                    ac0 = cc.MoveBy.create(5.0, cc.p(-this.winsize.width - _plane.getContentSize().width, 0));
                    break;
                case 6:
                    _plane = cc.Sprite.createWithSpriteFrameName("img_enemy07.png");
                    _plane.setPosition(cc.p(this.winsize.width + _plane.getContentSize().width * 0.5, this.winsize.height * 0.4));
                    _plane.setScale(0.6);
                    ac0 = cc.MoveBy.create(5.0, cc.p(-this.winsize.width - _plane.getContentSize().width, 0));
                    break;
            }
            this.addChild(_plane, 1);
            _plane.setTag(this.enemyTag);
            this.enemyTag+=1;
            this.enemyTag=(this.enemyTag==400?300:this.enemyTag);
            var ac1=cc.CallFunc.create(this.removeSprite,this);
            _plane.runAction(cc.Sequence.create(ac0,ac1));
        }
    },

    update:function(dt) {
        //游戏主要刷新函数
        if (this.isGameOver==false)
        {
            if (this.sp_plane.getPositionY() <= this.sp_plane.getContentSize().height * 0.55)
            {
                this.isGameOver=true;
                this.addGameOverUIs();
            }
            else if(this.sp_plane.getPositionY() > this.winsize.height*0.85)
            {
                this.sp_plane.setPosition(cc.p(this.sp_plane.getPositionX(), this.winsize.height*0.85));
            }
            else
            {
                if(!this.isUpping)
                {
                    this.sp_plane.setPosition(cc.p(this.sp_plane.getPositionX(),this.sp_plane.getPositionY()-this.fallSpeed));
                }
                else
                {
                    this.planeAction();
                }
            }
            //碰撞检测
            for(var i=300;i<=400;i++)
            {
                var _enemy=this.getChildByTag(i);
                if(_enemy)
                {
                    var _enemyBox=_enemy.getBoundingBox();
                    var _planeBox=this.sp_plane.getBoundingBox();
                    if(cc.rectIntersectsRect(_enemyBox,_planeBox))
                    {
                        this.isGameOver=true;
                        this.sp_plane.stopAllActions();
                        this.addGameOverUIs();
                        break;
                    }
                }
            }
            for(var i=401;i<=410;i++)
            {
                var _mis=this.getChildByTag(i);
                if(_mis)
                {
                    var _misBox=_mis.getBoundingBox();
                    var _planeBox=this.sp_plane.getBoundingBox();
                    if(cc.rectIntersectsRect(_misBox,_planeBox))
                    {
                        this.isGameOver=true;
                        this.sp_plane.stopAllActions();
                        this.addGameOverUIs();
                        break;
                    }
                }
            }
            //刷新分数
            this.sp_gameScore.setString("分数 "+this.gameScore);
        }
    },

    getRandom:function(maxsize)
    {
        //生成随机数
        return Math.floor(Math.random() * maxsize) % maxsize;
    },

    onTouchesMoved:function(touches, event)
    {

    },

    onTouchesEnded:function(touches, event)
    {
        this.isUpping=false;
    },

    onTouchesBegan:function(touches, event)
    {
        if(!this.isGameOver)
        {
            this.isUpping=true;
        }
    }
})

//构造函数create
mainLayer.create=function()
{
    var _mainLayer=new mainLayer();
    _mainLayer.init();
    var _scene=cc.Scene.create();
    _scene.addChild(_mainLayer);
    return _scene;
}