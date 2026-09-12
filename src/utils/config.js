/**
 * PrepAura Central Configuration Module
 * Strictly follows Zero Emoji Policy.
 */

// Offline/preview mock simulation mode (defaults to false as documented in docs/operations/environment.md)
export const IS_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

// Base API configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
export const API_TIMEOUT = 10000;
