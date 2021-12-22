const mongoose = require("mongoose");
const dotenv = require("dotenv")
const buildApp = require("./app")

dotenv.config()

const connectionString = process.env.MONGODB_CONNECTION_STRING
.replace("<USERNAME>", process.env.MONGODB_USERNAME)
.replace("<PASSWORD>", process.env.MONGODB_PASSWORD)
.replace("<DATABASENAME>", process.env.MONGODB_DATABASENAME)

mongoose.connect(connectionString).
  catch(error => console.log(error));

const port = process.env.YOUR_PORT || process.env.PORT || 8000;
const app = buildApp(mongoose);

app.listen(port, "0.0.0.0", () => {
    console.log(`App running on port ${port}`)
})