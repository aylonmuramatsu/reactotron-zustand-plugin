module.exports = (pluginConfig) => (reactotron) => {
  reactotron.unsubscriptions = [];
  //Start store
  reactotron.stores =
    pluginConfig?.stores?.map((store) => ({
      ...store,
      observable: false,
    })) || [];
  let changes = [];
  let subscriptions = [];

  function resetStores() {
    //Start store
    reactotron.stores =
      pluginConfig?.stores?.map((store) => ({
        ...store,
        observable: false,
      })) || [];
  }

  function unsubscribeStores() {
    reactotron.unsubscriptions.forEach((store) => store());
  }

  function updateState(name, state) {
    // If we don't have reactotron, dont have a store or getState isn't a function then get out. Now.
    if (!reactotron) {
      return [];
    }
    let temp = Object.assign([], changes);
    // If Exists state from index
    // update state value from path
    // OR create new state from path
    var stateIndex = temp.findIndex((state) => state.path === name);
    if (stateIndex > -1) {
      temp[stateIndex].value = state;
    } else temp.push({ path: name, value: state });
    return temp;
  }

  return {
    onCommand: (command) => {
      //Was receive event from subscribe.
      // if (command?.type === 'state.values.subscribe') {
      if (command?.type === "state.values.subscribe") {
        subscriptions = command?.payload?.paths;

        //Remove all observable state from button.
        if (command?.payload?.paths?.length === 0) {
          changes = [];

          resetStores();
          unsubscribeStores();
          reactotron?.send("state.values.change", { changes });
          return;
        }

        //Process all subscribe from syncronize states when change.
        reactotron.stores
          .filter(
            //Only add subscribe from stores added on reactotron client OR not observable.
            (store) =>
              // (!store.observable && subscriptions.includes(store.name)) ||
              (!store.observable && subscriptions.includes(store.name)) ||
              subscriptions.some((sub) =>
                ["", "*", "all", "root"].includes(sub)
              )
          )
          .forEach((store) => {
            store.observable = true;
            //Case when first time, added state current
            const newState = updateState(store.name, store.zustand.getState());
            changes = newState;
            reactotron.stateValuesChange(newState);

            //Use subscribe from zustand to syncronize state on reactotron client
            reactotron.unsubscriptions.push(
              store?.zustand?.subscribe((state) => {
                const newState = updateState(store.name, state);
                changes = newState;
                reactotron.stateValuesChange(changes);
              })
            );
          });
      }
    },
    features: {},
  };
};
