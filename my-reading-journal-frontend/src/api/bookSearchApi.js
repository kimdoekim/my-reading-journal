import axios from 'axios';

export function searchBooks(query, page = 1, size = 10) {
  return axios.get('http://localhost:8080/api/search', {
    params: { query, page, size },
  });
}