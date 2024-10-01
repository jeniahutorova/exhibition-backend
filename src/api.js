const axios = require('axios');

// Base URL
const API_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';

// Function to fetch data from the API
const fetchData = async (endpoint) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
        throw error; // Rethrow error for further handling
    }
};

// Exporting functions for use in other files
module.exports = {
    fetchData,
};
