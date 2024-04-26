import { Project } from './projects.ts'
import { UserStory } from './userStory.ts';

export class ProjectsApi {
    private storageKey = 'projects';

    getAllProjects(): Project[] { //metoda zwraca liste projektów
        const projects = localStorage.getItem(this.storageKey);
        return projects ? JSON.parse(projects) : []; //sprawdzenie i zwracanie danych
      }
}

export class StoryApi {
  private storageKey = 'story';

  getAllStory(): UserStory[] {
    const story = localStorage.getItem(this.storageKey);
    return story ? JSON.parse(story) : [];
  }
}