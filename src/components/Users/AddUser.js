import React, { useState, useRef } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import Wrapper from '../Helpers/Wrapper';

import classes from './AddUser.module.css';

const AddUser = (props) => {
  // No longer need to maintain state to watch the input constrols 
  // in this example because we are using refereces.
  // const [enteredUsername, setEnteredUsername] = useState('');
  // const [enteredAge, setEnteredAge] = useState('');
  const [error, setError] = useState();

  // reference declaration. Initializes a null reference. It is
  // then bound by using ref prop on the element to which we 
  // want to bind.
  const enteredUsernameRef = useRef();
  const enteredAgeRef = useRef();

  const addUserHandler = (event) => {
    event.preventDefault();

    const enteredUsername = enteredUsernameRef.current.value;
    const enteredAge = enteredAgeRef.current.value;

    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty values).',
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).',
      });
      return;
    }
    props.onAddUser(enteredUsername, enteredAge);

    // This is an edge case to changing the values in the references.
    // Not really doing much and is trivial.
    enteredUsernameRef.current.value = '';
    enteredAgeRef.current.value = '';
  };

  // no longer need these event handlers because we are not maintaining
  // the state of the input controls.
  // const usernameChangeHandler = (event) => {
  //   setEnteredUsername(event.target.value);
  // };

  // const ageChangeHandler = (event) => {
  //   setEnteredAge(event.target.value);
  // };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            
            ref={enteredUsernameRef}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            
            ref={enteredAgeRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
