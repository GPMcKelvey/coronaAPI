const homeURL = "https://api.covid19api.com";
const baseURL = "https://api.covid19api.com/summary";

// const options = {
//     method: 'GET',
//     mode: 'no-cors'
//   };

// X-Request-Id: 5cf9dfd5-3449-485e-b5ae-70a60e997864

             // key notation will differ from api to api look at api docs 
             //first parameter in our url will always start with a ? 
             //may need to add more depending on api - starts with ?

// fetch('https://api.covid19api.com/auth/access_token', {"Email": "gpmckelvey@gmail.com", "Subscription":"basic"}, {method: "POST"})
// .then(response => response.json())
//     .then(json => console.log(json));

fetch (`${baseURL}`, {
    method: 'GET',
    headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      }
  
  })
    .then(response => response.json())
    .then(json => {            
        let option;
        //console.log(json["Countries"][0].Country);
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
    
    let today = new Date();
dropdown.addEventListener("change", function (selectCountry){

    console.log(selectCountry.target.value);
    fetch (`${homeURL}/country/${selectCountry.target.value}/status/confirmed?from=2020-03-01T00:00:00Z&to=${today}`, {
        method: 'GET',
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
          }
      
      })
    .then(response => response.json())
    .then(json => {
        console.log(json);
        let caseResult = json;
        //console.log(caseResult);
        let lastIndex = caseResult[caseResult.length - 1].Cases;
        console.log(lastIndex);
            let resultsDisplay = document.getElementById("resultsDisplay");
            let para = document.createElement("p");
            para.textContent = lastIndex;
            resultsDisplay.appendChild(para);
            
         
        });
        while (resultsDisplay.firstChild){ 
            resultsDisplay.removeChild(resultsDisplay.firstChild); 
        }
})

