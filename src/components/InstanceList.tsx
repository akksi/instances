import React, {useEffect, useState} from "react"
import InstanceListItem from "./InstanceListItem";
import {Category, Instance} from "../types";
import {get} from "../services/api";

type Props = {
  categoryId: Category['id']
}

const InstanceList = ({categoryId}: Props) => {
  const [instances, setInstances] = useState<Instance[]>([])
  const [loading, setLoading] = useState(false)


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


  return (
    <>
      <h2>Instances</h2>
      {(!loading && !instances.length) && <p>No instances found.</p>}
      <ul>
        {instances.map((instance) => (
          <InstanceListItem
            key={instance.id}
            instance={instance}
          />
        ))}
      </ul>
    </>
  );
}

export default InstanceList
