const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Tour = require('../../models/Tours');

dotenv.config({ path: './config.env' });

const db = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((connection) => {
    console.log('DB-Connection Successful');
  });

//READ JSON FILE
//JSON.parse converts to JSON
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours.json`, 'utf-8')
);

//COMMAND LINE DELETE/IMPORT data to our DB
//IMPORT INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);

    console.log('Successful Populate');
} catch (err) {
    console.log(err);
}
process.exit();
};

// DELETE ALL DATA FROM DB COLLECTION
const deleteData = async () => {
  try {
    //delete all documents in Tours colleciton
    await Tour.deleteMany();
    console.log('Tours Successfully Deleted');
} catch (err) {
    console.log(err);
}
process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);


//commands: 
//node import-dev-data.js --delete/--import 
