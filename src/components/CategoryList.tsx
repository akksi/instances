import React, {FocusEvent, useEffect, useState} from "react"
import CategoryListItem from "./CategoryListItem";
import {Category} from "../types";
import {del, get} from "../services/api";

type Props = {
  onSelect: (id?: Category['id']) => void
  selected?: Category['id']
}

const CategoryList = ({onSelect, selected}: Props) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loadingCategories, setLoadingCategories] = useState(true)

  const handleChangeSearchQuery = (event: FocusEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleBlurSearchQuery = () => {
    setLoadingCategories(true)
  }

  const handleSelectCategory = (id: Category['id']) => {
    onSelect(id)
  }

  const handleDeleteCategory = (id: Category['id']) => {
    del(`${process.env.REACT_APP_API_BASE_URL}/Category/${id}`)
      .then(() => {
        setCategories(prevCategories => prevCategories.filter(({id: categoryId}) => categoryId !== id))
      })

    if (selected === id) {
      onSelect(undefined)
    }
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
            onSelect(undefined)
          } else if (!selected) {
            onSelect(categories[0].id)
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
    <>
      <input type="search" value={searchQuery} onChange={handleChangeSearchQuery} onBlur={handleBlurSearchQuery}/>
      <h2>Categories</h2>
      {(!loadingCategories && !categories.length) && <p>No categories found.</p>}
      <ul>
        {categories.map((category) => (
          <CategoryListItem
            key={category.id}
            category={category}
            onSelect={handleSelectCategory}
            selected={category.id === selected}
            onDelete={handleDeleteCategory}
          />
        ))}
      </ul>
    </>
  );
}

export default CategoryList
