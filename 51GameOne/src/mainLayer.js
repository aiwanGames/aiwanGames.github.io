var mainLayer = cc.LayerColor.extend({
    winsize:null,
    choose:1,

    init:function ()
    {
        this._super();
        this.winsize = cc.Director.getInstance().getWinSize();

        var loadtype=1;
        if(loadtype==1)
        {
            //普通模式进入
            var ma=cc.Sprite.create(s06);
            ma.setAnchorPoint(cc.p(0.5,1));
            ma.setPosition(cc.p(this.winsize.width*0.5,960));
            this.addChild(ma,2);
            var mb=cc.Sprite.create(s08);
            mb.setAnchorPoint(cc.p(0.5,1));
            mb.setPosition(cc.p(this.winsize.width*0.5,352));
            this.addChild(mb,2);
            var mc=cc.Sprite.create(s14);
            mc.setAnchorPoint(cc.p(0.5,1));
            mc.setPosition(cc.p(this.winsize.width*0.5,201));
            this.addChild(mc,2);

            var md=cc.Sprite.create(s16);
            md.setAnchorPoint(cc.p(0.5,1));
            md.setPosition(cc.p(this.winsize.width*0.5,352));
            this.addChild(md,1);

            var me = cc.MenuItemImage.create(s09,s09,this.startGame,this);
            me.setAnchorPoint(cc.p(0.5,1));
            var mf = cc.Menu.create(me);
            mf.setPosition(cc.p(this.winsize.width*0.5,-120));
            this.addChild(mf, 2);
            mf.runAction(cc.Sequence.create(cc.DelayTime.create(0.4),cc.EaseBackOut.create(cc.MoveTo.create(0.3,cc.p(this.winsize.width*0.5,120)))));

            var mg=cc.Sprite.create(s07);
            mg.setAnchorPoint(cc.p(0,1));
            mg.setPosition(cc.p(110,754));
            mg.setTag(100);
            this.addChild(mg,2);

            var mh = cc.MenuItemImage.create(s12,s12,this.pushButton,this);
            mh.setAnchorPoint(cc.p(0,1));
            var mi = cc.Menu.create(mh);
            mi.setPosition(cc.p(510,312));
            mi.setTag(101);
            this.addChild(mi,2);

            var mj=cc.Sprite.create(s32);
            mj.setAnchorPoint(cc.p(0,1));
            mj.setPosition(cc.p(243,449));
            this.addChild(mj,1);
        }
        else
        {
            //通过链接进入
        }

    },

    onEnterTransitionDidFinish:function()
    {
        this.setTouchEnabled(true);
    },

    gotoOverLayer:function()
    {
        var scene=overLayer.create(this.gameScore);
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,scene));
        this.audio.stopMusic();
    },

    removeItem:function(sprite)
    {
        sprite.stopAllActions();
        this.removeChild(sprite,true);
    },

    pushButton:function()
    {
        var sn = this.getChildByTag(101);
        this.removeItem(sn);

        var mh=cc.Sprite.create(s13);
        mh.setAnchorPoint(cc.p(0,1));
        mh.setPosition(cc.p(510,312));
        this.addChild(mh,2);

    },

    update:function(dt)
    {

    },

    getRandom:function(maxsize)
    {
        return Math.floor(Math.random() * maxsize) % maxsize;
    },

    onTouchesBegan:function(touches, event)
    {
        var touch = touches[0];
        var location = touch.getLocation();

        var rec1 = cc.rect(50,720,96,104);
        var rec2 = cc.rect(161,720,96,104);
        var rec3 = cc.rect(280,720,96,104);
        var rec4 = cc.rect(383,720,96,104);
        var rec5 = cc.rect(495,720,96,104);
        var rec6 = cc.rect(50,560,96,104);
        var rec7 = cc.rect(161,560,96,104);
        var rec8 = cc.rect(280,560,96,104);
        var rec9 = cc.rect(383,560,96,104);
        var rec10 = cc.rect(495,560,96,104);
        if (cc.rectContainsPoint(rec1, location))
        {
            var sn = this.getChildByTag(100);
            sn.setPosition(cc.p(110,754));
            sn.setVisible(false);
            sn.setScale(0.1);
            sn.runAction(cc.Sequence.create(cc.Show.create(),cc.EaseElasticOut.create(cc.ScaleTo.create(0.2,1.0))));
            this.choose=1;
        }
        else if(cc.rectContainsPoint(rec2, location))
        {
            var sn = this.getChildByTag(100);
            sn.setPosition(cc.p(220,754));
            sn.setVisible(false);
            sn.setScale(0.1);
            sn.runAction(cc.Sequence.create(cc.Show.create(),cc.EaseElasticOut.create(cc.ScaleTo.create(0.2,1.0))));
            this.choose=2;
        }
        else if(cc.rectContainsPoint(rec3, location))
        {
            var sn = this.getChildByTag(100);
            sn.setPosition(cc.p(330,754));
            sn.setVisible(false);
            sn.setScale(0.1);
            sn.runAction(cc.Sequence.create(cc.Show.create(),cc.EaseElasticOut.create(cc.ScaleTo.create(0.2,1.0))));
            this.choose=3;
        }
        else if(cc.rectContainsPoint(rec4, location))
        {
            var sn = this.getChildByTag(100);
            sn.setPosition(cc.p(440,754));
            sn.setVisible(false);
            sn.setScale(0.1);
            sn.runAction(cc.Sequence.create(cc.Show.create(),cc.EaseElasticOut.create(cc.ScaleTo.create(0.2,1.0))));
            this.choose=4;
        }
        else if(cc.rectContainsPoint(rec5, location))
        {
            var sn = this.getChildByTag(100);
            sn.setPosition(cc.p(550,754));
            sn.setVisible(false);
            sn.setScale(0.1);
            sn.runAction(cc.Sequence.create(cc.Show.create(),cc.EaseElasticOut.create(cc.ScaleTo.create(0.2,1.0))));
            this.choose=5;
        }
        else if(cc.rectContainsPoint(rec6, location))
        {
            var sn = this.getChildByTag(100);
            sn.setPosition(cc.p(110,590));
            sn.setVisible(false);
            sn.setScale(0.1);
            sn.runAction(cc.Sequence.create(cc.Show.create(),cc.EaseElasticOut.create(cc.ScaleTo.create(0.2,1.0))));
            this.choose=6;
        }
        else if(cc.rectContainsPoint(rec7, location))
        {
            var sn = this.getChildByTag(100);
            sn.setPosition(cc.p(220,590));
            sn.setVisible(false);
            sn.setScale(0.1);
            sn.runAction(cc.Sequence.create(cc.Show.create(),cc.EaseElasticOut.create(cc.ScaleTo.create(0.2,1.0))));
            this.choose=7;
        }
        else if(cc.rectContainsPoint(rec8, location))
        {
            var sn = this.getChildByTag(100);
            sn.setPosition(cc.p(330,590));
            sn.setVisible(false);
            sn.setScale(0.1);
            sn.runAction(cc.Sequence.create(cc.Show.create(),cc.EaseElasticOut.create(cc.ScaleTo.create(0.2,1.0))));
            this.choose=8;
        }
        else if(cc.rectContainsPoint(rec9, location))
        {
            var sn = this.getChildByTag(100);
            sn.setPosition(cc.p(440,590));
            sn.setVisible(false);
            sn.setScale(0.1);
            sn.runAction(cc.Sequence.create(cc.Show.create(),cc.EaseElasticOut.create(cc.ScaleTo.create(0.2,1.0))));
            this.choose=9;
        }
        else if(cc.rectContainsPoint(rec10, location))
        {
            var sn = this.getChildByTag(100);
            sn.setPosition(cc.p(550,590));
            sn.setVisible(false);
            sn.setScale(0.1);
            sn.runAction(cc.Sequence.create(cc.Show.create(),cc.EaseElasticOut.create(cc.ScaleTo.create(0.2,1.0))));
            this.choose=10;
        }
        else
        {

        }
    }
});

mainLayer.create=function(_sound)
{
    var _mainLayer=new mainLayer();
    _mainLayer.init();
    var _scene=cc.Scene.create();
    _scene.addChild(_mainLayer);
    return _scene;
};