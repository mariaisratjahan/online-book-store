const serchInputFeild=document.getElementById('search-input-feild');
const cardContainer=document.getElementById('card-container');
const totalSearchItems=document.getElementById('length');
const error=document.getElementById('error');

const searchFeild=()=>{   
    const searchInputFeildValue=serchInputFeild.value ;
    // clear total search items........
    totalSearchItems.textContent="";

    if(searchInputFeildValue === ''){
        error.innerText="No result found !!!";
        totalSearchItems.style.display="none";

    }
    else{
        // clear error message..............
        error.innerText='';
        
        url=`https://openlibrary.org/search.json?q=${searchInputFeildValue}`;
        fetch(url)
        .then(res => res.json())
        .then(data => searchResult(data))
        totalSearchItems.style.display="block";
    }
    // clear previous search results...........
    cardContainer.textContent="";   
  
   
}
const searchResult=(result)=>{
    console.log(result);
    const bookKeeper=result.docs;   
    if(bookKeeper.length === 0){
        error.innerText="No result found !!!";
    }
    else{
        totalSearchItems.innerHTML=`<h2 class="search-result">(Total ${bookKeeper.length} results found)</h2>`;
        bookKeeper.forEach(keep =>{
        const div=document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`
            <div class="card h-100 card-details">
                <img src="https://covers.openlibrary.org/b/id/${keep.cover_i}-M.jpg" class="img-fluid card-img-top" alt="...">
             <div class="card-body card-body ">
                <h3 class="card-title card-title-style">${keep.title}</h3>
                <h5 class="orange-color card-text">Author : <small>${keep.author_name ? keep.author_name :'no result found'}</small></h5>
                <p><span class="card-paragraph">Published by :</span> <small>${keep.publisher ? keep.publisher[0]: 'no result found'}</small></p>
                <p><span class="card-paragraph">First published year :<small class="text-muted"> ${keep.first_publish_year ? keep.first_publish_year : 'no result found'}</small></p>
             </div>
                
            </div>
        `;
        cardContainer.appendChild(div);

      });
    }
    // clear search feild..............
    serchInputFeild.value="";
}