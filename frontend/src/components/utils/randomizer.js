const names = ["Paul", "Fisher", "Jake", "Lorry", "Ben", "King", "James", "Blake", "Augustin", "Joe"]
export function getRandomName() {
  let currentIndex = names.length;
  let temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    temporaryValue = names[currentIndex];
    names[currentIndex] = names[randomIndex];
    names[randomIndex] = temporaryValue;
  }

  // Return the first element of the shuffled array as a random name.
  return names[0];
}
