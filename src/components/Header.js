import { useState, useContext } from 'react';
import { MealsListContext } from '../providers/mealsListProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Header.module.css';

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const { searchMeals } = useContext(MealsListContext);

  function handleChange(e) {
    setSearchTerm(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (searchTerm === '') return;

    searchMeals(searchTerm);

    setSearchTerm('');
  }

  return (
    <header className={styles.header}>
      <h1>What To Cook</h1>
      <div className={styles.searchBar}>
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Find recipes..."
            value={searchTerm}
            onChange={handleChange}
          />
          <button type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>
    </header>
  );
}
