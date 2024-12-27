import catchAsyncError from '../middlewares/catchAsyncError.js';
import RecentAnalysis from '../models/RecentAnalysis.js';
import topMoverse from '../models/topMoverse.js';
import axios from 'axios';
import cron from 'node-cron';
import moment from 'moment'; // Import moment for date manipulation

// Function to fetch data from Dexscreener API
const fetchDexscreenerData = async (address) => {
    try {
      const response = await axios.get(`https://api.dexscreener.com/latest/dex/tokens/${address}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data from Dexscreener:');
      return null;
    }
  };
  
  export const fetchTopMovers = async () => {
    try {
        // Step 1: Fetch recent records from RecentAnalysis (updated within the last 24 hours)
        const recentRecords = await RecentAnalysis.find({
            updatedAt: { $gte: moment().subtract(24, 'hours').toDate() },
        });

        if (!recentRecords || recentRecords.length === 0) {
            console.log('No recent records found.');
            return;
        }

        // Temporary array to hold new top movers
        const newTopMovers = [];

        for (const record of recentRecords) {
            const { address, marketcap, aiScore,img } = record;

            // Parse and validate marketcap and aiScore
            const initialMarketCap = parseFloat(marketcap);
            const aiScoreValue = parseFloat(aiScore);

            if (isNaN(initialMarketCap) || isNaN(aiScoreValue)) {
                console.log(`Invalid data for address ${address}: marketcap=${marketcap}, aiScore=${aiScore}`);
                continue;
            }

            // Fetch data from Dexscreener
            const dexData = await fetchDexscreenerData(address);
            if (!dexData || !dexData.pairs || dexData.pairs.length === 0) {
                console.log(`No data found for address: ${address}`);
                continue;
            }

            const currentMarketCap = parseFloat(dexData.pairs[0].marketCap);
            console.log(`Current market cap for ${address}: ${currentMarketCap}`);
            if (!currentMarketCap) {
                console.log(`Market cap not available for address: ${address}`);
                continue;
            }

            const marketCapMultiplier = Number(currentMarketCap) / Number(initialMarketCap);

            // Check conditions: marketCapMultiplier >= 10 and aiScore >= 70
            if (aiScoreValue >= 70) {
                console.log(`Adding to TopMoverse: ${address} with market cap multiplier ${marketCapMultiplier}`);

                const topMoverseData = {
                    name: record.name,
                    address: record.address,
                    marketcap: currentMarketCap.toString(),
                    oldmarketcap: initialMarketCap.toString(),
                    aiScore: record.aiScore,
                    multiplier: marketCapMultiplier,
                    img:img,
                };

                newTopMovers.push(topMoverseData);
            }
        }

        // Step 2: Delete all existing records in the TopMoverse collection
        await topMoverse.deleteMany();

        // Step 3: Sort the newTopMovers array by multiplier and retain only the top 10
        newTopMovers.sort((a, b) => b.multiplier - a.multiplier);
        const top10Movers = newTopMovers.slice(0, 10);

        console.log('Top 10 movers:', top10Movers);

        if (top10Movers.length > 0) {
            // Step 4: Save the top 10 movers to the database
            await topMoverse.insertMany(top10Movers);
            console.log('Processing completed. Top 10 movers added to the database.');
        } else {
            console.log('No top movers to save.');
        }
    } catch (error) {
        console.error('Error in processing recent analysis data:', error.message);
    }
};

  
  

// Function to fetch data from TopMoverse collection
export const getTopMovers = catchAsyncError(async (req, res, next) => {
    try {
        // Fetch top movers from the TopMoverse collection
        const topMovers = await topMoverse.find()
            .sort({ multiplier: -1 }) // Sort by multiplier in descending order
            .limit(10); // Limit to 10 documents

        res.status(200).json(topMovers); // Return the fetched data
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch top movers', details: error.message });
    }
});
