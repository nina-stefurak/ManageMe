import { ProjectManager } from "./projects";
import { TaskManager } from "./tasks";

const projectManager = new ProjectManager();
const taskManager = new TaskManager();

console.log(`Current project: ${JSON.stringify(await projectManager.getCurrentProject())}`)

const taskForm = document.getElementById('task-form') as HTMLFormElement;
const taskNameInput = document.getElementById('task-name') as HTMLInputElement;
const taskDescription = document.getElementById('task-description') as HTMLTextAreaElement;

taskForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log("Task submitted.")
    const selectedPriority = document.querySelector('input[name="priority"]:checked')!! as any;
    console.log("Selected priority: ", selectedPriority.value)
    const selectedStatus = document.querySelector('input[name="status"]:checked')!! as any;
    console.log("Selected status: ", selectedStatus.value);
  
    //dodanie zadania
    await taskManager.addTask(taskNameInput.value, taskDescription.value, localStorage.getItem('currentProject')!!, selectedPriority.value, selectedStatus.value)
    await displayTasks();
  });

const displayTasks = async () => {
    document.getElementById('todo-column')!!.innerHTML = '';
    document.getElementById('progress-column')!!.innerHTML = '';
    document.getElementById('completed-column')!!.innerHTML = '';
    const tasks = await taskManager.getAllTasks(localStorage.getItem('currentProject')!!);

    tasks.forEach(task => {
        const card = `
      <div class="card">
      <div class="card-header">
        <h2>${task.name}</h2>
        <div class="card-info"><span class="date">${task.createdAt.toLocaleString()}</span><span class="dot"></span><span class="author">Created by ${task.ownerId}</span></div>
      </div>
      <div class="card-body">
        <p>${task.description}</p>
        <div class="card-info"><span class="">Priorytet: ${task.priority}</span><span class="dot"></span><span class="status">Status: ${task.status}</span></div>
      </div>
      <div class="card-footer">
        <div class="comments"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
            <path d="M416 192c0-88.4-93.1-160-208-160S0 103.6 0 192c0 34.3 14.1 65.9 38 92-13.4 30.2-35.5 54.2-35.8 54.5-2.2 2.3-2.8 5.7-1.5 8.7S4.8 352 8 352c36.6 0 66.9-12.3 88.7-25 32.2 15.7 70.3 25 111.3 25 114.9 0 208-71.6 208-160zm122 220c23.9-26 38-57.7 38-92 0-66.9-53.5-124.2-129.3-148.1.9 6.6 1.3 13.3 1.3 20.1 0 105.9-107.7 192-240 192-10.8 0-21.3-.8-31.7-1.9C207.8 439.6 281.8 480 368 480c41 0 79.1-9.2 111.3-25 21.8 12.7 52.1 25 88.7 25 3.2 0 6.1-1.9 7.3-4.8 1.3-2.9.7-6.3-1.5-8.7-.3-.3-22.4-24.2-35.8-54.5z"></path>
          </svg></div>
            <div class="card-footer">  
            <button id="delete-${task.id}">Usuń</button> <button id="edit-${task.id}">Edytuj</button>
            </div>
    </div>
    `;
        switch (task.status) {
            case 'todo': document.getElementById('todo-column')!!.innerHTML += card;
                break;
            case 'doing': document.getElementById('progress-column')!!.innerHTML += card;
                break;
            case 'done': document.getElementById('completed-column')!!.innerHTML += card;
                break;
        }
        //Dodaje listener 'click' do każdego przycisku usuwania
        const deleteButton = document.getElementById(`delete-${task.id}`);
        if (deleteButton) {
            deleteButton.addEventListener('click', async () => {
                await taskManager.deleteStory(task.id);
                await displayTasks();
            })
        }
        //dodaje listener 'click' do przycisku edytuj
        const editButton = document.getElementById(`edit-${task.id}`);
        if (editButton) {
            editButton.addEventListener('click', async () => {
                console.log('edit');
            })
        }
    });
}
await displayTasks();