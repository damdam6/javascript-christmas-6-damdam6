
import { UserData, FIXED_DATA } from "../Model/Data.js";

const PromotionCalculator = {
  allMenusWithPrices: Object.values(FIXED_DATA.MENU_LIST).reduce((combinedMenus, category) => {
    return {...combinedMenus, ...category};
  }, {}),

  calculateTotalPrice() {
    for (const menu in UserData.order) {
      const pricePerItem =this.allMenusWithPrices[menu];
      if (pricePerItem) {
        UserData.totalPrice += pricePerItem * UserData.order[menu];
      }
    }
  },

  combinedMenu: Object.entries(FIXED_DATA.MENU_LIST).reduce((acc, [category, menus]) => {
    Object.keys(menus).forEach(menu => {
      acc[menu] = category;
    });
    return acc;
  }, {}),

  totalOrderCnt() {
    
    for(const menu in UserData.order){
      if(this.combinedMenu[menu] === 'MAIN_COURSES' ){
        UserData.menuType.totalMainCnt += UserData.order[menu];
        continue;
      }
      if(this.combinedMenu[menu] === 'DESSERTS' ){
        UserData.menuType.totalDesserCnt += UserData.order[menu];
        continue;
      }
    }
  },
  christmasDday() {
    if(UserData.date >= FIXED_DATA.SPECIAL_PROMOTION_DATE.CHRISTMAS){
      return;
    }
    UserData.dDayPromotion += FIXED_DATA.PROMOTION_RULE.DDAY_PROMO_AMOUNT * UserData.date;
  },
  weekPromotion() {
    if(UserData.date in FIXED_DATA.SPECIAL_PROMOTION_DATE.WEEKEND_DAY){

    }
  },
  promotionCalculator() {
    this.calculateTotalPrice();
    this.totalOrderCnt();
  }

}
export default PromotionCalculator;