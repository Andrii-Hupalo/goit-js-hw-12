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
const loadMore = document.querySelector('.js-load-more');
const gallery = document.querySelector('.gallery');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

const PER_PAGE = 15;

hideLoadMoreButton();

loadMore?.addEventListener('click', onLoadMoreHandler);
form?.addEventListener('submit', onHandlerButton);

async function onHandlerButton(event) {
  event.preventDefault();

  const searchText = event.target.elements['search-text'].value.trim();
  if (!searchText) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search word!',
      position: 'topRight',
    });
    return;
  }

  currentQuery = searchText;
  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    const images = Array.isArray(data.hits) ? data.hits : [];
    totalHits = Number.isFinite(data.totalHits) ? data.totalHits : 0;

    if (!images.length) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      hideLoadMoreButton();
      return;
    }

    createGallery(images);

    if (currentPage * PER_PAGE < totalHits) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        title: 'End',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    console.error(error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Try again!',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

async function onLoadMoreHandler() {
  showLoader();
  hideLoadMoreButton();

  const nextPage = currentPage + 1;

  try {
    const data = await getImagesByQuery(currentQuery, nextPage);
    const images = Array.isArray(data.hits) ? data.hits : [];

    if (!images.length) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'End',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      return;
    }

    createGallery(images);
    currentPage = nextPage;

    const firstCard = gallery?.firstElementChild;
    const cardHeight = firstCard?.getBoundingClientRect?.().height ?? 0;

    if (cardHeight > 0) {
      window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
    }

    const totalPage = totalHits ? Math.ceil(totalHits / PER_PAGE) : 0;
    if (currentPage >= totalPage) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'End',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    console.error(error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to load more images.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}
