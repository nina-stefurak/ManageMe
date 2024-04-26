import { StoryApi } from './api.ts'

export interface UserStory {
  id: string;
  projectId: string;
  name: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'doing' | 'done';
  createdAt: string;
  ownerId: string;
}

class StoryManager {
  private storageKey = 'story';

  private api = new StoryApi();

  getAllStory(): UserStory[] { 
      return this.api.getAllStory();
  }

  //dodanie historyjki do projectu
  addStory(name: string, description: string): UserStory {
    const newStory: UserStory = {
      id: crypto.randomUUID(),
      name,
      description,
      projectId: '',
      priority: 'low',
      status: 'todo',
      createdAt: '',
      ownerId: ''
    };
    const projects = this.getAllStory();
    projects.push(newStory);
    localStorage.setItem(this.storageKey, JSON.stringify(projects));
    return newStory;
  }
}

export { StoryManager };
