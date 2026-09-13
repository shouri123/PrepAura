import api from './api';
import { MOCK_QUESTIONS } from '../utils/mockData';
import { IS_MOCK } from '../utils/config';

export const questionService = {
  getQuestions: async (filters = {}) => {
    if (IS_MOCK) {
      await new Promise((res) => setTimeout(res, 300));
      return MOCK_QUESTIONS;
    }
    try {
      const response = await api.get('/questions', { params: filters });
      const data = response.data;
      if (Array.isArray(data) && data.length > 0) {
        return data.map((q) => ({
          ...q,
          role: q.role || 'Engineering',
          timeEstimate: q.timeEstimate || '3 mins',
        }));
      }
      return MOCK_QUESTIONS;
    } catch {
      return MOCK_QUESTIONS;
    }
  },
};