import React, {useState} from 'react'
import './App.css'
import {Category} from "./types"
import InstanceList from "./components/InstanceList";
import CategoryList from "./components/CategoryList";

const App = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<Category['id']>()

  return (
    <>
      <CategoryList onSelect={setSelectedCategoryId} selected={selectedCategoryId} />
      {selectedCategoryId && <InstanceList categoryId={selectedCategoryId} />}
    </>
  );
}

export default App;
