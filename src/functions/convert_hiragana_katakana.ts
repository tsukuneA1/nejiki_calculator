export function toggleKana(str: string): string {
  return str.replace(/[\u3041-\u3096\u30A1-\u30F6]/g, (char) => {
    const code = char.charCodeAt(0);
    if (code >= 0x3041 && code <= 0x3096) {
      // ひらがな → カタカナ
      return String.fromCharCode(code + 0x60);
    } else if (code >= 0x30a1 && code <= 0x30f6) {
      // カタカナ → ひらがな
      return String.fromCharCode(code - 0x60);
    }
    return char;
  });
}
