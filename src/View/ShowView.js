import InputView from './InputView';
import OutputView from './OutputView';
import GetInputSaver from '../ModelView/GetInput';
import { Data } from '../Model/Data';

const RequestView = async function OrderView() {
  const input = InputView.readDate();
  while (!Data.GameStage.getDateAgain) {
    InputView.readDate();
    GetInputSaver.setDate(input);
  }
  while (!Data.GameStage.getMenuAgain) {
    InputView.readMenu();
    GetInputSaver.setMenu(input);
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
    ViewChange(stage);
    stage += 1;
  }
};

export default MainView;
