import React from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Spinner } from 'native-base';
import Immutable from 'immutable';

import Reducers from './app/reducers/';
import AppRouter from './app/AppRouter';

const initialState = Immutable.Map();

export const store = createStore(
  Reducers,
  initialState,
  applyMiddleware(thunk)
);

export default class App extends React.Component {

  state = {
    fontLoaded: false
  };

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({fontLoaded: true});
  }
  render() {
    if(this.state.fontLoaded) {
      return (
        <Provider store={store}>
         <AppRouter />
        </Provider>
      );
    } else {
      return <Spinner />;
    }
  }
}
