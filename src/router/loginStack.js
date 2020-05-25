import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import Login from '../screens/login'
import Model from '../screens/modelPage'
import Sign from '../screens/sign'
import web from '../screens/webview'
import ArimaModel from '../screens/arimaModel'
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
     webview:{
         screen: web
     },
     ArimaModel:{
         screen: ArimaModel
     }

}
const LoginStack = createStackNavigator(screens,{defaultNavigationOptions:{
    headerStyle:{backgroundColor:"white",}
}});

export default createAppContainer(LoginStack);