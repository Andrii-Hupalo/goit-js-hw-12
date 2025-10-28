import './css/styles.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.js-load-more');
const gallery = document.querySelector('.gallery');

let currentQuery = '';
let currentPage = 1;
const perPage = 15;
let totalPages = 0;

form?.addEventListener('submit', onSearch);
loadMoreBtn?.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  const query = event.target.elements['search-text'].value.trim();
  if (!query) return;

  currentQuery = query;
  currentPage = 1;
  clearGallery();
  showLoader();

  try {
    const { hits, totalHits } = await getImagesByQuery(query, currentPage);
    totalPages = Math.ceil(totalHits / perPage);

    if (!hits.length) {
      iziToast.warning({
        message: 'Sorry, no images match your search query. Please try again!',
        position: 'topRight',
      });
      hideLoadMoreButton();
      return;
    }

    createGallery(hits);

    if (currentPage < totalPages) showLoadMoreButton();
    else hideLoadMoreButton();
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    console.error(error);
  } finally {
    hideLoader();
  }
}

async function onLoadMore() {
  currentPage += 1;

  try {
    const { hits } = await getImagesByQuery(currentQuery, currentPage);
    if (!hits.length) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      return;
    }

    createGallery(hits);

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (currentPage >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      message: 'Error loading more images.',
      position: 'topRight',
    });
    console.error(error);
  }
}
