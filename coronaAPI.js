const homeURL = "https://api.covid19api.com/";
const baseURL = "https://api.covid19api.com/summary";


// X-Request-Id: 5cf9dfd5-3449-485e-b5ae-70a60e997864

             // key notation will differ from api to api look at api docs 
             //first parameter in our url will always start with a ? 
             //may need to add more depending on api - starts with ?
// fetch (`${baseURL}`)
//     .then(response => response.json())
//     .then(json => console.log(json));

// fetch('https://api.covid19api.com/auth/access_token', {"Email": "gpmckelvey@gmail.com", "Subscription":"basic"}, {method: "POST"})
// .then(response => response.json())
//     .then(json => console.log(json));

fetch (`${baseURL}`)
    .then(response => response.json())
    .then(json => {            
        let option;
        console.log(json["Countries"][0].Country);
            for (let i = 0; i < json["Countries"].length; i++) {
              option = document.createElement('option');
                option.text = json["Countries"][i].Country;
                option.value = json["Countries"][i].Slug;
                dropdown.add(option); 
            }    console.log(option);}).catch(e => console.log(e));

    
    let dropdown = document.getElementById('countriesList');
    dropdown.length = 0;
    
    let defaultOption = document.createElement('option');
    defaultOption.text = 'Choose Country';
    
    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;
    
 
dropdown.addEventListener("change", function (selectCountry){

    console.log(selectCountry.target.value);
    fetch (`https://api.covid19api.com/country/${selectCountry.target.value}/status/confirmed?from=2021-02-07T00:00:00Z&to=2021-02-08T00:00:00Z`)
    .then(response => response.json())
    .then(json => {
        //console.log(json);
        let caseResult = json[1].Cases;
        console.log(caseResult);
           
            let resultsDisplay = document.getElementById("resultsDisplay");
            let para = document.createElement("p");
            para.textContent = caseResult;
            resultsDisplay.appendChild(para);
            
         
        });
        while (resultsDisplay.firstChild){ 
            resultsDisplay.removeChild(resultsDisplay.firstChild); 
        }
})

