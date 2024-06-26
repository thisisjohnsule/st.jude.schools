// Importing necessary modules
const axios = require('axios');
const cheerio = require('cheerio');

// URL of the results page
const url = 'https://matokeo.necta.go.tz/results/2023/csee/CSEE2023/results/s4459.htm';

// Function to 'scrape' the school results
async function scrapeSchoolResults() {
    try {
        // Fetching the HTML of the page
        const { data } = await axios.get(url);
        
        // Loading the HTML into Cheerio
        const $ = cheerio.load(data);

        // Array to store the results
        const results = [];

        // Iterating through the table rows containing the subject and grade information
        $('table tr').each((index, element) => {
            // Find all table data (td) cells in the current row
            const tds = $(element).find('td');

            // Checking if there are at least two cells (for subject and grade)
            if (tds.length >= 2) {
                // Extract the subject and grade text, trim to remove excess whitespace
                const subject = $(tds[0]).text().trim();
                const grade = $(tds[1]).text().trim();

                // Pushing the result object to the results array
                results.push({ subject, grade });
            }
        });

        // Returning the results array
        return results;

    } catch (error) {
        console.error('Error fetching or parsing data:', error);
        return null;
    }
}

// Executing the function and log the results
scrapeSchoolResults().then(results => {
    if (results) {
        console.log(results);
    } else {
        console.log('Failed to retrieve results.');
    }
});
