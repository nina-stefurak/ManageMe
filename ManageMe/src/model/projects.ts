import { ProjectsApi } from './api.ts'

export interface Project {
  id: string;
  name: string;
  description: string;
}

//klasa która komunikuje z Api localStorage
class ProjectManager {
  private storageKey = 'projects';

  private api = new ProjectsApi();

  getCurrentProject() : Project {
    const currentProjectId = localStorage.getItem('currentProject');
    console.log('Aktualny projekt z localStorage:', currentProjectId);
    const foundProject = this.getAllProjects().filter(project => project.id === currentProjectId)[0];
    return foundProject;
  }

  getAllProjects(): Project[] { //metoda zwraca liste projektów
    return this.api.getAllProjects();
  }

  //dodanie projectu
  addProject(name: string, description: string): Project {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name,
      description,
    };
    const projects = this.getAllProjects();
    projects.push(newProject);
    localStorage.setItem(this.storageKey, JSON.stringify(projects));
    return newProject;
  }

  //edycja projektu
  updateProject(id: string, name: string, description: string): Project | null {
    const projects = this.getAllProjects();
    const projectIndex = projects.findIndex(project => project.id === id);
    if (projectIndex !== -1) {
      projects[projectIndex] = { id, name, description };
      localStorage.setItem(this.storageKey, JSON.stringify(projects));
      return projects[projectIndex];
    }
    return null;
  }
  //usuwanie projektu
  deleteProject(id: string): void {
    const projects = this.getAllProjects();
    const updatedProjects = projects.filter(project => project.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(updatedProjects));
  }
}

export { ProjectManager };
