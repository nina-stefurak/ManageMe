import { ProjectManager } from './projects.ts'
import { StoryManager } from './userStory.ts';

const projectManager = new ProjectManager();
const storyManager = new StoryManager();

console.log(`Current project: ${JSON.stringify(projectManager.getCurrentProject())}`)

// storyManager.addStory("name1", "desc1", projectManager.getCurrentProject().id);
// storyManager.addStory("name2", "desc2", projectManager.getCurrentProject().id);
// storyManager.addStory("name3", "desc3", projectManager.getCurrentProject().id);

const stories = await storyManager.getAllStory();

stories.forEach(story => {
    const card = `
    <div class="card">
    <div class="card-header">
      <h2>${story.name}</h2>
      <div class="card-info"><span class="date">${story.createdAt}</span><span class="dot"></span><span class="author">Created by user ${story.ownerId}</span></div>
    </div>
    <div class="card-body">
      <p>${story.description}</p>
      <div class="card-tags"><label class="sc-gsDKAQ knmqvK">tag1</label><label class="sc-gsDKAQ knmqvK">tag2</label></div>
    </div>
    <div class="card-footer">
      <div class="comments"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
          <path d="M416 192c0-88.4-93.1-160-208-160S0 103.6 0 192c0 34.3 14.1 65.9 38 92-13.4 30.2-35.5 54.2-35.8 54.5-2.2 2.3-2.8 5.7-1.5 8.7S4.8 352 8 352c36.6 0 66.9-12.3 88.7-25 32.2 15.7 70.3 25 111.3 25 114.9 0 208-71.6 208-160zm122 220c23.9-26 38-57.7 38-92 0-66.9-53.5-124.2-129.3-148.1.9 6.6 1.3 13.3 1.3 20.1 0 105.9-107.7 192-240 192-10.8 0-21.3-.8-31.7-1.9C207.8 439.6 281.8 480 368 480c41 0 79.1-9.2 111.3-25 21.8 12.7 52.1 25 88.7 25 3.2 0 6.1-1.9 7.3-4.8 1.3-2.9.7-6.3-1.5-8.7-.3-.3-22.4-24.2-35.8-54.5z"></path>
        </svg></div>
      <div class="assigned"><img src="https://doodleipsum.com/32x32/avatar?bg=lightgray&amp;n=1" alt="placeholder"><img src="https://doodleipsum.com/32x32/avatar?bg=lightgray&amp;n=2" alt="placeholder"></div>
    </div>
  </div>
  `;
    switch(story.status) {
        case 'todo': document.getElementById('todo-column')!!.innerHTML += card;
        break;
        case 'doing' : document.getElementById('progress-column')!!.innerHTML += card;
        break;
        case 'done' : document.getElementById('completed-column')!!.innerHTML += card;
        break;
    }
});