/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var beginLayer = cc.LayerColor.extend({
    winsize:null,
    isPlaying:true,
    audio:null,

    init:function ()
    {
        //初始化父类
        this._super();
        this.winsize = cc.Director.getInstance().getWinSize();
        this.setColor(cc.c4(0,0,200,255));

        this.audio=cc.AudioEngine.getInstance();

        var label=cc.LabelTTF.create("Test App","宋体",40);
        label.setAnchorPoint(cc.p(0.5,0.5));
        label.setColor(cc.c3(245,245,50));
        label.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.7));
        this.addChild(label,1);

        var menuItem1=cc.MenuItemImage.create(s_img02,s_img03,this.gotoURLApp,this);
        var menu1=cc.Menu.create(menuItem1);
        menu1.setPosition(cc.p(this.winsize.width*0.2,this.winsize.height*0.2));
        this.addChild(menu1,1);

        var label1=cc.LabelTTF.create("AppStore","黑体",25);
        label1.setPosition(cc.p(this.winsize.width*0.2,this.winsize.height*0.2));
        label1.setColor(cc.c3(0,0,0));
        this.addChild(label1,1);

        var menuItem2=cc.MenuItemImage.create(s_img02,s_img03,this.gotoURL,this);
        var menu2=cc.Menu.create(menuItem2);
        menu2.setPosition(cc.p(this.winsize.width*0.8,this.winsize.height*0.2));
        this.addChild(menu2,1);

        var label2=cc.LabelTTF.create("Http链接","黑体",25);
        label2.setPosition(cc.p(this.winsize.width*0.8,this.winsize.height*0.2));
        label2.setColor(cc.c3(0,0,0));
        this.addChild(label2,1);

        var menuItem3=cc.MenuItemImage.create(s_img02,s_img03,this.playMusic,this);
        var menu3=cc.Menu.create(menuItem3);
        menu3.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.2));
        this.addChild(menu3,1);

        var label3=cc.LabelTTF.create("音效","黑体",25);
        label3.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.2));
        label3.setColor(cc.c3(0,0,0));
        this.addChild(label3,1);

        document.body.style.backgroundColor="#FFCC80";

        //在URL中加入ID可根据URL判断显示内容哟，如index.html?age=10size=5！！！
        if(document.URL.indexOf("id=2")>=0)
        {
            //this.setColor(cc.c4(0,0,0,255));
        }
        //window.wxData.link=window.wxData.link+"index.html?id=2";
        //window.wxFriend.link=window.wxFriend.link+"index.html?id=2";

        this.play();
        return true;
    },

    gotoURL:function()
    {
        //在index.html中定时跳转
        //<meta http-equiv=refresh content=3;URL="itms-apps://itunes.apple.com/us/app/id364183992">

        //用按钮实现跳转，URL必须有http前缀，比如只填写www.baidu.com是跳转不了的
        //var newURL="itms-apps://itunes.apple.com/us/app/id364183992";
        //window.location.href=newURL;
        //var newURL="http://www.baidu.com";
        //window.open(newURL);
        var ua = navigator.userAgent;

        var lb=cc.LabelTTF.create(ua,"Arial",20);
        lb.setPosition(320,500);
        this.addChild(lb,5);

        if(/MicroMessenger/i.test(ua))
        {
            var lb=cc.LabelTTF.create("this is wechat","Arial",20);
            lb.setPosition(320,400);
            this.addChild(lb,5);
        }
    },

    gotoURLApp:function()
    {
        //在index.html中定时跳转
        //<meta http-equiv=refresh content=3;URL="itms-apps://itunes.apple.com/us/app/id364183992">

        //用按钮实现跳转，URL必须有http前缀，比如只填写www.baidu.com是跳转不了的
        //var newURL="itms-apps://itunes.apple.com/us/app/id364183992";
        //var newURL="http://a.app.qq.com/o/simple.jsp?pkgname=com.mymoney&g_f=992857#rd";
        //window.location.href=newURL;
        //window.open(newURL);
        var img=cc.RenderTexture.create(this.winsize.width,this.winsize.height,cc.TEXTURE_2D_PIXEL_FORMAT_RGBA8888);
        var sc=cc.Director.getInstance().getRunningScene();
        img.begin();
        sc.visit();
        img.end();
       // var path=cc.FileUtils.getInstance().;
        img.saveToFile("123.png",true);

    },

    play:function()
    {
        this.audio.playMusic(s_music,true);
    },

    playMusic:function()
    {
        if(this.isPlaying==false)
        {
            this.audio.playMusic(s_music,true);
            this.isPlaying=true;
        }
        else
        {
            this.audio.stopMusic();
            this.isPlaying=false;
        }
    }
});

var MyScene = cc.Scene.extend({

    onEnter:function ()
    {
        this._super();
        var layer = new beginLayer();
        this.addChild(layer);
        layer.init();
    }
});
