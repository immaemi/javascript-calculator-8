import { Console } from "@woowacourse/mission-utils";

class App {
  calculate(text) {
    if(text === null || text.trim() === "") {
      return 0;
    }
    
    // 양수로 구성된 문자열 처리
    const trimmedText = text.trim();
    if(!isNaN(trimmedText) && !isNaN(Number(trimmedText))) {
      const number = Number(trimmedText);
      // 양수인지 확인 (0보다 크고 정수인지)
      if(Number.isInteger(number) && number > 0) {
        return number;
      }
    }
    
    throw new Error("잘못된 입력입니다. 양의 정수만 입력해주세요.");
  }

  async run() {

    Console.readLine('덧셈할 문자열을 입력해 주세요.\n', (inputString) => {
      try {
        let result = this.calculate(inputString);
        Console.print(`결과: ${result}`);
      } catch (error) {
        Console.print(`[ERROR] ${error.message}`);
      }
    });

  }
}

export default App;
