import InputView from './InputView.js';
import OutputView from './OutputView.js';
import GetInputSaver from '../ModelView/GetInput.js';
import { Data, GameStage } from '../Model/Data.js';

const RequestView = async function OrderView() {
  while (!GameStage.getDateAgain) {
    const input = await InputView.readDate();
    try {
      GetInputSaver.setDate(input);
    } catch (e) {
      OutputView.printError(e);
    }
  }
  while (!GameStage.getMenuAgain) {
    const input = await InputView.readMenu();
    try {
      GetInputSaver.setMenu(input);
    } catch (e) {
      OutputView.printError(e);
    }
  }
};
const ResultView = function RequestView() {

};

const ViewChange = async function ViewChange(stage) {
  switch (stage) {
    case 0:
      RequestView();
      break;
    case 1:
      //
      break;
    default:
  }
};

const MainView = async function MainView() {
  let stage = 0;
  while (!Data.gameEnd) {
    await ViewChange(stage);
    stage += 1;
    break;
  }
};

export default MainView;
