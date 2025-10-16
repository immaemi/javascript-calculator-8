import { Console } from "@woowacourse/mission-utils";

class App {
  calculate(text) {
    // 빈 문자열 예외 처리
    if(text === null || text.trim() === "") {
      return 0;
    }
    
    const trimmedText = text.trim();
    
    // 기본 구분자(, 또는 :)로 분리된 숫자 덧셈
    const numbers = trimmedText.split(/[,:]/);
    let sum = 0;
    
    for(let numStr of numbers) {
      const trimmedNum = numStr.trim();
      // 빈 문자열 예외 처리
      if(trimmedNum === '') {
        continue; 
      }

      // 숫자 사이의 공백 제거
      const numberStr = trimmedNum.replace(/\s+/g, '');
      const number = Number(numberStr);

      // 양수 및 구분자 제외 숫자 예외 처리
      if(isNaN(number) || !Number.isInteger(number) || number <= 0) {
        throw new Error("잘못된 입력입니다. 양의 정수와 구분자(, 또는 :)로 구성된 문자열을 입력해주세요.");
      } 
      // 숫자 합계 계산
      sum += number;
    }
    
    return sum;
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