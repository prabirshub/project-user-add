import { useState } from 'react'

import Card from '../UI/Card'
import Button from '../UI/Button'

import classes from './Adduser.module.css'
import ErrorModal from '../UI/ErrorModal'

const AddUser = (props) => {
  const [eneteredUsername, setEnteredUsername] = useState('')
  const [eneteredAge, setEnteredAge] = useState('')
  const [error, setError] = useState()
  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value)
  }
  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value)
  }

  const addUserHandler = (event) => {
    event.preventDefault()
    if (
      eneteredUsername.trim().length === 0 ||
      eneteredAge.trim().length === 0
    ) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty values).',
      })
      return
    }
    if (+eneteredAge < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid  age (> 0).',
      })
      return
    }
    props.onAddUser(eneteredUsername, eneteredAge)
    setEnteredUsername('')
    setEnteredAge('')
  }
  const errorHandler = () => {
    setError(null)
  }
  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor='username'>Username</label>
          <input
            id='username'
            value={eneteredUsername}
            type='text'
            onChange={usernameChangeHandler}
          />
          <label htmlFor='age'>Age (Years)</label>
          <input
            id='age'
            value={eneteredAge}
            type='number'
            onChange={ageChangeHandler}
          />
          <Button type='submit'>Add User</Button>
        </form>
      </Card>
    </div>
  )
}
export default AddUser
