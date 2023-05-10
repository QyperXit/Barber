const now = new Date();
const dateString = now.toISOString().slice(0, 16);


let schedule = document.querySelector('.schedule')
let monday = document.querySelector('.monday')
let tuesday = document.querySelector('.tuesday')
let wednesday = document.querySelector('.wednesday')
let thursday = document.querySelector('.thursday')
let friday = document.querySelector('.friday')
let saturday = document.querySelector('.saturday')
let sunday = document.querySelector('.sunday')
let name = document.getElementById('name')
let dateTime = document.getElementById('appointment-time')
let submitButton = document.getElementById('submit-button')
document.getElementById('appointment-time').value = dateString;

schedule.addEventListener('dblclick', (e) => {
 deleteX(e)
//  editCard(e)
})

submitButton.addEventListener('click',(e) => {
    e.preventDefault()
    load()

})

let cardData = JSON.parse(localStorage.getItem('save')) || []
let timeValue;
let formattedDate
let newTimeValue
document.addEventListener('DOMContentLoaded',restoreSave)

function load(){
const dateTimeValue = document.getElementById('appointment-time').value;

// Parse the date string into a Date object
const date = new Date(dateTimeValue);

// Format the date with the desired format
formattedDate = date.toLocaleString('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
});

// Get the time value from the input
timeValue = dateTimeValue.split('T')[1];

  // Add 30 minutes to the time value
  const newTime = new Date(date.getTime() + 30 * 60000);
  newTimeValue = newTime.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

   // Create a new card elements
let card = document.createElement('div')
  
let edit = document.createElement('a')
let h3 = document.createElement('h3')
let cardInfo = document.createElement('div')
let dateInfo =document.createElement('a')
let timeInfo =document.createElement('a')

card.className = 'card'
edit.className = 'card-edit';
h3.className = 'card-name';
cardInfo.className = 'card-info';
dateInfo.className = 'card-date';
timeInfo.className = 'card-time';

// edit.textContent = 'Edit'
h3.textContent = name.value
dateInfo.textContent = formattedDate;
timeInfo.textContent = `${timeValue} - ${newTimeValue}`;


let dayOfWeek = date.getDay(); 

if(dayOfWeek === 0) {
 sunday.appendChild(card)
} else if (dayOfWeek === 1){
   monday.appendChild(card)
} else if (dayOfWeek === 2){
  tuesday.appendChild(card)
} else if (dayOfWeek === 3){
  wednesday.appendChild(card)
} else if (dayOfWeek === 4){
  thursday.appendChild(card)
} else if (dayOfWeek === 5) {
   friday.appendChild(card)
} else {
  saturday.appendChild(card)
}


card.appendChild(edit).innerHTML = '<i class="fa-sharp fa-solid fa-bars"></i>'
card.appendChild(h3)
card.appendChild(cardInfo)
cardInfo.appendChild(dateInfo)
cardInfo.appendChild(timeInfo)
saveData()




// Clear the name input field
name.value =''

}

//localstorage
function saveData (){
const dateTimeValue = document.getElementById('appointment-time').value;

    // Parse the date string into a Date object
    const date = new Date(dateTimeValue);

    // Format the date with the desired format
    const formattedDate = date.toLocaleString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    // Get the time value from the input
    const timeValue = dateTimeValue.split('T')[1];

    const card = {
        name: name.value,
        date: formattedDate,
        time: `${timeValue} - ${newTimeValue}`
    }

    cardData.push(card)
    localStorage.setItem("save",JSON.stringify(cardData))
}

//restore localstorage
function restoreSave(){
    cardData.forEach(savedCard =>{
        let card = document.createElement('div')
  
        let edit = document.createElement('a')
        let h3 = document.createElement('h3')
        let cardInfo = document.createElement('div')
        let dateInfo =document.createElement('a')
        let timeInfo =document.createElement('a')

        card.className = 'card'
        edit.className = 'card-edit';
        h3.className = 'card-name';
        cardInfo.className = 'card-info';
        dateInfo.className = 'card-date';
        timeInfo.className = 'card-time';

        h3.textContent = savedCard.name
        dateInfo.textContent = savedCard.date;
        timeInfo.textContent = savedCard.time;

        let date = new Date(savedCard.date)
        let dayOfWeek = date.getDay(); 

        if(dayOfWeek === 0) {
            sunday.appendChild(card)
        } else if (dayOfWeek === 1){
            monday.appendChild(card)
        } else if (dayOfWeek === 2){
            tuesday.appendChild(card)
        } else if (dayOfWeek === 3){
            wednesday.appendChild(card)
        } else if (dayOfWeek === 4){
            thursday.appendChild(card)
        } else if (dayOfWeek === 5) {
            friday.appendChild(card)
        } else {
            saturday.appendChild(card)
        }

        card.appendChild(edit).innerHTML = '<i class="fa-sharp fa-solid fa-bars"></i>'
        card.appendChild(h3)
        card.appendChild(cardInfo)
        cardInfo.appendChild(dateInfo)
        cardInfo.appendChild(timeInfo)
    })
}


function deleteX(e) {
  if (e.target.nodeName === 'DIV' && e.target.className === 'card') {
    // Remove the card from the DOM
    e.target.remove();

    // Remove the card from the local storage
    const cardIndex = Array.from(schedule.children).indexOf(e.target);
      console.log('cardIndex:', cardIndex);


    cardData.splice(cardIndex, 1);
    localStorage.setItem('save', JSON.stringify(cardData));
  }
}



// function editCard(e){
//   console.log(e.target)
// }