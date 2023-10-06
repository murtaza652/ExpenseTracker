const myForm = document.querySelector('#expenseForm');

const expenseAmount = document.querySelector('#expenseAmount');

const expenseCategory = document.querySelector('#expenseCategory');
const expenseDesc = document.querySelector('#expenseDesc');
const itemList = document.getElementById('items');


myForm.addEventListener('submit', onSubmit);
itemList.addEventListener('click', removeItem);
  
function onSubmit(e){
    e.preventDefault();
    const amount=expenseAmount.value;
    const category=expenseCategory.value;
    const description=expenseDesc.value;
    var myObj={
        amount,category,description
    };
    axios.post('http://localhost:5000/add-expense',myObj)
      .then(res=> {
        showOnscreen(res.data.newData)
      })
      .catch(e=> console.log(e))
  }
  function showOnscreen(data)
  {
    // Create new li element
    var li = document.createElement('li');
    // Add class
    li.className = 'items';
    // Add text node with input value
    li.appendChild(document.createTextNode(data.category));
    li.appendChild(document.createTextNode("-"));
    li.appendChild(document.createTextNode(data.description));
    li.appendChild(document.createTextNode("-"));
    li.appendChild(document.createTextNode(data.amount));
    li.appendChild(document.createTextNode(" "));
    // Create del button element
    var deleteBtn = document.createElement('button');
    var editBtn= document.createElement('button');
    // Add classes to del button
    deleteBtn.className = 'btn-sm float-right delete';
    deleteBtn.id=data.id;
    editBtn.className="btn-sm float-right edit";
    editBtn.id=data.id;
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
      axios.post('http://localhost:5000/delete',{id:e.target.id})
      .then(res=> {
        console.log(res);
      })
      .catch(e=> console.log(e))
      itemList.removeChild(li);
    }
    if(e.target.classList.contains('edit')){
      var li = e.target.parentElement;
      expenseDesc.value=li.firstChild.nextSibling.nextSibling.nodeValue;
      expenseCategory.value=li.firstChild.nodeValue;
      expenseAmount.value=li.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nodeValue;
      axios.post('http://localhost:5000/delete',{id:e.target.id})
      .then(res=> {
        console.log(res);
      })
      .catch(e=> console.log(e))
      itemList.removeChild(li);
  }
}
window.addEventListener('DOMContentLoaded',()=>{
  axios.get('http://localhost:5000/add-expense')
    .then( res=> {
      console.log(res.data.user);
      for(var i=0; i<res.data.user.length; i++) { 
        showOnscreen(res.data.user[i]);
    }})

})