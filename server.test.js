const request = require('supertest')
const app = require('./server.js')
const io = require('socket.io-client')

let sender = io('http://localhost:8000/')
let receiver = io('http://localhost:8000/')
const req = request(app)

describe('test routes', () => {
  it('renders the app without failing', done => {
    req
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/)
    done()
  })
  it('redirects to the root', done => {
    req
      .get('/notavalidhandle')
      .expect('Location', /\/$/)
      .expect(302)
    done()
  })
})

describe('test web sockets emission', () => {
  it('Should properly emit the message event to the client', done => {
    sender.emit('message', 'hello')
    receiver.on('message', message => {
      expect(message).toBe('hello')
      done()
    })
  })
})
