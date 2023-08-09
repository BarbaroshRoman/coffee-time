export interface ICafeInfo {
  id: string;
  name: string;
  address: string;
  coordinates: string;
  description: string;
  images: string;
}

export interface ICafeRequest {
  sessionId: string;
  cafeId: string;
}
