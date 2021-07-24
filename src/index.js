import './css/styles.css';
import  "modern-normalize";
import photo from './templates/photoCard.hbs'
import ImageApiService from './js/fetchImages';
import getRefs from './js/getRefs';
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import '../node_modules/simplelightbox/dist/simple-lightbox.min.css';

const imageApi = new ImageApiService();
const refs = getRefs();
const modalImage = new SimpleLightbox('.gallery a');

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreButton.classList.add('hidden');

async function onSearch(e){
  e.preventDefault();
  imageApi.resetPage();
    clearImageContainer();
    const form = e.currentTarget;
       imageApi.searchQuery = form.elements.searchQuery.value.trim();
 
    // console.log(imageApi.searchQuery);
    
  if (imageApi.searchQuery === "") {
    return;
  }

  try {
        const result = await imageApi.fetchImages()
    
      
        if (result.hits.length === 0) {
            refs.loadMoreButton.classList.add('hidden');
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            return;
      };
      
      if (result.hits.length > 0) {
          appendImageMarkup(result.hits);

          Notiflix.Notify.success(`Hooray! We found ${result.totalHits} images.`);
      }
        
      refs.loadMoreButton.classList.remove('hidden');
      form.reset();
     
        } catch (error) {
        console.log(error);
    }
};
  
refs.loadMoreButton.addEventListener('click', onLoadMoreImgs);

async function onLoadMoreImgs() {
    
    try {
        const result = await imageApi.fetchImages();
             
        if (refs.imageGallery.querySelectorAll('.photo-card').length === result.totalHits) {
            getTotalImageQuantity()
        } else {

            appendImageMarkup(result.hits);
        }
      
    } catch (error) {
        console.log(error);
    }
}
 

function appendImageMarkup(data) {
  refs.imageGallery.insertAdjacentHTML('beforeend', photo(data));
    modalImage.refresh();
};

function clearImageContainer() {
    refs.imageGallery.innerHTML = '';
};

  function getTotalImageQuantity() {
    
    
      refs.loadMoreButton.classList.add('hidden');
     
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
  
};