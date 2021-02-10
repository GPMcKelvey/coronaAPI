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
let requestOptions = {
    method: 'GET',
    redirect: 'follow',
    //mode: 'no-cors'
  };

fetch (`${baseURL}`, requestOptions)
    .then(response => response.json())
    .then(json => {            
        let option;
        //console.log(json);
        //console.log(json["Countries"][0].Country);
            for (let i = 0; i < json["Countries"].length; i++) {
              option = document.createElement('option');
                option.text = json["Countries"][i].Country;
                option.value = json["Countries"][i].Slug;
                dropdown.add(option); 
            }    
            //console.log(option);
        }).catch(error => console.log("error", error));

    
    let dropdown = document.getElementById('countriesList');
    dropdown.length = 0;
    
    let defaultOption = document.createElement('option');
    defaultOption.text = 'Choose Country';
    
    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;
    
    let today = new Date();
dropdown.addEventListener("change", function (selectCountry){
    // if (selectCountry.target.value === "united-states") {
    //     let hotMess = "The US is a hot mess. Data unavailable"
    //     let resultsDisplay = document.getElementById("resultsDisplay");
    //         let para = document.createElement("p");
    //         para.textContent = hotMess;
    //         resultsDisplay.appendChild(para);
    // } else {}

    //console.log(selectCountry.target.value);
    fetch (`${homeURL}/country/${selectCountry.target.value}/status/confirmed?from=2020-03-01T00:00:00Z&to=${today}`, requestOptions)
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
            
         
        }).catch(error => console.log("error", error));
        while (resultsDisplay.firstChild){ 
            resultsDisplay.removeChild(resultsDisplay.firstChild); 
        }
});

