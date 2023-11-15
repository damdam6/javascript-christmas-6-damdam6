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
});
