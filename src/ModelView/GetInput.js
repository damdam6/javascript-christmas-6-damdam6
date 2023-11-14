import ERROR_DATA from '../Model/Error.js';
import { Data, GameStage } from '../Model/Data.js';

const validate = {
  dateValidate(input) {
    if (!/^\d+$/.test(input)) {
      throw ERROR_DATA.WRONG_DATE;
      return;
    }
    const numericValue = parseInt(input, 10);
    if (numericValue <= 0 || numericValue > 31) {
      throw ERROR_DATA.WRONG_DATE;
      return;
    }
    GameStage.getDateAgain = true;
  },
  menuValidate(input) {

  },
};

const GetInputSaver = {
  setDate(input) {
    validate.dateValidate(input);
    Data.date = input;
  },
  setMenu(input) {

  },
};

export default GetInputSaver;
