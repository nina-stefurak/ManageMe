import { Project } from './projects.ts'

export class ProjectsApi {
    private storageKey = 'projects';

    getAllProjects(): Project[] { //metoda zwraca liste projektów
        const projects = localStorage.getItem(this.storageKey);
        return projects ? JSON.parse(projects) : []; //sprawdzenie i zwracanie danych
      }
}