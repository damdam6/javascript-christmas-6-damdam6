import { UserData, FIXED_DATA } from '../src/Model/Data.js';
import PromotionCalculator from '../src/ModelView/PromotionCalculator.js';

describe('PromotionCalculator', () => {
  describe('calculateTotalPrice', () => {
    beforeEach(() => {
      UserData.initailize();
    });

    it('should correctly calculate the total price of the order', () => {
      UserData.order = { "티본스테이크": 1, "바비큐립": 2 };
      PromotionCalculator.calculateTotalPrice();
      expect(UserData.totalPrice).toBe(55000 + 54000 * 2);
    });

    it('should handle empty order', () => {
      UserData.order = {};
      PromotionCalculator.calculateTotalPrice();
      expect(UserData.totalPrice).toBe(0);
    });
  });

  describe('totalOrderCnt', () => {
    beforeEach(() => {
      UserData.initailize();
      UserData.order = { "티본스테이크": 1, "초코케이크": 2 };
    });

    it('should count main courses and desserts in the order', () => {
      PromotionCalculator.totalOrderCnt();
      expect(UserData.menuType.totalMainCnt).toBe(1);
      expect(UserData.menuType.totalDesserCnt).toBe(2);
    });
  });

  describe('bonusPromotion', () => {
    it('should set bonusPromotion to true when totalPrice exceeds CHAMPAGNE_MIN_PRICE', () => {
      UserData.totalPrice = FIXED_DATA.PROMOTION_RULE.CHAMPAGNE_MIN_PRICE + 1;
      PromotionCalculator.bonusPromotion();
      expect(UserData.bonusPromotion).toBe(true);
    });

    it('should not set bonusPromotion when totalPrice is below CHAMPAGNE_MIN_PRICE', () => {
      UserData.totalPrice = FIXED_DATA.PROMOTION_RULE.CHAMPAGNE_MIN_PRICE - 1;
      console.log(UserData.totalPrice);
      PromotionCalculator.bonusPromotion();
      expect(UserData.bonusPromotion).toBe(false);
    });
  });
  describe('weekPromotion', () => {
    it('should correctly calculate weekend promotion if date is a weekend day', () => {
      UserData.date = FIXED_DATA.SPECIAL_PROMOTION_DATE.WEEKEND_DAY[0];
      UserData.menuType.totalMainCnt = 2;
      PromotionCalculator.weekPromotion();
      expect(UserData.weekendPromotion).toBe(FIXED_DATA.PROMOTION_RULE.WEEK_PROMO_AMOUNT * UserData.menuType.totalMainCnt);
    });

    it('should correctly calculate weekday promotion if date is a weekday', () => {
      UserData.date = 3;
      UserData.menuType.totalDesserCnt = 3;
      PromotionCalculator.weekPromotion();
      expect(UserData.weekdayPromotion).toBe(FIXED_DATA.PROMOTION_RULE.WEEK_PROMO_AMOUNT * UserData.menuType.totalDesserCnt);
    });
  });




});

