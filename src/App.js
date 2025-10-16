import { Console } from "@woowacourse/mission-utils";

class App {
  /**
   * 커스텀 구분자를 추출하고 숫자 문자열을 분리합니다.
   * @param {string} text - 입력 문자열
   * @returns {Object} {delimiters: string[], numbersString: string}
   */
  _extractCustomDelimiter(text) {
    let delimiters = [",", ":"];
    let numbersString = text.trim();

    // 커스텀 구분자 패턴 확인: "//구분자\n숫자들" (//와 \n은 붙어있어야 함)
    if(/^\/\/.*\\n/.test(text.trim()) && text.includes("\\n")) {
      const parts = text.split(/\\n|\n/);
      if(parts.length >= 2) {
        const customDelimiterPart = parts[0];
        const numbersPart = parts[1];
        
        // 커스텀 구분자 추출 (// 다음의 문자들, 공백 제거)
        const customDelimiterChars = customDelimiterPart.replace(/^\/\//, '').trim();
        
        // 단일 문자 커스텀 구분자
        if(customDelimiterChars.length === 1) {
          delimiters.push(customDelimiterChars);
        }
        // 복수 문자 커스텀 구분자
        else if (customDelimiterChars.length > 1) {
          delimiters.push(...customDelimiterChars.split(''));
        }
        
        numbersString = numbersPart.trim();
      }
    }

    return { delimiters, numbersString };
  }

  /**
   * 문자열을 계산하여 숫자들의 합을 반환합니다.
   * @param {string} text - 계산할 문자열
   * @returns {number} 숫자들의 합
   * @throws {Error} 잘못된 입력 시 에러 발생
   */
  calculate(text) {
    // 빈 문자열 또는 null 입력 처리
    if(text === null || text.trim() === "") {
      return 0;
    }

    const { delimiters, numbersString } = this._extractCustomDelimiter(text);

    // 구분자로 숫자 분리 (정규식 특수문자 이스케이프 처리)
    const escapedDelimiters = delimiters.map(d => d.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('');
    const numbers = numbersString.split(new RegExp(`[${escapedDelimiters}]`));
    let sum = 0;
    
    for(let numStr of numbers) {
      const trimmedNum = numStr.trim();
      
      // 빈 문자열은 합계에서 제외
      if(trimmedNum === '') {
        continue; 
      }

      // 숫자 내부 공백 제거
      const numberStr = trimmedNum.replace(/\s+/g, '');
      const number = Number(numberStr);

      // 음수 입력 검증
      if(number < 0) {
        throw new Error("[ERROR] 음수는 입력할 수 없습니다.");
      }
      
      // 양의 정수 검증
      if(isNaN(number) || !Number.isInteger(number) || number <= 0) {
        throw new Error("[ERROR] 잘못된 입력입니다. 양의 정수와 구분자(, 또는 : 또는 커스텀 구분자)로 구성된 문자열을 입력해주세요.");
      } 
      
      sum += number;
    }
    
    return sum;
  }

  async run() {
    const input = await Console.readLineAsync("덧셈할 문자열을 입력해 주세요.\n");
    const result = this.calculate(input);
    Console.print(`결과 : ${result}`);
  }
}
export default App;