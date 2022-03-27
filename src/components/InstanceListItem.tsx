import React, {DragEventHandler} from "react"
import {Instance} from "../types"

type Props = {
  instance: Instance
  onDragStart: DragEventHandler
  onDragOver: DragEventHandler
  onDrop: DragEventHandler
  dragging: boolean
}

const InstanceListItem = ({instance: {name}, onDragStart, onDragOver, onDrop,  dragging}: Props) => (
  <li className={dragging ? "dragging" : ""} draggable onDragStart={onDragStart} onDragOver={onDragOver} onDrop={onDrop}>{name}</li>
)

export default InstanceListItem
