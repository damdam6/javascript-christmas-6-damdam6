const UserData = {
  date: 1,
  order: { },
  totalPrice: 0,
  menuType:{
    totalDesserCnt: 0,
    totalMainCnt: 0,
  },
  dDayPromotion: 900,
  initailize() {
    this.date = 1;
    this.order = [];
    this.totalPrice = 0;
    this.dDayPromotion = 900;
  },
};

const ProgramStage = {
  gameEnd: false,
  getDateAgain: true,
  getMenuAgain: true,
  initailize() {
    this.gameEnd = false;
    this.getDateAgain = true;
    this.getMenuAgain = true;
  },
};

const FIXED_DATA = {
  MENU_LIST: {
    APPETIZERS: {
      양송이수프: 6000,
      타파스: 5500,
      시저샐러드: 8000,
    },
    MAIN_COURSES: {
      티본스테이크: 55000,
      바비큐립: 54000,
      해산물파스타: 35000,
      크리스마스파스타: 25000,
    },
    DESSERTS: {
      초코케이크: 15000,
      아이스크림: 5000,
    },
    BEVERAGES: {
      제로콜라: 3000,
      레드와인: 60000,
      샴페인: 25000,
    },
  },

  SPECIAL_PROMOTION_DATE: {
    STAR_DAY: [3, 10, 17, 24, 31, 25],
    WEEKEND_DAY: [1, 2, 8, 9, 15, 16, 22, 23, 29, 30],
    CHRISTMAS: 25,
  },

  BADGE_PROMOTION_MIN_PRICE: {
    STAR_BADGE: 5000,
    TREE_BADGE: 10000,
    SANTA_BADGE: 20000,
  },

  PROMOTION_RULE: {
    MIN_PRICE: 10000,
    MIN_ORDER_CNT: 1,
    MAX_ORDER_CNT: 20,
    DATE_START: 1,
    DATE_END: 31,
    CHAMPAGNE_MIN_PRICE: 120000,
    DDAY_PROMO_AMOUNT: 100,
  },
};

export { UserData, FIXED_DATA, ProgramStage };
