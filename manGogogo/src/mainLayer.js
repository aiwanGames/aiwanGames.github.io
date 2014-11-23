/**
 * Created by apple on 14-11-14.
 */
var mainLayer = cc.LayerColor.extend({
    winsize:null,
    itemArray:null,
    blockArray:null,
    itemSpeed:3.0,//物品下落时间
    schdSpeed:1.0,//生成石块间隔
    blockSpeed1:3.0,//石块移动速度
    speedCntlTime:0,//控制物品下落速度
    gameTime:0,
    sp_gameTime:null,
    gameOver:false,
    gameLevel:0,
    sp_gameLevel:null,
    sp_left:null,//左按钮
    sp_right:null,//右按钮
    direction:0,//角色方向
    sp_man:null,//主角
    manSpeed:6,//移动速度
    manSlowSpeedX:6,
    manSlowSpeedY:6,
    manFrameId:1,//主角帧号
    FrameChgCntl:0,//控制连续按住左右键多久换下一帧
    manOnBlock:false,

    init:function ()
    {
        // 1. super init first
        this._super();
        this.winsize = cc.Director.getInstance().getWinSize();
        this.setColor(cc.c4(255,255,255,255));
        //倒计时和层数
        var sp_time=cc.Sprite.create(s_time);
        sp_time.setPosition(cc.p(this.winsize.width*0.1,this.winsize.height*0.96));
        this.addChild(sp_time,2);
        var sp_level=cc.Sprite.create(s_level);
        sp_level.setPosition(cc.p(this.winsize.width*0.7,this.winsize.height*0.96));
        this.addChild(sp_level,2);

        //初始化物品数组和block数组
        this.itemArray=[];
        this.blockArray=[];

        //添加时间，层数
        this.sp_gameTime=cc.LabelAtlas.create(""+this.gameTime,s_number,26,32,'0');
        this.sp_gameTime.setAnchorPoint(cc.p(0,0.5));
        this.sp_gameTime.setPosition(cc.p(this.winsize.width*0.23,this.winsize.height*0.96));
        this.addChild(this.sp_gameTime,2);

        this.sp_gameLevel=cc.LabelAtlas.create(""+this.gameLevel,s_number,26,32,'0');
        this.sp_gameLevel.setAnchorPoint(cc.p(0,0.5));
        this.sp_gameLevel.setPosition(cc.p(this.winsize.width*0.83,this.winsize.height*0.96));
        this.addChild(this.sp_gameLevel,2);

        //方向按钮
        this.sp_left=cc.Sprite.create(s_left);
        this.sp_left.setPosition(cc.p(this.winsize.width*0.2,this.winsize.height*0.1));
        this.addChild(this.sp_left,2);
        this.sp_right=cc.Sprite.create(s_right);
        this.sp_right.setPosition(cc.p(this.winsize.width*0.8,this.winsize.height*0.1));
        this.addChild(this.sp_right,2);

        //初始block和角色位置
        this.sp_man=cc.Sprite.createWithSpriteFrameName("img_man_01.png");
        this.sp_man.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.47));
        this.addChild(this.sp_man,1);
        var block_bgn =cc.Sprite.create(s_block1);
        block_bgn.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.4));
        this.addChild(block_bgn,1);
        this.blockArray.push(block_bgn);
        var ac0=cc.MoveBy.create(this.winsize.height/960*this.blockSpeed1*0.65,cc.p(0,this.winsize.height*0.45));
        var ac1=cc.CallFunc.create(this.removeSprite,this);
        block_bgn.runAction(cc.Sequence.create(ac0,ac1));

        //开启触摸
        this.setTouchEnabled(true);
        //开启schedule
        //每次游戏的速度随机
        this.schedule(this.addBlocks,this.schdSpeed,cc.REPEAT_FOREVER,0.1);
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

    addBlocks:function()
    {
        var  _position=null;
        if(this.getRandom(4)==0)
        {
            _position=cc.p(this.winsize.width*0.15,this.winsize.height*0.15);
        }
        else if(this.getRandom(3)==1)
        {
            _position=cc.p(this.winsize.width*0.85,this.winsize.height*0.15);
        }
        else
        {
            _position=cc.p(this.winsize.width*0.5,this.winsize.height*0.15);
        }
        var _blockid=this.getRandom(3)>0?s_block1:s_block2;
        this.addOneBlock(_position,this.blockSpeed1,_blockid);
    },

    addOneBlock:function(_position,_speed,_blockid)
    {
        //生成一个石块
        var block1 =cc.Sprite.create(_blockid);
        block1.setPosition(_position);
        block1.setTag((_blockid=s_block1)?100:101);
        this.addChild(block1,1);
        //加入石块数组
        this.blockArray.push(block1);
        var ac0=cc.MoveBy.create(this.winsize.height/960*_speed,cc.p(0,this.winsize.height*0.70));
        var ac1=cc.CallFunc.create(this.removeSprite,this);
        block1.runAction(cc.Sequence.create(ac0,ac1));
    },

    addDropItems:function()
    {
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
        this.gameTime+=1;
        this.sp_gameLevel.setString(this.gameLevel+"");
        this.sp_gameTime.setString(parseInt(this.gameTime/60)+"");
        //cc.log("direction:"+this.direction);
        var manx=this.sp_man.getPositionX();
        var many=this.sp_man.getPositionY()
        var manw=this.sp_man.getContentSize().width;
        var manh=this.sp_man.getContentSize().height;
        if(this.direction==-1)
        {
            this.FrameChgCntl+=1;
            if(this.FrameChgCntl>3)
            {
                this.FrameChgCntl=0;
                this.manFrameId+=1;
            }
            if(this.manFrameId==6)
                this.manFrameId=1;
            this.sp_man.initWithSpriteFrameName("img_man_0"+this.manFrameId+".png");
            this.sp_man.setFlippedX(true);

            //向左移动角色
            if(manx>=manw*0.3&&this.manOnBlock)
            {
                this.sp_man.setPosition(cc.p(manx-this.manSpeed,many));
            }
        }
        else if(this.direction==1)
        {
            this.FrameChgCntl+=1;
            if(this.FrameChgCntl>3)
            {
                this.FrameChgCntl=0;
                this.manFrameId+=1;
            }
            if(this.manFrameId==6)
                this.manFrameId=1;
            this.sp_man.initWithSpriteFrameName("img_man_0"+this.manFrameId+".png");
            this.sp_man.setFlippedX(false);

            //向右移动角色
            if(manx<this.winsize.width-manw*0.3&&this.manOnBlock)
            {
                this.sp_man.setPosition(cc.p(manx+this.manSpeed,many));
            }
        }
        else
        {
            this.FrameChgCntl=0;
        }

        this.manOnBlock=false;
        //检查是否与石块碰撞
        for(i in this.blockArray)
        {
            var _block=this.blockArray[i];
            var manx=this.sp_man.getPositionX();
            var many=this.sp_man.getPositionY();
            var manw=this.sp_man.getContentSize().width;
            var manh=this.sp_man.getContentSize().height;
            var _blockx=_block.getPositionX();
            var _blocky=_block.getPositionY();
            var _blockw=_block.getContentSize().width;
            var _blockh=_block.getContentSize().height
            //若站在石块上则跟石块一起向上运动
            if(Math.abs(_blockx-manx)<=_blockw*0.5&&
                ((many-_blocky)<(_blockh*0.5+manh*0.45)&&(many-_blocky)>0))
            {
                this.sp_man.setPosition(cc.p(this.sp_man.getPositionX(),_blocky+_blockh*0.5+manh*0.448));
                this.manOnBlock=true;
                this.manSlowSpeedX=12.0;
            }
        }

        //若角色没猜到石块，下坠
        if(this.manOnBlock==false)
        {
            //模拟自由落体
            this.manSlowSpeedY+=0.11;
            if(this.manSlowSpeedX>0)
            {
                this.manSlowSpeedX-=0.46;
            }

            var _pos=null;
            if(this.sp_man.isFlippedX())
            {
                if(this.sp_man.getPositionX()>manw*0.3)
                {
                    _pos=cc.p(this.sp_man.getPositionX()-this.manSlowSpeedX,this.sp_man.getPositionY()-this.manSlowSpeedY);
                }
                else
                {
                    _pos=cc.p(this.sp_man.getPositionX(),this.sp_man.getPositionY()-this.manSlowSpeedY);
                }
            }
            else
            {
                if(this.sp_man.getPositionX()<this.winsize.width-manw*0.3)
                {
                    _pos=cc.p(this.sp_man.getPositionX()+this.manSlowSpeedX,this.sp_man.getPositionY()-this.manSlowSpeedY);
                }
                else
                {
                    _pos=cc.p(this.sp_man.getPositionX(),this.sp_man.getPositionY()-this.manSlowSpeedY);
                }
            }
            this.sp_man.setPosition(_pos);
        }

        if(this.sp_man.getPositionY()<this.winsize.height*0.07)
        {
            this.unscheduleUpdate();
            this.unschedule(this.addBlocks);
            this.gotoOverLayer();
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
        this.onClickFlag = false;
        this.sp_man.initWithSpriteFrameName("img_man_01.png");

        if(this.direction==-1)
        {
            this.sp_left.initWithFile(s_left);
            this.sp_man.setFlippedX(true);
        }
        else if(this.direction==1)
        {
            this.sp_right.initWithFile(s_right);
            this.sp_man.setFlippedX(false);
        }
        else
        {}
        this.direction=0;
    },

    onTouchesBegan:function(touches, event)
    {
        var touch = touches[0];
        var location = touch.getLocation();
        if(cc.rectContainsPoint(this.sp_left.getBoundingBox(),location))
        {
            this.onClickFlag = true;
            this.direction=-1;
            this.sp_left.initWithFile(s_left_press);
        }
        else if(cc.rectContainsPoint(this.sp_right.getBoundingBox(),location))
        {
            this.onClickFlag = true;
            this.direction=1;
            this.sp_right.initWithFile(s_right_press);
        }
        else
        {
            //do nothing
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


