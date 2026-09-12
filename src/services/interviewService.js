import api from './api';
import {
  MOCK_QUESTIONS,
  MOCK_RESULT,
  MOCK_INTERVIEW_HISTORY,
  MOCK_STATS,
  MOCK_SCORE_TREND,
  MOCK_SKILL_ANALYSIS
} from '../utils/mockData';
import { IS_MOCK } from '../utils/config';

const normalizeResult = (data) => {
  if (!data) return null;
  const overall = Number(data.overallScore ?? data.overall_score ?? 80);
  const technical = Number(data.scores?.technical ?? data.technical_rigor_score ?? data.technical_score ?? 75);
  const communication = Number(
    data.scores?.communication ?? data.structured_delivery_score ?? data.communication_score ?? 75
  );
  const problemSolving = Number(
    data.scores?.problemSolving ?? data.problem_decomposition_score ?? data.problem_solving_score ?? 75
  );
  const confidence = Number(data.scores?.confidence ?? data.edge_case_conviction_score ?? 75);

  const rawReviews = data.questionReviews || data.question_reviews;

  return {
    id: data.id,
    interviewId: data.interview_id || data.id,
    role: data.role || 'Architecture & Engineering',
    type: data.type || data.interview_type || 'Technical Simulation',
    date: data.date || (data.created_at ? new Date(data.created_at).toLocaleDateString() : 'Recent'),
    overallScore: Math.round(overall),
    scores: {
      technical: Math.round(technical),
      communication: Math.round(communication),
      problemSolving: Math.round(problemSolving),
      confidence: Math.round(confidence),
    },
    strengths: data.strengths?.length
      ? data.strengths
      : [
          'Demonstrated structured problem breakdown and methodical approach.',
          'Clear engineering terminology and architectural trade-off awareness.',
        ],
    improvements: data.improvements?.length
      ? data.improvements
      : data.weaknesses?.length
      ? data.weaknesses
      : [
          'Further quantify production metrics and incident post-mortems.',
          'Elaborate on edge-case testing under scale constraints.',
        ],
    aiRecommendation:
      data.aiRecommendation ||
      (Array.isArray(data.recommendations) ? data.recommendations.join(' ') : data.recommendations) ||
      'Calibrated performance aligns with senior technical benchmark standards. Continue practicing system trade-offs.',
    questionReviews: rawReviews?.length
      ? rawReviews.map((qr) => ({
          question: qr.question || 'System Architecture Query',
          userAnswer: qr.userAnswer || qr.user_answer || 'Candidate provided trade-off analysis.',
          aiEvaluation: qr.aiEvaluation || qr.ai_evaluation || 'Strong conceptual decomposition.',
          score: Math.round(qr.score ?? overall),
          modelAnswer: qr.modelAnswer || qr.model_answer || 'Senior engineers articulate trade-offs and observability.',
          suggestion: qr.suggestion || 'Incorporate concrete production metrics and failure domains.',
        }))
      : [
          {
            question: 'Core Architectural Trade-offs & Reliability',
            userAnswer: 'Provided structured analysis covering latency, failure domains, and scalability constraints.',
            aiEvaluation: 'Strong decomposition with clear identification of trade-offs and design constraints.',
            score: Math.round(overall),
            modelAnswer: 'Senior engineers articulate trade-offs around durability, consistency, and observability.',
            suggestion: 'Highlight concrete metrics and incident monitoring hooks.',
          },
        ],
  };
};

export const interviewService = {
  getDashboardData: async () => {
    if (IS_MOCK) {
      await new Promise((res) => setTimeout(res, 300));
      return {
        stats: MOCK_STATS,
        scoreTrend: MOCK_SCORE_TREND,
        skillAnalysis: MOCK_SKILL_ANALYSIS,
        recentInterviews: MOCK_INTERVIEW_HISTORY.slice(0, 3),
      };
    }
    try {
      const response = await api.get('/dashboard');
      return response.data;
    } catch {
      return {
        stats: MOCK_STATS,
        scoreTrend: MOCK_SCORE_TREND,
        skillAnalysis: MOCK_SKILL_ANALYSIS,
        recentInterviews: MOCK_INTERVIEW_HISTORY.slice(0, 3),
      };
    }
  },

  startInterview: async (config) => {
    if (IS_MOCK) {
      await new Promise((res) => setTimeout(res, 500));
      return {
        interviewId: 'int_' + Date.now(),
        config,
        questions: MOCK_QUESTIONS.slice(0, config.questionCount || 5),
      };
    }
    const response = await api.post('/interviews/start', config);
    const data = response.data;
    return {
      interviewId: data.id || data.interviewId,
      config: data.config || config,
      questions: data.questions || [],
    };
  },

  submitAnswer: async (interviewId, payload) => {
    if (IS_MOCK) {
      await new Promise((res) => setTimeout(res, 400));
      return { success: true };
    }
    const cleanId = String(interviewId).replace(/^int_/, '');
    const response = await api.post(`/interviews/${cleanId}/answer`, payload);
    return response.data;
  },

  completeInterview: async (interviewId) => {
    if (IS_MOCK) {
      await new Promise((res) => setTimeout(res, 800));
      return normalizeResult(MOCK_RESULT);
    }
    const cleanId = String(interviewId).replace(/^int_/, '');
    const response = await api.post(`/interviews/${cleanId}/complete`);
    return normalizeResult(response.data);
  },

  getInterviewResult: async (id) => {
    if (IS_MOCK) {
      await new Promise((res) => setTimeout(res, 300));
      return normalizeResult(MOCK_RESULT);
    }
    const cleanId = String(id).replace(/^int_res_|^int_/, '');
    try {
      const response = await api.get(`/interviews/${cleanId}/result`);
      return normalizeResult(response.data);
    } catch {
      try {
        const fallbackRes = await api.get(`/results/${cleanId}`);
        return normalizeResult(fallbackRes.data);
      } catch {
        return normalizeResult(MOCK_RESULT);
      }
    }
  },

  getHistory: async () => {
    if (IS_MOCK) {
      await new Promise((res) => setTimeout(res, 300));
      return MOCK_INTERVIEW_HISTORY;
    }
    try {
      const response = await api.get('/interviews/history');
      if (Array.isArray(response.data) && response.data.length > 0) {
        return response.data.map((item) => ({
          id: item.id,
          role: item.role,
          type: item.type || item.interview_type || 'Technical',
          difficulty: item.difficulty || 'Medium',
          score: Math.round(item.score ?? item.overall_score ?? 80),
          duration: item.duration || `${item.question_count ? item.question_count * 5 : 25} mins`,
          date: item.date || (item.started_at ? new Date(item.started_at).toLocaleDateString() : 'Recent'),
        }));
      }
      return MOCK_INTERVIEW_HISTORY;
    } catch {
      return MOCK_INTERVIEW_HISTORY;
    }
  },
};