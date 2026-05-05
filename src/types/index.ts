export interface RawCardData {
    fullName: string;
  email: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
}
export interface CRMContact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  createdAt: string;
  updatedAt: string;
  source: "business_card";
} 
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
}

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number
  ) {
    super(message);
    this.name = "AppError";
  }
}