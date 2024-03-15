
interface Project {
    id: string;
    name: string;
    description: string;
}

//klasa która komunikuje z Api localStorage
class ProjectManager {
    private storageKey = 'projects';

    getAllProgects(): Project[] { //metoda zwraca liste projektów
        const projects = localStorage.getItem(this.storageKey); 
        return projects ? JSON.parse(projects) : []; //sprawdzenie i zwracanie danych
    }
}

//CRUD

//dodanie projectu

//edycja projektu

//usuwanie projektu