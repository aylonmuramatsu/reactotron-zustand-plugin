# reactotron-zustand-plugin
Simple Plugin to monitor states from zustand.

Note: Sorry my 

How install a project:
```
yarn add https://github.com/aylonmuramatsu/reactotron-zustand-plugin.git

or

npm i https://github.com/aylonmuramatsu/reactotron-zustand-plugin.git --save
```


How use?
Go to file "Reactotron.config.js" or your config reactotron from project, is similar to this file:
```js
Reactotron.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure({
    name: 'Name Project',
  }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(
    //add this line 🙌
    reactotronZustand({
      stores: [
        { name: 'app', zustand: useApp },
        { name: 'authentication', zustand: useAuth },
      ],
    })
  ) // plus some custom made plugin.
  .connect(); // let's connect!
```

In case , i use two stores:  "useApp" and "useAuth", each your stores should has fields "name" & "zustand"

name = name of store, this is show on reactotron 

zustand = your store 

<img width="727" alt="Captura de Tela 2023-06-22 às 23 59 47" src="https://github.com/aylonmuramatsu/reactotron-zustand-plugin/assets/28609474/81e12c1f-4d33-4575-930a-14419aa508bf">
