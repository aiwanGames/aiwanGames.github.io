/**
 * Created by apple on 14-11-14.
 */
var mainLayer = cc.LayerColor.extend({
    winsize:null,
    blockArray:null,
    gameTime:30,
    sp_gameTime:null,
    gameLevel:0,
    sp_gameLevel:null,
    posArray:null,
    toFindBlock:null,
    otherTag:200,
    model:1,
    schSpeed:1.0,
    isTouched:false,

    init:function ()
    {
        // 1. super init first
        this._super();
        this.winsize = cc.Director.getInstance().getWinSize();
        //背景图片
        var sp_back=cc.Sprite.create(s_img01);
        sp_back.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.5));
        this.addChild(sp_back,1);
        var _spriteFrameCache=cc.SpriteFrameCache.getInstance();
        _spriteFrameCache.addSpriteFrames(s_img08);
        //初始图片数组
        this.blockArray=[];
        //添加时间，关卡
        this.sp_gameTime=cc.LabelTTF.create("时间 : "+this.gameTime,"Consolas",30);
        this.sp_gameTime.setAnchorPoint(cc.p(0,0.5));
        this.sp_gameTime.setColor(cc.c3(245, 245, 50));
        this.sp_gameTime.setPosition(cc.p(this.winsize.width*0.1,this.winsize.height*0.95));
        this.addChild(this.sp_gameTime,2);
        this.sp_gameLevel=cc.LabelTTF.create("组数 : "+this.gameLevel,"Consolas",30);
        this.sp_gameLevel.setAnchorPoint(cc.p(0,0.5));
        this.sp_gameLevel.setColor(cc.c3(245, 245, 50));
        this.sp_gameLevel.setPosition(cc.p(this.winsize.width*0.66,this.winsize.height*0.95));
        this.addChild(this.sp_gameLevel,2);
        //开启触摸
        this.setTouchEnabled(true);
        //开启schedule
        //生成9个图块，慢慢隐现
        this.toFindBlock =cc.Sprite.createWithSpriteFrameName("img_red01.png");
        this.scheduleOnce(this.addBlocks);
    },

    onEnterTransitionDidFinish:function()
    {

    },

    gotoOverLayer:function(_model)
    {
        var scene=overLayer.create(this.gameLevel,this.gameTime,_model);
        cc.Director.getInstance().replaceScene(scene);
    },

    addBlocks:function()
    {
        //清空数据
        for(var i=200;i<210;i++)
        {
            var _blk=this.getChildByTag(i);
            this.removeChild(_blk,true);
        }
        //生成一个图块
        var colorId=this.getRandom(6)+1;
        var toFindId=this.getRandom(3)+1;
        var otherId=this.getDifferent(toFindId);
        var toFindpx=this.getRandom(3)+1;
        var toFindpy=this.getRandom(3)+1;
        var blockstr,toFindstr,otherstr;
        switch(colorId)
        {
            case 1:
                blockstr="img_blue";
                break;
            case 2:
                blockstr="img_gray";
                break;
            case 3:
                blockstr="img_green";
                break;
            case 4:
                blockstr="img_pink";
                break;
            case 5:
                blockstr="img_purple";
                break;
            case 6:
                blockstr="img_red";
                break;
            case 7:
                blockstr="img_yellow";
                break;
        }
        switch(toFindId)
        {
            case 1:
                toFindstr=blockstr+"01.png";
                break;
            case 2:
                toFindstr=blockstr+"02.png";
                break;
            case 3:
                toFindstr=blockstr+"03.png";
                break;
        }
        switch(otherId)
        {
            case 1:
                otherstr=blockstr+"01.png";
                break;
            case 2:
                otherstr=blockstr+"02.png";
                break;
            case 3:
                otherstr=blockstr+"03.png";
                break;
        }

        this.toFindBlock.initWithSpriteFrameName(toFindstr);
        this.toFindBlock.setPosition(this.makePosition(toFindpx,toFindpy));
        this.toFindBlock.setTag(200);
        this.addChild(this.toFindBlock,1);
        //this.blockArray.push(this.toFindBlock);

        for(var i=1;i<=3;i++)
        {
            for(var j=1;j<=3;j++)
            {
                if((i!=toFindpx)||(j!=toFindpy))
                {
                    var block =cc.Sprite.createWithSpriteFrameName(otherstr);
                    block.setPosition(this.makePosition(i,j));
                    this.otherTag+=1;
                    block.setTag(this.otherTag);
                    this.addChild(block,1);
                    //this.blockArray.push(block);
                }
            }
        }
    },

    makePosition:function(_px,_py)
    {
        var px,py;
        switch(_px)
        {
            case 1:
                px=this.winsize.width*0.815;
                break;
            case 2:
                px=this.winsize.width*0.5;
                break;
            case 3:
                px=this.winsize.width*0.185;
                break;
        }
        switch(_py)
        {
            case 1:
                py=this.winsize.height*0.724;
                break;
            case 2:
                py=this.winsize.height*0.5;
                break;
            case 3:
                py=this.winsize.height*0.276;
                break;
        }
        return cc.p(px,py);
    },

    timeTicking:function()
    {
        //倒计时
        if(this.gameTime<=0)
        {
            this.unschedule(this.timeTicking);
            this.gotoOverLayer(this.model);
        }
        else
        {
            this.gameTime-=1;
            this.sp_gameTime.setString("时间 : "+this.gameTime);
        }
    },

    crazyModel:function()
    {
        if(this.isTouched)
        {
            this.isTouched=false;
            this.removeChildByTag(300);
            this.addBlocks();
            if(this.gameLevel==10)
            {
                this.schedule(this.crazyModel,0.8);
            }
            else if(this.gameLevel==15)
            {
                this.schedule(this.crazyModel,1.0);
            }
            else if(this.gameLevel==25)
            {
                this.schedule(this.crazyModel,0.8);
            }
            else if(this.gameLevel==30)
            {
                this.schedule(this.crazyModel,1.0);
            }
            else if(this.gameLevel==40)
            {
                this.schedule(this.crazyModel,0.8);
            }
            else if(this.gameLevel==45)
            {
                this.schedule(this.crazyModel,1.0);
            }
            else if(this.gameLevel==55)
            {
                this.schedule(this.crazyModel,0.8);
            }
            else if(this.gameLevel==60)
            {
                this.schedule(this.crazyModel,1.0);
            }
            else if(this.gameLevel==70)
            {
                this.schedule(this.crazyModel,0.8);
            }
            else
            {
            }
        }
        else
        {
            this.unschedule(this.crazyModel);
            this.gotoOverLayer(this.model);
        }
    },

    getRandom:function(maxsize)
    {
        //生成随机数
        return Math.floor(Math.random() * maxsize) % maxsize;
    },

    getDifferent:function(id)
    {
        var newId=this.getRandom(3)+1;
        while(newId==id)
        {
            newId=this.getRandom(3)+1;
        }
        return newId;
    },

    setModel:function(_model)
    {
        this.model=_model;
        if(_model==1)
            this.schedule(this.timeTicking,1.0);
        else
            this.schedule(this.crazyModel,this.schSpeed,9999,1.5);
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
        if(cc.rectContainsPoint(this.toFindBlock.getBoundingBox(),location))
        {
            this.onClickFlag = true;
            this.otherTag=200;
            this.gameLevel+=1;
            this.sp_gameLevel.setString("组数 : "+this.gameLevel);
            if(this.model==1)
            {
                this.scheduleOnce(this.addBlocks);
            }
            else
            {
                //this.toFindBlock.setColor(cc.c3(cc.GRAY));
                var sp_good=cc.Sprite.create(s_img14);
                sp_good.setPosition(this.toFindBlock.getPosition());
                sp_good.setTag(300);
                this.addChild(sp_good,2);
                this.isTouched=true;
            }
        }
        else
        {
            this.gotoOverLayer(this.model);
        }
    }
})

//构造函数create
mainLayer.create=function(_model)
{
    var _mainLayer=new mainLayer();
    _mainLayer.init();
    _mainLayer.setModel(_model);
    var _scene=cc.Scene.create();
    _scene.addChild(_mainLayer);
    return _scene;
}