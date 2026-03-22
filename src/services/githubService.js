/**
 * Service to fetch data from GitHub API with caching.
 */
const GITHUB_USERNAME = 'woonnajeevan7-coder';
const BASE_URL = 'https://api.github.com';
const CACHE_TTL = 3600000; // 1 hour in ms

/**
 * Helper to fetch data with a simple localStorage cache.
 * @param {string} key - Cache key.
 * @param {string} url - API endpoint.
 * @returns {Promise<any>} - The JSON data.
 */
const fetchWithCache = async (key, url) => {
  const cached = localStorage.getItem(key);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_TTL) {
      return data;
    }
  }

  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 403) throw new Error('API rate limit exceeded. Please try again later.');
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }
  const data = await response.json();
  localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
  return data;
};

export const githubService = {
  /**
   * Fetches the public GitHub profile of the user.
   * @returns {Promise<Object>}
   */
  async getProfile() {
    return fetchWithCache(`gh_profile_${GITHUB_USERNAME}`, `${BASE_URL}/users/${GITHUB_USERNAME}`);
  },

  /**
   * Fetches the repositories of the user.
   * @param {boolean} all - Whether to fetch all repos or just the first few sorted by update.
   * @returns {Promise<Array>}
   */
  async getRepos(all = false) {
    const url = all 
      ? `${BASE_URL}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
      : `${BASE_URL}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`;
    return fetchWithCache(`gh_repos_${GITHUB_USERNAME}_${all ? 'all' : 'pinned'}`, url);
  },

  /**
   * Fetches the repositories starred by the user.
   * @returns {Promise<Array>}
   */
  async getStarredRepos() {
    return fetchWithCache(`gh_starred_${GITHUB_USERNAME}`, `${BASE_URL}/users/${GITHUB_USERNAME}/starred`);
  },

  /**
   * Fetches the public events (activity) for the user.
   * @returns {Promise<Array>}
   */
  async getActivity() {
    return fetchWithCache(`gh_activity_${GITHUB_USERNAME}`, `${BASE_URL}/users/${GITHUB_USERNAME}/events/public`);
  },

  /**
   * Fetches live contribution data from a public API proxy.
   * This is used for the heatmap.
   * @returns {Promise<Object>}
   */
  async getContributions() {
    return fetchWithCache(`gh_contributions_${GITHUB_USERNAME}`, `https://github-contributions-api.deno.dev/${GITHUB_USERNAME}.json`);
  }
};
