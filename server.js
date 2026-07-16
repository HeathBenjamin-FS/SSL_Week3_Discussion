require("dotenv").config();
const app = require("./src");
const connectDB = require("./app/db/config");

connectDB();

const PORT = proccess.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
