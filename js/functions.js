/**
 * Progressbar color css
 */
const pro_clr = (pres_clr) => {

    // Get the root element
    let r = document.querySelector(':root');
    // Get the style properties for the root
    let rs = getComputedStyle(r);
    // rs.getPropertyValue('--pro-clr');

    // set the value of variable '--pro-clr' to another value
    return r.style.setProperty('--pro-clr', pres_clr);
}

/**
 * form validation
 */

const msgAlert = (msg, type = 'danger') => {
    return `<p class="alert alert-${type} d-flex align-items-center justify-content-between my-2">${msg}<button data-bs-dismiss="alert" class="ms-2 btn-close"></button></p>`
}

/**
 * Set LS Values
 */

const createLSData = (key, value) => {

    // init value
    let data = [];

    // check key exist or not
    if( localStorage.getItem(key)){
        data =  JSON.parse(localStorage.getItem(key));
    }

    // now push new data to LS
    data.push(value);

    // set all data
    localStorage.setItem(key, JSON.stringify(data));

}

/**
 * get all LS Data
 */

const readLSdata = (key) => {

    if ( localStorage.getItem(key) ){
        return JSON.parse(localStorage.getItem(key));
    } else {
        return false;
    }
    
}

/**
 * update LS Data
 */

const updateLSData = (key, array) => {
    localStorage.setItem(key, JSON.stringify(array));
}


/**
 * Time countdown
 */

const countDown = (start, deadline, clearInt = null) => {
        
        // //get timestamp
        // let start_time = Date.now();
        // let end_time = new Date(date + ' ' + time);

        let remaining_time = deadline - start; 
        //add 1s for delay of intarval when submit
        
        // get value from time
        let total_sec = Math.floor(remaining_time / 1000);
        let total_min = Math.floor(total_sec / 60);
        let total_hour = Math.floor(total_min / 60);
        let total_day = Math.floor(total_hour / 24);

        let hours =  total_hour - ( total_day * 24 );
        let min =  total_min - ( total_day * 24 * 60) - (hours * 60);
        let sec =  total_sec - ( total_day * 24 * 60 * 60) - (hours * 60 * 60) - (min * 60);


        // adding 0 before singel number ( < 10)
        total_day < 10 ? total_day = '0' + total_day : total_day;
        hours < 10 ? hours = '0' + hours : hours;
        min < 10 ? min = '0' + min : min;
        sec < 10 ? sec = '0' + sec : sec;

        if(total_sec == 0 || total_sec <= 0) {
            clearInterval(clearInt);

            return `<span style="color:red;">Time over</span>`
        }
        else{

            // adding s for plural number
            let d = '';
            let h = '';
            let m = '';
            let s = '';

            total_day > 1 ? d = 's' : d ;
            hours > 1 ? h = 's' : h ;
            min > 1 ? m = 's' : m ;
            sec > 1 ? s = 's' : s ;

            return `${total_day} Day${d} : ${hours} Hour${h} : ${min} Minute${m} : ${sec} Second${s}`;
        }

}

/**
 * counter percentage
 */

// color for progess bar and pseudo class

const progBar = (remain, dead_line) => {

    let day = new Date();
    let current_remain =  dead_line - day.getTime();
    
    let remainPer = (100 * current_remain) / remain;

    let width =  Math.floor(remainPer);

    if( width <= 0 ){
        width = `width:100%; background-color: red;`;
    }else if(width >= 0 && width <= 30){
        width = `width:${width}%; background-color: pink;`;
    }else if(width >= 30 && width <= 40){
        width = `width:${width}%; background-color: orange;`;
    }else if(width >= 41 && width <= 70){
        width = `width:${width}%; background-color: blue;`;
    }else if(width >= 71 && width <= 100){
        width = `width:${width}%; background-color: green;`;
    }

    return width;

}


const progPer = (remain, dead_line) => {

    let day = new Date();
    let current_remain =  dead_line - day.getTime();
    
    let remainPer = (100 * current_remain) / remain;

    let width =  Math.floor(remainPer);

    width < 0 ? width = 0 : width;

    return width;
}
