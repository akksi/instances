import React, {useEffect, useState, FocusEvent} from 'react'
import './App.css'
import CategoryListItem from "./components/CategoryListItem"
import {Category} from "./types"
import {get} from "./services/api";
import InstanceList from "./components/InstanceList";

const App = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<Category['id']>()
  const [searchQuery, setSearchQuery] = useState("")
  const [loadingCategories, setLoadingCategories] = useState(true)

  const handleChangeSearchQuery = (event: FocusEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleBlurSearchQuery = () => {
    setLoadingCategories(true)
  }

  const handleSelectCategory = (id: Category['id']) => {
    setSelectedCategoryId(id)
  }

  useEffect(() => {
    if (!loadingCategories) {
      return
    }

    get(`${process.env.REACT_APP_API_BASE_URL}/Category${searchQuery ?`q=${searchQuery}` : ""}`)
      .then(
        categories => {
          setCategories(categories)
          if (!categories.length) {
            setSelectedCategoryId(undefined)
          } else if (!selectedCategoryId) {
            setSelectedCategoryId(categories[0].id)
          }
          setLoadingCategories(false)
        },
        () => {
          setCategories([])
          setLoadingCategories(false)
        }
      );
    }, [loadingCategories])
  
  return (
    <div className="App">
      <input type="search" value={searchQuery} onChange={handleChangeSearchQuery} onBlur={handleBlurSearchQuery} />
      <h2>Categories</h2>
      {(!loadingCategories && !categories.length) && <p>No categories found.</p>}
      <ul>
        {categories.map((category) => (
          <CategoryListItem
            key={category.id}
            category={category}
            onSelect={handleSelectCategory}
            selected={category.id === selectedCategoryId}
          />
        ))}
      </ul>

      {selectedCategoryId && (
        <InstanceList categoryId={selectedCategoryId} />
      )}
    </div>
  );
}

export default App;
