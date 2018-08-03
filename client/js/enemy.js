class Enemy {
    constructor( color ){
        this.color = color
    }
    setPosition(length,position){
        let arr = []
        for(var i = 0; i< length;i++){
            let dot = new EnemyDot( i ,this.color)
            arr.push( dot  )
        }
        for(var i = 0; i < arr.length;i++){
            let x = position[ arr[ i ].index * 10 ].x
            let y = position[ arr[ i ].index * 10 ].y
            arr[i].draw(x,y)
        }

    }
}