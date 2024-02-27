[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/E1E5NS6KY)

# reactotron-zustand-plugin
Simple Plugin to monitor states from zustand.

How install a project:
```
yarn add https://github.com/aylonmuramatsu/reactotron-zustand-plugin.git

or

npm i https://github.com/aylonmuramatsu/reactotron-zustand-plugin.git --save
```


How use?
Go to file "Reactotron.config.js" or your config reactotron from project, is similar to this file:
```js
import reactotronZustand from "reactotron-plugin-zustand";

Reactotron.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure({
    name: 'Name Project',
  }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(
    //add this line 🙌
    reactotronZustand({
      stores: [
        { name: 'app', store: useApp },
        { name: 'authentication', store: useAuth },
      ],
    })
  ) // plus some custom made plugin.
  .connect(); // let's connect!
```

In case , i use two stores:  "useApp" and "useAuth", each your stores should has fields "name" & "store"

name = name of store, this is show on reactotron 

store = your store 

<img width="727" alt="Captura de Tela 2023-06-22 às 23 59 47" src="https://github.com/aylonmuramatsu/reactotron-zustand-plugin/assets/28609474/81e12c1f-4d33-4575-930a-14419aa508bf">


Don't forget to add the observers!

<img width="602" alt="Captura de Tela 2023-06-23 às 00 09 08" src="https://github.com/aylonmuramatsu/reactotron-zustand-plugin/assets/28609474/90228598-c881-4a77-aca3-23e1c6c47549">

You can watch states by individual or all state using:  "*", "root" , "all"
