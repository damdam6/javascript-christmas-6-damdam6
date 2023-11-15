
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
      UserData.dDayPromotion = 0;
      return;
    }
    UserData.dDayPromotion += FIXED_DATA.PROMOTION_RULE.DDAY_PROMO_AMOUNT * UserData.date;
  },
  weekPromotion() {
    if(FIXED_DATA.SPECIAL_PROMOTION_DATE.WEEKEND_DAY.includes(UserData.date)){
      UserData.weekendPromotion += FIXED_DATA.PROMOTION_RULE.WEEK_PROMO_AMOUNT * UserData.menuType.totalMainCnt;
      return;
    }
    UserData.weekdayPromotion += FIXED_DATA.PROMOTION_RULE.WEEK_PROMO_AMOUNT * UserData.menuType.totalDesserCnt;
  },
  bonusPromotion() {
    if(UserData.totalPrice >= FIXED_DATA.PROMOTION_RULE.CHAMPAGNE_MIN_PRICE){
      UserData.bonusPromotion = true;
    }
  },
  specialPromotion() {
    if(FIXED_DATA.SPECIAL_PROMOTION_DATE.STAR_DAY.includes(UserData.date)){
      UserData.specialPromotion = true;
    }
  },
  totalPromotionAmount() {
    let total = 0;
    total += UserData.dDayPromotion;
    total += UserData.weekdayPromotion + UserData.weekendPromotion;
    if(UserData.specialPromotion){
      total += FIXED_DATA.PROMOTION_RULE.SPECIAL_PROMO_AMOUNT;
    }
    UserData.finalPrice = UserData.totalPrice - total
    if(UserData.bonusPromotion){
      total += FIXED_DATA.MENU_LIST.BEVERAGES.샴페인;
    }
    UserData.totalPromotion = total;
  },
  eventBadge() {
    if(UserData.totalPromotion >= FIXED_DATA.BADGE_PROMOTION_MIN_PRICE.SANTA_BADGE){
      UserData.eventBadge = '산타';
      return;
    }
    if(UserData.totalPromotion >= FIXED_DATA.BADGE_PROMOTION_MIN_PRICE.TREE_BADGE){
      UserData.eventBadge = '트리';
      return;
    }
    if(UserData.totalPromotion >= FIXED_DATA.BADGE_PROMOTION_MIN_PRICE.STAR_BADGE){
      UserData.eventBadge = '별';
      return;
    }
  },
  checkMinPrice() {
    if(UserData.totalPrice >= FIXED_DATA.PROMOTION_RULE.MIN_PRICE){
      return;
    }
    UserData.weekdayPromotion = 0;
    UserData.weekendPromotion = 0;
    UserData.specialPromotion = 0;
    UserData.totalPromotion = 0; 
    UserData.finalPrice = UserData.totalPrice;
  },
  promotionCalculator() {
    this.calculateTotalPrice();
    this.totalOrderCnt();
    this.christmasDday();
    this.weekPromotion();
    this.bonusPromotion();
    this.specialPromotion();
    this.totalPromotionAmount();
    this.eventBadge();
    this.checkMinPrice();
    return true;
  }

}
export default PromotionCalculator;