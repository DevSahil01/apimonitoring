export const changeState = (state = {
    sidebarShow: true,
    theme: 'light',
  }, { type, ...rest }) => {
    switch (type) {
      case 'set':
        return { ...state, ...rest }
      default:
        return state
    }
  }