import {IProductFullInfo} from '../../types/productTypes';

const oldLinks = [
  'https://stozabot.com/wp-content/uploads/2017/01/chtoby-vypit-vkusnyy-kapuchino-ne-obyazatelno-idti.jpg',
  'https://therumdiary.ru/wp-content/uploads/2015/12/eggnog-1.jpg',
  'http://verandacafe.kz/MenuImages/80020151152128139%D0%B0%D0%B9%D1%80%D0%B8%D1%88%20%D0%BA%D0%BE%D1%84%D0%B51_enl.jpg',
  'http://www.seriouseats.com/images/2014/06/20140619-pourover-wire.jpg',
  'http://www.fotokonkurs.ru/uploads/photos/contests/2011/01/31/6/df4a0cb4ba3a4df453759cc629b63b3d/800.jpg',
  'http://slayer9q.bget.ru/wp-content/uploads/2012/06/classic_glese1.png',
];

const newLinks = [
  'https://ambassador-manufaktura.ru/upload/medialibrary/4ff/4ff982a7c3d3a59d0525472472115390.jpg',
  'https://img.povar.ru/mobile/1b/81/81/b2/egg-nog-352101.jpg',
  'https://turka.life/wp-content/uploads/2019/01/irish-coffee.jpg',
  'https://craftcoffeespot.com/wp-content/uploads/2022/04/Pour-over-coffee-general-photo-3-1024x683.png',
  'https://vilkin.pro/wp-content/uploads/2019/03/kofe-glyasse-770x513.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/c/c6/Latte_art_3.jpg',
];

const oldToNewLink: Record<string, string> = {
  [oldLinks[0]]: newLinks[0],
  [oldLinks[1]]: newLinks[1],
  [oldLinks[2]]: newLinks[2],
  [oldLinks[3]]: newLinks[3],
  [oldLinks[4]]: newLinks[4],
  [oldLinks[5]]: newLinks[5],
};

export const replaceLinksForProductScreen = (
  product: IProductFullInfo,
): IProductFullInfo => {
  const newProduct: IProductFullInfo = {...product};

  if (
    newProduct.imagesPath !== undefined &&
    oldToNewLink[newProduct.imagesPath]
  ) {
    newProduct.imagesPath = oldToNewLink[newProduct.imagesPath];
  }

  return newProduct;
};
