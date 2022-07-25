// get elements
const form = document.getElementById('to_do_form');
const alert_box = document.querySelector('.msg-alert');
const list_wrapper = document.querySelector('.list-wrapper');
const ammount = document.getElementById('ammount');


// clear intarval init 
let count;

// function for create a loop for to do list
const getAllList = () => {

    //timestamp
    let start_time = Date.now();

    let list = '';
    const data = readLSdata('to_do_list');

    // if list not found
    if(!data || data.length == 0){
        list_wrapper.innerHTML = '';
    }

    // if data exist
    if(data){

        // loop for to do list
        data.reverse().map(item => {
                list += `
                <div class='py-3 position-relative' data-id="${item.randomId}">
                    <p>Taks: ${item.task} | Client: ${item.client} <br> Deadline : <strong>[${countDown(start_time, item.deadline, count)}]</strong></p>
                    <div class="progressbar">
                        <div class="progress-inner" style="${progBar(item.remain, item.deadline)}}"></div>
                        <div class="per">${progPer(item.remain, item.deadline)}%</div>
                    </div>
                    <button data-id="${item.randomId}"  class="btn-close close"></button>
                </div>
            `;
        })
    }

    //onclick="deleteList()"

    list_wrapper.innerHTML = list;

    // add s for plural number
    let s = '';
    data.length > 1 ? s = 's' : s;

    let totalAmmount = data.length ;

    !data ? totalAmmount = 0 : totalAmmount;


    
    ammount.innerHTML = `Total Item${s}: ${totalAmmount}`;
}

count = setInterval(() => {
    getAllList();
}, 1000);

// delete list data
list_wrapper.onclick = (e) => {

    e.preventDefault();

    if(e.target.classList.contains('close')){

        // get list id
        let id = e.target.getAttribute('data-id');

        // get all list
        let datalist = readLSdata('to_do_list');

        // delete data
        let lists = datalist.filter( data => data.randomId !== id);

        // update new data 

        updateLSData('to_do_list', lists);

        getAllList();
    }
}


//form submit
form.onsubmit = (e) => {

    e.preventDefault();


    const formData = new FormData(e.target);
    const {task, client, date, time} = Object.fromEntries(formData.entries());

    if(!task || !client || !date || !time){
        alert_box.innerHTML = msgAlert('All fields are required');
    }
    else{

        //get timestamp
        let start_time = Date.now();
        let end_time = new Date(date + ' ' + time);

        
        let remain = end_time.getTime() - start_time;
        let deadline = end_time.getTime();

        // create a random id
        const randomId = Math.floor(Math.random() * 1000000) +'_'+ Date.now();

        createLSData('to_do_list', {
            task,
            client,
            remain,
            deadline,
            randomId
        });

        e.target.reset();

        getAllList();
    }

}

