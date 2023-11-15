import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";
import { EOL as LINE_SEPARATOR } from "os";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();

  return logSpy;
};

const getOutput = (logSpy) => {
  return [...logSpy.mock.calls].join(LINE_SEPARATOR);
};

const expectLogContains = (received, expectedLogs) => {
  expectedLogs.forEach((log) => {
    expect(received).toContain(log);
  });
};

describe("기능 테스트", () => {
  test("이벤트 중 주말/평일혜택이 없는 경우", async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(["3", "티본스테이크-1"]);

    // when
    const app = new App();
    await app.run();

    // then
    const expected = [
      "크리스마스 디데이 할인: -1,200원",
      "특별 할인: -1,000원",
    ];

    expectLogContains(getOutput(logSpy), expected);
  });

  test("증정이벤트 혜택을 못 받을 경우", async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(["3", "타파스-1,제로콜라-1,초코케이크-1"]);

    // when
    const app = new App();
    await app.run();

    // then
    const expected = ["<증정 메뉴>" + LINE_SEPARATOR + "없음"];

    expectLogContains(getOutput(logSpy), expected);
  });
});

describe("예외 테스트", () => {
  test("날짜 예외 테스트2", async () => {
    // given
    const INVALID_DATE_MESSAGE = "[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.";
    const INPUTS_TO_END = ["6", "해산물파스타-2"];
    const logSpy = getLogSpy();
    mockQuestions(["67", ...INPUTS_TO_END]);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(INVALID_DATE_MESSAGE));
  });

  test("주문 예외 테스트2", async () => {
    // given
    const INVALID_ORDER_MESSAGE = "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.";
    const INPUTS_TO_END = ["해산물파스타-2"];
    const logSpy = getLogSpy();
    mockQuestions(["3", "티본스테이크-30", ...INPUTS_TO_END]);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(INVALID_ORDER_MESSAGE));
  });
});