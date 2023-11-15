import MainView from './View/ShowView.js';
import {Data, ProgramStage} from './Model/Data.js';
class App {
  async run() {
    Data.initailize();
    ProgramStage.initailize();
    await MainView();
    
  }
}

export default App;
