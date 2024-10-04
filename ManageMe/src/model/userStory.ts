import { UserStoryApi,LocalStorageStoryApi } from './api.ts'

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
  private api: UserStoryApi = new LocalStorageStoryApi();

  async getAllStory(projectId: string): Promise<UserStory[]> {
    const stories = await this.api.getAllStories();
    return stories.filter(story => story.projectId === projectId);
  }

  //dodanie historyjki do projectu
  async addStory(name: string, description: string, projectId: string, priority: any, status: any,): Promise<UserStory> {
    const newStory: UserStory = {
      id: crypto.randomUUID(),
      name,
      description,
      projectId: projectId,
      priority: priority,
      status: status,
      createdAt: new Date(),
      ownerId: 'Default'
    };
    return await this.api.addStory(newStory);
  }
  //edycja historyjki
  async updateStory(id: string, name: string, description: string, projectId: string, priority: any,
    status: any, createdAt: Date, ownerId: string): Promise<UserStory> {
      return await this.api.updateStory( id, name, description, projectId, priority, status, createdAt, ownerId);
  }
  //usuwanie historyjki
 async deleteStory(id: string): Promise<void> {
    await this.api.deleteStory(id);
  }
}

export { StoryManager };
