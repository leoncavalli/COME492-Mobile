import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import Login from '../screens/login'
import Welcome from '../screens/welcome'
import Sign from '../screens/sign'
import web from '../screens/webview'
const screens = {
     Login :{
         screen: Login
     },
     Welcome :{
         screen: Welcome
     },
     Sign : {
         screen: Sign
     },
     webview:{
         screen: web
     }

}
const LoginStack = createStackNavigator(screens,{defaultNavigationOptions:{
    headerStyle:{backgroundColor:"#344adb",}
}});

export default createAppContainer(LoginStack);