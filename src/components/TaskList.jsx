import React, { useEffect, useState } from "react"
import { graphqlOperation, GraphQLAPI } from "@aws-amplify/api-graphql"
import { createTask } from "../graphql/mutations"
import { listTasks } from "../graphql/queries"
import { onCreateTask } from "../graphql/subscriptions"

export default function TaskList() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    GraphQLAPI.graphql(graphqlOperation(listTasks)).then(res => {
      console.log(res)
      setTasks(res.data.listTasks.items)
    })
  }, [])

  let subsOnCreate

  useEffect(() => {
    subsOnCreate = GraphQLAPI.graphql(graphqlOperation(onCreateTask)).subscribe(
      {
        next: bop => {
          console.log(bop)
          console.log(tasks)
          setTasks([...tasks, bop.value.data.onCreateTask])
        },
      }
    )
    return () => subsOnCreate.unsubscribe()
  }, [])

  const addTask = async task => {
    const created = await GraphQLAPI.graphql(
      graphqlOperation(createTask, {
        input: { title: "A NEW IMPORTANT TASK" },
      })
    )
    console.log(created)
  }
  console.log(tasks)
  return (
    <>
      <div>
        {tasks.map(task => (
          <h1 key={task.id}>{task.title}</h1>
        ))}
      </div>
      <button onClick={addTask}>Add a new Important task</button>
    </>
  )
}
