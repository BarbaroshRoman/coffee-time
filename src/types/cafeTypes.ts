export interface ICafeInfo {
  id?: string | undefined;
  name: string;
  address: string;
  coordinates: string;
  description: string;
  images?: string | undefined;
}

export interface ICafeRequest {
  sessionId: string | null;
  cafeId: string | undefined;
}
