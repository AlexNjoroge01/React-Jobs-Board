import { Redis } from '@upstash/redis';

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed. Use POST to reset data.' });
    }

    try {
        const redisUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
        const redisToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

        if (!redisUrl || !redisToken) {
            return res.status(500).json({
                message: 'Server configuration error',
                error: 'Redis environment variables not configured'
            });
        }

        const redis = new Redis({
            url: redisUrl,
            token: redisToken,
        });

        // Delete the existing jobs key
        await redis.del('jobs');

        return res.status(200).json({
            message: 'Redis data cleared successfully. The next request to /api/jobs will reinitialize with default Kenyan jobs.',
            success: true
        });
    } catch (error) {
        console.error('Error resetting Redis data:', error);
        return res.status(500).json({
            message: 'Failed to reset data',
            error: error.message
        });
    }
}
