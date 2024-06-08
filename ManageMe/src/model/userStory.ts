import { StoryApi } from './api.ts'

export interface UserStory {
  id: string;
  projectId: string;
  name: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'doing' | 'done';
  createdAt: Date;
  ownerId: string;
}

class StoryManager {
  private storageKey = 'story';

  private api = new StoryApi();

  getAllStory(): UserStory[] {
    return this.api.getAllStory();
  }

  //dodanie historyjki do projectu
  addStory(name: string, description: string, projectId: string): UserStory {
    const newStory: UserStory = {
      id: crypto.randomUUID(),
      name,
      description,
      projectId: projectId,
      priority: 'low',
      status: 'todo',
      createdAt: new Date(),
      ownerId: 'Default'
    };
    const stories = this.getAllStory();
    stories.push(newStory);
    localStorage.setItem(this.storageKey, JSON.stringify(stories));
    return newStory;
  }
  //edycja historyjki
  updateStory(id: string, name: string, description: string, projectId: string, priority: any,
    status: any, createdAt: Date, ownerId: string): UserStory | null {
    const stories = this.getAllStory();
    const storiesIndex = stories.findIndex(stories => stories.id === id);
    if (storiesIndex !== -1) {
      stories[storiesIndex] = { id, name, description, projectId, priority, status, createdAt, ownerId };
      localStorage.setItem(this.storageKey, JSON.stringify(stories));
      return stories[storiesIndex];
    }
    return null;
  }
  //usuwanie historyjki
  deleteStory(id: string): void {
    const stories = this.getAllStory();
    const updateStory = stories.filter(stories => stories.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(updateStory));
  }
}

export { StoryManager };
