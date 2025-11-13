function applyCaseToReplacement(replacement, matched) {
  const isAllUpperCase = matched === matched.toUpperCase();
  const isAllLowerCase = matched === matched.toLowerCase();
  const isTitleCase = /^[A-Z][a-z]+$/.test(matched);

  if (isAllUpperCase) {
    return replacement.toUpperCase();
  }
  if (isAllLowerCase) {
    return replacement.toLowerCase();
  }
  if (isTitleCase) {
    return replacement.charAt(0).toUpperCase() + replacement.slice(1).toLowerCase();
  }

  // Fallback: map character-by-character when lengths match
  if (matched.length === replacement.length) {
    let result = '';
    for (let i = 0; i < replacement.length; i++) {
      const targetChar = replacement.charAt(i);
      const sourceChar = matched.charAt(i);
      result += (sourceChar === sourceChar.toUpperCase())
        ? targetChar.toUpperCase()
        : targetChar.toLowerCase();
    }
    return result;
  }

  // Default fallback
  return replacement;
}

function replaceWordPreservingCase(text, fromWord, toWord) {
  if (!text || !fromWord || !toWord) return text;
  const regex = new RegExp(fromWord, 'gi');
  return text.replace(regex, (matched) => applyCaseToReplacement(toWord, matched));
}

module.exports = {
  replaceWordPreservingCase
};


