import { ProjectManager } from './projects';

class ActiveProject {
    private activeProject: ProjectManager | null = null;

    //ustaw aktualny project
    setActiveProject(project: ProjectManager): void {
        this.activeProject = project;
        //localStorage
        localStorage.setItem('activeProject', JSON.stringify(project));
    }
    getActiveProject(): ProjectManager | null {
        return this.activeProject;
    } 
}

export { ActiveProject };