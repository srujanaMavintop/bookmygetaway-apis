import express from "express";
import mysql from "mysql";
import cors from "cors";
import dotenv from "dotenv";
import axios from 'axios';
dotenv.config();

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());
app.use(express.static('public', {
    setHeaders: (res, path) => {
      if (path.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
    },
  }));  

// Environment variables
const RAPIDAPI_HOST = 'sky-scanner3.p.rapidapi.com';
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

// MySQL Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        process.exit(1);
    }
    console.log('Connected to MySQL');
});

app.get('/flights-autocomplete', async (req, res) => {
    const query = req.query.query;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        const response = await axios.get(`https://${RAPIDAPI_HOST}/flights/auto-complete`, {
            headers: {
                'X-RapidAPI-Host': RAPIDAPI_HOST,
                'X-RapidAPI-Key': RAPIDAPI_KEY,
            },
            params: { query },
        });

        if (!response.data.data || !Array.isArray(response.data.data)) {
            return res.status(500).json({ error: 'Invalid response from API' });
        }

        const suggestions_flight = response.data.data
            .filter(
                (item) =>
                    item.presentation.subtitle === 'India' &&
                    item.presentation.suggestionTitle.toLowerCase().includes(query.toLowerCase())
            )
            .map((item) => ({
                suggestionTitle: item.presentation.suggestionTitle,
                subtitle: item.presentation.subtitle,
                skyId: item.presentation.skyId,
            }));

        if (suggestions_flight.length === 0) {
            return res.json({ status: true, airports: [] });
        }
        
        // Prepare query for bulk insertion
        const insertQuery = `
            INSERT INTO suggestions_flight (suggestionTitle, subtitle, skyId)
            VALUES ?
            ON DUPLICATE KEY UPDATE 
                suggestionTitle = VALUES(suggestionTitle),
                subtitle = VALUES(subtitle);
        `;
        const values = suggestions_flight.map((s) => [s.suggestionTitle, s.subtitle, s.skyId]);

        db.query(insertQuery, [values], (err) => {
            if (err) {
                console.error('Error inserting data into database:', err.message);
                return res.status(500).json({ error: 'Failed to save data to database' });
            }
            res.json({ status: true, airports: suggestions_flight });
        });
    } catch (error) {
        console.error('Error fetching data from API:', error.message);
        res.status(500).json({ error: 'Failed to fetch data from API' });
    }
});

app.get('/get-sky-id', (req, res) => {
    const { cityName } = req.query;

    if (!cityName) {
        return res.status(400).json({ error: 'City name is required' });
    }

    const query = `SELECT skyId FROM suggestions_flight WHERE suggestionTitle = ? LIMIT 1`;

    db.query(query, [cityName], (err, results) => {
        if (err) {
            console.error('Error fetching SkyId from database:', err.message);
            return res.status(500).json({ error: 'Failed to fetch SkyId from database' });
        }

        if (results.length > 0) {
            res.json({ skyId: results[0].skyId });
        } else {
            res.status(404).json({ error: 'SkyId not found for the provided city' });
        }
    });
});

app.get('/flights-search-one-way', async (req, res) => {
    const { fromEntityId, toEntityId, departDate, adults } = req.query;
    console.log('Received params:', { fromEntityId, toEntityId, departDate, adults });

    // if (!fromEntityId || !toEntityId || !departDate || !adults) {
    //     return res.status(400).json({ error: 'Missing required parameters' });
    // }

    try {
        const response = await axios.get(`https://${RAPIDAPI_HOST}/flights/search-one-way`, {
            headers: {
                'X-RapidAPI-Host': RAPIDAPI_HOST,
                'X-RapidAPI-Key': RAPIDAPI_KEY,
            },
            params: {
                fromEntityId,
                toEntityId,
                departDate,
                adults,
            },
        });

        console.log(response.data);
        // Check if itineraries are present
        if (response.data && response.data.itineraries>0) {
            return res.json({ status: true, itineraries: response.data.itineraries });
        }

        // If no itineraries are found
        return res.status(404).json({ status: false, message: 'No flights found.' });
    } catch (error) {
        console.error('Error fetching flight data:', error.message);

        // Log error response data if available
        if (error.response) {
            console.error('Error response data:', error.response.data);
        }

        return res.status(500).json({ error: 'Failed to fetch flight data from API' });
    }
});
        
app.get('/hotels-autocomplete', async (req, res) => {
    const query = req.query.query;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        const response = await axios.get(`https://${RAPIDAPI_HOST}/hotels/auto-complete`, {
            headers: {
                'X-RapidAPI-Host': RAPIDAPI_HOST,
                'X-RapidAPI-Key': RAPIDAPI_KEY,
            },
            params: { query },
        });

        if (!response.data.data || !Array.isArray(response.data.data)) {
            return res.status(500).json({ error: 'Invalid response from API' });
        }

        const suggestions_hotel = response.data.data
            .filter(
                (item) =>
                    item.presentation.subtitle === 'India' && // Optionally filter by location, e.g., India
                    item.presentation.suggestionTitle.toLowerCase().includes(query.toLowerCase())
            )
            .map((item) => ({
                suggestionTitle: item.presentation.suggestionTitle,
                subtitle: item.presentation.subtitle,
                skyId: item.presentation.skyId,
            }));

        if (suggestions_hotel.length === 0) {
            return res.json({ status: true, hotels: [] });
        }

        // Prepare query for bulk insertion
        const insertQuery = `
            INSERT INTO suggestions_hotel (suggestionTitle, subtitle, skyId)
            VALUES ?
            ON DUPLICATE KEY UPDATE 
                suggestionTitle = VALUES(suggestionTitle),
                subtitle = VALUES(subtitle);
        `;
        const values = suggestions_hotel.map((s) => [s.suggestionTitle, s.subtitle, s.skyId]);

        db.query(insertQuery, [values], (err) => {
            if (err) {
                console.error('Error inserting data into database:', err.message);
                return res.status(500).json({ error: 'Failed to save data to database' });
            }
            res.json({ status: true, hotels: suggestions_hotel });
        });
    } catch (error) {
        console.error('Error fetching data from API:', error.message);
        res.status(500).json({ error: 'Failed to fetch data from API' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
