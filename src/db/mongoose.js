const mongoose=require('mongoose');

mongoose.connect( process.env.mongo_URL, {useNewUrlParser: true, useUnifiedTopology: true});

