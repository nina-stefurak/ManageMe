import { TaskApi, LocalStorageTaskApi } from "./api";
export interface Task {
    id: string;
    projectId: string;
    name: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    status: 'todo' | 'doing' | 'done';
    createdAt: Date;
    ownerId: string;
}

class TaskManager {
    private api: TaskApi = new LocalStorageTaskApi();

    async getAllTasks(projectId: string): Promise<Task[]> {
        const task = await this.api.getAllTasks();
        return task.filter(task => task.projectId === projectId);
    }
    //dodanie zadania do proektu
    async addTask(name: string, description: string, projectId: string, priority: any, status: any,): Promise<Task> {
        const newTask: Task = {
            id: crypto.randomUUID(),
            name,
            description,
            projectId: projectId,
            priority: priority,
            status: status,
            createdAt: new Date(),
            ownerId: 'Default'
        };
        return await this.api.addTask(newTask);
    }
    //edycja zadania
    async updateTask(id: string, name: string, description: string, projectId: string, priority: any,
        status: any, createdAt: Date, ownerId: string): Promise<Task> {
        return await this.api.updateTask(id, name, description, projectId, priority, status, createdAt, ownerId);
    }
    //usuwanie historyjki
    async deleteStory(id: string): Promise<void> {
        await this.api.deleteTask(id);
    }
}
export { TaskManager };