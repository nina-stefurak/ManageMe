import './css/style.css'
import { ProjectManager } from './model/projects.ts'
import { UserManager } from './model/user.ts';

const userManager = new UserManager();
const loggedUser = userManager.getLoggedUser();

console.log(loggedUser);

const projectManager = new ProjectManager();

document.addEventListener('DOMContentLoaded', async () => {

  // select aktualny project 
  const projectSelect = document.getElementById('projectSelect') as HTMLSelectElement;
  if (!projectSelect) return;

  const projectManager = new ProjectManager();
  const projects = await projectManager.getAllProjects();

  if(!!projects){
    projects.forEach(project => {
      const option = document.createElement('option');
      option.value = project.id;
      option.textContent = project.name;
      projectSelect.appendChild(option);
    });
  }


  const currentProject = localStorage.getItem('currentProject');
  if (currentProject) {
    projectSelect.value = currentProject;
  }

  projectSelect.addEventListener('change', function () {
    const selectedProjectId = this.value;
    localStorage.setItem('currentProject', selectedProjectId);
    console.log('Wybrany projekt:', selectedProjectId);
    console.log('Zapisano w localStorage:', localStorage.getItem('currentProject'));
    
    displayProjects(); // Odświeżenie listy projektów
  });


  displayProjects();
  const form = document.getElementById('project-form') as HTMLFormElement;
  const projectNameInput = document.getElementById('project-name') as HTMLInputElement;
  const projectDescriptionTextarea = document.getElementById('project-description') as HTMLTextAreaElement;

  //formularz dodania projektu
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Pobieram dane z formularza
    const projectName = projectNameInput.value;
    const projectDescription = projectDescriptionTextarea.value;


    const newProject = await projectManager.addProject(projectName, projectDescription);

    // Dodanie nowego projektu do listy select
    const newOption = document.createElement('option');
    newOption.value = newProject.id;
    newOption.textContent = newProject.name;
    projectSelect.appendChild(newOption);
    projectSelect.value = newProject.id; // nowo dodany projekt wybrany

    console.log(newProject);


    form.reset();
    displayProjects();
    localStorage.setItem('currentProject', projectSelect.value);
  });
});


async function displayProjects() {
  // pobieram projekty z ProjectManager i wyświetlam na stronie
  const projects = await projectManager.getAllProjects();
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
            <button id="delete-${project.id}">Usuń</button> <button id="edit-${project.id}">Edytuj</button>
            </div>
          </div>
      `;

    projectsList.appendChild(listItem);

    // Dodaje listener 'click' do każdego przycisku usuwania projektu
    const deleteButton = document.getElementById(`delete-${project.id}`);
    if (deleteButton) {
      deleteButton.addEventListener('click', async () => {
        await projectManager.deleteProject(project.id);
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

async function saveProject(id: string) {
  const projectNameInput = document.getElementById(`project-name-${id}`) as HTMLInputElement;
  const projectDescriptionTextarea = document.getElementById(`project-description-${id}`) as HTMLTextAreaElement;

  const newName = projectNameInput.value;
  const newDescription = projectDescriptionTextarea.value;

  await projectManager.updateProject(id, newName, newDescription);

  displayProjects();
}