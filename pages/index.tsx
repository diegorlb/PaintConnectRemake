import { FunctionComponent, } from 'react'
import { Provider, } from 'react-redux'

import store from '../store/store'
import GameHandler from '../components/GameHandler'

const Index: FunctionComponent = ({ }) => {
  return (
    <Provider store={store}>
      <div className={'w-screen h-screen bg-primary flex justify-center items-center'}>
        <GameHandler />
      </div>
    </Provider>
  )
}

export default Index