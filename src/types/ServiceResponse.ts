// Tipo base para todas las respuestas
export type BaseServiceResponse<T> = {
  data: T | null;
  error: Error | null;
  status: 'success' | 'error';
  message?: string;
};

// Para respuestas que devuelven arrays
export type ServiceResponse<T> = BaseServiceResponse<T[]>;

// Para respuestas que devuelven un solo objeto
export type ServiceSingleResponse<T> = BaseServiceResponse<T>;

// Para respuestas que no devuelven datos (como delete)
export type ServiceEmptyResponse = BaseServiceResponse<null>;
