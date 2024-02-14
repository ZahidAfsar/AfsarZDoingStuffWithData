import { fetchData } from "./fetchData.js";


let displayTable = document.getElementById('displayTable');

let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');

let mainRow = document.getElementById('mainRow');
let peoplePerPage = document.getElementById('peoplePerPage');

let backBtn = document.getElementById('backBtn');
let nextBtn = document.getElementById('nextBtn');

let backBtn2 = document.getElementById('backBtn2');
let nextBtn2 = document.getElementById('nextBtn2');

let btnList = document.getElementById('btnList');

let data = await fetchData();

let ListInOrder;

let pageSize = parseInt(peoplePerPage.value);
let PageShow = 1;

let PageMax;

let sortBy;
let isReversed = false;


const Sort = (sorted) => {
    let reverse = false;
    if (sortBy === sorted && !isReversed)
     {
        reverse = true;
        isReversed = true;
    } else {
        isReversed = false;
    }
    sortBy = sorted;
    let people = data.People;

    if (typeof people[0][sorted] === 'number')
     {
        ListInOrder = people.slice(0).sort(
             (person1, person2) => person1[sorted] - person2[sorted]
              );
    } else {
        ListInOrder = people.slice(0).sort(
             (person1, person2) => person1[sorted].toString().toLowerCase().localeCompare(person2[sorted].toString().toLowerCase())
              );
    }
    if (reverse) {
        ListInOrder.reverse();
    }
    personList(ListInOrder);
}

const personList = (list) => {
    displayTable.innerHTML = '';
    displayTable.append(mainRow);
    let start = (PageShow - 1 ) * pageSize;

    let end = start + pageSize;

    if (end > ListInOrder.length) {
        end = ListInOrder.length;
    }
    for (let i = start; i < end; i++) {
        let person = list[i];
        let tr = document.createElement('tr');
        let tdFirstName = document.createElement('td');
        tdFirstName.textContent = person.FirstName;
        let tdID = document.createElement('td');
        tdID.textContent = person.Id;
        let tdLastName = document.createElement('td');
        tdLastName.textContent = person.LastName;
        let tdHeight = document.createElement('td');
        tdHeight.textContent = person.Height;
        let tdEmail = document.createElement('td');
        tdEmail.textContent = person.Email;
        let tdAge = document.createElement('td');
        tdAge.textContent = person.Age;
        tr.append(tdID, tdFirstName, tdLastName, tdEmail, tdHeight, tdAge);
        displayTable.append(tr);
    }
}

const clickNext = () => {
    if (PageShow < PageMax) {

        PageShow++;

        backBtn.classList.remove('disabled');
        if (PageShow === PageMax) {
            nextBtn.classList.add('disabled');
        }

        personList(ListInOrder);
        removeActive();
        document.getElementById(`page${PageShow}Item`).classList.add('active');
    }
    
}

const clickPrev = () => {
    if (PageShow > 1) {
        PageShow--;

        nextBtn.classList.remove('disabled');
        if (PageShow === 1) {
            backBtn.classList.add('disabled');
        }

        personList(ListInOrder);
        removeActive();
        document.getElementById(`page${PageShow}Item`).classList.add('active');
    }
   
}

personID.addEventListener('click', () => {
    resetPage();
    Sort('Id');
    removeClass('highlight', 'mainRow');
    personID.classList.add('highlight');
});

firstName.addEventListener('click', () => {
    resetPage();
    Sort('FirstName');
    removeClass('highlight', 'mainRow');
    firstName.classList.add('highlight');
});

lastName.addEventListener('click', () => {
    resetPage();
    Sort('LastName');
    removeClass('highlight', 'mainRow');
    lastName.classList.add('highlight');
});

email.addEventListener('click', () => {
    resetPage();
    Sort('Email');
    removeClass('highlight', 'mainRow');
    email.classList.add('highlight');
});

height.addEventListener('click', () => {
    resetPage();
    Sort('Height');
    removeClass('highlight', 'mainRow');
    height.classList.add('highlight');
});

age.addEventListener('click', () => {
    resetPage();
    Sort('Age');
    removeClass('highlight', 'mainRow');
    age.classList.add('highlight');
});

nextBtn2.addEventListener('click', () => {
    clickNext();
});

backBtn2.addEventListener('click', () => {
    clickPrev();
});

peoplePerPage.addEventListener('change', () => {
    resetPage();
    createBtns();
    personList(ListInOrder);
});

const resetPage = () => {
    backBtn.classList.add('disabled');
    nextBtn.classList.remove('disabled');

    PageShow = 1;

    pageSize = parseInt(peoplePerPage.value);

    PageMax = Math.ceil(data.People.length / pageSize);
    removeActive();
    document.getElementById(`page1Item`).classList.add('active');
}

const createBtns = () => {
    btnList.innerHTML = '';

    btnList.append(backBtn);

    for (let i = PageShow; i <= PageMax; i++) {
        let a = document.createElement('a');
        a.classList.add('page-link');
        a.textContent = i;
        a.href = '#';
        a.id = `page${i}Btn`;
        let li = document.createElement('li');
        li.classList.add('page-item');
        li.id = `page${i}Item`;
        li.addEventListener('click', () => {
            PageShow = parseInt(li.textContent);
            personList(ListInOrder);
            disablePrevNext();
            removeActive();
            li.classList.add('active');
        });

        li.append(a);
        btnList.append(li);
    }

    btnList.append(nextBtn);
    document.getElementById(`page1Item`).classList.add('active');
}

const removeActive = () => {
    // gets everything '*'
    let listItems = document.querySelectorAll('.pagination *');
    listItems.forEach( e => e.classList.remove('active'));
}

const removeClass = (className, parentID) => {
    let listItems = document.querySelectorAll(`#${parentID} *`);
    listItems.forEach( e => e.classList.remove(className));
}

const disablePrevNext = () => {
    backBtn.classList.remove('disabled');
    nextBtn.classList.remove('disabled');

    if (PageShow === 1) {
        backBtn.classList.add('disabled');
    }
    if (PageShow === PageMax) {
        nextBtn.classList.add('disabled');
    }
}

const onStart = async () => {
    createBtns();
    Sort('Id');
    fetchData();
}

PageMax = Math.ceil(data.People.length / pageSize);

onStart()



