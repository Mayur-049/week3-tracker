// API Configuration
// यहां production में backend URL automatically set हो जाएगा

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default API_URL;
