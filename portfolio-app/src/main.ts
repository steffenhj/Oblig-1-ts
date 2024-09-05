import './style.css'


const fetchDataFromServer = async () => {
    const response = await fetch('http://localhost:3999/json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const result = await response.json();

    console.log(result)

    const projectList = document.getElementById('project-list');
    if(!projectList) return;
    // id.innerHTML = result
    for(const project of result){
      const element = document.createElement('article');
      element.classList.add('project');
      const h2 = document.createElement('h2');
      h2.textContent = project.title;
      element.appendChild(h2);
      const p = document.createElement('p');
      p.textContent = project.description;
      element.appendChild(p);
      const category = document.createElement('p');
      category.textContent = project.category;
      element.appendChild(category);
      projectList.appendChild(element);
    }
}

fetchDataFromServer()

const addProject = async (event: Event) => {
  event.preventDefault();

  const projectName = document.getElementById('project-name') as HTMLInputElement;
  const projectDescription = document.getElementById('project-description') as HTMLInputElement;
  const projectCategory = document.getElementById('project-category') as HTMLInputElement;

  if(!projectName || !projectDescription || !projectCategory) return;

  const newProject = {
    title: projectName.value,
    description: projectDescription.value,
    category: projectCategory.value
  };

  const response = await fetch('http://localhost:3999/json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newProject)
  });

  if(response.ok){
    const projectList = document.getElementById('project-list');
    if(!projectList) return;

    console.log(newProject)

    const element = document.createElement('article');
    element.classList.add('project');
    const h2 = document.createElement('h2');
    h2.textContent = newProject.title;
    element.appendChild(h2);
    const p = document.createElement('p');
    p.textContent = newProject.description;
    element.appendChild(p);
    const category = document.createElement('p');
    category.textContent = newProject.category;
    element.appendChild(category);
    projectList.appendChild(element);
  }
}

const form = document.getElementById('project-form');
if(form){
  form.addEventListener('submit', addProject);
}