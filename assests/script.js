//******************************************************************************************** */
// GETTING REQUIRED FILED DATAS
const inputBox = document.querySelector(".inputField input");  //SEARCH INPUT
const langlist = document.querySelector(".langlist"); //TABLE1 DATA
const drop = document.querySelector(".droplist");  //TABLE2
const deleteAllBtn2 = document.querySelector(".footer2 button");
let draggable = document.querySelector(".lang-value");



//STARTING VALUE TO LOCAL STORAGE
const Lang = [
  {"name":"Javascript"},{"name":"Angular"},
  {"name":"C Language"},{"name":"C++"},{"name":"Java"},
  {"name":"Objective-C"},{"name":"PHP"},{"name":"Python"},
  {"name":"React JS"},{"name":"SQL"},{"name":"Vue JS"}
]
localStorage.setItem("New Todo", JSON.stringify(Lang));


//STARTING VALUE TO LOCAL STORAGE2
const Lang2 = []
localStorage.setItem("New Lang", JSON.stringify(Lang2));

showTasks(); //calling showTask function
showSelected();//calling


//****************************************SEARCH List functions************************************************************** */
let searchtextbox = document.getElementById("searchtextbox");
let emptyTable =  document.querySelector(".searchEmpty");
searchtextbox.addEventListener("input", function(){
    let trlist = document.querySelectorAll(".row-list");
    Array.from(trlist).forEach(function(item){
        let searchedtext = item.getElementsByTagName("td")[0].innerText;
        let searchtextboxval = searchtextbox.value.trim();
        let re = new RegExp(searchtextboxval, 'gi');
        if(searchedtext.match(re)){

          console.log(re);
            item.style.display="table-row";
        }
        else{
            item.style.display="none";
        }
    })
})

/************SERACH FUNCTION ENDED******************/



// MOBILE DEVICE SELECTABLE LANGUAGE FUNCTION
function addlang(index){
  let getLocalStorageData = localStorage.getItem("New Lang");
  let getLocalStorageData2 = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray2 = JSON.parse(getLocalStorageData2);
  if(getLocalStorageData == null){ //if localstorage has no data
    listArray = []; //create a blank array
  }else{
    listArray = JSON.parse(getLocalStorageData);  //transforming json string into a js object
  }
  let langlist = listArray2[index].name;
  listArray.push({'name' :langlist});
  listArray2.splice(index, 1); //delete or remove the li
  localStorage.setItem("New Lang", JSON.stringify(listArray));
  localStorage.setItem("New Todo", JSON.stringify(listArray2));
  showTasks(); //call the showTasks function
  showSelected();
}

// ENDED MOBILE DEVICE SELECTABLE LANGUAGE FUNCTION


/**********************************SELECT LANGUAGE TABEL DATA*********************/

//TABLE DISPALY DATA
function showTasks(){
  let getLocalStorageData = localStorage.getItem("New Todo");
  if(getLocalStorageData == null){
    listArray = [];
  }else{
    listArray = JSON.parse(getLocalStorageData); 
  }
  const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length; 
  let newTdTag = "";
  listArray.forEach((element, index) => {
    newTdTag += `<tr class="row-list"><td draggable="true" ondragstart="drag(event, ${index})" ondragend="dragEnd(event)" class="lang-value">${element.name}<span class="icon2" onclick="addlang(${index})"><i class="fas fa-plus"></i></span></td></tr>`;
  });
  langlist.innerHTML = newTdTag; //adding new tr tag inside table tag
  inputBox.value = ""; //once task added leave the input field blank
}

//ENDED SELECT TABLE DISPALY DATA



//****************************************Selected functions******************************** */


//SELECT LANGUAGE TABEL DATA
function showSelected(){
  let getLocalStorageData = localStorage.getItem("New Lang");
  if(getLocalStorageData == null){
    listArray = [];
  }else{
    listArray = JSON.parse(getLocalStorageData); 
  }
  const pendingTasksNumb = document.querySelector(".selectedTask");
  pendingTasksNumb.textContent = listArray.length; //passing the array length in pendingtask
  let newTdTag = "";
  listArray.forEach((element, index) => {
    newTdTag += `<tr class="row-list"><td draggable="true" ondragstart="draglang(event, ${index})" ondragend="draglangend(event)" ondragover="allowdroplang(event, ${index})" ondrop="droplang(event, ${index})">${element.name}<span class="icon" onclick="deletelang2(${index})"><i class="fas fa-trash-alt"></i></span></td>`;
  });
  drop.innerHTML = newTdTag; //adding new tr tag inside table tag
  inputBox.value = ""; //once task added leave the input field blank
} 


//DELETE LANGUAGE TABEL DATA
function deletelang2(index){
  let getLocalStorageData = localStorage.getItem("New Lang");
  let getLocalStorageData2 = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray2 = JSON.parse(getLocalStorageData2);
  let langlist2 = listArray[index].name;
  listArray2.push({'name' :langlist2});
  listArray.splice(index, 1); //delete or remove the li
  localStorage.setItem("New Lang", JSON.stringify(listArray));
  localStorage.setItem("New Todo", JSON.stringify(listArray2));
  showTasks(); //call the showTasks function
  showSelected();
}


//DRAG AND DROP EVENT FUNCTIONS
function allowDrop(ev) {  
  ev.preventDefault();
}

function drag(ev, index) {
   ev.target.style.opacity = '0.4';
   ev.target.style.background = '#523cce';
   ev.target.style.color = '#fff';
   ev.dataTransfer.setData("text", index);
}

function dragEnd(ev) {
  ev.target.style.removeProperty('opacity');
  ev.target.style.removeProperty('background');
  ev.target.style.removeProperty('color');
}

function drops(ev) {
  var data = ev.dataTransfer.getData("text");
  let getLocalStorageData = localStorage.getItem("New Lang");
  let getLocalStorageData2 = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray2 = JSON.parse(getLocalStorageData2);
  let langlist = listArray2[data].name;
  listArray.push({'name' : langlist});
  listArray2.splice(data, 1); //delete or remove the li
  localStorage.setItem("New Lang", JSON.stringify(listArray));
  localStorage.setItem("New Todo", JSON.stringify(listArray2));
  showTasks(); //call the showTasks function
  showSelected();
}
//DRAG AND DROP EVENT FUNCTIONS ENDED


//LANG STORAGE DRAG AND DROP
function draglang(ev1, index) {
  ev1.dataTransfer.setData("text", index);
  ev1.target.style.opacity = '0.4';
  ev1.target.style.background = '#398bd3';
  ev1.target.style.color = '#fff';
 
}

function draglangend(ev1) {
  ev1.target.style.removeProperty('opacity');
  ev1.target.style.removeProperty('background');
  ev1.target.style.removeProperty('color');
}

function allowdroplang(ev1, index) {
  ev1.preventDefault();
}


function droplang(ev1 ,index) {
  
  var data = ev1.dataTransfer.getData("text");
  let getLocalStorageData = localStorage.getItem("New Lang");
  listArray = JSON.parse(getLocalStorageData);
  var dragval = listArray[data];
  var dropval = listArray[index];
  console.log(data);
  console.log(index);
  [dragval, dropval] =  [dropval, dragval]
  listArray.splice(data, index, dragval, dropval);
  listArray2.splice(dragval, 1); //delete or remove the li
  listArray2.splice(dropval, 1); //delete or remove the li
  
//   console.log(a);
//   console.log(b);
  
  // listArray.push(dragval);
  // listArray.push(dropval);
  localStorage.setItem("New Lang", JSON.stringify(listArray));
  // // listArray2.splice(data, 1); 
  // // listArray2.splice(data, 1); 
  console.log(dragval);
  console.log(dropval);
  showSelected();
}

