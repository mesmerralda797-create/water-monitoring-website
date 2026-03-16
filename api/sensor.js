// This variable sits in the server's memory. 
// Note: In serverless, this may reset if the site is inactive for a while.
let latestData = {
  temp: "0",
  tds: "0",
  dist: "0",
  lastUpdated: null
};

export default function handler(req, res) {
  // Allow requests from your frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests for CORS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 1. RECEIVE DATA (From ESP32/SIM800L)
  if (req.method === 'POST') {
    const { temp, tds, dist } = req.body;
    
    // Update the memory with new values
    latestData = {
      temp: temp || "0",
      tds: tds || "0",
      dist: dist || "0",
      lastUpdated: new Date().toLocaleTimeString()
    };

    console.log("Data Received from GSM:", latestData);

    return res.status(200).json({
      status: "success",
      message: "Data updated on Vercel"
    });
  }

  // 2. SEND DATA (To your Website Frontend)
  if (req.method === 'GET') {
    return res.status(200).json(latestData);
  }

  // Handle other methods
  return res.status(405).json({ message: "Method not allowed" });
}
