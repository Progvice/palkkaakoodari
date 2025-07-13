import {
  QueryFailedError,
  EntityNotFoundError,
  CannotCreateEntityIdMapError,
} from "typeorm";
import { AppError } from "./AppError";

export function handleTypeOrmError(err: unknown): never {
  if (err instanceof QueryFailedError) {
    // e.g., duplicate key, syntax error
    throw new AppError("Database query failed", 400, true, {
      originalError: err.message,
    });
  }

  if (err instanceof EntityNotFoundError) {
    throw new AppError("Entity not found", 404);
  }

  if (err instanceof CannotCreateEntityIdMapError) {
    throw new AppError("Failed to map entity ID", 500);
  }

  // Add more TypeORM-specific errors as needed

  // Unknown or unexpected error
  if (err instanceof Error) {
    throw new AppError(err.message, 500, false);
  }

  throw new AppError("Unknown database error", 500, false);
}
