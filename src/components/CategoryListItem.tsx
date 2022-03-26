import React from "react"
import {Category} from "../types";

type Props = {
  category: Category
}

const CategoryListItem = ({category}: Props) => (
  <li>{category.name}</li>
)

export default CategoryListItem
