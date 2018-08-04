//食物
class Food {
    constructor( id,x,y ){
        this.food = null;
        this.isEated = false;
        this.id = id;
        this.position = {
            x:x,
            y:y
        }
        this.draw( this.position.x, this.position.y )
    }
    //头部绘制位置
    draw(x,y){
        foodCtx.beginPath();
        foodCtx.arc(x,y,2,0,2*Math.PI);
        foodCtx.fillStyle = 'red';
        //foodCtx.closePath();
        foodCtx.fill();
    }
    remove( ){
        foodCtx.clearRect(this.position.x-2,this.position.y-2,4,4);
    }
}