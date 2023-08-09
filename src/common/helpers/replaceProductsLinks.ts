import {IProductBriefInfo} from '../../types/productTypes';

const newLinks = [
  'https://ambassador-manufaktura.ru/upload/medialibrary/4ff/4ff982a7c3d3a59d0525472472115390.jpg',
  'https://img.povar.ru/mobile/1b/81/81/b2/egg-nog-352101.jpg',
  'https://turka.life/wp-content/uploads/2019/01/irish-coffee.jpg',
  'https://craftcoffeespot.com/wp-content/uploads/2022/04/Pour-over-coffee-general-photo-3-1024x683.png',
  'https://vilkin.pro/wp-content/uploads/2019/03/kofe-glyasse-770x513.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/c/c6/Latte_art_3.jpg',
];

const oldToNewLink: Record<string, string> = {
  ['Капучино']: newLinks[0],
  ['Эгг-ног']: newLinks[1],
  ['Айриш кофе «The Original»']: newLinks[2],
  ['Pour over']: newLinks[3],
  ['Кофе "Глясе"']: newLinks[4],
  ['Латте со вкусом карамель-орех']: newLinks[5],
};

export const replaceProductsLinks = (
  allProduct: IProductBriefInfo[],
): IProductBriefInfo[] => {
  return allProduct.map(el => {
    const newEl = {...el};

    if (oldToNewLink[newEl.name]) {
      newEl.imagesPath = oldToNewLink[newEl.name];
    }

    return newEl;
  });
};
