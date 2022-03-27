import React, {useEffect, useState, DragEvent, Dispatch} from "react"
import InstanceListItem from "./InstanceListItem";
import {Category, Instance} from "../types";
import {get, put} from "../services/api";
import AddInstance from "./AddInstance";

const moveInstance = (from: number, to: number, prevInstances: Instance[]) => {
  const sortedInstances = [...prevInstances]
  sortedInstances.splice(from, 1)
  sortedInstances.splice(to, 0, prevInstances[from])

  return sortedInstances
}

type Props = {
  categoryId: Category['id']
  onUpdate: Dispatch<React.SetStateAction<Category[]>>
}

const InstanceList = ({categoryId, onUpdate}: Props) => {
  const [instances, setInstances] = useState<Instance[]>([])
  const [loading, setLoading] = useState(false)
  const [dragging, setDragging] = useState<number>()

  useEffect(() => {
    setLoading(true)

    get(`${process.env.REACT_APP_API_BASE_URL}/Category/${categoryId}`)
      .then(
        ({instances}) => {
          setInstances(instances)
          setLoading(false)
        },
        () => {
          setInstances([])
          setLoading(false)
        }
      );
  }, [categoryId])

  const saveInstances = () => {
    put(
      `${process.env.REACT_APP_API_BASE_URL}/Category/${categoryId}`,
      {instances}
    ).then(() => {
      onUpdate(prevCategories => prevCategories.map(
        category => category.id === categoryId ? {...category, instances} : category)
      )
    })
  }

  useEffect(() => {
    saveInstances()
  }, [instances.length])

  const handleDragStartInstance = (index: number) => {
    setDragging(index)
  }

  const handleDropInstance = () => {
    saveInstances()
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
      <h3>Add new Instance</h3>
      <AddInstance onSave={setInstances} />
    </>
  );
}

export default InstanceList
