let baseUrl = process.env.REACT_APP_BASE_API_URL;
baseUrl = baseUrl?.endsWith('/')
  ? baseUrl.substring(0, baseUrl.length - 1)
  : baseUrl;

export const BASE_URL = baseUrl;