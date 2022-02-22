import { MediaManController, MediaManControllerImpl } from "./controller";
import { Book, Movie } from "./model";
import { MediaServiceImpl } from "./service";
import { HTMLMediaManView } from "./view";

const view: HTMLMediaManView = new HTMLMediaManView();
const bookService = new MediaServiceImpl<Book>(Book);
const movieService = new MediaServiceImpl<Movie>(Movie);
const mediaManController = new MediaManControllerImpl(view, bookService, movieService);

interface CustomWindow extends Window {
    mediaManController?: MediaManController
}
const customWindow: CustomWindow = window;
customWindow.mediaManController = mediaManController;
console.log('MediaMan ready!', customWindow.mediaManController);

// console.log('starts');