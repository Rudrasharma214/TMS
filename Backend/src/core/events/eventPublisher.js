// Helper for publishing events

import logger from '../../config/logger.js';
import eventBus from './eventBus.events.js';

export const publishEvent = (eventName, payload = {}) => {
  try {
    eventBus.emit(eventName, payload);
  } catch (err) {
    logger.error('Event publish failed:', eventName, err);
  }
};
