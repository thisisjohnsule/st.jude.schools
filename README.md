# st.jude.schools
JavaScript code snippet that scrapes through the results of our 'Form 4 2023 class' and returns them as an array of objects.
Link to the results: https://matokeo.necta.go.tz/results/2023/csee/CSEE2023/results/s4459.htm
This is the starter to my task: https://gist.github.com/JoeEverest/4e63c5a823828153055f3e57a30b56c2

Walkthrough of my Script Creation Process:

To scrape the results of the ‘Form 4 2023 class’ from the specified ‘URL’ Link to the results: https://matokeo.necta.go.tz/results/2023/csee/CSEE2023/results/s4459.htm using Node.js, you i used a combination of libraries of ‘axios’ for making HTTP requests and ‘cheerio’ for parsing and manipulating the HTML.

Process of Scraping Data Using Node.js.

Setting Up My Project:

Creating a new Node.js project.
Installing required packages: ‘axios’ and ‘cheerio’. 
npm init -y 
npm install axios cheerio

Creating a JavaScript File:
Creating a file named’scrapeResults.js.’

Writing the Code:

The following script will fetch the HTML content, parse the results table, and return the results as an array of objects.
Importing Required Libraries:

const axios = require('axios');
const cheerio = require('cheerio');
axios: A promise-based HTTP client for the browser and Node.js. Used here to fetch the HTML content of the webpage.
cheerio: A fast, flexible, and lean implementation of jQuery designed for server-side.Allows to parse and manipulate the HTML using a syntax similar to jQuery.

Create an Async Function:
(async () => {
An immediately invoked function expression (IIFE) that is declared as an asynchronous function to use await inside it. It’s helps in managing asynchronous operations more cleanly.
Try-Catch Block for Error Handling:

try {
The code within the try block is executed, and if any error occurs, it is caught in the catch block.
URL of the Results Page:

const url = 'https://matokeo.necta.go.tz/results/2023/csee/CSEE2023/results/s4459.htm';
The ‘URL’ of the results page to be scraped.
Fetch HTML Content:

const { data } = await axios.get(url);
axios.get(url): Makes an HTTP GET request to fetch the content of the specified URL.
data: Destructuring to extract the data property from the response object which contains the HTML content.
Load HTML into Cheerio:

const $ = cheerio.load(data);
cheerio.load(data): Parses the HTML and returns an object that allows you to query and manipulate the DOM like jQuery.
Initialize Results Array:

const results = [];
An empty array to store the results of the students.
Select the Table:

const table = $('table');
Selects the first <table> element in the HTML. This assumes that the table of interest is the first table on the page.
Iterate Over Rows, Skipping Header:

table.find('tr').each((index, row) => {
    if (index === 0) return; // Skip the header row
Iterates over each <tr> element (table row) found within the table.
Skips the first row (header) using the index check.
Find and Process Cells:

const cells = $(row).find('td');
Selects all <td> elements (table cells) within the current row.
Create Student Object:

const student = {
    indexNumber: $(cells[0]).text().trim(), // Assuming index number is in the 1st column
    subjects: []
};
Constructs an object for the student.
indexNumber: Extracted from the first cell.
Initializes an empty array for subjects.
Extract Subjects and Grades:

for (let i = 2; i < cells.length; i += 2) {
    student.subjects.push({
        subject: $(cells[i]).text().trim(),      // Subject name
        grade: $(cells[i + 1]).text().trim()     // Grade
    });
}
Iterates over the remaining cells.
Appends an object containing subject and grade to the subjects array of the student object.
Add Student to Results:

results.push(student);
Adds the student object to the results array.
Log Results:

console.log(results);
Logs the results array to the console.
Catch and Log Errors:

} catch (error) {
    console.error('Error fetching the results:', error);
}
Logs any errors that occur during the scraping process to the console.

Running the Script:
1.	Install Dependencies: Make sure to install ‘axios’ and ‘cheerio’ if you haven't already:
             npm install axios cheerio 
2.	Save and Run Script: Save the script to a file (e.g., fetchResults.js) and execute it using Node.js: node fetchResults.js

Challenges Faced:

HTML Structure Assumptions: Assumed the table structure and cell order. If the HTML structure changes, the script might break.

Dynamic Content: Dealing with potential dynamic content loaded by JavaScript, which isn’t an issue here since the page appears static.

Data Extraction Logic: Ensuring accurate mapping between cells and data fields, particularly if the number of subjects varies.

Improvements:

Dynamic Cell Mapping: Instead of assuming fixed column positions, the script could dynamically determine which columns contain specific data.

Error Resilience: Enhancing error handling to manage specific errors like network issues or changes in HTML structure.

Pagination Handling: If the results are paginated, adding logic to navigate through multiple pages and aggregate results.

Robustness: Adding validation to check if cells contain expected data and handling cases where data might be missing.
