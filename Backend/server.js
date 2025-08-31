require("dotenv").config();
const connectDb = require("./src/db/db");
const app = require("./src/app");

connectDb();

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on PORT: ${process.env.PORT}`);
})