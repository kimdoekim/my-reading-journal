import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/records';

export const fetchRecords = () => axios.get(BASE_URL);
export const createRecord = (data) => axios.post(BASE_URL, data);
export const deleteRecord = (id) => axios.delete(`${BASE_URL}/${id}`);


export function getReadingRecords() {
  return axios.get('http://localhost:8080/api/records');
}
export function saveReadingRecord(data) {
  return axios.post('http://localhost:8080/api/records', data);
}
