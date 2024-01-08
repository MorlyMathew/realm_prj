// /**
//  * @format
//  */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import { Provider } from 'react-redux';
// import {name as appName} from './app.json';
// import MainStackNavigator from './src/navigation/AppNavigator';
// import store from './src/redux/Store';

// const RNRedux = ()=>(
//     <Provider store={store}>
//         <MainStackNavigator/>
//     </Provider>
// )
// AppRegistry.registerComponent(appName, () => RNRedux);

/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);