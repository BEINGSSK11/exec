const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');

const app = express();

// Enable CORS middleware
app.use(cors());

app.get('/hello', (req, res) => {
    res.send('Hello World')
})

// Define route for opening file in Notepad++
app.get('/openpath', (req, res) => {
    const filePath = 'E:\\git.html'; // Get the file path from query parameter

    // Function to run Notepad++ and open a file
    function openNotepadPlusPlus(filePath) {
        // Path to Notepad++ executable
        const notepadPlusPlusPath = 'C:\\Program Files\\Notepad++\\notepad++.exe'; // Update this path according to your installation

        // Construct the command to execute Notepad++ with the file
        const command = `"${notepadPlusPlusPath}" "${filePath}"`;

        // Execute the command
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                res.status(400).json({ error: 'Bad Request' });
                return;
            }
            console.log(`Opened ${filePath} in Notepad++`);
            res.json({ message: `Opened ${filePath} in Notepad++` });
        });
    }

    // Call function to open Notepad++
    openNotepadPlusPlus(filePath);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
