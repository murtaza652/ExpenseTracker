const myForm = document.querySelector('#expenseForm');

const expenseAmount = document.querySelector('#expenseAmount');

const expenseCategory = document.querySelector('#expenseCategory');
const expenseName = document.querySelector('#expenseName');
const itemList = document.getElementById('items');


myForm.addEventListener('submit', onSubmit);
itemList.addEventListener('click', removeItem);
  
function onSubmit(e){
    e.preventDefault();
    
    let myObj={
        expenseAmount:expenseAmount.value,
        expenseCategory:expenseCategory.value,
        expenseName:expenseName.value
    };
    myObj=JSON.stringify(myObj);
    e.preventDefault(); 
    localStorage.setItem(expenseName.value,myObj);
  
    // Create new li element
    var li = document.createElement('li');
    // Add class
    li.className = 'items';
    // Add text node with input value
    li.appendChild(document.createTextNode(expenseAmount.value));
    li.appendChild(document.createTextNode("-"));
    li.appendChild(document.createTextNode(expenseCategory.value));
    li.appendChild(document.createTextNode("-"));
    li.appendChild(document.createTextNode(expenseName.value));
    li.appendChild(document.createTextNode(" "));
    // Create del button element
    var deleteBtn = document.createElement('button');
    var editBtn= document.createElement('button');
    // Add classes to del button
    deleteBtn.className = 'btn-sm float-right delete';
    editBtn.className="btn-sm float-right edit"
    // Append text node
    deleteBtn.appendChild(document.createTextNode('delete'));
    editBtn.appendChild(document.createTextNode('edit'));  
    // Append button to li
    li.appendChild(deleteBtn);
    li.appendChild(document.createTextNode(" "));
    li.appendChild(editBtn);
    // Append li to list
    itemList.appendChild(li);
  }  
  
  function removeItem(e){
    if(e.target.classList.contains('delete')){
      var li = e.target.parentElement;
      console.log(li);
      localStorage.removeItem(li.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nodeValue);
      itemList.removeChild(li); 
    }
    if(e.target.classList.contains('edit')){
      var li = e.target.parentElement;
      expenseCategory.value=li.firstChild.nextSibling.nextSibling.nodeValue;
      expenseAmount.value=li.firstChild.nodeValue;
      expenseName.value=li.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nodeValue;
      localStorage.removeItem(li.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nodeValue);
      itemList.removeChild(li);
  }
}