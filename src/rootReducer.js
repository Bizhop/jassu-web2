import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import userReducer from './components/user/userReducer'
import kirvesReducer from './components/kirves/kirvesReducer'

const rootReducer = combineReducers({
  form: formReducer,
  user: userReducer,
  kirves: kirvesReducer
})

export default rootReducer
