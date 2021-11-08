function printDate() {
    console.log('Today date is 8 November, 2021')
}

function printMonth() {
    console.log('The current month is November')
}

function printbatchInfo() {
    console.log('This batch is: Radium, week is : 3, the day is: 1 and the topic of the day is Module system in Nodejs')
}

module.exports.getDate = printDate
module.exports.getMonth = printMonth
module.exports.getbatchInfo = printbatchInfo