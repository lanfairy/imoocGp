# ReactNavigation 学习总结
### Screen Navigation Prop(屏幕的navigation Prop)
 ###### 当导航器中的屏幕被打开时，它会收到一个navigation prop，navigation prop是整个导航环节的关键一员，接下来就详细讲解一下navigation的作用。


#### Navigation Prop
- navigate(跳转到其他界面)
   + 当前路由已经在屏幕上了,则当前路由不能导航到当前路由(用push则可以做到)
   + 不能由Details route再次导航到Detail
   navigate('routeName') 导航到目标路由屏幕,若是导航栈中已经压栈了多个屏幕路由想返回栈中的第一个屏幕可用navigate('firstRouteName')或popToTop,但不能使用push('firstRouteName')
   ```Javascript
   class DetailsScreen extends React.Component {
     render() {
       return (
         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           <Text>Details Screen</Text>
           <Button
             title="Go to Details... again"
             onPress={() => this.props.navigation.navigate('Details')}
           />
         </View>
       );
     }
   }
   ```
   + 给路由传递数据:
    * 传数据
    ```Javascript
   this.props.navigation.navigate('RouteName', { /* params go here */ })
   ```
    *  接收数据
    ```Javascript
    this.props.navigation.getParam(paramName, defaultValue).
    ```

    ```Javascript
    class HomeScreen extends React.Component {
    render() {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
              title="Go to Details"
              onPress={() => {
                /* 1. Navigate to the Details route with params */
                this.props.navigation.navigate('Details', {
                  itemId: 86,
                  otherParam: 'anything you want here',
                  callback: (info)=>{
                                  //回调函数 DetailsScreen向HomeScreen反向传值
                                  this.setState({
                                    callbackValue: info,
                                  })
                                }
                });
              }}
            />
          </View>
        );
      }
    }
    class DetailsScreen extends React.Component {
      render() {
        /* 2. Get the param, provide a fallback value if not available */
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');
        const otherParam = navigation.getParam('otherParam', 'some default value');
        const callbackFunc = navigation.getParam('callback', null);

        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
            <Text>itemId: {JSON.stringify(itemId)}</Text>
            <Text>otherParam: {JSON.stringify(otherParam)}</Text>
            <Button
              title="Go to Details... again"
              onPress={() =>
                this.props.navigation.push('Details', {
                  itemId: Math.floor(Math.random() * 100),
                })}
            />
            <Button
              title="反向传值"
              onPress={() =>
                if(callbackFunc)callbackFunc('反向传值')
              }
            />
            <Button
              title="Go to Home"
              onPress={() => this.props.navigation.navigate('Home')}
            />
            <Button
              title="Go back"
              onPress={() => this.props.navigation.goBack()}
            />
          </View>
        );
      }
    }
```
  - 通过`this.props.navigation.state.params`可以直接获取`传递数据params`,则需要对`params`为`null`的情况作处理,建义使用`getParam('paramName', 'defaultValue')`
  - 如果想通过`props`直接获取传值`itemId` 像这样`this.props.itemId` 而不是`this.props.navigation.getParam('itemId')` 则可以使用[react-navigation-props-mapper](https://github.com/vonovak/react-navigation-props-mapper) package
- `state`： 屏幕的当前state
  * `key`:
  * `index`:
  * `routes`:[参见](https://reactnavigation.org/docs/en/navigation-options-resolution.html)
  * `params`:

- `setParams`: 改变路由的params(不一定有)
- `goBack()`: 关闭当前屏幕(不一定有)
- `dispatch`: 向路由发送一个action
- `getParam('paramName')`: 获取路由的params 可设置默认值
- `pop()`: 退回到前一屏幕
- `popToTop()`: 退回到栈中的第一个屏幕
- `push('routeName',[{paramName: 'value'})`: 导航到目标路由屏幕 第二个可选参数传递数据
- `replace('routeName')`:
- `reset`
- `dismiss`
- `action`
- `isFocused`
- `addListener`
- `dangerouslyGetParent`
***
#### config Header bar (配置导航栏)
>##### navigationOptions
>1.`navigationOptions`单独写在`routeScreen`里面时仅对其自身的导航栏起作用,但写到`stack navigator`里面则被导航栈中的所有`routeScreen`所共享
>
>2.若两个地方都写了`navigationOptions`,则`routeScreen`里面的会覆盖`stack navigator`里面的
>
- 配置tittle
  + 固定title
  ```Javascript
    class HomeScreen extends React.Component {
      static navigationOptions = {
        title: 'Home',
      };

      /* render function, etc */
    }

    class DetailsScreen extends React.Component {
      static navigationOptions = {
        title: 'Details',
      };

      /* render function, etc */
    }
    ```
  + 动态title
  通过函数返回配置`Object`,由于`navigationOptions`是组件的静态属性,函数内不能使用`this`引用实例组件,但是`React-navigation`调用`navigationOptions`函数将传递一个包含`{ navigation, navigationOptions, screenProps }`属性的对象,可以通过`navigation`获取到传给路由的数据
    ```Javascript
  class DetailsScreen extends React.Component {
    //screenProps: 从导航器组件上方传递的组件。
    //navigationOptions: 默认或以前的配置,如果没有提供新值，将使用默认或以前的选项。
    static navigationOptions = ({ navigation, navigationOptions, screenProps }) => {
      return {
        title: navigation.getParam('otherParam', 'A Nested Details Screen'),
      };
    };

    /* render function, etc */
  }
    ```
- 通过`setParams`更新当前屏幕`navigationOptions`(须使用navigationOptions函数,动态改变`navigationOptions`的相关属性)
  + ```Javascript
    /* Inside of render() 改变导航栏的headerStyle */
    <Button
    title="Update the title"
    onPress={() => this.props.navigation.setParams({headerStyle: {
      backgroundColor: '#FF7256',
    }})}
    />
    ```
- `header`: React元素或给定HeaderProps的函数返回一个React元素，以作为头部显示。设置为null隐藏头。
- `headerTitleAllowFontScaling`: 设置标题文字是不支持缩放,默认为`true`
- `headerStyle`: 应用于包裹header的`View`的样式 设置导航条的样式。背景色，宽高等。如果想去掉安卓导航条底部阴影可以添加`elevation: 0`，iOS下用`shadowOpacity: 0`。
- `headerTintColor`: 改变`React-navigation`提供的`back button`和`title`的颜色
- `headerTitleStyle`: 设置导航条文字样式,改变title的`Text`属性(例如:fontFamily,fontWeight...) 。安卓上如果要设置文字居中，只要添加 `alignSelf:'center'` 就可以了。在安卓上会遇到，如果左边有返回箭头导致文字还是没有居中的问题，最简单的解决思路就是在右边也放置一个空的按钮。
- `headerTitle`: headerTitle是一个特定于堆栈导航器的属性，headerTitle默认为显示标题的文本组件;自定义组件替换掉`title`(例如:`headerTitle: <LogoTitle />`)
- `headerBackImage`: 设置返回按钮的图片,默认使用的`react-navigation/views/assets/back-icon.png`,不同平台默认使用的转自不一样(a chevron on iOS and an arrow on Android)
- `headerBackTitle`: 设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题。可以自定义，也可以设置为null
- `headerBackTitleStyle`: 设置导航条返回文字样式
- `headerTruncatedBackTitle`: 设置当上个页面标题不符合返回箭头后的文字时，默认改成"返回"。（上个页面的标题过长，导致显示不下，所以改成了短一些的。）
- `headerRight`: 设置导航条右侧。可以是按钮或者其它
- `headerLeft`: 设置导航条左侧。可以是按钮或者其它
  + [react-navigation-header-buttons](https://github.com/vonovak/react-navigation-header-buttons)
  + 头部按钮与其屏幕组件的交互
    >在组件实例中，用于给header按钮访问一个函数的最常用的模式是使用params。
    >详见官方`Modal Stack Example`

    ```Javascript
      class HomeScreen extends React.Component {
          static navigationOptions = ({ navigation }) => {
            const params = navigation.state.params || {};

            return {
              headerTitle: <LogoTitle />,
              headerRight: (
                <Button onPress={params.increaseCount} title="+1" color="#fff" />
              ),
            };
          };

          componentWillMount() {
          //注意navigation.setParams改变的是当前页面的Params，如果要改变其他页面的Params可以通过NavigationActions.setParams完成
            this.props.navigation.setParams({ increaseCount: this._increaseCount });
          }

          state = {
            count: 0,
          };

          _increaseCount = () => {
            this.setState({ count: this.state.count + 1 });
          };

          /* later in the render function we display the count */
        }
    ```
- `headerPressColorAndroid`: 安卓独有的设置颜色纹理，需要安卓版本大于5.0
- `gesturesEnabled`: 是否支持滑动返回,iOS默认开启,Android默认关闭
- `gestureResponseDistance`: 滑动返回  触摸从屏幕边缘开始的距离,以识别手势,它需要以下属性:
  + `horizontal` - number: 水平方向的距离,默认25
  + `vertical` - number: 垂直方向的距离,默认135
- `gestureDirection`: 滑动返回的手势方向,
  + `default`: 默认,从左到右
  + `inverted`: 反向,从右到左

#### ```createStackNavigator```默认情况下使用平台约定，所以在iOS中，标题将居中，在Android上，它将是左对齐的。
```Javascript
createStackNavigator(RouteConfigs, StackNavigatorConfig);
```
- `RouteConfigs`(路由配置)
```Javascript
createStackNavigator({
  // For each screen that you can navigate to, create a new entry like this:
  Profile: {
    // `ProfileScreen` is a React component that will be the main content of the screen.
    screen: ProfileScreen,
    // When `ProfileScreen` is loaded by the StackNavigator, it will be given a `navigation` prop.

    // Optional: When deep linking or using react-navigation in a web app, this path is used:
    //path属性适用于其他app或浏览器使用url打开本app并进入指定页面。path属性用于声明一个界面路径，例如：【/people/:name】。此时我们可以在手机浏览器中输入：app名称://people/:name来启动该App，并进入Profile界面。
    path: 'people/:name',
    // The action and route params are extracted from the path.

    // Optional: Override the `navigationOptions` for the screen
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name}'s Profile'`,
    }),
  },

  ...MyOtherRoutes,
});
```
- `StackNavigatorConfig` (堆栈导航器配置)
  + `initialRouteName`: 设置默认的页面,必须是已注册的页面组件
  + `initialRouteParams`: 初始路由的参数
  +  `path`: path属性适用于其他app或浏览器使用url打开本app并进入指定页面。path属性用于声明一个界面路径，例如：【/pages/Home】。此时我们可以在手机浏览器中输入：app名称://pages/Home来启动该App，并进入Home界面。
  + `initialRouteKey`: 初始路由的可选标识符
  + `navigationOptions`: 导航栈中各路由屏幕的默认配置
  + `mode`: 定义跳转风格
    * `card`: 使用iOS和安卓默认的风格
    * `modal`: iOS独有的使屏幕从底部滑出。类似iOS的present效果,在Android上没效果
  + `headerMode`: 指定头部渲染方式
    * `float`：呈现一个单独的头部,保持在顶部，并在屏幕更改时显示动画。这是iOS中的常见模式。
    * `screen`：每个屏幕都有一个附加在它上面的标题，标题和屏幕一起淡出和淡出。这是Android上常见的模式。
    * `none`：不会渲染头部
  + `headerTransitionPreset`: 当`headerMode: float`被启用时，header如何从一个屏幕切换到另一个屏幕。
    * `fade-in-place`: 标题组件在不移动的情况下会交叉淡出，类似于iOS的Twitter、Instagram和Facebook应用。这是默认值。
    * `uikit`: iOS默认行为
  + `cardStyle`: 使用此支持来覆盖或扩展堆栈中单个卡片的默认样式。
  + `transitionConfig`: 自定义设置滑动返回的配置
    * `transitionProps`: 新屏幕的过渡属性
    * `prevTransitionProps`: 老屏幕的过渡属性
    * `isModal`: 指定屏幕的跳转风格是否是`modal`
    ```Javascript
    实现Android中界面跳转左右切换动画
    react-navigation在Android中默认的界面切换动画是上下。如何实现左右切换呢？很简单的配置即可：
    import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';
    transitionConfig:(transitionProps, prevTransitionProps, isModal)=>({  
      screenInterpolator: CardStackStyleInterpolator.forHorizontal,  
    })  
    ```
  `screenProps`  将额外的选项传递给子屏幕
    ```Javascript
    const ModalNavigator =createStackNavigator(
        {
          Main: { screen: Main },
          Login: { screen: Login },
        },
        {
          headerMode: 'none',
          mode: 'modal',
          navigationOptions: {
            gesturesEnabled: false,
          },
          transitionConfig: () => ({
            transitionSpec: {
              duration: 300,
              easing: Easing.out(Easing.poly(4)),
              timing: Animated.timing,
            },
            screenInterpolator: sceneProps => {
              const { layout, position, scene } = sceneProps;
              const { index } = scene;

              const height = layout.initHeight;
              const translateY = position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [height, 0, 0],
              });

              const opacity = position.interpolate({
                inputRange: [index - 1, index - 0.99, index],
                outputRange: [0, 1, 1],
              });

              return { opacity, transform: [{ translateY }] };
            },
          }),
        }
      );
    ```
  + `onTransitionStart`: 当转换动画即将开始时被调用的功能
  + `onTransitionEnd`: 当转换动画完成，将被调用的功能

#### `createBottomTabNavigator`
>```Javascript
createBottomTabNavigator(RouteConfigs, BottomTabNavigatorConfig);
```

- `BottomTabNavigatorConfig`
  + `initialRouteName`
  + `order`: 定义标签栏标签顺序的routeNames数组
  + `paths`: 提供routeName到path config的映射，该映射覆盖了routeConfigs中设置的路径。
  + `backBehavior`: 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
  + `tabBarComponent`: 可选的，重写组件用作标签栏
  + `tabBarOptions`: 配置标签栏的一些属性
    * `activeTintColor`: 当标签激活时标签和图标的颜色
    * `activeBackgroundColor`: 标签激活时的背景色
    * `inactiveTintColor`: 非激活标签的 标签和图标的颜色
    * `inactiveBackgroundColor`: 标签非激活时的背景色
    * `showLabel`: 是否显示标签上的label, 默认为true
    * `showIcon`: 是否显示标签上的Icon, 默认为true
    * `style`: 标签栏的样式
    * `labelStyle`: 标签上label的样式
    * `tabStyle`: Style object for the tab
    * `allowFontScaling`: 标签字体是否按钮字体大小进行缩放, 默认为true
  +  `navigationOptions`
   > navigationOptions for screens inside of the navigator
   >
       ```Javascript
        import Ionicons from 'react-native-vector-icons/Ionicons';
        import { createBottomTabNavigator } from 'react-navigation';

        export default createBottomTabNavigator(
          {
            Home: HomeScreen,
            Settings: SettingsScreen,
          },
          {
            navigationOptions: ({ navigation }) => ({
              tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                  iconName = `ios-information-circle${focused ? '' : '-outline'}`;
                } else if (routeName === 'Settings') {
                  iconName = `ios-options${focused ? '' : '-outline'}`;
                }

                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Ionicons name={iconName} size={25} color={tintColor} />;
              },
            }),
            tabBarOptions: {
              activeTintColor: 'tomato',
              inactiveTintColor: 'gray',
            },
          }
        );
        ```
        * `title`: 标题，会同时设置导航条和标签栏的title
        * `tabBarVisible`: 是否隐藏标签栏,默认为显示(true)
        * `tabBarIcon`: 标签图标
        * `tabBarLabel`: 标签label *[参见]*`SimpleTabs.js`
        * `tabBarOnPress`: 回调函数处理按下标签事件,参数是一个对象包含以下两个参数(这对于在切换到下一个场景(被选中的场景)之前添加自定义逻辑非常有用。)
          -  `navigation`: navigation prop for the screen
          -  `defaultHandler`: the default handler for tab press

#### Drawer navigation
>`createDrawerNavigator(RouteConfigs, DrawerNavigatorConfig)`

- `DrawerNavigatorConfig`
    + `drawerWidth`: 抽屉的宽度
    + `drawerPosition`: 选项是左或右。 默认为左侧位置
    + `contentComponent`: 用于呈现抽屉内容的组件，例如导航项.接收抽屉的导航。 默认为DrawerItems
      * `items`: 路由数组,可以修改或覆盖
      * `activeItemKey`: 激活状态路由的标识
      * `activeTintColor`: 活动抽屉标签的label和icon的颜色
      * `activeBackgroundColor`: 活动抽屉标签的背景颜色
      * `inactiveTintColor`: 非活动抽屉标签的label和icon的颜色
      * `inactiveBackgroundColor`: 非活动标签的背景色
      * `onItemPress(route)`: 当item被按下时调用的函数
      * `itemsContainerStyle`: 抽屉内容部分的样式
      * `itemStyle`: 单个抽屉标签样式
      * `labelStyle`: label 样式(当label为string)
      * `activeLabelStyle`: 活动标签label 样式(当label为string合并到labelStyle)
      * `inactiveLabelStyle`: 非活动标签label 样式(当label为string合并到labelStyle)
      * `iconContainerStyle`: icon样式
    + `contentOptions`: 配置抽屉内容
    + `useNativeAnimations`: 开启原生动画 默认为true
    + `drawerBackgroundColor`: 抽屉背景色。默认的是白色的
    + `initialRouteName`:
    + `order`:
    + `paths`:
    + `backBehavior`: 按back键是否跳转到initialRouteScreen， none 为不跳转
    + `navigationOptions`: 屏幕导航配置
      - `title`: 可作为headerTitle和drawerLabel备份的通用标题
      - `drawerLabel`: `String`, `React Element` or a function that given `{ focused: boolean, tintColor: string }` returns a `React.Node`, to display in drawer sidebar. When undefined, scene `title` is used
      - `drawerIcon`: `React Element` or a function, that given `{ focused: boolean, tintColor: string }` returns a `React.Node`, to display in drawer sidebar
      - `drawerLockMode`:
#### createSwitchNavigator
>`createSwitchNavigator(RouteConfigs, SwitchNavigatorConfig);`
> 参看 SwitchWithStacks.js

- `SwitchNavigatorConfig`
  + `initialRouteName`:
  + `resetOnBlur`: 当从屏幕切换时，重置任何嵌套导航器的状态。默认值为true。
  + `paths`:
  + `backBehavior`: 返回按钮是否会导致选项卡切换到初始路由?如果是，设置为initialRoute，否则为none。默认为没有一个行为



> **栈导航器中嵌套标签导航器**
> ```Javascript
  const TabNavigator = createBottomTabNavigator({
    Feed: FeedScreen,
    Profile: ProfileScreen,
  });
  const AppNavigator = createStackNavigator({
    Home: TabNavigator,
    Settings: SettingsScreen,
  });
  TabNavigator.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  // You can do whatever you like here to pick the title based on the route name
    let headerTitle = routeName;
    return {
      headerTitle,
    };
};
> ```
> **另一个选择是重新组织导航器，这样每个选项卡都有自己的堆栈。然后，当选项卡屏幕被聚焦时，您可以隐藏顶级堆栈的头部。**
> ```Javascript
    > const FeedStack = createStackNavigator({
    FeedHome: FeedScreen,
    /* other routes here */
  });
  const ProfileStack = createStackNavigator({
    ProfileHome: ProfileScreen,
    /* other routes here */
  });
  const TabNavigator = createBottomTabNavigator({
    Feed: FeedStack,
    Profile: ProfileStack,
  });
  TabNavigator.navigationOptions = {
    // Hide the header from AppNavigator stack
    header: null,
  };
  const AppNavigator = createStackNavigator({
    Home: TabNavigator,
    Settings: SettingsScreen,
  });
> ```
> **A tab navigator contains a stack and you want to hide the tab bar on specific screens**(选项卡导航器包含一个堆栈，您希望在特定的屏幕上隐藏选项卡栏)
> ```Javascript
> const FeedStack = createStackNavigator({
  FeedHome: FeedScreen,
  Details: DetailsScreen,
});
const TabNavigator = createBottomTabNavigator({
  Feed: FeedStack,
  Profile: ProfileScreen,
});
const AppNavigator = createSwitchNavigator({
  Auth: AuthScreen,
  Home: TabNavigator,
});
const FeedStack = createStackNavigator({
  FeedHome: FeedScreen,
  Details: DetailsScreen,
});
FeedStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};
> ```

> 抽屉导航器中嵌入导航器,在压栈新屏幕,不想在些屏幕上打开抽屉
> ```Javascript
> const FeedStack = createStackNavigator({
  FeedHome: FeedScreen,
  Details: DetailsScreen,
});
const DrawerNavigator = createDrawerNavigator({
  Feed: FeedStack,
  Profile: ProfileScreen,
});
const AppNavigator = createSwitchNavigator({
  Auth: AuthScreen,
  Home: DrawerNavigator,
});
FeedStack.navigationOptions = ({ navigation }) => {
  let drawerLockMode = 'unlocked';
  if (navigation.state.index > 0) {
    drawerLockMode = 'locked-closed';
  }
  return {
    drawerLockMode,
  };
};
> ```
> 此方法不好使,下面这种方法好使
> 这里的另一个选项是添加另一个stack navigator作为drawer navigator的父类，并将details屏幕放在那里。这是推荐的。
> ```Javascript
> const FeedStack = createStackNavigator({
  FeedHome: FeedScreen,
  /* any other route where you want the drawer to remain available */
  /* keep in mind that it will conflict with the swipe back gesture on ios */
});
const DrawerNavigator = createDrawerNavigator({
  Feed: FeedStack,
  Profile: ProfileScreen,
});
const HomeStack = createStackNavigator({
  Drawer: DrawerNavigator,
  Details: DetailsScreen,
  /* add routes here where you want the drawer to be locked */
});
const AppNavigator = createSwitchNavigator({
  Auth: AuthScreen,
  Home: HomeStack,
});
> ```

####  Access the navigation prop from any component
> 带导航是一个高级组件，它将导航支柱传递到一个封装的组件中。如果不能直接将导航项传递到组件中，或者不想在嵌套很深的子组件中传递导航项，那么它是很有用的。


#### Redux integration
