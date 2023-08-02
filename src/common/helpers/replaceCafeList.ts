import {ICafeInfo} from '../../types/cafeRequestType';

const oldLinks = [
  'http://lovecafedecafe.com/templates/beez_20/logo0001.jpg',
  'http://company.es-pmr.com/uploads/764SDC10782.jpg',
];
const newLinks = [
  'https://idei.club/uploads/posts/2022-11/1667335707_2-idei-club-p-dizain-kafe-snaruzhi-instagram-2.jpg',
  'https://interiorscafe.ru/wp-content/uploads/pasta-grill-cafe-01.jpg',
];

export interface INewCafeInfo extends ICafeInfo {
  favorite: boolean;
}

export const replaceCafeList = (
  allCafe: ICafeInfo[] | null,
): INewCafeInfo[] | undefined => {
  return allCafe?.map(el => {
    const newCafe: INewCafeInfo = {...el, favorite: false};

    if (newCafe.images === oldLinks[0]) {
      newCafe.images = newLinks[0];
    } else if (newCafe.images === oldLinks[1]) {
      newCafe.images = newLinks[1];
    }
    return newCafe;
  });
};
