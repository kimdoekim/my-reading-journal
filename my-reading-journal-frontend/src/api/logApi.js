import axios from 'axios';

const LOG_BASE = 'http://localhost:8080/api/logs';

// 전체 세션
export const getDailyLogs = () =>
  axios.get(LOG_BASE);

// 단일 조회
export const getDailyLogById = (id) =>
  axios.get(`${LOG_BASE}/${id}`);

// 생성
export const saveDailyLog = (data) =>
  axios.post(LOG_BASE, data);

// 수정
export const updateDailyLog = (id, data) =>
  axios.put(`${LOG_BASE}/${id}`, data);

// 삭제
export const deleteDailyLog = (id) =>
  axios.delete(`${LOG_BASE}/${id}`);
