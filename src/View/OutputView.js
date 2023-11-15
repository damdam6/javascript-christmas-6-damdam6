import { MissionUtils } from '@woowacourse/mission-utils';
import { UserData, FIXED_DATA } from '../Model/Data.js';

const BenefitsView = {
  chrismas() {
    if(UserData.dDayPromotion === 0){
      return '';
    }
    return `크리스마스 디데이 할인: -${ResultView.formatPrice(UserData.dDayPromotion)}원\n`;
  },
  week() {
    if(UserData.weekdayPromotion === 0 && UserData.weekendPromotion === 0){
      return '';
    }
    if(UserData.weekdayPromotion === 0){
      return `주말 할인: -${ResultView.formatPrice(UserData.weekendPromotion)}원\n`;
    }
    if(UserData.weekendPromotion === 0){
      return `평일 할인: -${ResultView.formatPrice(UserData.weekdayPromotion)}원\n`;
    }
  },
  bonus() {
    if(UserData.bonusPromotion){
      return `증정 이벤트: -${ResultView.formatPrice(FIXED_DATA.MENU_LIST.BEVERAGES.샴페인)}원\n`;
    }
    return '';
  },
  special() {
    if(UserData.specialPromotion){
      return `특별 할인: -${ResultView.formatPrice(FIXED_DATA.PROMOTION_RULE.SPECIAL_PROMO_AMOUNT)}원\n`
    }
    return '';
  },

  BenefitsView() {
    const str = `${this.chrismas()}${this.week()}${this.special()}${this.bonus()}`;
    if(str === ''){
      return '없음';
    }
    return str;
  }
}

const ResultView = {
  formatPrice(price) {
    return price.toLocaleString('ko-KR');
  },
  printResultStart() {
    MissionUtils.Console.print(`12월 ${UserData.date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`);
  },
  printMenu() {
    MissionUtils.Console.print('<주문 메뉴>');
   for(const menu in UserData.order){
    MissionUtils.Console.print(`${menu} ${UserData.order[menu]}개`);
   }
  },
  printTotalPrice() {
    MissionUtils.Console.print(`\n<할인 전 총주문 금액>`);
    MissionUtils.Console.print(`${this.formatPrice(UserData.totalPrice)}원`);
  },
  printBonusMenu() {
    MissionUtils.Console.print(`\n<증정 메뉴>`);
    if(UserData.bonusPromotion){
      MissionUtils.Console.print(`샴페인 1개`);
      return;
    }
    MissionUtils.Console.print(`없음`);
  },
  printBenefits() {
    MissionUtils.Console.print(`\n<혜택 내역>`);
    if(UserData.totalPrice < FIXED_DATA.PROMOTION_RULE.MIN_PRICE){
      MissionUtils.Console.print(`없음`);
      return;
    }
    MissionUtils.Console.print(BenefitsView.BenefitsView());
  },
  printBenefitsAmount() {
    MissionUtils.Console.print(`\n<총혜택 금액>`);
    if(UserData.totalPromotion === 0){
      MissionUtils.Console.print(`0원`);
      return;
    }
    MissionUtils.Console.print(`-${this.formatPrice(UserData.totalPromotion)}원`);
  },
  printDiscountedPrice() {
    MissionUtils.Console.print(`\n<할인 후 예상 결제 금액>`);
    MissionUtils.Console.print(`${this.formatPrice(UserData.finalPrice)}원`);
  },
  printEventBadge() {
    MissionUtils.Console.print(`\n<12월 이벤트 배지>`);
    MissionUtils.Console.print(`${UserData.eventBadge}`);
  },
}

const OutputView = {
  printHello() {
    MissionUtils.Console.print('안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.');
  },
  printResult() {
    ResultView.printResultStart();
    ResultView.printMenu();
    ResultView.printTotalPrice();
    ResultView.printBonusMenu();
    ResultView.printBenefits();
    ResultView.printBenefitsAmount();
    ResultView.printDiscountedPrice();
    ResultView.printEventBadge();
  },
  printError(e) {
    MissionUtils.Console.print(e.message);
  },
};

export default OutputView;
