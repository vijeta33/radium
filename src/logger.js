function log(name) {
    console.log('My name is '+name)
}

function Welcome(){
    console.log ("Welcome to my application .I am a trainee at functionUp")
}

const url = 'http://myloggingsystem.com/log'

module.exports.logMessage = log
module.exports.printWelcomeMessage = Welcome
module.exports.loggerEndpoint= url