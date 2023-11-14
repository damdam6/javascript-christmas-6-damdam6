import { MissionUtils } from '@woowacourse/mission-utils';

const OutputView = {
  printMenu() {
    MissionUtils.Console.print('<주문 메뉴>');
  },

  printError(e) {
    MissionUtils.Console.print(e.message);
  },
};

export default OutputView;
