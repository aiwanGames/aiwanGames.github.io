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

        if(document.title.indexOf("2nd")>=0)
        {
            this.setColor(cc.c4(0,0,0,255));
        }
        if(document.title.indexOf("2nd")>=0)
        {
            this.setColor(cc.c4(0,0,0,255));
        }
        document.title=window.wxData.desc = "2nd";
        document.title=window.wxFriend.desc = "2nd";
        //window.wxData.link=window.wxData.link|"index.html?id=2";
       //window.wxFriend.link=window.wxFriend.link|"index.html?id=2";
        return true;
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
