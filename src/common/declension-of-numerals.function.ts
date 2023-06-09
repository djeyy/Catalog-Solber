export const declensionOfNumeralsFunction = (value: number, words: Array<string>, remainder1 = Math.abs(value) % 100): string =>
  words[(value > 10 && value < 20)
    ? 2
    : (remainder1 % 10 > 1 && remainder1 % 10 < 5)
      ? 1
      : (remainder1 % 10 == 1)
        ? 0
        :2
    ]
