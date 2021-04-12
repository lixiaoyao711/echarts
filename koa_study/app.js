// 1创建koa对象
const Koa = require('koa');
const app = new Koa();
// 2编写响应函数
app.use((ctx, next) => {
    console.log(ctx.request.url);
    ctx.response.body = 'hello world';
});
// 3绑定端口号
app.listen(3000);
