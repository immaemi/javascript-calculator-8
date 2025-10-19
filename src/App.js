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
        
        // 공백 포함 구분자 검증
        if(/\s/.test(customDelimiterChars)) {
          throw new Error("[ERROR] 구분자에는 공백을 포함할 수 없습니다.");
        }
        
        // 숫자 구분자 제한 검증
        if(/[0-9]/.test(customDelimiterChars)) {
          throw new Error("[ERROR] 숫자는 구분자로 사용할 수 없습니다.");
        }
        
        // 커스텀 구분자 추가 (문자열 전체를 하나의 구분자로 사용)
        delimiters.push(customDelimiterChars);
        
        numbersString = numbersPart.trim();
      }
    }

    return { delimiters, numbersString };
  }

  /**
   * 숫자 유효성을 검증합니다.
   * @param {number} number - 검증할 숫자
   * @throws {Error} 유효하지 않은 숫자 시 에러 발생
   */
  _validateNumber(number) {
    // 숫자 외 문자열 입력 검증
    if(isNaN(number)) {
      throw new Error("[ERROR] 기본 구분자(, 또는 :) 또는 커스텀 구분자가 아닌 문자는 입력할 수 없습니다.");
    }
    
    // 0 입력 검증
    if(number === 0) {
      throw new Error("[ERROR] 0은 입력할 수 없습니다.");
    }
    
    // 음수 입력 검증
    if(number < 0) {
      throw new Error("[ERROR] 음수는 입력할 수 없습니다.");
    }
    
    // 소수 입력 검증
    if(!Number.isInteger(number)) {
      throw new Error("[ERROR] 소수는 입력할 수 없습니다.");
    }
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

      // 숫자 유효성 검증
      this._validateNumber(number);
      
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