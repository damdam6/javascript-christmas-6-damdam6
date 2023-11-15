import { MissionUtils } from '@woowacourse/mission-utils';
import { UserData } from '../Model/Data.js';

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

const ResultView = {
  printResultStart() {
    MissionUtils.Console.print('12월 26일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n');
  },
  printMenu() {
    MissionUtils.Console.print('<주문 메뉴>');
   for(const menu in UserData.order){
    MissionUtils.Console.print(`${menu} ${UserData.order[menu]}개\n`);
   }
  },
  printTotalPrice() {
    MissionUtils.Console.print(`<할인 전 총주문 금액>`);
    MissionUtils.Console.print(`${UserData.totalPrice}원`);
  },
  printBonusMenu() {

  },
  printBenefits() {

  },
  printBenefitsAmount() {

  },
  printDiscountedPrice() {

  },
  printEventBadge() {

  },
}
export default OutputView;
