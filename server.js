const http = require('http')
const querystring = require("querystring");
const url = require('url')
const io = require('socket.io')(8033);

//单例模式
let addRoom = (function(){
    let allRoom={}
    let _thisConnect = function( room ){
        if( allRoom[room] ){
            return;
        }
        allRoom[room] = io.of(`/${room}`).on('connection', function (socket) {
            setInterval(()=>{
                socket.emit('news', room);//当前连接的推送而已
            },2000)

            socket.on('fei',function(e){
                allRoom[room].emit('news', e);//推送给房间所有的人
            })
            //断开连接(清除该房间号)
            socket.on('disconnect', function ( e ) {
                console.log( '-----' + e )
            });
        });
        
    }
    return _thisConnect;
})()

const hander = function(request,response){
    var arg = url.parse(request.url).query;
    var query = querystring.parse(arg); 
    response.writeHead(200, {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*'
      })
    if(request.url!=='/favicon.ico'){//清除第二次访问
        let room = query.room
        addRoom( room )
        let json = {
            success: true,
            room:    room,
        }
        response.end( JSON.stringify(json) )
        
    }
} 
//启动
http.createServer ( hander ).listen(8000)