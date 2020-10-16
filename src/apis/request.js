const API_BASE_URL = "https://www.googleapis.com/youtube/v3/videos";
const API_KEY = process.env.API_KEY;

export const request = ({ query = '' }) => (
    fetch(`${API_BASE_URL}?${query}&key=${API_KEY}`).then((res) => res.json())
);