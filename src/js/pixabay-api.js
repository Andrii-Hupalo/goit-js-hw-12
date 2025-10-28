import axios from 'axios';

const KEY = '52813503-cb7190d9096228e90c42c3654';
const BASE_URL = 'https://pixabay.com/api/';

const PER_PAGE = 15;

export async function getImagesByQuery(query, page = 1) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: PER_PAGE,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}
