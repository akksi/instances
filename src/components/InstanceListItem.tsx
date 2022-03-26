import React from "react"
import {Instance} from "../types"

type Props = {
  instance: Instance
}

const InstanceListItem = ({instance: {name}}: Props) => (
  <li>{name}</li>
)

export default InstanceListItem
