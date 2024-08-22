import mongoose from 'mongoose';

moongoose
.connect(process.env.DB_URL)
.then(()=>{
  console.log('MongoDB Connected...');
})
.catch(err=>{
    console.error('Connection Error: ', err);
});

module.export = mongoose.connection

