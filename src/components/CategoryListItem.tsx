import React, {MouseEvent} from "react"
import {Category} from "../types"

type Props = {
  category: Category
  onSelect: (id: Category['id']) => void
  selected?: boolean
  onDelete: (id: Category['id']) => void
}

const CategoryListItem = ({category: {id, name}, onSelect, selected, onDelete}: Props) => {
  const handleClickDelete = (e: MouseEvent) => {
    e.stopPropagation()
    onDelete(id)
  }

  return (
    <li
      className={selected ? "selected" : ""}
      onClick={() => onSelect(id)}
    >
      {name}
      <button onClick={handleClickDelete}>Delete</button>
    </li>
  );
}

export default CategoryListItem
