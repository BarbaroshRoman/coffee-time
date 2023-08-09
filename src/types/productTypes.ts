export interface IProductRequest {
  sessionId: string;
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
  imagesPath: string;
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
  favorite: boolean;
  imagesPath: string;
}
