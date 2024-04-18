import { FunctionComponent, useState } from "react";
import { calculateScore } from "../helpers/calculateWordScore";
import { FaSort, FaStar } from "react-icons/fa";
import { TiSortAlphabeticallyOutline } from "react-icons/ti";
import { MdCancel } from "react-icons/md";

import "./TaskOne.css";

type Word = {
  word: string;
  score: number;
  length: number;
};

const TaskOne: FunctionComponent = () => {
  const [words, setWords] = useState<Word[]>([]);

  // Function to add a new word to the list
  const addWordToList = (newWord: Word) => {
    setWords([...words, newWord]);
  };

  return (
    <div>
      <WordScorer addWordToList={addWordToList} />

      {words.length > 0 ? (
        <WordList words={words} setWords={setWords} />
      ) : (
        <div className="container">
          <h2 className="label-text">No words yet</h2>
          <p className="text">
            "Enter words into the list to score them and filter them based on
            their score, length, and alphabetical order."
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskOne;

interface WordScorerProps {
  addWordToList: (word: Word) => void;
}

const WordScorer: FunctionComponent<WordScorerProps> = ({ addWordToList }) => {
  const [word, setWord] = useState("");
  const [error, setError] = useState("");

  // Function to calculate the score of a word

  // Function to update the score when the word changes
  const updateScore = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const score = calculateScore(word);

    const wordObj: Word = {
      word,
      score,
      length: word.length,
    };

    if (score === 0) return;

    addWordToList(wordObj);
  };

  return (
    <div className="container">
      <form className="word-form" onSubmit={updateScore}>
        <label htmlFor="text" className="hidden">
          Search
        </label>
        <span className="error">{error}</span>
        <input
          style={{ border: error ? "1px solid red" : "1px solid #ccc" }}
          className="input text-input"
          id="text"
          type="text"
          value={word}
          onChange={(e) => {
            if (!/^[a-zA-Z\s]*$/.test(e.target.value)) {
              e.preventDefault();
              setError("Only letters A-Z are allowed");
              return;
            }
            setError("");
            setWord(e.target.value);
          }}
          placeholder="Enter a word"
        />

        <button className="btn btn-sm">Calculate Score</button>
      </form>
    </div>
  );
};

interface WordListProps {
  words: Word[];
  setWords: React.Dispatch<React.SetStateAction<Word[]>>;
}

type sortOptions = "length" | "alphabetical" | "score" | "";

const WordList: FunctionComponent<WordListProps> = ({ words, setWords }) => {
  const [sortBy, setSortBy] = useState<sortOptions>("score");

  function sortWords() {
    return words.sort((a, b) => {
      switch (sortBy) {
        case "alphabetical":
          return a.word.localeCompare(b.word);
        case "length":
          return b.length - a.length;
        case "score":
          return b.score - a.score;
        default:
          return b.score - a.score;
      }
    });
  }
  const sortedWords = sortWords();

  return (
    <div className="container">
      <div className="options-container glassmorphism">
        <div className="inner-options-container">
          <label htmlFor="sortSelector" aria-label="Filter selection">
            <FaSort />
          </label>
          <select
            value={sortBy}
            className="filter-select"
            id="sortSelector"
            onChange={(e) => setSortBy(e.target.value as sortOptions)}
          >
            <option value="score">Score</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="length">Length</option>
          </select>

          <button
            onClick={() => setWords([])}
            className="filter-button"
            aria-label="Clear all words"
          >
            <MdCancel />
          </button>
        </div>
      </div>
      <ul className="word-list">
        {sortedWords.map((word: Word, index: number) => (
          <Word key={index + word.word} word={word} />
        ))}
      </ul>
    </div>
  );
};

interface WordProps {
  word: Word;
}

const Word: FunctionComponent<WordProps> = ({ word }) => {
  return (
    <li className="word fade-in-up">
      <p className="word-value">{word.word}</p>

      <p className="word-value">
        {word.length}
        <TiSortAlphabeticallyOutline />
      </p>

      <p className="word-value">
        {word.score}
        <FaStar />
      </p>
    </li>
  );
};
