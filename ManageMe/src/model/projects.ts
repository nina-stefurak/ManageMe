interface Project {
  id: string;
  name: string;
  description: string;
}

//klasa która komunikuje z Api localStorage
class ProjectManager {
  private storageKey = 'projects';

  getAllProjects(): Project[] { //metoda zwraca liste projektów
    const projects = localStorage.getItem(this.storageKey);
    return projects ? JSON.parse(projects) : []; //sprawdzenie i zwracanie danych
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
