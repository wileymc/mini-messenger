const request = require('supertest')
const { app } = require('./server.js')

const req = request(app)

const getMethods = obj =>
  Object.getOwnPropertyNames(obj).filter(
    item => typeof obj[item] === 'function'
  )

console.log(getMethods(io))

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

// describe('test web sockets', () => {
//   it('socket emits message', done => {
//     req.get('/')
//     io.on('message', message => {
//       expect(message).toBeTruthy()
//       done()
//     })
//   })
// })
