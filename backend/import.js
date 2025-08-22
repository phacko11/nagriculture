const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
const Papa = require('papaparse');

// The full URL of your API endpoint
const API_ENDPOINT = 'http://localhost:3000/api/posts';

// The CSV data you provided.
const csvData = `authorId,date,title,description,imageUrl,pdfUrl,topics
2,1 Aug 2025,Factor Report: Low Volatility,"Report on the Low Volatility factor for third quarter of 2025, covering VN30, VN100 and HOSE.",low_volatility_08.2025.png,LOW_VOLATILITY_FACTOR_08.2025.pdf,"Factor, Research"
2,1 Aug 2025,Factor Report: Quality,"Report on the Quality factor for third quarter of 2025, analyzing profitability, earnings stability and financial strength across VN30, VN100 and HOSE.",quality_08.2025.png,QUALITY_FACTOR_08.2025.pdf,"Factor, Research"
2,1 Aug 2025,Factor Report: Value,"Report on the Value factor for third quarter of 2025, focusing on valuation metrics such as P/E, P/B, and EV/EBITDA across major Vietnamese indices.",value_08.2025.png,VALUE_FACTOR_08.2025.pdf,"Factor, Research"
2,1 Aug 2025,Factor Report: Momentum,"Report on the Momentum factor for third quarter of 2025, tracking price trends and relative strength indicators across VN30, VN100 and HOSE.",momentum_08.2025.png,MOMENTUM_FACTOR_08.2025.pdf,"Factor, Research"
2,1 Aug 2025,Factor Report: Low Beta,"Report on the Low Beta factor for third quarter of 2025, identifying stocks with lower sensitivity to market movements in the Vietnamese equity market.",low_beta_08.2025.png,LOW_BETA_FACTOR_08.2025.pdf,"Factor, Research"
2,1 Jul 2025,Factor Report: Low Volatility,"Report on the Low Volatility factor for second quarter of 2025, covering VN30, VN100 and HOSE.",low_volatility_07.2025.png,LOW_VOLATILITY_FACTOR_07.2025.pdf,"Factor, Research"
2,1 Jul 2025,Factor Report: Quality,"Report on the Quality factor for second quarter of 2025, analyzing profitability, earnings stability and financial strength across VN30, VN100 and HOSE.",quality_07.2025.png,QUALITY_FACTOR_07.2025.pdf,"Factor, Research"
2,1 Jul 2025,Factor Report: Value,"Report on the Value factor for second quarter of 2025, focusing on valuation metrics such as P/E, P/B, and EV/EBITDA across major Vietnamese indices.",value_07.2025.png,VALUE_FACTOR_07.2025.pdf,"Factor, Research"
2,1 Jul 2025,Factor Report: Momentum,"Report on the Momentum factor for second quarter of 2025, tracking price trends and relative strength indicators across VN30, VN100 and HOSE.",momentum_07.2025.png,MOMENTUM_FACTOR_07.2025.pdf,"Factor, Research"
2,1 Jul 2025,Factor Report: Low Beta,"Report on the Low Beta factor for second quarter of 2025, identifying stocks with lower sensitivity to market movements in the Vietnamese equity market.",low_beta_07.2025.png,LOW_BETA_FACTOR_07.2025.pdf,"Factor, Research"
2,1 Jun 2025,Factor Report: Low Volatility,"Report on the Low Volatility factor for second quarter of 2025, covering VN30, VN100 and HOSE.",low_volatility_06.2025.png,LOW_VOLATILITY_FACTOR_06.2025.pdf,"Factor, Research"
2,1 Jun 2025,Factor Report: Quality,"Report on the Quality factor for second quarter of 2025, analyzing profitability, earnings stability and financial strength across VN30, VN100 and HOSE.",quality_06.2025.png,QUALITY_FACTOR_06.2025.pdf,"Factor, Research"
2,1 Jun 2025,Factor Report: Value,"Report on the Value factor for second quarter of 2025, focusing on valuation metrics such as P/E, P/B, and EV/EBITDA across major Vietnamese indices.",value_06.2025.png,VALUE_FACTOR_06.2025.pdf,"Factor, Research"
2,1 Jun 2025,Factor Report: Momentum,"Report on the Momentum factor for second quarter of 2025, tracking price trends and relative strength indicators across VN30, VN100 and HOSE.",momentum_06.2025.png,MOMENTUM_FACTOR_06.2025.pdf,"Factor, Research"
2,1 Jun 2025,Factor Report: Low Beta,"Report on the Low Beta factor for second quarter of 2025, identifying stocks with lower sensitivity to market movements in the Vietnamese equity market.",low_beta_06.2025.png,LOW_BETA_FACTOR_06.2025.pdf,"Factor, Research"
2,1 May 2025,Factor Report: Low Volatility,"Report on the Low Volatility factor for first quarter of 2025, covering VN30, VN100 and HOSE.",low_volatility_05.2025.png,LOW_VOLATILITY_FACTOR_05.2025.pdf,"Factor, Research"
2,1 May 2025,Factor Report: Quality,"Report on the Quality factor for the first quarter of 2025, analyzing profitability, earnings stability and financial strength across VN30, VN100 and HOSE.",quality_05.2025.png,QUALITY_FACTOR_05.2025.pdf,"Factor, Research"
2,1 May 2025,Factor Report: Value,"Report on the Value factor for the first quarter of 2025, focusing on valuation metrics such as P/E, P/B, and EV/EBITDA across major Vietnamese indices.",value_05.2025.png,VALUE_FACTOR_05.2025.pdf,"Factor, Research"
2,1 May 2025,Factor Report: Momentum,"Report on the Momentum factor for the first quarter of 2025, tracking price trends and relative strength indicators across VN30, VN100 and HOSE.",momentum_05.2025.png,MOMENTUM_FACTOR_05.2025.pdf,"Factor, Research"
2,1 May 2025,Factor Report: Low Beta,"Report on the Low Beta factor for the first quarter of 2025, identifying stocks with lower sensitivity to market movements in the Vietnamese equity market.",low_beta_05.2025.png,LOW_BETA_FACTOR_05.2025.pdf,"Factor, Research"
2,1 Apr 2025,Factor Report: Quality,"Report on the Quality factor for first quarter of 2025, covering VN30, VN100 and HOSE.",factor-report-quality.png,QUALITY_FACTOR_04.2025.pdf,"Factor, Research"
2,1 Apr 2025,Factor Report: Low Beta,"Report on the Low Beta factor for first quarter of 2025, covering VN30, VN100 and HOSE.",factor-report-low-beta.png,LOW_BETA_FACTOR_04.2025.pdf,"Factor, Research"
2,1 Apr 2025,Factor Report: Low Volatility,"Report on the Low Volatility factor for first quarter of 2025, covering VN30, VN100 and HOSE.",factor-report-low-volatility.png,LOW_VOLATILITY_FACTOR_04.2025.pdf,"Factor, Research"
2,1 Apr 2025,Factor Report: Momentum,"Report on the Momentum factor for first quarter of 2025, covering VN30, VN100 and HOSE.",factor-report-momentum.png,MOMENTUM_FACTOR_04.2025.pdf,"Factor, Research"
3,1 Mar 2025,Fama-French 5 Factor Model,"Providing Vietnam’s first universal and free dataset on the Fama-French 5 factor model.",fama-french-5-factors.png,Miquant_Fama_French_Research_Note_5F_update.pdf,"Academic, Research"
3,1 Mar 2025,Fama-French 3 Factor Model,"Providing Vietnam’s first universal and free dataset on the Fama-French 3 factor model.",fama-french-3-factors.png,Miquant_Fama_French_Research_Note_3F_update.pdf,"Academic, Research"
4,1 Mar 2025,Vietnam GDP Nowcasting (Part 2),"Provide GDP Nowcasting model with construction and applications in Vietnam.",GDP-nowcast-p2.png,Nowcast - Research Note 2.pdf,"Academic, Research"
4,1 Mar 2025,Vietnam GDP Nowcasting (Part 1),"Provide GDP Nowcasting model with construction and applications in Vietnam.",GDP-nowcast-p1.png,Nowcast - Research Note 1.pdf,"Academic, Research"
`;

// Main function to process and upload the data
async function importPosts() {
    // Use papaparse to read the CSV string into an array of objects
    const { data: records } = Papa.parse(csvData, {
        header: true,       // Use the first row as headers
        skipEmptyLines: true, // Ignore any blank lines
    });

    console.log(`Found ${records.length} records to import.`);

    // Loop through each record and call the API
    for (const record of records) {
        // Construct paths to the local files
        const imagePath = path.join(__dirname, 'images', record.imageUrl);
        const pdfPath = path.join(__dirname, 'pdfs', record.pdfUrl);

        // --- Data Validation and Preparation ---
        // Check if the files actually exist before trying to upload
        if (!fs.existsSync(imagePath)) {
            console.error(`[SKIPPING] Image not found for "${record.title}": ${imagePath}`);
            continue; // Skip to the next record
        }
        if (!fs.existsSync(pdfPath)) {
            console.error(`[SKIPPING] PDF not found for "${record.title}": ${pdfPath}`);
            continue; // Skip to the next record
        }

        // Create a new FormData instance for this request
        const formData = new FormData();

        // Append all the necessary fields from the record
        formData.append('authorId', record.authorId);
        formData.append('title', record.title);
        formData.append('description', record.description);
        formData.append('topics', record.topics);
        
        // These fields seem consistent across your data, so we can hardcode them
        formData.append('category', 'RESEARCH');
        formData.append('contentFormat', 'PDF');

        // Append the files as streams
        // The third argument (the filename) is important for the API to read `file.name`
        formData.append('image', fs.createReadStream(imagePath), record.imageUrl);
        formData.append('file', fs.createReadStream(pdfPath), record.pdfUrl);

        // --- API Call ---
        try {
            console.log(`[UPLOADING] - "${record.title}"...`);
            const response = await axios.post(API_ENDPOINT, formData, {
                headers: {
                    ...formData.getHeaders(), // Let axios handle the multipart/form-data headers
                },
            });

            if (response.data.success) {
                console.log(`[SUCCESS] - Successfully created post for "${record.title}" (ID: ${response.data.post.id})`);
            } else {
                console.error(`[API ERROR] - Failed to create post for "${record.title}":`, response.data.error);
            }
        } catch (error) {
            console.error(`[HTTP ERROR] - An error occurred while uploading "${record.title}":`, error.response ? error.response.data : error.message);
        }

        // Optional: Add a small delay to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 200));
    }

    console.log("\nImport process finished.");
}

// Run the main function
importPosts();
