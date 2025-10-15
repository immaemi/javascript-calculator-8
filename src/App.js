import { Console } from "@woowacourse/mission-utils";

class App {
  calculate(text) {
    if(text === null || text.trim() === "") {
      return 0;
    }
    return text;
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
