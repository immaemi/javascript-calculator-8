import { Console } from "@woowacourse/mission-utils";

class App {
  _extractCustomDelimiter(text) {
    let delimiters = [",", ":"];
    let numbersString = text.trim();

    // 커스텀 구분자 패턴 확인: "//구분자\n숫자들" (문자열에 \n 포함)
    if(text.startsWith("//") && (text.includes("\\n"))) {
      const parts = text.split(/\\n|\n/);
      if(parts.length >= 2) {
        const customDelimiterPart = parts[0]; // "// ;"
        const numbersPart = parts[1]; // " 1 ;2; 3"
        
        // 커스텀 구분자 추출 (// 다음의 문자들, 공백 제거)
        const customDelimiterChars = customDelimiterPart.slice(2).trim();
        
        // 단일 문자 커스텀 구분자만 처리
        if(customDelimiterChars.length === 1) {
          delimiters.push(customDelimiterChars);
        }
        
        numbersString = numbersPart.trim();
      }
    }

    return { delimiters, numbersString };
  }

  calculate(text) {
    // 빈 문자열 예외 처리
    if(text === null || text.trim() === "") {
      return 0;
    }
    const { delimiters, numbersString } = this._extractCustomDelimiter(text);

    // 정규식 특수문자 이스케이프 처리
    const escapedDelimiters = delimiters.map(d => d.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('');
    const numbers = numbersString.split(new RegExp(`[${escapedDelimiters}]`));
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
    try {
      const input = await Console.readLineAsync("덧셈할 문자열을 입력해 주세요.\n");
      const result = this.calculate(input);
      Console.print(`결과 : ${result}`);
    } catch (error) {
      Console.print(`[ERROR] ${error.message}`);
    }
  }
}
export default App;