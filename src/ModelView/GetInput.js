import ERROR_DATA from '../Model/Error.js';
import { UserData, ProgramStage, FIXED_DATA } from '../Model/Data.js';

const validateOrder = {
  duplicate(menu, menuObject){
    if (menuObject.hasOwnProperty(menu)) {
      throw ERROR_DATA.WRONG_MENU;
    }
    return true;
  },
  numeric(quantity) {
    if (isNaN(quantity)||quantity < FIXED_DATA.PROMOTION_RULE.MIN_ORDER_CNT) {
      throw ERROR_DATA.WRONG_MENU;
    }
    return true;
  },
  beverageOnly(menuObject) {
    const beverageItems = new Set(Object.keys(FIXED_DATA.MENU_LIST.BEVERAGES));
    let containsNonBeverage = false;
  
    for (const item in menuObject) {
      if (!beverageItems.has(item)) {
        containsNonBeverage = true;
        break;
      }
    }
    if (!containsNonBeverage) {
      throw ERROR_DATA.WRONG_MENU;;
    }
  },
  menuLimit(menuObject){
    let total = 0;
    for(const menu in menuObject){
      total += menuObject[menu];
    }
    if(total > FIXED_DATA.PROMOTION_RULE.MAX_ORDER_CNT){
      throw ERROR_DATA.WRONG_MENU;
    }
  },
  menuExists(menu) {
    for (const category in FIXED_DATA.MENU_LIST) {
      if (Object.keys(FIXED_DATA.MENU_LIST[category]).includes(menu)) {
        return;
      }
    }
    throw ERROR_DATA.WRONG_MENU;
  },
  
  validateOrder(menu, menuObject, quantity) {
    this.duplicate(menu, menuObject);
    this.numeric(quantity);
    this.menuExists(menu);
  }
}

const validate = {
  dateValidate(input) {
    if (!/^\d+$/.test(input)) {
      throw ERROR_DATA.WRONG_DATE;
      return;
    }
    const numericValue = parseInt(input, 10);
    if (numericValue < FIXED_DATA.PROMOTION_RULE.DATE_START 
      || numericValue > FIXED_DATA.PROMOTION_RULE.DATE_END) {
      throw ERROR_DATA.WRONG_DATE;
    }
    ProgramStage.getDateAgain = false;
    return numericValue;
  },
  parseMenu(input) {  
    const items = input.split(',');
    const menuObject = {};
    items.forEach(item => {
      const parts = item.split('-');
      if (parts.length !== 2) {
        throw ERROR_DATA.WRONG_MENU;
      }
      const [menu, quantityStr] = parts;
      const quantity = parseInt(quantityStr, 10);
      validateOrder.validateOrder(menu, menuObject, quantity);
      menuObject[menu] = quantity;
    });
    validateOrder.beverageOnly(menuObject);
    return menuObject;
  },
  
  menuValidate(input) {
    const order = this.parseMenu(input);
    ProgramStage.getMenuAgain = false;
    return order;
  },
};

const GetInputSaver = {
  setDate(input) {
    UserData.date = validate.dateValidate(input);
  },
  setMenu(input) {
    UserData.order =  validate.menuValidate(input);
  },
};

export { GetInputSaver, validate};
