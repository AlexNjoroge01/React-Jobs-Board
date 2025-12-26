import { Redis } from '@upstash/redis';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { id } = req.query;
    
    // Check if environment variables are set (Upstash uses KV_REST_API_URL and KV_REST_API_TOKEN)
    const redisUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
    const redisToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
    
    if (!redisUrl || !redisToken) {
      console.error('Missing Upstash Redis environment variables');
      console.error('Looking for: KV_REST_API_URL, KV_REST_API_TOKEN, UPSTASH_REDIS_REST_URL, or UPSTASH_REDIS_REST_TOKEN');
      return res.status(500).json({ 
        message: 'Server configuration error', 
        error: 'Redis environment variables not configured. Need KV_REST_API_URL and KV_REST_API_TOKEN' 
      });
    }
    
    // Initialize Redis client
    const redis = new Redis({
      url: redisUrl,
      token: redisToken,
    });
    
    // Get all jobs
    let jobs = await redis.get('jobs');
    
    // Ensure jobs is an array
    if (!jobs || !Array.isArray(jobs)) {
      jobs = [];
    }
    
    if (req.method === 'GET') {
      // Get single job by ID
      const job = jobs.find(j => j.id === id);
      
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }
      
      return res.status(200).json(job);
    }

    if (req.method === 'PUT') {
      // Update job
      const updatedJob = req.body;
      const jobIndex = jobs.findIndex(j => j.id === id);
      
      if (jobIndex === -1) {
        return res.status(404).json({ message: 'Job not found' });
      }
      
      // Ensure ID matches
      updatedJob.id = id;
      jobs[jobIndex] = updatedJob;
      
      // Save back to Redis
      await redis.set('jobs', jobs);
      
      return res.status(200).json(updatedJob);
    }

    if (req.method === 'DELETE') {
      // Delete job
      const jobIndex = jobs.findIndex(j => j.id === id);
      
      if (jobIndex === -1) {
        return res.status(404).json({ message: 'Job not found' });
      }
      
      // Remove job
      jobs.splice(jobIndex, 1);
      
      // Save back to Redis
      await redis.set('jobs', jobs);
      
      return res.status(200).json({ message: 'Job deleted successfully' });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Error in jobs/[id] API:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

