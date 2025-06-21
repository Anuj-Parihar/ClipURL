import axios from "axios";

const API_URL = "http://localhost:5000/";

export const shortenUrl = async (url) => {
  try {
    const response = await axios.post(`${API_URL}api/create`, { url });
    // Handle different possible response formats
    if (response.data.shortUrl) {
      return response.data.shortUrl;
    } else if (response.data.short_url) {
      return response.data.short_url;
    } else if (typeof response.data === "string") {
      return response.data;
    } else {
      return response.data;
    }
  } catch (error) {
    console.error("Error shortening URL:", error);
    throw new Error(
      "Failed to shorten URL. Please check if the backend server is running."
    );
  }
};

export const getUrlHistory = async () => {
  // In a real app, this would fetch user-specific history
  // For now, we'll use localStorage
  return JSON.parse(localStorage.getItem("urlHistory") || "[]");
};

export const addToHistory = (data) => {
  const history = JSON.parse(localStorage.getItem("urlHistory") || "[]");
  history.unshift(data);
  localStorage.setItem("urlHistory", JSON.stringify(history.slice(0, 20))); // Keep last 20 items
};
