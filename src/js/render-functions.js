import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.js-load-more');

let imageModal = null;

export function createGallery(images) {
  if (!gallery) {
    console.warn('Gallery element not found in DOM');
    return;
  }

  const markup = images
    .map(image => {
      return `
        <li class="gallery-item">
          <a href="${image.largeImageURL}">
            <img
              src="${image.webformatURL}"
              alt="${image.tags}"
              loading="lazy"
              width="300"
            />
          </a>
          <ul class="info">
            <li><b>Likes:</b> ${image.likes}</li>
            <li><b>Views:</b> ${image.views}</li>
            <li><b>Comments:</b> ${image.comments}</li>
            <li><b>Downloads:</b> ${image.downloads}</li>
          </ul>
        </li>
      `;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  if (imageModal) {
    imageModal.refresh();
  } else {
    imageModal = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  }
}

export function clearGallery() {
  if (!gallery) return;
  gallery.innerHTML = '';
  if (imageModal) {
    imageModal.destroy();
    imageModal = null;
  }
}

export function showLoader() {
  if (!loader) return;
  loader.classList.remove('hidden');
  loader.setAttribute('aria-hidden', 'false');
}

export function hideLoader() {
  if (!loader) return;
  loader.classList.add('hidden');
  loader.setAttribute('aria-hidden', 'true');
}

export function showLoadMoreButton() {
  if (!loadMoreBtn) return;
  loadMoreBtn.classList.remove('hidden');
  loadMoreBtn.disabled = false;
}

export function hideLoadMoreButton() {
  if (!loadMoreBtn) return;
  loadMoreBtn.classList.add('hidden');
  loadMoreBtn.disabled = true;
}
