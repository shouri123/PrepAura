import React, { createContext, useState, useEffect } from 'react';

export const InterviewContext = createContext(null);

const STORAGE_KEY = 'prepaura_active_session';

const getInitialSession = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && Array.isArray(parsed.questions) && parsed.questions.length > 0) {
        return parsed;
      }
    }
  } catch {
    // Ignore storage parse errors
  }
  return {
    interviewId: null,
    config: null,
    questions: [],
    answers: {},
    currentIndex: 0,
    startTime: null,
  };
};

export const InterviewProvider = ({ children }) => {
  const [session, setSession] = useState(getInitialSession);

  // Synchronize state changes to localStorage
  useEffect(() => {
    try {
      if (session.questions && session.questions.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Ignore storage errors
    }
  }, [session]);

  const initializeSession = (interviewData) => {
    const newSession = {
      interviewId: interviewData.interviewId,
      config: interviewData.config,
      questions: interviewData.questions,
      answers: interviewData.answers || {},
      currentIndex: interviewData.currentIndex || 0,
      startTime: Date.now(),
    };
    setSession(newSession);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSession));
    } catch {
      // Ignore
    }
  };

  const saveAnswer = (questionIndex, text) => {
    setSession((prev) => {
      const updated = {
        ...prev,
        answers: { ...prev.answers, [questionIndex]: text },
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  const setQuestionIndex = (index) => {
    setSession((prev) => {
      const updated = { ...prev, currentIndex: index };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  const resetSession = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
    setSession({
      interviewId: null,
      config: null,
      questions: [],
      answers: {},
      currentIndex: 0,
      startTime: null,
    });
  };

  return (
    <InterviewContext.Provider
      value={{
        session,
        initializeSession,
        saveAnswer,
        setQuestionIndex,
        resetSession,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};