import { Project } from './projects.ts'
import { UserStory } from './userStory.ts';

export interface ProjectsApi {
  getAllProjects(): Promise<Project[]>;
  addProject(project: Project) : Promise<Project>;
  updateProject(id: string, name: string, description: string) : Promise<Project>;
  deleteProject(id: string) : Promise<void>;
}

export class LocalStorageProjectsApi implements ProjectsApi {
    private storageKey = 'projects';

    async getAllProjects(): Promise<Project[]> { //metoda zwraca liste projektów
      const projects = localStorage.getItem(this.storageKey)!!;
      return JSON.parse(projects); //sprawdzenie i zwracanie danych
    }

    async addProject(project: Project) : Promise<Project> {
      const projects = await this.getAllProjects();
      projects.push(project);
      localStorage.setItem(this.storageKey, JSON.stringify(projects));
      return project;
    }

    async updateProject(id: string, name: string, description: string) : Promise<Project> {
      const projects = await this.getAllProjects();
      const projectIndex = projects.findIndex(project => project.id === id);
      if (projectIndex !== -1) {
        projects[projectIndex] = { id, name, description };
        localStorage.setItem(this.storageKey, JSON.stringify(projects));
        return projects[projectIndex];
      }
      throw Error(`Failed to update. ${id}`);
    }

    async deleteProject(id: string) : Promise<void>{
      const projects = await this.getAllProjects();
      const updatedProjects = projects.filter(project => project.id !== id);
      localStorage.setItem(this.storageKey, JSON.stringify(updatedProjects));
    }
}

export interface UserStoryApi {
  getAllStories() : Promise<UserStory[]>;
  addStory(userStory: UserStory) : Promise<UserStory>;
  updateStory(id: string, name: string, description: string, projectId: string, priority: any,
    status: any, createdAt: Date, ownerId: string) : Promise<UserStory>;
  deleteStory(id: string) : Promise<void>;
}

export class LocalStorageStoryApi implements UserStoryApi{
  private storageKey = 'story';

  async getAllStories(): Promise<UserStory[]> {
    const story = localStorage.getItem(this.storageKey);
    return story ? JSON.parse(story) : [];
  }

  async addStory(userStory: UserStory): Promise<UserStory> {
    const stories = await this.getAllStories();
    stories.push(userStory);
    localStorage.setItem(this.storageKey, JSON.stringify(stories));
    return userStory;
  }
  async updateStory(id: string, name: string, description: string, projectId: string, priority: any, status: any, createdAt: Date, ownerId: string): Promise<UserStory> {
    const stories = await this.getAllStories();
    const storiesIndex = stories.findIndex(stories => stories.id === id);
    if (storiesIndex !== -1) {
      stories[storiesIndex] = { id, name, description, projectId, priority, status, createdAt, ownerId };
      localStorage.setItem(this.storageKey, JSON.stringify(stories));
      return stories[storiesIndex];
    }
    throw Error(`Unable to update story: ${id}`);
  }
  async deleteStory(id: string): Promise<void> {
    const stories = await this.getAllStories();
    const updateStory = stories.filter(stories => stories.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(updateStory));
  }

}