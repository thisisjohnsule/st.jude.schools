// Import necessary modules
const axios = require('axios');
const cheerio = require('cheerio');

// Function to fetch and process results from a single URLasync function fetchAndProcessResults(url)
(async () => {
    try {
        // URL of the results page
        const url = 'https://matokeo.necta.go.tz/results/2023/csee/CSEE2023/results/s4459.htm';

        // Fetching the HTML content of the page
        const { data } = await axios.get(url);

        // Loading the HTML into cheerio
        const $ = cheerio.load(data);

        // Initializing an array to store the results
        const results = [];

        // Selecting the table containing the results
        const table = $('table');

        // Iterating over each row in the table, skipping the header
        table.find('tr').each((index, row) => {
            if (index === 0) return; // Skip the header row

            const cells = $(row).find('td');

            // Creating a student object
            const student = {
                indexNumber: $(cells[0]).text().trim(), //index number is in the 0st column
                subjects: []
            };

            // Iterating over the cells to get subjects and grades
            for (let i = 2; i < cells.length; i += 2) {
                student.subjects.push({
                    subject: $(cells[i]).text().trim(),      // Subject name
                    grade: $(cells[i + 1]).text().trim()     // Grades
                });
            }

            // Adding the student to the results array
            results.push(student);
        });

        // Log the results
        console.log(results);
    } catch (error) {
        console.error('Error fetching the results:', error);
    }
})();
