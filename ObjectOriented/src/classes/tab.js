/*
    面向对象编程：1、类包含成员属性和成员方法。成员属性类似于定义变量，成员方法就是操作节点和属性。
面向对象用方法封装所有的操作，那么就需要init()初始化函数，来执行包含程序运行时就直接执行的操作，
以及给节点绑定事件的函数。注意，init()方法中方法执行的顺序，就是程序执行的顺序。
2、实例化类的时候，立即自动执行constructor，通过实参形参的参数传递来给成员属性赋值。由于constructor
自执行的特性，可以把init()在此执行。constructor就相当于是构造函数。类中的this默认指向实例对象。
系统会自动将类中的方法写在类的原型上，因此类实例化出来的实例对象本身只包含constructor中的属性，实例对象
的原型上才包含类中的方法。
3、由于模块化思想，类最后都需要导出，以便其他模块导入使用。类中写有获取和操作html节点的代码，因此实例化类
就相当于是执行这些代码。程序也就完成了。可见，实例化类得到的是对象其实并不会用到。
    操作的结束形式：1、console.log输出语句。2、return返回某些属性和方法。3、修改属性。
*/ 
class Tab {
    constructor(mode) {
        this.mode = mode == 'fade' || mode =='slide' ? mode : 'fade';
        this.oPage = $('.J_page');
        this.oTab = $('.J_tab');
        this.oPageWrap = this.oPage.children('.page-wrap');
        this.oPageItems = this.oPage.find('.item');

        this.init()
    }

    // 初始化函数
    init () {
        this.setMode();
        this.bindEvent();
    }

    // 给节点添加切换模式样式
    setMode () {
        this.oPageWrap.addClass(this.mode)
    }

    // 绑定点击事件
    bindEvent () {
        this.oTab.on('click', '.item', $.proxy(this.tabClick, this));
    }

    // 点击事件函数
    tabClick () {
        // 用let和const就报错
        var e = e || window.event,
              tar = e.target || e.srcElement,
              curIdx = $(tar).index();

        if (tar.className === 'item') {
            $(tar).addClass('current').siblings('.item').removeClass('current')
            this._pageChange(curIdx);
        }
    }

    // 设置页面切换的样式
    _pageChange (index) {
        switch (this.mode) {
            case 'fade':
                this._fadePage(index);
                break;
            case 'slide':
                this._slidePage(index);
                break;
            default:
                this._fadePage(index);
                break;
        }
    }

    _fadePage (index) {
        this.oPageItems.eq(index).fadeIn(100).siblings('.item').fadeOut(100);
    }

    _slidePage (index) {
        this.oPageWrap.animate({
            left: (-index * 500) + 'px'
        })
    }
};

export {Tab}