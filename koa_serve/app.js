// 服务器的入口文件
// 1.创建koa的实例对象
const Koa = require('koa');
const app = new Koa();
// 2.绑定中间件
// 绑定第一层中间件
const requireMiddlewareDuration = require('./middleware/koa_response_duration');
app.use(requireMiddlewareDuration);
// 绑定第二层中间件
const requireMiddlewareHeader = require('./middleware/koa_response_header');
app.use(requireMiddlewareHeader);
// 绑定第三层中间件
const requireMiddlewareData = require('./middleware/koa_response_data');
app.use(requireMiddlewareData);
// app.use();
// 3.绑定端口号
app.listen(8888);
