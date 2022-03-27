import React, {useState} from 'react'
import './App.css'
import {Category} from "./types"
import InstanceList from "./components/InstanceList";
import CategoryList from "./components/CategoryList";

const App = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<Category['id']>()

  return (
    <>
      <CategoryList
        onSelect={setSelectedCategoryId}
        selected={selectedCategoryId}
        categories={categories}
        setCategories={setCategories}
      />
      {selectedCategoryId && <InstanceList categoryId={selectedCategoryId} onUpdate={setCategories} />}
    </>
  );
}

export default App;
