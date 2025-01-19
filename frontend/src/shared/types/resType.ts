export interface ResType<T> {
  success: boolean;
  status: string;
  message: string;
  data: T;
  error?: string;
}

