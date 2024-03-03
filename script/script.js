
const allPost = async () =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
    const data = await res.json();
    showPost(data.posts);
}

const showPost = (posts)=>{

    const postsContainer = document.getElementById('post-container');
    posts.forEach(element => {
        console.log(element);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card max-w-[600px]: bg-[#F3F3F5] p-10 mb-4">
        <div class="flex space-x-3">
            <div>
                <img src="${element.image}" alt="Shoes" class="w-20 rounded-full" />
            </div>
          <div>
            <div>
                <div class="border-dashed border-b-2 space-y-2">
                    <p class="">#<span class="px-1">${element.category}</span>Author:<span>${element.author.name}</span></p>
                    <h2 class="card-title">${element.title}</h2>
                      <p class="pb-2">${element.description}</p>
                </div>
            </div>
            <div class="py-3">
              <div class="card-actions justify-between">
                <div class="flex space-x-2">
                    <p><i class="fa-regular fa-message"></i><span class="px-2">${element.comment_count}</span></p>
                    <p><i class="fa-regular fa-eye"></i><span class="px-2">${element.view_count}</span></p>
                    <p><i class="fa-regular fa-clock"></i><span class="px-2">${element.posted_time}</span></p>
                </div> 
                <div><button onclick="addPost(${element.id})" class="btn bg-[#10B981] p-4 rounded-full text-white"><i class="fa-regular fa-envelope-open"></i></button></i></div>
              </div>
            </div>
          </div>
          </div>
    </div>
    
        `;
postsContainer.appendChild(div);

    });
}

//this is add post function here
const addPost = (element)=>{
    let cardCount = document.getElementById('read-card-count').innerText;
    let convertNumber = parseInt(cardCount);
    const newValue = convertNumber + 1;
    const setValue = document.getElementById('read-card-count');
    setValue.innerText = newValue;
    const readCard = document.getElementById('read-card');
    const div = document.createElement('div');
    div.innerHTML = `
    <tr>
    <td>${element} Kids Unaware of Their Halloween Costume</td>
    <td><p><i class="fa-regular fa-eye inline"></i><span class="px-2 ">665</span></p></td>
    </tr>
    `;
    readCard.appendChild(div);
} 

allPost();