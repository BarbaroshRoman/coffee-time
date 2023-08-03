export interface IProductRequest {
  sessionId: string | null;
  productId: string;
}

export interface IProductFullInfo {
  id: string;
  productName: string;
  price: number;
  cofeId: string;
  cofeName: string;
  favarite: boolean;
  attribute: IAttributeInfo[];
  imagesPath?: string | undefined;
}

export interface IAttributeInfo {
  id: string;
  description: string;
  iconType: string;
}

export interface IProductBriefInfo {
  id: string;
  cofeId: string;
  name: string;
  price: number;
  favorite: boolean | null;
  imagesPath?: string | undefined;
}
