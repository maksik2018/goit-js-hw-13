const axios = require('axios');
const API_KEY = '22615955-8cacb706f354043da71650c83';
const BASE_URL = 'https://pixabay.com/api/';

export default class ImageApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.perPage = 40;
    }

    async fetchImages() {
        const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}`;
        
        const response = await axios.get(url);
     
        // console.log(this.page);
        this.page += 1;
        return response.data
    }

      resetPage() {
        this.page = 1
    }

    

}
