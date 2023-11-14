import ERROR_DATA from '../Model/Error';
import { Data } from '../Model/Data';

const validate = {
  dateValidate(input) {
    if (!/^\d+$/.test(input)) {
      throw ERROR_DATA.WRONG_DATE;
    }
    const numericValue = parseInt(input, 10);
    if (numericValue <= 0 || numericValue > 31) {
      throw ERROR_DATA.WRONG_DATE;
    }
  },
  menuValidate(input) {

  },
};

const GetInputSaver = {
  setDate(input) {
    validate.dateValidate(input);
  },
  setMenu(input) {

  },
};

export default GetInputSaver;
