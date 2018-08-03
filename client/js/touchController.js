//触屏区域控制
var obj = document.querySelector('.moveContainer .touch')
var screen = document.querySelector('.moveContainer')
let containerTop = screen.offsetTop;
let containerLeft = screen.offsetLeft-50;
screen.addEventListener('touchmove',function(e){
    e.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等  
    var touch = e.targetTouches[0];
    // 把元素放在手指所在的位置
    let { _left, _top } = boundary( touch.pageX-containerLeft, touch.pageY-containerTop )
    obj.style.left = _left + 'px';
    obj.style.top = _top + 'px';
    /* 求x和y的分速度 用来计算下一帧x和y应该的位置  START*/
    let x = _left - 50;
    let y = _top - 50;
    let l = Math.sqrt( x*x + y*y )
    let X = x/l;//x轴的分速度
    let Y = y/l;//y轴的分速度
    /* 求x和y的分速度 用来计算下一帧x和y应该的位置   END*/
    s.setXY(X,Y)
})
function boundary(left,top){
    var _left = 0;
    var _top = 0
    _left = left< 0 ? 0 : (left > 100 ? 100 : left)
    _top = top < 0 ? 0 : (top > 100 ? 100 : top)
    return {
        _left,
        _top
    }
}