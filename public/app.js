console.log("Sanity Check: JS is working!");

let backendRoute = new URL("http://localhost:8000/api");

const getScrape = async (backendRoute) => {
    try {
        const response = await fetch(backendRoute);
        let json = await response.json();
        console.log(json);
        let mList = document.getElementById('movie-list');
        var ul = document.createElement('ul');
        mList.appendChild(ul);
        for(let i=0; i<json.length; i++){
            let title = json[i].title;
            let year = json[i].year;
            let rate = json[i].rate;
            var li = document.createElement('li');
            ul.appendChild(li);
            li.innerHTML += `${title} - ${year} - rating: ${rate}`;
        }
    }catch (error) {
        console.log(error);
    }
}
getScrape(backendRoute);