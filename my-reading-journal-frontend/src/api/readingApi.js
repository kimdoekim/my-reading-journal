import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/records';

export const getReadingRecords = () =>
  axios.get(BASE_URL);

export const getReadingRecordById = (id) =>
  axios.get(`${BASE_URL}/${id}`);

export const saveReadingRecord = (data) =>
  axios.post(BASE_URL, data);

export const updateReadingRecord = (id, data) =>
  axios.put(`${BASE_URL}/${id}`, data);

export const deleteReadingRecord = (id) =>
  axios.delete(`${BASE_URL}/${id}`);
