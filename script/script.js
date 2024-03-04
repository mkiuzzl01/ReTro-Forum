
const allPost = async (search ='') =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${search}`);
    const data = await res.json();
    const info = data.posts;
    showPost(info);
    LoadingSpinner(true)

}
const latestPost = async ()=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
    const data = await res.json();
    latest(data);
}

const showPost = (posts)=>{

    const postsContainer = document.getElementById('post-container');
    postsContainer.innerHTML = "";
    posts.forEach(element => {

        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card  bg-[#F3F3F5] p-10 mb-4">
        <div class="flex space-x-3">
          <div class="indicator w-32 h-24 lg:w-34 lg:h-32">
            <span class="indicator-item badge ${element.isActive? "bg-green-500":" bg-red-500"}"></span> 
               <img src="${element.image}" alt="Shoes" class="rounded-3xl" />
           </div>
        <div>
            <div>
                <div class="border-dashed border-b-2 space-y-2">
                    <p class="">#<span class="px-1">${element.category}</span> Author:<span class="px-1">${element.author?.name}</span></p>
                    <h2 class="card-title">${element.title}</h2>
                      <p class="pb-2">${element.description}</p>
                </div>
            </div>
            <div class="py-3">
              <div class="card-actions justify-between">
                <div class="flex space-x-2">
                    <p><i class="fa-regular fa-message"></i><span class="px-2">${element.comment_count}</span></p>
                    <p><i class="fa-regular fa-eye"></i><span class="px-2">${element.view_count}</span></p>
                    <p><i class="fa-regular fa-clock"></i><span class="px-2">${element.posted_time}</span>min</p>
                </div> 
                <div><button onclick="addPost('${element.title.replace("'","")}','${element.view_count}')" class="btn bg-[#10B981] p-4 rounded-full text-white"><i class="fa-regular fa-envelope-open"></i></button></i></div>
              </div>
            </div>
          </div>
          </div>
    </div>
    
        `;
postsContainer.appendChild(div);

    });
    setTimeout(() => {
    LoadingSpinner(false);
    }, 2000);
}

//read count function
const readCount = ()=>{
    let cardCount = document.getElementById('read-card-count').innerText;
    let convertNumber = parseInt(cardCount);
    const newValue = convertNumber + 1;
    const setValue = document.getElementById('read-card-count');
    setValue.innerText = newValue;
}
//this is add post function here
const addPost = (elementTile,elementView)=>{
  const readCard = document.getElementById('read-card');
  const div = document.createElement('div');
  div.classList.add('flex')
  div.innerHTML = `
    <tr>
    <div class="card w-full bg-base-100 shadow-xl">
    <div class="card-body">
      <div class="card-actions justify-between">
        <div class="">${elementTile}</div> 
        <div class="px-2"><i class="fa-regular fa-eye inline"></i> ${elementView}</div>
      </div>
    </div>
  </div>

    </tr>
    `;
    readCard.appendChild(div);
    readCount();
    console.log(elementTile,elementView);
  } 


//this latestPost function
const latest = (data)=>{
    const latest = document.getElementById('latest-Post');
    data.forEach(info =>{
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card w-full bg-base-100 border-2 p-3">
        <figure><img src="${info.cover_image}" alt="Shoes" /></figure>
        <div class="card-body">
          <div class="space-x-2">
            <i class="fa-regular fa-calendar"></i>
            <p class="inline"><span>${info.author.posted_date?`${info.author.posted_date}`:`No publish Date`}</span></p>
          </div>
          <h2 class="font-extrabold"><span>${info.title}</span></h2>
          <p>${info.description}</p>
          <div class="card-actions">
            <div><img src="${info.profile_image}" alt="" class="w-14 rounded-full"></div> 
            <div>
              <h2><span>${info.author.name?`${info.author.name}`:`Unknown`}</span></h2>
              <h4>${info.author?.designation?`${info.author.designation}`:`Unknown`}</h4>
            </div>
          </div>
        </div>
      </div>`;
      latest.appendChild(div);
    });
}

//this is search function here
const search = ()=>{
    LoadingSpinner(true);
    const inputValue = document.getElementById('search');
    const value = inputValue.value;
    allPost(value);
}
//Loading spinner function
const LoadingSpinner = (isLoading)=>{
    const spinner1 = document.getElementById('loading-spinner1');
    const spinner2 = document.getElementById('loading-spinner2');
    if(isLoading){
        spinner1.classList.remove('hidden');
        spinner2.classList.remove('hidden');
    }else{
        spinner1.classList.add('hidden');
        spinner2.classList.add('hidden');
    }
}
allPost();
latestPost();