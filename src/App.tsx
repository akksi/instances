import React, {useEffect, useState, FocusEvent} from 'react'
import './App.css'
import CategoryListItem from "./components/CategoryListItem"
import InstanceListItem from './components/InstanceListItem'
import {Category, Instance} from "./types"
import {get} from "./services/api";

const App = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Category['id']>()
  const [searchQuery, setSearchQuery] = useState("")
  const [instances, setInstances] = useState<Instance[]>([])
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [loadingInstances, setLoadingInstances] = useState(false)

  const handleChangeSearchQuery = (event: FocusEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleBlurSearchQuery = () => {
    setLoadingCategories(true)
  }

  const handleSelectCategory = (id: Category['id']) => {
    setSelectedCategory(id)
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
            setSelectedCategory(undefined)
          } else if (!selectedCategory) {
            setSelectedCategory(categories[0].id)
          }
          setLoadingCategories(false)
        },
        () => {
          setCategories([])
          setLoadingCategories(false)
        }
      );
    }, [loadingCategories])

  useEffect(() => {
    setLoadingInstances(true)

    get(`${process.env.REACT_APP_API_BASE_URL}/Instance`)
      .then(
        instances => {
          setInstances(instances)
          setLoadingInstances(false)
        },
        () => {
          setInstances([])
          setLoadingInstances(false)
        }
      );
    }, [selectedCategory])

  return (
    <div className="App">
      <input type="search" value={searchQuery} onChange={handleChangeSearchQuery} onBlur={handleBlurSearchQuery} />
      <h2>Categories</h2>
      {(!loadingCategories && !categories.length) && <p>No categories found.</p>}
      {categories.map((category) => (
        <CategoryListItem
          key={category.id}
          category={category}
          onSelect={handleSelectCategory}
          selected={category.id === selectedCategory}
        />
      ))}

      {selectedCategory && (
        <>
          <h2>Instances</h2>
          {(!loadingInstances && !instances.length) && <p>No instances found.</p>}
          {instances.map((instance) => (
            <InstanceListItem
              key={instance.id}
              instance={instance}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default App;
