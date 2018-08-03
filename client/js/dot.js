//头部
var index = 0;//每个关节的下标
class Header {
    constructor( ){
        this.index = index;
        index ++ ;
        this.position = {
            
        }
    }
    //头部绘制位置
    draw(x,y){
        ctx.beginPath();
        this.position.x = x;
        this.position.y = y;
        ctx.arc(x,y,r,0,2*Math.PI);
        ctx.fillStyle = color;
        ctx.closePath();
        ctx.fill();
    }
}
//关节
class Dot {
    constructor( ){
        this.index = index;
        index ++ ;
        this.position = {
            
        }
    }
    //关节绘制位置
    draw(x,y){
        ctx.beginPath();
        this.position.x = x;
        this.position.y = y;
        ctx.arc(x,y,r,0,2*Math.PI);
        ctx.fillStyle = color;
        ctx.closePath();
        
        ctx.fill();
    }
}

//关节
class EnemyDot {
    constructor( id, color ){
        this.color = color
        this.index = id;
        this.position = {
            
        }
    }
    //关节绘制位置
    draw(x,y,color){
        ctx.beginPath();
        this.position.x = x;
        this.position.y = y;
        ctx.arc(x,y,r,0,2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.closePath();
        ctx.fill();
    }
}