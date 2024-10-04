import { Project } from './projects.ts'
import { UserStory } from './userStory.ts';
import { Task } from './tasks.ts';

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
      if(!projects) {
        return [];
      }
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
    const foundStories = story ? JSON.parse(story) : []; 
    return foundStories.map((story : any) => {
      story.createdAt = new Date(story.createdAt);
      return story;
  });
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

export interface TaskApi {
  getAllTasks() : Promise<Task[]>;
  addTask(task: Task) : Promise<Task>;
  updateTask(id: string, name: string, description: string, projectId: string, priority: any,
    status: any, createdAt: Date, ownerId: string) : Promise<Task>;
    deleteTask(id: string) : Promise<void>;
}

export class LocalStorageTaskApi implements TaskApi {
  private storageKey = 'task';

  async getAllTasks() : Promise<Task[]> {
    const task = localStorage.getItem(this.storageKey);
    const foundTask = task ? JSON.parse(task): [];
    return foundTask.map((task : any) => {
      task.createdAt = new Date(task.createdAt);
      return task;
    });
  }

  async addTask(task: Task): Promise<Task> {
      const tasks = await this.getAllTasks();
      tasks.push(task);
      localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    return task;
  }
  async updateTask(id: string, name: string, description: string, projectId: string, priority: any, status: any, createdAt: Date, ownerId: string): Promise<Task> {
    const tasks = await this.getAllTasks();
    const tasksIndex = tasks.findIndex(tasks => tasks.id === id);
    if (tasksIndex !== -1) {
      tasks[tasksIndex] = { id, name, description, projectId, priority, status, createdAt, ownerId };
      localStorage.setItem(this.storageKey, JSON.stringify(tasks));
      return tasks[tasksIndex];
    }
    throw Error(`Unable to update story: ${id}`);
  }
  async deleteTask(id: string): Promise<void> {
    const tasks = await this.getAllTasks();
    const updateTask = tasks.filter( tasks => tasks.id !== id );
    localStorage.setItem(this.storageKey, JSON.stringify(updateTask));
  }
}