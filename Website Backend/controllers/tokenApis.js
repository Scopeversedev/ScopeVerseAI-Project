import catchAsyncError from '../middlewares/catchAsyncError.js';
import { fileURLToPath } from 'url';
import axios from 'axios';
import whalesWallet from '../models/whalesWallet.js';



// using birdeye for token overview

export const tokenOverview = catchAsyncError(async (req, res, next) => {
  const { token } = req.body;
  let birdeyeApi = process.env.BIRDEYE;
  let lunarcrushapi = process.env.LUNARCRUSH;

  // Define all the options for each API call
  //required
  const options = [
    {
      method: 'GET',
      url: 'https://public-api.birdeye.so/defi/token_overview',
      params: { address: token },
      headers: {
        accept: 'application/json',
        'x-chain': 'solana',
        'X-API-KEY': birdeyeApi,
      },
    },
    //not required
    {
      method: 'GET',
      url: 'https://public-api.birdeye.so/defi/v3/token/holder',
      params: { address: token, offset: 0, limit: 100 },
      headers: {
        accept: 'application/json',
        'x-chain': 'solana',
        'X-API-KEY': birdeyeApi,
      },
    },
    //required
    {
      method: 'GET',
      url: 'https://public-api.birdeye.so/defi/v3/token/mint-burn-txs',
      params: {
        address: token,
        sort_by: 'block_time',
        sort_type: 'desc',
        type: 'all',
        offset: 0,
        limit: 100,
      },
      headers: {
        accept: 'application/json',
        'x-chain': 'solana',
        'X-API-KEY': birdeyeApi,
      },
    },
    //not required
    {
      method: 'GET',
      url: 'https://public-api.birdeye.so/defi/v3/token/market-data',
      params: { address: token },
      headers: {
        accept: 'application/json',
        'X-API-KEY': birdeyeApi,
      },
    },
    //required
    {
      method: 'GET',
      url: 'https://public-api.birdeye.so/defi/token_security',
      params: { address: token },
      headers: {
        accept: 'application/json',
        'x-chain': 'solana',
        'X-API-KEY': birdeyeApi,
      },
    },
    //not required
    {
      method: 'GET',
      url: 'https://public-api.birdeye.so/defi/price_volume/single',
      params: { address: token, type: '24h' },
      headers: {
        accept: 'application/json',
        'x-chain': 'solana',
        'X-API-KEY': birdeyeApi,
      },
    },
  ];

  // Execute all API calls concurrently using Promise.all
  const results = await Promise.all(
    options.map((opt) =>
      axios(opt).catch((err) => {
        console.error("Error in API call:", opt.url, err.message);
        return null; // Return null to prevent Promise.all from rejecting
      })
    )
  );

  // Extract results
  const [tokenOverview, topTradersData, liquidityBurnDetails, marketData, securityData, volData] = results;

  // Handle LunarCrush API
  const now = Math.floor(Date.now() / 1000);
  const oneWeekInSeconds = 7 * 24 * 60 * 60;
  const start = now - oneWeekInSeconds;
  const end = now;

  const lunarCrushResult = await axios({
    url: `https://lunarcrush.com/api4/public/topic/${tokenOverview?.data?.data?.symbol}/posts/v1?start=${start}&end=${end}`,
    headers: {
      Authorization: `Bearer ${lunarcrushapi}`,
    },
  }).catch((err) => {
    console.error("Error in LunarCrush API call:", err.message);
    return null;
  });

  let normalizedSentiment = 0;
  if (lunarCrushResult && lunarCrushResult.data.data) {
    const sentiments = lunarCrushResult.data.data.map((item) => item.post_sentiment);
    const totalSentiment = sentiments.reduce((sum, value) => sum + value, 0);
    const averageSentiment = totalSentiment / sentiments.length;
    normalizedSentiment = (averageSentiment - 1) / 4;
    normalizedSentiment = normalizedSentiment || 0; // Default to 0 if calculation fails
  }

  const responseData = {
    tokenOverview: tokenOverview?.data || null,
    topTrader: topTradersData?.data || null,
    burnData: liquidityBurnDetails?.data || null,
    marketData: marketData?.data || null,
    securityData: securityData?.data || null,
    volData: volData?.data || null,
    LunarSentimentAnalysis: normalizedSentiment.toFixed(3),
  };

  if (res) {
    res.status(200).json({
      success: true,
      data: responseData,
    });
  }
});


export const checkWhalesWallet = catchAsyncError(async (req, res, next) => {
  const { token } = req.body;
  console.log("token ", token);
  let significantTransaction = 0;
  let birdeyeApi = process.env.BIRDEYE;
  const wallets = await whalesWallet.find({});

  console.log("whale wallets ", wallets);

  // Function to process a batch of wallets
  const processBatch = async (batch) => {
    return Promise.all(
      batch.map(async (wallet) => {
        let walletAddress = wallet.wallet;
        console.log(walletAddress);

        try {
          const options = {
            method: 'GET',
            url: 'https://public-api.birdeye.so/v1/wallet/token_balance',
            headers: {
              accept: 'application/json',
              'x-chain': 'solana',
              'X-API-KEY': birdeyeApi,
            },
            params: {
              wallet: walletAddress,
              token_address: token,
            },
          };

          const result = await axios(options);
          console.log("this is our result ", result.data);

          if (result.data.data != null) {
            console.log("yes", significantTransaction);
            significantTransaction += 1;
          }
        } catch (error) {
          console.error(`Error fetching data for wallet ${walletAddress}:`, error);
        }
      })
    );
  };

  // Batch processing
  const batchSize = 24;
  for (let i = 0; i < wallets.length; i += batchSize) {
    const batch = wallets.slice(i, i + batchSize); // Get the current batch
    await processBatch(batch); // Wait for the batch to complete
  }
  

  console.log("Total significant transactions:", significantTransaction);
  res.status(200).json({ significantTransaction });
});

export const bundleDetails = catchAsyncError(async (req, res, next) => {
  const { token } = req.body;
  let solscanapi = process.env.SOLSCAN;
  let bundle = false;

  console.log("Fetching transactions...");

  // First API request to get transaction data
  const options = {
    method: 'GET',
    url: 'https://pro-api.solscan.io/v2.0/account/transactions',
    headers: {
      token: solscanapi,
    },
    params: {
      address: token, // Replace with your address if dynamic
      limit: 10,
    },
  };

  const result = await axios(options);

  // Extract transaction IDs
  const transactionIDs = result.data.data.map((transaction) => transaction.tx_hash);

  console.log("Transaction IDs:", transactionIDs);

  // Define headers for the second API
  const headers = {
    accept: '*/*',
    'accept-language': 'en-US,en;q=0.9',
    origin: 'https://explorer.jito.wtf',
    priority: 'u=1, i',
    referer: 'https://explorer.jito.wtf/',
    'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'user-agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  };

  // Function to check if a transaction is bundled
  const checkBundledTransaction = async (transactionID) => {
    try {
      const result = await axios.get(`https://bundles.jito.wtf/api/v1/bundles/transaction/${transactionID}`, {
        headers: headers,
      });
      console.log(`Transaction ${transactionID} is bundled.`);
      return true; // Return true if the transaction is bundled
    } catch (error) {
      console.log(`Transaction ${transactionID} is not bundled.`);
      return false; // Return false if the transaction is not bundled
    }
  };

  // Concurrently check all transaction IDs
  const bundledStatuses = await Promise.all(transactionIDs.map((id) => checkBundledTransaction(id)));

  // Determine if any transaction is bundled
  bundle = bundledStatuses.includes(true);

  console.log("Final bundled status:", bundle);

  res.status(200).json({
    success: true,
    is_bundled: bundle,
  });
});

export const HolderOverview = catchAsyncError(async (req, res, next) => {

})
