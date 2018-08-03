//食物
class Food {
    constructor( id,x,y ){
        this.food = null;
        this.id = id;
        this.position = {
            x:x,
            y:y
        }
        this.draw( this.position.x, this.position.y )
    }
    //头部绘制位置
    draw(x,y){
        this.food = $('<div class="foodItem"></div>')
        this.food.css({
            left: x,
            top:  y,
            backgroundColor:'red'
        })
        $('.foodScreen').append(this.food)
    }
    remove( ){
        this.food.remove()
    }
}