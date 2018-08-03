const http = require('http')
const querystring = require("querystring");
const url = require('url')
const io = require('socket.io')(8033);

let foods = []
let width = 400;
let height = 716;
let id = 0

for (var i = 0; i< 100;i++){
    foods.push( createFood() )
}

function createFood( ){
    id++
    let x = Math.random() * width;
    let y = Math.random() * height;
    return {
        id:id,
        x: x,
        y: y
    }
}
//单例模式
let addRoom = (function(){
    let allRoom={}
    let _thisConnect = function( room ){
        if( allRoom[room] ){
            return;
        }
        allRoom[room] = io.of(`/${room}`).on('connection', function (socket) {
           
            allRoom[room].emit('foods', foods);//当前连接的推送而已
            socket.on('foodIsEat',function(e){
                let id = e;
                for (var i = 0;i < foods.length;i++){
                    if( foods[i].id === id){
                        foods.splice(i,1)
                        break;
                    }
                }
                allRoom[room].emit('_thisFoodEat', e);//推送给房间所有的人
                let food = createFood()
                foods.push( food )
                allRoom[room].emit('addFood', food);//推送给房间所有的人
            })

            //断开连接(清除该房间号)
            socket.on('snacksMove', function ( data ) {
                allRoom[room].emit('enemy', data);//推送给房间所有的人
            });

            //断开连接(清除该房间号)
            socket.on('disconnect', function ( e ) {
                console.log( '-----' + e )
            });
        });
        
    }
    return _thisConnect;
})()

addRoom('only')
// const hander = function(request,response){
//     var arg = url.parse(request.url).query;
//     var query = querystring.parse(arg); 
//     response.writeHead(200, {
//         'Content-Type': 'application/json;charset=utf-8',
//         'Access-Control-Allow-Credentials': true,
//         'Access-Control-Allow-Origin': '*'
//       })
//     if(request.url!=='/favicon.ico'){//清除第二次访问
//         let room = query.room
//         addRoom( room )
//         let json = {
//             success: true,
//             room:    room,
//         }
//         response.end( JSON.stringify(json) )
        
//     }
// } 
// //启动
// http.createServer ( hander ).listen(8000)