const GITHUB_USERNAME = 'woonnajeevan7-coder';
const BASE_URL = 'https://api.github.com';

export const fetchProfile = async () => {
  const cacheKey = `github_profile_${GITHUB_USERNAME}`;
  const cachedData = localStorage.getItem(cacheKey);
  
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    if (Date.now() - timestamp < 3600000) return data; // 1 hour cache
  }

  try {
    const response = await fetch(`${BASE_URL}/users/${GITHUB_USERNAME}`);
    if (!response.ok) throw new Error('Failed to fetch profile');
    const data = await response.json();
    localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }));
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchRepos = async () => {
  const cacheKey = `github_repos_${GITHUB_USERNAME}`;
  const cachedData = localStorage.getItem(cacheKey);
  
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    if (Date.now() - timestamp < 3600000) return data;
  }

  try {
    const response = await fetch(`${BASE_URL}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
    if (!response.ok) throw new Error('Failed to fetch repos');
    const data = await response.json();
    localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }));
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
