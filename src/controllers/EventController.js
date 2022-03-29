const EventModel = require("../models/EventModel.js")

const createEvents = async function (req, res) {

    try {
        var data = req.body
        let eventsCreated = await EventModel.create(data)
        res.status(201).send({ data: eventsCreated })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.msg })
    }

}


const getEvents = async function (req, res) {
    try {
        let getEvent = await EventModel.find().setInterval(getEvent,7000)
        res.status(200).send({ data: getEvent })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.msg })
    }
}

module.exports.createEvents = createEvents;
module.exports.getEvents = getEvents