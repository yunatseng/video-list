const API_BASE_URL = "https://www.googleapis.com/youtube/v3/videos";

export const request = ({ query = '' }) => (
    fetch(`${API_BASE_URL}?${query}&key=${process.env.VUE_APP_API_KEY}`)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(res.statusText);
        })
);