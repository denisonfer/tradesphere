import { NativeModules, Platform } from 'react-native';
import { CustomCommand } from 'reactotron-core-client';
import Reactotron from 'reactotron-react-native';
import mmkvPlugin from 'reactotron-react-native-mmkv';
import { storage } from './storage';

const showStorageDataCommand: CustomCommand = {
  command: 'showStorageData',
  description: 'Mostra todos os dados salvos no AsyncStorage da aplicação',
  handler: () => {
    const allKeys = storage.getAllKeys();
    allKeys.forEach((key) => {
      const jsonData = storage.getString(key);
      console.tron?.log?.(
        'Dados salvos no MMKV Storage:',
        JSON.parse(jsonData!)
      );
    });
  },
};

let scriptHostname;

if (__DEV__) {
  const emulatorIP = '10.0.2.2';

  const { scriptURL } = NativeModules.SourceCode;
  scriptHostname = scriptURL.split('://')[1].split(':')[0];

  Reactotron.configure({
    host: Platform.OS === 'ios' ? scriptHostname : emulatorIP,
  })
    .useReactNative()
    .use(mmkvPlugin({ storage }))
    .connect();

  Reactotron.onCustomCommand(showStorageDataCommand);
  //Reactotron.onCustomCommand(getCurrentCourseModulesCommand);
  console.tron = Reactotron;
}
