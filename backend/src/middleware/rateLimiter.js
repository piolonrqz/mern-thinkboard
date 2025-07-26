import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
        // Add timeout to prevent hanging requests
        const { success } = await Promise.race([
            ratelimit.limit("my-rate-limit"),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Redis timeout")), 1000)
            )
        ]);

        if(!success){
            return res.status(429).json({
                message:"Too many request, Please try again later",
            });
        }

        next();
    } catch (error) {
        // Fail-open strategy: Allow request but log detailed error
        console.error("Rate Limiter Service Unavailable:", {
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString()
        });
        
        // Proceed with request when rate limiter fails
        next();
    }
}

export default rateLimiter;