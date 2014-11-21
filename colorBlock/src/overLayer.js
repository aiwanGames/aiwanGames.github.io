/**
 * Created by apple on 14-11-14.
 */
var overLayer = cc.LayerColor.extend({
    winsize:null,
    gameLevel:0,
    gameTime:0,
    model:0,

    init:function ()
    {
        // 1. super init first
        this._super();
        this.winsize = cc.Director.getInstance().getWinSize();
        //背景图片
        var sp_back=cc.Sprite.create(s_img01);
        sp_back.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.5));
        this.addChild(sp_back,1);
        var sp_back1=cc.Sprite.create(s_img06);
        sp_back1.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.55));
        this.addChild(sp_back1,1);
        //再来一次按钮
        var zailaiItem = cc.MenuItemImage.create(s_img04,s_img05,this.gotoMainLayer,this);
        var menu = cc.Menu.create(zailaiItem);
        menu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.29));
        this.addChild(menu, 1);
        //分享
        var sp_tip=cc.Sprite.create(s_img11);
        sp_tip.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.8));
        this.addChild(sp_tip,1);
        //手
        var sp_hand=cc.Sprite.create(s_img10);
        sp_hand.setPosition(cc.p(this.winsize.width*0.8,this.winsize.height*0.81));
        sp_hand.setRotation(30.0);
        sp_hand.setScale(0.8);
        this.addChild(sp_hand,1);
        var ac0=cc.MoveTo.create(0.4,cc.p(this.winsize.width*0.85,this.winsize.height*0.85));
        var ac1=cc.MoveTo.create(0.4,cc.p(this.winsize.width*0.8,this.winsize.height*0.81));
        var ac2=cc.Sequence.create(ac0,ac1);
        var ac3=cc.RepeatForever.create(ac2);
        sp_hand.runAction(ac3);
        //时间，成绩
        //var sp_gameTime=cc.LabelTTF.create(""+this.gameTime,"",25);
        //sp_gameTime.setAnchorPoint(cc.p(0,0.5));
        //sp_gameTime.setPosition(cc.p(this.winsize.width*0.6,this.winsize.height*0.58));
        //this.addChild(sp_gameTime,1);
        var resultStr;
        if(this.model==1)
        {
            resultStr="你在30秒内识别：";
        }
        else
        {
            resultStr="你在疯狂模式中识别：";
        }
        var sp_gameLevel=cc.LabelTTF.create(resultStr+this.gameLevel+"组","Arial",26);
        sp_gameLevel.setAnchorPoint(cc.p(0.5,0.5));
        sp_gameLevel.setColor(cc.c3(245, 245, 50));
        sp_gameLevel.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.6));
        this.addChild(sp_gameLevel,1);
        var _comment;
            if (this.gameLevel < 20) {
                _comment = "眼略瘸，骚年还需加油！";
            }
            else if (this.gameLevel >= 15 && this.gameLevel < 30) {
                _comment = "恭喜，大众眼力！";
            }
            else if (this.gameLevel >= 30 && this.gameLevel < 50) {
                _comment = "眼疾手快！";
            }
            else if (this.gameLevel >= 50 && this.gameLevel < 70) {
                _comment = "法眼通天！";
            }
            else {
                if(this.model==1)
                _comment = "请发送截图给我们抽取话费！";
                else
                {
                    if(this.gameLevel >= 70 && this.gameLevel < 100)
                        _comment = "极限之光！";
                    else if(this.gameLevel >= 100 && this.gameLevel < 125)
                        _comment = "上帝之眼！";
                    else
                        _comment = "请发送截图给我们抽取话费！";
                }
            }
        var sp_comment=cc.LabelTTF.create(_comment,"Arial",26);
        sp_comment.setAnchorPoint(cc.p(0.5,0.5));
        sp_comment.setColor(cc.c3(245, 245, 50));
        sp_comment.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.5));
        this.addChild(sp_comment,1);
        //关注公众号
        var guanzhu=cc.LabelTTF.create("更多小游戏,尽在微信订阅号 : aiwanGames", "Arial",20);
        guanzhu.setColor(cc.c3(245, 245, 50));
        guanzhu.setAnchorPoint(cc.p(0.5,0.5));
        guanzhu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.2));
        this.addChild(guanzhu,1);
    },

    onEnterTransitionDidFinish:function()
    {

    },

    gotoMainLayer:function()
    {
        var scene=MyScene.create();
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,scene));
    },

    update:function(dt)
    {
        //游戏主要刷新函数

    },

    setScore:function(_score,_time,_model)
    {
        this.gameLevel=_score;
        this.gameTime=_time;
        this.model=_model;
    }
})

overLayer.create=function(_score,_time,_model)
{
    var _overLayer=new overLayer();
    _overLayer.setScore(_score,_time,_model);
    _overLayer.init();
    var _scene=cc.Scene.create();
    _scene.addChild(_overLayer);
    return _scene;
}
