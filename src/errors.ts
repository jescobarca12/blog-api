export class HttpError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
  }
}

export class NotFoundError extends HttpError {
  constructor(message = 'Recurso no encontrado') {
    super(404, message);
  }
}

export class BadRequestError extends HttpError {
  constructor(message = 'Petición inválida') {
    super(400, message);
  }
}
export class UnauthorizedError extends HttpError {
  constructor(message = 'No autorizado') {
    super(401, message);
  }
}
export class ForbiddenError extends HttpError {
  constructor(message = 'No tienes permiso') {
    super(403, message);
  }
}