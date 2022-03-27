import React, {useEffect, useState, DragEvent} from "react"
import InstanceListItem from "./InstanceListItem";
import {Category, Instance} from "../types";
import {get} from "../services/api";

const moveInstance = (from: number, to: number, prevInstances: Instance[]) => {
  const sortedInstances = [...prevInstances]
  sortedInstances.splice(from, 1)
  sortedInstances.splice(to, 0, prevInstances[from])

  return sortedInstances
}

type Props = {
  categoryId: Category['id']
}

const InstanceList = ({categoryId}: Props) => {
  const [instances, setInstances] = useState<Instance[]>([])
  const [loading, setLoading] = useState(false)
  const [dragging, setDragging] = useState<number>()

  useEffect(() => {
    setLoading(true)

    get(`${process.env.REACT_APP_API_BASE_URL}/Instance`)
      .then(
        instances => {
          setInstances(instances)
          setLoading(false)
        },
        () => {
          setInstances([])
          setLoading(false)
        }
      );
  }, [categoryId])

  const handleDragStartInstance = (index: number) => {
    setDragging(index)
  }

  const handleDropInstance = () => {
    setDragging(undefined)
  }

  const handleDragOverInstance = (e: DragEvent<HTMLLIElement>, index: number) => {
    e.preventDefault()

    if (dragging === undefined || index === dragging) {
      return
    }

    setInstances(prevInstances => moveInstance(dragging, index, prevInstances))
    setDragging(index)
  }

  return (
    <>
      <h2>Instances</h2>
      {(!loading && !instances.length) && <p>No instances found.</p>}
      <ul>
        {instances.map((instance, index) => (
          <InstanceListItem
            key={instance.id}
            instance={instance}
            onDragStart={() => handleDragStartInstance(index)}
            onDragOver={(e: DragEvent<HTMLLIElement>) => handleDragOverInstance(e, index)}
            onDrop={handleDropInstance}
            dragging={index === dragging}
          />
        ))}
      </ul>
    </>
  );
}

export default InstanceList
