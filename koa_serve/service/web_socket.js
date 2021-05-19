const path = require('path');
const fileUtils = require('../utils/file_utils');
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
        client.on('message', async msg => {
            console.log('客户端发送数据了', msg);
            let payload = JSON.parse(msg);
            let action = payload.action;
            if (action == 'getData') {
                let filePath = '../data/' + payload.chartName + '.json';
                filePath = path.join(__dirname, filePath);
                const res = await fileUtils.getFileJsonData(filePath);
                //    需要在服务端获取到数据得基础之上,增加一个data的字段
                // data所对应的值,就是某个json文件的内容
                payload.data = res;
                client.send(JSON.stringify(payload));
            } else {
                wss.clients.forEach(item => {
                    client.send(msg);
                }); //所有客户端的链接
            }
            // 由服务端像客户端发送数据
            // client.send('hello socket from back');
        });
    });
};
