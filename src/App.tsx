import React, {useEffect, useState, FocusEvent} from 'react';
import './App.css';
import CategoryListItem from "./components/CategoryListItem";
import {Category} from "./types";

const App = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  const handleChangeSearchQuery = (event: FocusEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleBlurSearchQuery = () => {
    setLoading(true)
  }

  useEffect(() => {
    if (!loading) {
      return
    }

    fetch(`${process.env.REACT_APP_API_BASE_URL}/Category${searchQuery ?`q=${searchQuery}` : ""}`)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        }

        return []
      })
      .then(
        categories => setCategories(categories),
        () => setCategories([])
      );

    setLoading(false)
  }, [loading])

  return (
    <div className="App">
      <input type="search" value={searchQuery} onChange={handleChangeSearchQuery} onBlur={handleBlurSearchQuery} />
      <h2>Categories</h2>
      {!loading && !categories.length && <p>No categories found.</p>}
      {categories.map((category) => <CategoryListItem key={category.id} category={category} />)}
    </div>
  );
}

export default App;
