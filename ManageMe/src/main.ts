import './css/style.css'
import { ProjectManager } from './model/projects.ts'
import { UserManager } from './model/user.ts';
import { ActiveProject } from './model/activeProject.ts'

//generyczna klasa api
//api generyczne

const userManager = new UserManager();
const loggedUser = userManager.getLoggedUser();

console.log(loggedUser);


const projectManager = new ProjectManager();


document.addEventListener('DOMContentLoaded', () => {
  displayProjects();
  const form = document.getElementById('project-form') as HTMLFormElement;
  const projectNameInput = document.getElementById('project-name') as HTMLInputElement;
  const projectDescriptionTextarea = document.getElementById('project-description') as HTMLTextAreaElement;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Pobieram dane z formularza
    const projectName = projectNameInput.value;
    const projectDescription = projectDescriptionTextarea.value;


    const newProject = projectManager.addProject(projectName, projectDescription);

    console.log(newProject);


    form.reset();
    displayProjects();
  });
});


function deleteProject(id: string): void {
  projectManager.deleteProject(id);
}

function displayProjects(): void {
  // pobieram projekty z ProjectManager i wyświetlam na stronie
  const projects = projectManager.getAllProjects();
  const projectsList = document.getElementById('projects-list') as HTMLUListElement;
  projectsList.innerHTML = ''; // Czyszczimy liste

  projects.forEach((project) => {
    const listItem = document.createElement('div');
    listItem.innerHTML = `
      <div class="card">
            <div class="card-header">
              <input type="text" id="project-name-${project.id}" value="${project.name}" disabled>
            </div>
            <div class="card-body">
            <textarea id="project-description-${project.id}" disabled>${project.description}</textarea>
            </div>
            <div class="card-footer">
            <button class="activeBtn" id="active-${project.id}">Active</button>    
            <button id="delete-${project.id}">Delete</button> <button id="edit-${project.id}">Edit</button>
            </div>
          </div>
      `;

    projectsList.appendChild(listItem);

    //dodaje listener do przycisku active 
    const activeButton = document.getElementById(`active-${project.id}`);
    if(activeButton){
      activeButton.addEventListener('click', () => {
        console.log("activeProject")
      });
    }

    // Dodajemy listener 'click' do każdego przycisku usuwania projektu
    const deleteButton = document.getElementById(`delete-${project.id}`);
    if (deleteButton) {
      deleteButton.addEventListener('click', () => {
        deleteProject(project.id);
        displayProjects(); // Odświeżam liste po usunięciu
      });
    }

    const editButton = document.getElementById(`edit-${project.id}`);
    if (editButton) {
      editButton.addEventListener('click', () => {
        enableEditing(project.id);
      });
    }
  });
}

function enableEditing(id: string): void {
  const projectNameInput = document.getElementById(`project-name-${id}`) as HTMLInputElement;
  const projectDescriptionTextarea = document.getElementById(`project-description-${id}`) as HTMLTextAreaElement;

  projectNameInput.disabled = false;
  projectDescriptionTextarea.disabled = false;

  // Zmieniam edit na save
  const editButton = document.getElementById(`edit-${id}`) as HTMLButtonElement;
  editButton.textContent = 'Save';
  editButton.onclick = () => saveProject(id);
}

function saveProject(id: string): void {
  const projectNameInput = document.getElementById(`project-name-${id}`) as HTMLInputElement;
  const projectDescriptionTextarea = document.getElementById(`project-description-${id}`) as HTMLTextAreaElement;

  const newName = projectNameInput.value;
  const newDescription = projectDescriptionTextarea.value;

  projectManager.updateProject(id, newName, newDescription);

  displayProjects();
}