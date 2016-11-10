// these are our paths to our databases
// the first is Heroku -- if node isn't Heroku-ing, then it defaults to localhost
// the database content will always be separate

module.exports = {

    'url' : process.env.MONGODB_URI || 'mongodb://localhost:27017/gamehound' // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot

};