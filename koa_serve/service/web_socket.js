const WebSocket = require('ws');
// 创建ws的对象,配置端口为port
const wss = new WebSocket.Server({
    port: 9998,
});

module.exports.listen = () => {
    // 对客户端的连接事件进行监听
    // client:代表的是客户端的连接eisocket对象
    wss.on('connection', client => {
        console.log('有客户端连接成功了');
        // 对客户端的连接对象进行message事件的监听
        // msg:由客户端发给服务端的数据
        client.on('message', msg => {
            console.log('客户端发送数据了', msg);
            // 由服务端像客户端发送数据
            client.send('hello socket from back');
        });
    });
};
