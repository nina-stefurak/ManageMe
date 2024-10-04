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