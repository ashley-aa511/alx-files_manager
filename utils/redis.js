import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    // Create a Redis client
      this.client = redis.createClient();

    // Log any errors with the Redis client
      this.client.on('error', (err) => {
	  console.error('Redis Client Error:', err);
    });

    // Promisify the Redis functions to use async/await
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.set).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);
  }

  /**
   * Check if Redis is alive
   * @returns {boolean} - true if Redis is connected, false otherwise
   */
  isAlive() {
    return this.client.connected;
  }

  /**
   * Get the value for a specific key from Redis
   * @param {string} key - The key to fetch from Redis
   * @returns {Promise<string | null>} - The value associated with the key, or null if the key doesn't exist
   */
  async get(key) {
    try {
      return await this.getAsync(key);
    } catch (error) {
      console.error('Error getting key from Redis:', error);
      return null;
    }
  }

  /**
   * Set a key-value pair in Redis with an expiration time
   * @param {string} key - The key to store in Redis
   * @param {string} value - The value to store
   * @param {number} duration - The expiration time in seconds
   * @returns {Promise<void>}
   */
  async set(key, value, duration) {
    try {
      await this.setAsync(key, value, 'EX', duration);
    } catch (error) {
      console.error('Error setting key in Redis:', error);
    }
  }

  /**
   * Delete a key from Redis
   * @param {string} key - The key to delete
   * @returns {Promise<void>}
   */
  async del(key) {
    try {
      await this.delAsync(key);
    } catch (error) {
      console.error('Error deleting key from Redis:', error);
    }
  }
}

// Export an instance of RedisClient
const redisClient = new RedisClient();
export default redisClient;
	
	
