const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-body-parser')
const send = require('koa-send')
const IO = require('koa-socket-2')

let app = new Koa()
const router = new Router()
const io = new IO()

io.attach(app)

// Emits the messages sent by the client to all other connected sockets
io.on(`message`, (ctx, message) => {
  ctx.socket.broadcast.emit('message', message)
  ctx.socket.emit('message', message)
})

// I didn't connect a database, but if we wanted our messages to persist
// between sessions or be available across different clients, this would
// be necessary.  Something as lightweight as localstorage or Redis would
// do the trick for such a simple app.

router.get(`/`, async (ctx, next) => {
  try {
    await send(ctx, 'index.html')
  } catch (err) {
    console.log(err)
    return next()
  }
})

router.redirect('/:anything', '/')

app.use(router.routes()).use(bodyParser)

const port = process.env.PORT || 8000
app = app.listen(port)
console.log(`🌌  Server running on port ${port}`)

module.exports = { app, io }
