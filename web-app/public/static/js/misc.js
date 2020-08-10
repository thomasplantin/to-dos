function isNullOrWhitespace(input) {
  return !input || !input.trim();
}

function spacesToColons(input) {
  return input.replace(/ /g, "-");
}