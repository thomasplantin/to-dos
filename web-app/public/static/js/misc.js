function isNullOrWhitespace(input) {
  return !input || !input.trim();
}

function spacesToColons(input) {
  return input.replace(/ /g, "-");
}

function firstNameOnly(input) {
  const arrayOfSplits = input.split(" ");
  return arrayOfSplits[0];
}