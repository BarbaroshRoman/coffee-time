/*tslint:disable*/
class BaseRequest {
  protected static handleError = (e: any) => {
    console.error(e);
    throw e;
  };

  protected fetch(path: string, options: any): Promise<any> {
    const url = `http://ci2.dextechnology.com:8000${path}`;
    return fetch(url, options);
  }
}

export class CafeClientRequest extends BaseRequest {
  getAll(sessionId: string | null, config: any = {}): Promise<CafeInfo[] | null> {
    return this.fetch(
      '/api/Cafe/GetAll',
      Object.assign(
        {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
          method: 'POST',
          body: JSON.stringify(sessionId),
        },
        config,
      ),
    )
      .then(response => response.json())
      .catch(BaseRequest.handleError);
  }

  getCafe(
    cafeRequest: CafeRequest,
    config: any = {},
  ): Promise<CafeInfo | null> {
    return this.fetch(
      '/api/Cafe/GetCafe',
      Object.assign(
        {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
          method: 'POST',
          body: JSON.stringify(cafeRequest),
        },
        config,
      ),
    )
      .then(response => response.json())
      .catch(BaseRequest.handleError);
  }
}

export class ProductClientRequest extends BaseRequest {
  getAll(
    session: string,
    config: any = {},
  ): Promise<ProductBriefInfo[] | null> {
    return this.fetch(
      '/api/Product/GetAll',
      Object.assign(
        {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
          method: 'POST',
          body: JSON.stringify(session),
        },
        config,
      ),
    )

      .then(response => response.json())
      .catch(BaseRequest.handleError);
  }

  getProductsCafe(
    myCafe: CafeRequest,
    config: any = {},
  ): Promise<ProductBriefInfo[] | null> {
    return this.fetch(
      '/api/Product/GetProductsCafe',
      Object.assign(
        {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
          method: 'POST',
          body: JSON.stringify(myCafe),
        },
        config,
      ),
    )

      .then(response => response.json())
      .catch(BaseRequest.handleError);
  }

  getProduct(
    myProduct: ProductRequest,
    config: any = {},
  ): Promise<ProductFullInfo | null> {
    return this.fetch(
      '/api/Product/GetProduct',
      Object.assign(
        {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
          method: 'POST',
          body: JSON.stringify(myProduct),
        },
        config,
      ),
    )

      .then(response => response.json())
      .catch(BaseRequest.handleError);
  }
}

export class CafeRequest implements ICafeRequest {
  sessionId: string;
  cafeId: string;

  constructor(data?: ICafeRequest) {
    if (data) {
      for (let property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }

  static fromJS(data: any): CafeRequest {
    let result = new CafeRequest();
    result.init(data);
    return result;
  }

  init(data?: any) {
    if (data) {
      this.sessionId = data.sessionId;
      this.cafeId = data.cafeId;
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data.sessionId = this.sessionId;
    data.cafeId = this.cafeId;
    return data;
  }
}

export interface ICafeRequest {
  sessionId: string | null;
  cafeId: string | undefined;
}

export class ProductBriefInfo implements IProductBriefInfo {
  id: string;
  cofeId: string;
  name: string;
  price: number;
  favorite: boolean;
  imagesPath?: string | undefined;

  constructor(data?: IProductBriefInfo) {
    if (data) {
      for (let property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }

  static fromJS(data: any): ProductBriefInfo {
    let result = new ProductBriefInfo();
    result.init(data);
    return result;
  }

  init(data?: any) {
    if (data) {
      this.id = data.id;
      this.cofeId = data.cofeId;
      this.name = data.name;
      this.price = data.price;
      this.favorite = data.favorite;
      this.imagesPath = data.imagesPath;
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data.id = this.id;
    data.cofeId = this.cofeId;
    data.name = this.name;
    data.price = this.price;
    data.favorite = this.favorite;
    data.imagesPath = this.imagesPath;
    return data;
  }
}

export interface IProductBriefInfo {
  id: string;
  cofeId: string;
  name: string;
  price: number;
  favorite: boolean;
  imagesPath?: string | undefined;
}
