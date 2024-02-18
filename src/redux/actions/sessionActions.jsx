const sessionActions = {
  REMOVE_SESSION: 'REMOVE_SESSION',
  SET_SESSION: 'SET_SESSION',
  removeSession: () => {
    return {
      type: 'REMOVE_SESSION'
    }
  },
  setSession: (session) => {
    return {
      type: 'SET_SESSION',
      session
    }
  }
}

export default sessionActions;