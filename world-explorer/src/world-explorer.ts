import { WorldExplorerController, WorldExplorerControllerImpl } from "./controllers";
import { PopulationServiceImpl } from "./services/population-service";
import { PopulationService } from "./services/population-service.intf";
import { WorldExplorerHTMLView, WorldExplorerView } from "./views";

console.log('World Explorer -Loading...');
const populationService: PopulationService = new PopulationServiceImpl('https://api.worldbank.org');
const view: WorldExplorerView = new WorldExplorerHTMLView();
const controller: WorldExplorerController = new WorldExplorerControllerImpl(populationService, view);

interface CustomWindow extends Window {
    worldExplorerController?: WorldExplorerController
}

const customWindow: CustomWindow = window;
customWindow.worldExplorerController = controller;