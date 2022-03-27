import React, {MouseEvent} from "react"
import {Category} from "../types"

type Props = {
  category: Category
  onSelect: (id: Category['id']) => void
  selected?: boolean
  onDelete: (id: Category['id']) => void
}

const CategoryListItem = ({category: {id, name, instances}, onSelect, selected, onDelete}: Props) => {
  const handleClickDelete = (e: MouseEvent) => {
    e.stopPropagation()
    const confirmed = instances.length
      ? window.confirm("This category is not empty. Are you sure you want to proceed?")
      : true

    if (!confirmed) {
      return
    }

    onDelete(id)
  }

  return (
    <li
      className={selected ? "selected" : ""}
      onClick={() => onSelect(id)}
    >
      {name} ({instances.length})
      <button onClick={handleClickDelete}>Delete</button>
    </li>
  );
}

export default CategoryListItem
