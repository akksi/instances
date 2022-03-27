import React, {Dispatch, SetStateAction, useState, FormEvent} from "react"
import {Instance} from "../types";

type Props = {
  onSave: Dispatch<SetStateAction<Instance[]>>
}

const AddInstance = ({onSave}: Props) => {
  const [name, setName] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    onSave((prevInstances: Instance[]) => [...prevInstances, {id: Math.random(), name, startDate, endDate}])
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} required />
      <input type="date" placeholder="Start Date" onChange={(e) => setStartDate(e.target.value)} value={startDate} required />
      <input type="date" placeholder="End Date" onChange={(e) => setEndDate(e.target.value)} value={endDate} required />
      <input type="submit" value="Save" />
    </form>
  );
}

export default AddInstance
