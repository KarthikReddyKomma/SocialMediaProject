import mongoose from 'mongoose'
import config from './../config/config'
import app from './express'

mongoose.Promise = global.Promise

mongoose.connect (config.mongoUri, {useNewUrlParser : true,
                                    useCreateIndex : true,
                                    useUnifiedTopology : true
                                    })

mongoose.connection.on ('error', () => {
    throw new Error (`unbale to connect to DB ${config.mongoUri}`);
})

app.listen (config.port, err => {
    if (err)
        console.log ("Server listening failed")
    else
        console.log ("Server successufully created on port %s", config.port)
})