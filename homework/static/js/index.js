console.log('Starting');
pageLoader()

function pageLoader(){
    console.log('loading the page');

    const findCountryForm=document.querySelector('#find-country-form');
    findCountryForm.addEventListener('submit', e => findCountry(e, 1));
}

function findCountry(e){
    e.preventDefault();
    const countryName=document.getElementsByName('country')[0].value;
    console.log(`Looking for ${countryName}`);

    const url=`https://restcountries.com/v3.1/name/${countryName}`;
    console.log(url);

    fetch(url)
        .then(res => res.json())
        .then(data => displayCountry(data))
        .catch(err => console.error(err))
}

function displayCountry(data){
    let table=document.getElementById('country-table');

    clearTable(table);

    const thead=document.createElement('thead');
    table.append(thead);
    let tr=document.createElement('tr');
    thead.append(tr);
    const tableHeadings=['Flag', 'Name', 'Currencies', 'Capital', 'Languages'];
    tableHeadings.forEach( heading=>{
        let th=document.createElement('th');
        th.scope='col';
        th.innerHTML=heading;
        tr.append(th);
    })

    let tbody=document.createElement('tbody');
    table.append(tbody);
    for (let country of data){
        console.log(country);
        let tr=document.createElement('tr');
        tbody.append(tr);
        newDataCell(tr, `<img src=${country.flags.png}>`)
        newDataCell(tr, country.name.common)
        let currencies = [];
        for (let key in country.currencies){
            currencies.push(country.currencies[key].name)
        }
        newDataCell(tr, currencies.join(', '))
        newDataCell(tr, country.capital)
        let languages = [];
        for (let key in country.languages){
            languages.push(country.languages[key])
        }
        newDataCell(tr, languages.join(', '))
    }
}

function newDataCell(tr, value){
    let td = document.createElement('td');
    td.innerHTML = value ?? '-';
    tr.append(td)
}

function clearTable(table){
    table.innerHTML = '';
    const buttonsToClear = document.querySelectorAll('.prev-next-btn');
    for (let btn of buttonsToClear){
        btn.remove()
    }
    }