import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import {RootStackContainer} from './src/navigation/RootStackContainer';
import {store} from './src/core/store/store';
import {COLORS} from './resources/colors';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <StatusBar
        backgroundColor={COLORS.darkslateblue}
        animated={true}
        barStyle={'light-content'}
      />
      <RootStackContainer />
    </Provider>
  );
};

export default App;
