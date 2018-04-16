module.exports = {
  port: 3000,
  session: {
    secret: 'web',
    key: 'web',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017'
}