// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system.

const input = require("readline-sync");

const oldPointStructure = {
  1: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
  2: ["D", "G"],
  3: ["B", "C", "M", "P"],
  4: ["F", "H", "V", "W", "Y"],
  5: ["K"],
  8: ["J", "X"],
  10: ["Q", "Z"],
};

function oldScrabbleScorer(word) {
  word = word.toUpperCase();
  let letterPoints = "";

  for (let i = 0; i < word.length; i++) {
    for (const pointValue in oldPointStructure) {
      if (oldPointStructure[pointValue].includes(word[i])) {
        letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
      }
    }
  }
  return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

let word;

function initialPrompt() {
  console.log("Let's play some scrabble!\n");

  //let word = input.question("Enter a word to score: ");
  word = input.question("Enter a word to score: ");

  //oldScrabbleScorer(word);
}

let newPointStructure = transform(oldPointStructure);

let simpleScorer = function (word) {
  let simpleCapitalWord = word.toUpperCase();
  let score = 0;
  let letter;

  for (letter of simpleCapitalWord) {
    if (/[A-Z]/.test(letter)) {
      score += 1;
    }
  }

  return score;
};
//console.log(simpleScorer("apple"));

let vowelBonusScorer = function (word) {
  let bonusCapitalWord = word.toUpperCase();
  let consonantCount = 0;
  let arrvowel = ["A", "E", "I", "O", "U"];
  let vowelCount = 0;
  let letter;
  let score = 0;

  for (letter of bonusCapitalWord) {
    if (/[A-Z]/.test(letter)) {
      if (arrvowel.includes(letter)) {
        vowelCount += 3;
      } else {
        consonantCount += 1;
      }
    }
  }
  score = vowelCount + consonantCount;

  return score;
};
//console.log(vowelBonusScorer("apple"));

let scrabbleScorer = function (word) {
  word = word.toLowerCase();
  let letterPoints = "";
  let score = 0;

  for (let i = 0; i < word.length; i++) {
    letterPoints += `Scarbble Points for '${word[i]}': ${
      newPointStructure[word[i]]
    }\n`;
    if (/[a-z]/.test(word[i])) {
      score += newPointStructure[word[i]];
    }
  }
  return score;
};

let simpleScoreObj = {
  name: "Simple Score",
  description: "Each letter is worth 1 point.",
  scorerFunction: simpleScorer,
};

let vowelScoreObj = {
  name: "Bonus Vowels",
  description: "Vowels are 3 pts, consonants are 1 pt.",
  scorerFunction: vowelBonusScorer,
};

let oldScorerObj = {
  name: "Scrabble",
  description: "The traditional scoring algorithm.",
  scorerFunction: scrabbleScorer,
};

const scoringAlgorithms = [simpleScoreObj, vowelScoreObj, oldScorerObj];

function scorerPrompt() {
  console.log("Which scoring algorithm would you like to use? \n");
  for (let index = 0; index < scoringAlgorithms.length; index++) {
    console.log(
      `${index} - ${scoringAlgorithms[index].name}: ${scoringAlgorithms[index].description}`
    );
  }
  let algorithmOptionSelected = input.question("Enter 0, 1, or 2: ");
  console.log(
    `Score for '${word}': ${scoringAlgorithms[
      algorithmOptionSelected
    ].scorerFunction(word)}`
  );
  return scoringAlgorithms[algorithmOptionSelected];
}

function transform(oldPointStructure) {
  let newPointStructure = new Object();
  for (const item in oldPointStructure) {
    for (let index = 0; index < oldPointStructure[item].length; index++) {
      newPointStructure[oldPointStructure[item][index].toLowerCase()] =
        Number(item);
    }
  }
  //console.log(newPointStructure);
  return newPointStructure;
}

function runProgram() {
  initialPrompt();
  scorerPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScorer: simpleScorer,
  vowelBonusScorer: vowelBonusScorer,
  scrabbleScorer: scrabbleScorer,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt,
};
