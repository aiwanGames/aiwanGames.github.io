var mainLayer = cc.LayerColor.extend({
    winsize:null,
    itemArray:null,
    gameTime:0,
    sp_gameTime:null,
    gameLevel:0,
    sp_gameLevel:null,

    init:function ()
    {
        //初始化父类
        this._super();
        this.winsize = cc.Director.getInstance().getWinSize();
        this.setColor(cc.c4(255,255,255,255));

        //倒计时和层数
        var sp_time=cc.Sprite.create(s_img01);
        sp_time.setPosition(cc.p(this.winsize.width*0.1,this.winsize.height*0.96));
        this.addChild(sp_time,1);
        var sp_level=cc.Sprite.create(s_img01);
        sp_level.setPosition(cc.p(this.winsize.width*0.7,this.winsize.height*0.96));
        this.addChild(sp_level,1);

        //初始化物品数组
        this.itemArray=[];

        //添加时间，层数
        this.sp_gameTime=cc.LabelAtlas.create(""+this.gameTime,s_number,26,32,'0');
        this.sp_gameTime.setAnchorPoint(cc.p(0,0.5));
        this.sp_gameTime.setPosition(cc.p(this.winsize.width*0.23,this.winsize.height*0.96));
        this.addChild(this.sp_gameTime,1);

        this.sp_gameLevel=cc.LabelAtlas.create(""+this.gameLevel,s_number,26,32,'0');
        this.sp_gameLevel.setAnchorPoint(cc.p(0,0.5));
        this.sp_gameLevel.setPosition(cc.p(this.winsize.width*0.83,this.winsize.height*0.96));
        this.addChild(this.sp_gameLevel,1);

        //开启触摸
        this.setTouchEnabled(true);
        //开启schedule
        this.scheduleUpdate();
    },

    onEnterTransitionDidFinish:function()
    {

    },

    gotoOverLayer:function()
    {
        var scene=overLayer.create(this.gameLevel,parseInt(this.gameTime/60));
        cc.Director.getInstance().replaceScene(scene);
    },

    removeSprite:function(sprite)
    {
        //移除图标
        sprite.stopAllActions();
        this.removeChild(sprite,true);
        var id=this.blockArray.indexOf(sprite);
        if(id>-1)
        {
            this.blockArray.splice(id,1);
            this.gameLevel+=1;
        }
    },

    update:function(dt)
    {
        //游戏主要刷新函数
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
        this.onClickFlag = false;
    },

    onTouchesBegan:function(touches, event)
    {
        var touch = touches[0];
        var location = touch.getLocation();
        if(cc.rectContainsPoint(this.sp_left.getBoundingBox(),location))
        {
            this.onClickFlag = true;
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