const { app, PORT } = require("./server");

const { userRoutes } = require("./routes/userRoutes");
const { viewRoutes } = require("./routes/viewRoutes");

userRoutes(app);
viewRoutes(app);

app.listen(PORT, () => console.log(`App is running on ${PORT}`));
