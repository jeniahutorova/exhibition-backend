require('dotenv').config(); // Load environment variables from .env file
const app = require('./src/app');
const PORT = process.env.PORT || 9090; // Use PORT from environment or default to 9090

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
