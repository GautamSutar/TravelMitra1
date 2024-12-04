const env = import.meta.env.MODE;

export const config = {
    "API_KEY": env === "development" 
        ? "AIzaSyDSG3IeXWNcC8sklBjtzIrU6UoPBFk8QBY" // Replace with your actual API key
        : import.meta.env.VITE_APP_BOT_API_KEY, // For production
};
