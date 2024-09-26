const http = require('http')
const { EventEmitter } = require("node:events");

const event = new EventEmitter();

// listener
event.on('notification', () => {
    console.log('notification invoked!')
})
event.on('message', () => {
    console.log('message invoked!')
})
event.on('message', () => {
    console.log('message invoked!')
})

// emitter
event.emit('notification')

