'use strict';
var allEmployee = [];
function Employee(fullName,department,level,img){
    this.employeeID=0;
    this.fullName=fullName;
    this.department=department;
    this.level=level;
    this.imageURL=img;
    this.salary=0;
};
Employee.prototype.randomSalary=function(level){
    if(level=="Junior"){
        return generateNumber(500,1000);
    }
    if(level=="Mid-Senior"){
        return generateNumber(1000,1500);
    }
    if(level=="Senior"){
        return generateNumber(1500,2000);
    }
}
Employee.prototype.calculatSalary=function(){
    let random=this.randomSalary(this.level)
    random-=random*0.075;
    this.salary = random;
}
Employee.prototype.generateUniqueID=function(){
    this.employeeID = generateNumber(1000,9999);
    for(let i=0;i<allEmployee.length;i++){
        if(this.employeeID == allEmployee[i].employeeID){
            this.employeeID = generateNumber(1000,9999);
            i=-1
        }
    }
}
Employee.prototype.render=function(){
    let showEmployee = document.getElementById("showEmployee");
    let div = document.createElement("div");
    div.setAttribute("class", "EM");
    div.setAttribute("id", this.employeeID);
    showEmployee.appendChild(div);
    let showDiv=document.getElementById(this.employeeID);
    let img = document.createElement("img");
    img.setAttribute("src", this.imageURL);
    img.setAttribute("class", "icon");
    let prainFirst = document.createElement("p");
    let printSecond = document.createElement("p");
    let printThird = document.createElement("p");
   
    
    prainFirst.textContent="Name: "+this.fullName[0]+" "+this.fullName[1]+" - ID: "+this.employeeID;
    printSecond.textContent="Department: "+this.department+" - Level:  "+this.level;
    printThird.textContent=this.salary+"$";
    showDiv.appendChild(img);
    showDiv.appendChild(prainFirst);
    showDiv.appendChild(printSecond);
    showDiv.appendChild(printThird);
}
function generateNumber (min,max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function addEmployee(fullName,department,level,Img){
    let newEmp=new Employee(fullName,department,level,Img);
    newEmp.generateUniqueID();
    newEmp.calculatSalary();
    allEmployee.push(newEmp);
    return newEmp;
}
function clearEmployees(){
    localStorage.clear();
    location.reload();
}
function handelSubmit(event){
        event.preventDefault();
        let name = event.target.name.value.split(" ");
        name[0]=name[0].charAt(0).toUpperCase() + name[0].slice(1)
        if(name.length==1) {
            name.push("")
        }
        name[1]=name[1].charAt(0).toUpperCase() + name[1].slice(1)
        let department = event.target.department.value;
        let img = event.target.image.value;
        if(img==''){
            img='./assets/male.jpg'
        }
        let level = event.target.level.value;
        getData();
        let newEmp = addEmployee(name,department,level,img);
        newEmp.render(print);
        saveData();  
        
}
function renderAll(){
    document.getElementById("showEmployee").innerHTML="";
    for(let i of allEmployee){
        i.render();
    }
}
function saveData(){
    localStorage.setItem("employee", JSON.stringify(allEmployee));
}
function retrieveObject(obj) {
    let newObj=new Employee(obj.fullName,obj.department,obj.level,obj.imageURL);
    newObj.employeeID=obj.employeeID;
    newObj.salary=obj.salary;
    allEmployee.push(newObj);
}
function getData(){
    let parseEmployee = JSON.parse(localStorage.getItem("employee"));
    console.log(parseEmployee)
    if(parseEmployee!=null){
        allEmployee=[];
        for(let i of parseEmployee){
            retrieveObject(i);
        }
    }
    renderAll();
}
document.getElementById("dataForm").addEventListener("submit", handelSubmit);
document.getElementById("reset").addEventListener("click",clearEmployees)
getData();
