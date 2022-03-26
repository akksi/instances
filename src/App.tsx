import React, {useEffect, useState} from 'react';
import './App.css';
import CategoryListItem from "./components/CategoryListItem";
import {Category} from "./types";

const App = () => {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/Category`)
      .then(response => response.json())
      .then(categories => setCategories(categories));
  }, [])

  return (
    <div className="App">
      <h2>Categories</h2>
      {categories.map((category) => <CategoryListItem key={category.id} category={category} />)}
    </div>
  );
}

export default App;
