const mongoose = require("mongoose");
const app = require("./app")
const dotenv = require("dotenv")

dotenv.config()

const connectionString = process.env.MONGODB_CONNECTION_STRING
.replace("<USERNAME>", process.env.MONGODB_USERNAME)
.replace("<PASSWORD>", process.env.MONGODB_PASSWORD)
.replace("<DATABASENAME>", process.env.MONGODB_DATABASENAME)

mongoose.connect(connectionString).
  catch(error => console.log(error));

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})