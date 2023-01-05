import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from '../containers/HomePage.js';
import Checklist from '../containers/Checklist.js';
import Library from '../containers/Library.js';
import BodyData from '../containers/BodyData.js';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const Tab = createBottomTabNavigator();
const BottomTab = () => {
    return (
      <Tab.Navigator
        screenOptions={
          ({ route }) => ({
            tabBarIcon: ({ focused, size, color }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = 'home';
                size = focused ? 25 : 20;
              } else if (route.name === 'Checklist') {
                iconName = 'clipboard-check';
                size = focused ? 25 : 20;
              } else if (route.name === 'Library') {
                iconName = 'book-open';
                size = focused ? 25 : 20;
              } else if (route.name === 'Body Data') {
                iconName = 'user';
                size = focused ? 25 : 20;
              }
              return (
                <FontAwesome5
                  name={iconName}
                  size={size}
                  color={color}
                  solid
                />
              );
            },
            "tabBarActiveTintColor": "#f87171",
            "tabBarInactiveTintColor": "#777777",
            "tabBarLabelStyle": {
              "fontSize": 15,
              "fontWeight": "bold"
            },
            "tabBarStyle": [
              {
                "display": "flex"
              },
              null
            ],
            headerShown: false
          })
        }
      >
        <Tab.Screen name={'Home'} component={HomePage} />
        <Tab.Screen name={'Checklist'} component={Checklist} />
        <Tab.Screen name={'Library'} component={Library} />
        <Tab.Screen name={'Body Data'} component={BodyData} />
      </Tab.Navigator>
    );
}

export default BottomTab;