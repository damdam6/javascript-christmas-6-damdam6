import MainView from './View/ShowView.js';
import {UserData, ProgramStage} from './Model/Data.js';
class App {
  async run() {
    UserData.initailize();
    ProgramStage.initailize();
    await MainView();
    
  }
}

export default App;
