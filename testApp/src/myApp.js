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

    init:function ()
    {
        //初始化父类
        this._super();
        this.winsize = cc.Director.getInstance().getWinSize();
        this.setColor(cc.c4(0,0,200,255));

        var label=cc.LabelTTF.create("Test App","宋体",40);
        label.setAnchorPoint(cc.p(0.5,0.5));
        label.setColor(cc.c3(245,245,50));
        label.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.5));
        this.addChild(label,1);

        var menuItem=cc.MenuItemImage.create(s_img02,s_img03,this.gotoURL,this);
        var menu=cc.Menu.create(menuItem);
        menu.setPosition(cc.p(this.winsize.width*0.5,this.winsize.height*0.2));
        this.addChild(menu,1);

        //在URL中加入ID可根据URL判断显示内容哟，如index.html?age=10size=5！！！
        if(document.URL.indexOf("id=2")>=0)
        {
            this.setColor(cc.c4(0,0,0,255));
        }
        window.wxData.link=window.wxData.link+"index.html?id=2";
        window.wxFriend.link=window.wxFriend.link+"index.html?id=2";
        return true;
    },

    gotoURL:function()
    {
        //在index.html中定时跳转
        //<meta http-equiv=refresh content=10;URL="http://www.baidu.com">

        //用按钮实现跳转，URL必须有http前缀，比如只填写www.baidu.com是跳转不了的
        var newURL="http://www.baidu.com";
        window.location.href=newURL;
        //window.open("www.baidu.com","_self");
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
