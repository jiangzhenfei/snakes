class Snack {
    constructor(){
        this.x = 0;
        this.y = 1;
        this.dotArr = []
        this.position = []
        this.addHeader()
        this.animate()
        this.length = 1;
    }
    //头部
    addHeader(){
        this.Header = new Header()
        this.Header.draw(0,0)
        this.position.push({x:0,y:0})//记录起始位置
        this.dotArr.push( this.Header )
    }
    //关节
    addDot(){
        this.length++;
        let dot = new Dot()
        this.dotArr.push( dot )
    }
    //运动
    animate(){
        start = +new Date()
        ctx.clearRect(0,0,1000,1000);
        
        this.dotAnimate()
        window.requestAnimationFrame( this.animate.bind(this) );
    }
    dotAnimate(){
        while(this.position.length < (this.dotArr.length *10 +10)){
            this.position.push({
                x:0,
                y:0
            })
        }
        let x = this.Header.position.x + this.x * v;//下一帧位置x 原来位置加上速度乘以x的分速度
        let y = this.Header.position.y + this.y * v;//下一帧位置y 原来位置加上速度乘以y的分速度
        //增加新数据
        this.position.unshift({
            x:x,
            y:y
        })
        if( (time = (+new Date())-start)>10 ){
            console.log(time)
        }
        this.eatFood( x, y )
        //尾部扔掉旧数据
        this.position.pop()
        socket.emit('snacksMove', {
            user:user,
            position:this.position,
            length:this.length || 1,
            color:color
        });//当前连接的推送而已
        this.dotUpdate()
        //
        var time = 0;
        
        for (var i in  Enemys){
            Enemys[i].update()
        }
        
       
        
    }
    //每个关节的重绘
    dotUpdate(){
        for(var i = 0; i < this.dotArr.length;i++){
            let x = this.position[ this.dotArr[ i ].index * 10 ].x
            let y = this.position[ this.dotArr[ i ].index * 10 ].y
            this.dotArr[i].draw(x,y)
        }
    }
    //设置头部家下来方向
    setXY(x,y){
        if(x==0 && y==0){
            return;
        }
        this.x = x;
        this.y = y;
    }
    //吃掉实物
    eatFood(x,y){
        let length = FoodArr.length
        let max = 144;
        for (var i = 0; i < length; i++){
            let food = FoodArr[i]
            if( food.isEated ){
                continue;
            }
            if( Math.pow(x - (food.position.x + 2),2) + Math.pow(y - (food.position.y + 2),2)<max ){
                food.isEated = true;
                socket.emit('foodIsEat', food.id)
            }
        }
    }
}
