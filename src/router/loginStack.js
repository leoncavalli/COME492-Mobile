import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import Login from '../screens/login'
import Model from '../screens/modelPage'
import Sign from '../screens/sign'
import WebView from '../screens/webview'
import ArimaModel from '../screens/arimaModel'
import tradeRobot from '../screens/tradeRobot'
import lstmModel from '../screens/lstmModel'
const screens = {
     Login :{
         screen: Login
     },
     Model :{
         screen: Model
     },
     Sign : {
         screen: Sign
     },
     WebView:{
         screen: WebView
     },
     ArimaModel:{
         screen: ArimaModel
     },
     lstmModel:{
         screen:lstmModel
     },
     tradeRobot:{
         screen: tradeRobot
     }

}
const LoginStack = createStackNavigator(screens,{defaultNavigationOptions:{
    headerStyle:{backgroundColor:"white",}
}});

export default createAppContainer(LoginStack);