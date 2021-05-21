export default class SocketService {
    // 单例
    static instace = null;
    static get Instance() {
        if (!this.instace) {
            this.instace = new SocketService();
        }
        return this.instace;
    }

    // 和服务端连接的socket堆绣
    ws = null;

    //定义连接服务器的方法
    connect() {
        // 连接服务器
        if (!window.WebSocket) {
            return console.log('您的浏览器不支持websocket');
        }
        this.ws = new WebSocket('ws://localhost:9998');

        // 连接成功的事件
        this.ws.onopen = () => {
            console.log('连接服务端成功');
        };
        //连接服务端失败
        this.ws.onclose = () => {
            console.log('连接服务端失败');
        };
        //得到数据
        this.ws.onmessage = msg => {
            console.log('获取到了数据');
            console.log(msg.data);
        };
    }
}
