const app = require('./src/app')

const PORT = 30000

if (process.env.NODE_ENV === 'migrate') {
  require('./migrations/20190514')().then(() => process.exit(0))
} else {
  app.listen(PORT, () => {
    console.log('listening ' + PORT)
  })
}
