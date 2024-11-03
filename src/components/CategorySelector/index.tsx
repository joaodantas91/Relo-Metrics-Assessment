import { useState } from "react";
import { useImageAnnotationStore } from "../../store/useImageAnnotationStore";
import FuzzySearch from 'fuzzy-search';

export function CategorySelector () {
  const { categories, annotation, setCategory } = useImageAnnotationStore();
  const [filteredCategories, setFilteredCategories] = useState<typeof categories>([])
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (text: string) => {
    const searcher = new FuzzySearch(categories, ['id', 'name'])
    setSearchValue(text);
    setFilteredCategories(searcher.search(text));
  };

  const Category = ({ id, name }: typeof categories[number]) => (
    <li className={`${id === annotation.annotations[0]?.categoryId ? "highlight" : ""}`}>
      <button onClick={() => setCategory(id)} type="button">
        {name}
      </button>
    </li>
  )

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search options..."
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      {(filteredCategories.length === 0 && searchValue.length > 0) && (
        <h5>no category was found! :(</h5>
      )}



      <ul className="options-list">
        {searchValue.length === 0 &&
          categories.map(({ id, name }) => (
            <Category name={name} id={id} key={id} />
          ))
        }

        {filteredCategories.map(({ id, name }) => (
          <Category name={name} id={id} key={id} />
        ))}
      </ul>
    </>
  )
}