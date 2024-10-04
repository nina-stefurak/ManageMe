import { ProjectsApi, LocalStorageProjectsApi } from './api.ts'

export interface Project {
  id: string;
  name: string;
  description: string;
}

//klasa która komunikuje z Api localStorage
class ProjectManager {
  private api : ProjectsApi = new LocalStorageProjectsApi();

  async getCurrentProject() : Promise<Project> {
    const currentProjectId = localStorage.getItem('currentProject');
    console.log('Aktualny projekt z localStorage:', currentProjectId);
    const projects = await this.getAllProjects();
    const foundProject = projects.filter(project => project.id === currentProjectId)[0];
    return foundProject;
  }

  async getAllProjects(): Promise<Project[]> { //metoda zwraca liste projektów
    return await this.api.getAllProjects();
  }

  //dodanie projectu
  async addProject(name: string, description: string): Promise<Project> {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name,
      description,
    };
    return await this.api.addProject(newProject);
  }

  //edycja projektu
  async updateProject(id: string, name: string, description: string): Promise<Project|null> {
      return await this.api.updateProject(id, name, description);
  }
  //usuwanie projektu
  async deleteProject(id: string): Promise<void> {
    await this.api.deleteProject(id);
  }
}

export { ProjectManager };
