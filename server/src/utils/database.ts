
import { PrismaClient } from '@prisma/client';
import { logToFile, logError } from './logger';

const prisma = new PrismaClient();

// Add query performance logging
prisma.$use(async (params, next) => {
  const startTime = Date.now();
  try {
    const result = await next(params);
    const duration = Date.now() - startTime;
    logToFile(`Query ${params.model}.${params.action} took ${duration}ms`);
    return result;
  } catch (error) {
    logError(error);
    throw error;
  }
});

export default prisma;
