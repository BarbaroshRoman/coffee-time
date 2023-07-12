import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import {RootStackContainer} from './src/navigation/RootStackContainer';
import {persistor, store} from './src/core/store/store';
import {COLORS} from './resources/colors';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar
          backgroundColor={COLORS.black}
          animated={true}
          barStyle={'light-content'}
        />
        <RootStackContainer />
      </PersistGate>
    </Provider>
  );
};

export default App;
