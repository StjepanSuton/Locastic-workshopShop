import { useReducer } from 'react'

interface ValidateValue {
  (value: string): boolean
}

interface Value {
  value: string
  isTouched: boolean
}

type ActionType = { type: 'INPUT'; value: string } | { type: 'BLUR' } | { type: 'RESET' }

const initialInputState = {
  value: '',
  isTouched: false,
}

const inputStateReducer = (state: Value, action: ActionType): any => {
  if (action.type === 'INPUT') {
    return { value: action.value, isTouched: state.isTouched }
  }
  if (action.type === 'BLUR') {
    return { isTouched: true, value: state.value }
  }
  if (action.type === 'RESET') {
    return { isTouched: false, value: '' }
  }
  return inputStateReducer
}

const useInput = (validateValue: ValidateValue) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState)

  const valueIsValid = validateValue(inputState.value)
  const hasError = !valueIsValid && inputState.isTouched

  const valueChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    dispatch({ type: 'INPUT', value: event.currentTarget.value })
  }

  const inputBlurHandler = () => {
    dispatch({ type: 'BLUR' })
  }

  const reset = () => {
    dispatch({ type: 'RESET' })
  }

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  }
}

export default useInput
