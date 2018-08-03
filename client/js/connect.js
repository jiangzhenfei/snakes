window.socket = io.connect(`http://localhost:8033/only`);
window.s = new Snack()

socket.on('foods', function (e) {
    for (var i =0;i<e.length;i++){
        let item = e[i]
        let id = item.id;
        let x = item.x;
        let y = item.y
        FoodArr.push(new Food(id,x,y))
    }
});
socket.on('_thisFoodEat', function (e) {
    for (var i =0;i<FoodArr.length;i++){
        if( FoodArr[i].id === e){
            FoodArr[i].remove()
            s.addDot()
            FoodArr.splice(i,1)//将这个实物所有信息删除
            break;
        }
    }
});

socket.on('enemy', function (e) {
    if( e.user === user){
        return;
    }
    if(Enemys[e.user]){
        Enemys[e.user]['update'] = function(){
            Enemys[e.user].setPosition( e.length, e.position )
        }
        return;
    }else{
        Enemys[e.user] = new Enemy( e.color )
        Enemys[e.user]['update'] = function(){
            Enemys[e.user].setPosition( e.length, e.position )
        }
       
    }
});