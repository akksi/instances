import React from "react"
import {Category} from "../types"

type Props = {
  category: Category
  onSelect: (id: Category['id']) => void
  selected?: boolean
}

const CategoryListItem = ({category: {id, name}, onSelect, selected}: Props) => (
  <li className={selected ? "selected" : ""} onClick={() => onSelect(id)}>{name}</li>
)

export default CategoryListItem
