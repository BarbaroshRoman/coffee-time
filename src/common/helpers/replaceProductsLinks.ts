import {IProductBriefInfo} from '../../core/api/CoffeeRequest';

const newLinks = [
  'https://ambassador-manufaktura.ru/upload/medialibrary/4ff/4ff982a7c3d3a59d0525472472115390.jpg',
  'https://img.povar.ru/mobile/1b/81/81/b2/egg-nog-352101.jpg',
  'https://turka.life/wp-content/uploads/2019/01/irish-coffee.jpg',
  'https://craftcoffeespot.com/wp-content/uploads/2022/04/Pour-over-coffee-general-photo-3-1024x683.png',
  'https://vilkin.pro/wp-content/uploads/2019/03/kofe-glyasse-770x513.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/c/c6/Latte_art_3.jpg',
];

export const replaceProductsLinks = (
  allProduct: IProductBriefInfo[] | null,
) => {
  return allProduct?.map(el => {
    if (el.name === 'Капучино') {
      el.imagesPath = newLinks[0];
    } else if (el.name === 'Эгг-ног') {
      el.imagesPath = newLinks[1];
    } else if (el.name === 'Айриш кофе «The Original»') {
      el.imagesPath = newLinks[2];
    } else if (el.name === 'Pour over') {
      el.imagesPath = newLinks[3];
    } else if (el.name === 'Кофе "Глясе"') {
      el.imagesPath = newLinks[4];
    } else if (el.name === 'Латте со вкусом карамель-орех') {
      el.imagesPath = newLinks[5];
    }
    return el;
  });
};
