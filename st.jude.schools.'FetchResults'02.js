// Importing necessary modules
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
                examNumber: $(cells[0]).text().trim(),       // CNO
                points: parseInt($(cells[2]).text().trim()), // AGGT
                division: $(cells[3]).text().trim(),         // DIV
                subjects: []                                  // Detailed subjects
            };

            // Spliting the detailed subjects
            const detailedSubjects = $(cells[4]).text().trim().split(' ');

            // Maping of subjects and their codes
            const subjectMap = {
                'CIV': 'Civics',
                'HIST': 'History',
                'GEO': 'Geography',
                'KISW': 'Kiswahili',
                'ENGL': 'English',
                'PHY': 'Physics',
                'CHEM': 'Chemistry',
                'BIO': 'Biology',
                'COMM': 'Commerce',
                'AGRI': 'Agriculture',
                'COMP': 'Computer Studies',
                'B/MATH': 'Basic Mathematics',
                'LIT': 'Literature in English',
                'B/KNOWL': 'Bible Knowledge',
                'ADD': 'Additional Mathematics'
                // Add more subjects if necessary
            };

            // Iterating over the detailed subjects and extract 'subject' and 'grade'
            for (let i = 0; i < detailedSubjects.length; i += 2) {
                const subjectCode = detailedSubjects[i].replace('.', '');
                const grade = detailedSubjects[i + 1].replace('.', '');
                if (subjectMap[subjectCode]) {
                    student.subjects.push({ subject: subjectMap[subjectCode], grade });
                }
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
