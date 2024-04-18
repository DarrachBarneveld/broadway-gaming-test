import deburr from "lodash.deburr";

export const calculateScore = (word: string) => {
  // Function to convert a character to its Unicode value (a=1, b=2, etc.)

  const charToUnicodeValue = (char: string) => {
    // lodash.deburr removes accents and diacritics from characters
    // This is preferable to using normalize(NFD) as it accounts for extra characters
    const latinChar = deburr(char);

    // Use regex to test if the character is a letter in latin alphabet
    // If not, return a 0 score
    if (!/^[a-z]$/i.test(latinChar)) {
      return 0;
    }

    return latinChar.charCodeAt(0) - 96;
  };

  // Sanitize the word by removing whitespace
  const cleanedWord = word.replace(/\s/g, "");

  // Calculate the score of a word by summing the Unicode values of the characters
  return cleanedWord
    .toLowerCase()
    .split("")
    .reduce((acc, char) => {
      return acc + charToUnicodeValue(char);
    }, 0);
};
