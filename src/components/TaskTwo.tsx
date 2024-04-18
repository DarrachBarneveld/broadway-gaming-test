import { FunctionComponent, useState } from "react";
import UserCard, { User } from "./UserCard";
import { FaFemale, FaFilter, FaMale, FaSearch, FaSort } from "react-icons/fa";
import { BiMaleFemale } from "react-icons/bi";
import { calculateScore } from "../helpers/calculateWordScore";

interface TestComponent2Props {}

type filterOptions = {
  gender: "male" | "female" | null;
  search: string;
};

const initialFilterState: filterOptions = {
  gender: null,
  search: "",
};

type sortOptions = "name" | "age" | "score" | "";

const TaskTwo: FunctionComponent<TestComponent2Props> = () => {
  const [sort, setSort] = useState<sortOptions>("");
  const [randomUsers, setRandomUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState<filterOptions>(initialFilterState);
  const [loadingUser, setLoadingUser] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchRandomUser() {
    setError(null);

    try {
      setLoadingUser(true);
      const response = await fetch("https://randomuser.me/api");
      const data = await response.json();

      const user = data.results[0];

      const userName = user.name.first + user.name.last;
      user.score = calculateScore(userName);

      setRandomUsers((prev) => [...prev, user]);
      setLoadingUser(false);
    } catch (error) {
      setError("Error fetching user");
      setLoadingUser(false);
    }
  }

  function filterUsers() {
    const filterByGender = randomUsers.filter(
      (user) => filter?.gender === null || user.gender === filter?.gender
    );
    const filterByName = filterByGender.filter(
      (user) =>
        !filter?.search ||
        user.name.first.toLowerCase().includes(filter?.search.toLowerCase()) ||
        user.name.last.toLowerCase().includes(filter?.search.toLowerCase())
    );

    return filterByName;
  }

  function sortUsers() {
    const users = filterUsers();
    return users.sort((a, b) => {
      switch (sort) {
        case "name":
          return a.name.first.localeCompare(b.name.first);
        case "score":
          return b.score - a.score;
        case "age":
          return a.dob.age - b.dob.age;
        default:
          return 0;
      }
    });
  }
  const sortedAndFilteredUsers = sortUsers();
  return (
    <div className="container">
      <header className="options-container glassmorphism">
        <div className="inner-options-container">
          <label htmlFor="filterSelector" aria-label="Filter selection">
            <FaSort />
          </label>
          <select
            id="filterSelector"
            value={sort}
            onChange={(e) => setSort(e.target.value as sortOptions)}
            className="filter-select"
          >
            <option value="">No Sort</option>
            <option value="name">Name</option>
            <option value="age">Age</option>
            <option value="score">Score</option>
          </select>
        </div>
        <div className="inner-options-container">
          <FaFilter />
          <button
            className={`filter-button female ${
              filter?.gender === "female" ? "active" : ""
            }`}
            aria-label="Filter by Female"
            onClick={() =>
              setFilter((prevState) => ({ ...prevState, gender: "female" }))
            }
          >
            <FaFemale />
          </button>
          <button
            className={`filter-button ${
              filter?.gender === null ? "active" : ""
            }`}
            aria-label="Filter by all"
            onClick={() =>
              setFilter((prevState) => ({ ...prevState, gender: null }))
            }
          >
            <BiMaleFemale />
          </button>
          <button
            className={`filter-button male ${
              filter?.gender === "male" ? "active" : ""
            }`}
            aria-label="Filter by Male"
            onClick={() =>
              setFilter((prevState) => ({ ...prevState, gender: "male" }))
            }
          >
            <FaMale />
          </button>
        </div>

        <div className="inner-options-container">
          <label htmlFor="search" aria-label="Search input">
            <FaSearch />
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search..."
            className="input"
            value={filter.search}
            onChange={(e) =>
              setFilter((prevState) => ({
                ...prevState,
                search: e.target.value,
              }))
            }
          />
        </div>
      </header>

      <button className="btn" disabled={loadingUser} onClick={fetchRandomUser}>
        {loadingUser ? "Loading..." : "Fetch Random User"}
      </button>

      {error && <p>{error}</p>}

      {sortedAndFilteredUsers.length > 0 && (
        <div className="user-cards-container">
          {sortedAndFilteredUsers.map((user, index) => (
            <UserCard user={user} key={user.id.value} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskTwo;
