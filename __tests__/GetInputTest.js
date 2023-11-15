const ERROR_DATA = require('../src/Model/Error.js');

const { validate } = require('../src/ModelView/GetInput.js'); 

describe('validate.dateValidate', () => {
  it('should return the numeric value for valid dates', () => {
    expect(validate.dateValidate('15')).toBe(15);
  });

  it('should throw WRONG_DATE error for dates less than 1', () => {
    expect(() => validate.dateValidate('0')).toThrow(ERROR_DATA.WRONG_DATE);
  });

  it('should throw WRONG_DATE error for dates greater than 31', () => {
    expect(() => validate.dateValidate('32')).toThrow(ERROR_DATA.WRONG_DATE);
  });

  it('should throw WRONG_DATE error for non-numeric inputs', () => {
    expect(() => validate.dateValidate('abc')).toThrow(ERROR_DATA.WRONG_DATE);
  });

  it('should throw WRONG_DATE error for empty or null inputs', () => {
    expect(() => validate.dateValidate('')).toThrow(ERROR_DATA.WRONG_DATE);
    expect(() => validate.dateValidate(null)).toThrow(ERROR_DATA.WRONG_DATE);
  });
});


describe('validate.parseMenu', () => {
  it('should return an object with menu items and quantities', () => {
    const input = "티본스테이크-2,바비큐립-1";
    const expected = { 티본스테이크: 2, 바비큐립: 1 };
    expect(validate.parseMenu(input)).toEqual(expected);
  });

  it('should throw WRONG_MENU error for duplicate menu items', () => {
    const input = "티본스테이크-2,티본스테이크-1";
    expect(() => validate.parseMenu(input)).toThrow(ERROR_DATA.WRONG_MENU);
  });

  it('should throw WRONG_MENU error for non-numeric quantity', () => {
    const input = "티본스테이크-abc,바비큐립-1";
    expect(() => validate.parseMenu(input)).toThrow(ERROR_DATA.WRONG_MENU);
  });

  it('should throw WRONG_MENU error if only beverages are ordered', () => {
    const input = "제로콜라-2,레드와인-1";
    expect(() => validate.parseMenu(input)).toThrow(ERROR_DATA.WRONG_MENU);
  });
});

describe('validate.menuValidate', () => {
  it('should return an object with menu items and quantities', () => {
    const input = "티본스테이크-2,바비큐립-1";
    const expected = { 티본스테이크: 2, 바비큐립: 1 };
    expect(validate.menuValidate(input)).toEqual(expected);
  });

});
