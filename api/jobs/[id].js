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
    
    // Initialize Redis client
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
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

