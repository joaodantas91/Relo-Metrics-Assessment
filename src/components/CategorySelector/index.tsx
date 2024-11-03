import { useState } from "react";
import { useImageAnnotationStore } from "../../store/useImageAnnotationStore";

export function CategorySelector () {
  const { categories, annotation, setCategory } = useImageAnnotationStore();
  const [searchValue, setSearchValue] = useState("");

  const filteredCategories = categories.filter(({ name }) => {
    return name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0;
  });
  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search options..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <ul className="options-list">
        {filteredCategories.map(({ id, name }) => (
          <li key={id} className={`${id === annotation.annotations[0]?.categoryId ? "highlight" : ""}`}>
            <button onClick={() => setCategory(id)} type="button">
              {name}
            </button>
          </li>
        ))}


      </ul>
    </>
  )
}