import InputView from './InputView.js';
import OutputView from './OutputView.js';
import {GetInputSaver} from '../ModelView/GetInput.js';
import { ProgramStage } from '../Model/Data.js';

const RequestView = async function OrderView() {
  OutputView.printHello();
  while (ProgramStage.getDateAgain) {
    const input = await InputView.readDate();
    try {
      GetInputSaver.setDate(input);
    } catch (e) {
      OutputView.printError(e);
    }
  }
  while (ProgramStage.getMenuAgain) {
    const input = await InputView.readMenu();
    try {
      GetInputSaver.setMenu(input);
    } catch (e) {
      OutputView.printError(e);
    }
  }
};
const ResultView = function RequestView() {
  OutputView.printResult();
};

const ViewChange = async function ViewChange(stage) {
  switch (stage) {
    case 0:
      await RequestView();
      break;
    case 1:
      ResultView();
      break;
    default:
  }
};

const MainView = async function MainView() {

    await ViewChange(0);
    await ViewChange(1);

};

export default MainView;
