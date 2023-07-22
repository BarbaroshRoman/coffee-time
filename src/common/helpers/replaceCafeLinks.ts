import { CafeInfo, ICafeInfo } from "../../core/api/CoffeeRequest";

const oldLinks = [
  'http://lovecafedecafe.com/templates/beez_20/logo0001.jpg',
  'http://company.es-pmr.com/uploads/764SDC10782.jpg',
];
const newLinks = [
  'https://idei.club/uploads/posts/2022-11/1667335707_2-idei-club-p-dizain-kafe-snaruzhi-instagram-2.jpg',
  'https://interiorscafe.ru/wp-content/uploads/pasta-grill-cafe-01.jpg',
];

export const replaceCafeLinks = (allCafe: ICafeInfo[] | null) => {
  return allCafe?.map(el => {
    if (el.images === oldLinks[0]) {
      el.images = newLinks[0];
    } else if (el.images === oldLinks[1]) {
      el.images = newLinks[1];
    }
    return el;
  });
};
