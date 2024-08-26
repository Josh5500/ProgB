
let pages //array med alle elementer med class = page
let colors = ['red','green','blue','orange','cyan','grey','purple','lightblue']

let menuItems //array med alle menupunkterne
let currentPage = 1


function setup(){
    //shiftPage er funktionen der tager et tal og skifter til en side.
    pages = selectAll('.page')
    menuItems = selectAll('.menuItem')
    
//menu items skal reagere ved at skifte side
    for(m of menuItems){
        m.mousePressed( function(e){
        //e.target er selve html div'en
            console.log(e.target.id)
            //slice -1 henter det sidste bogstav i en string
            let nr = e.target.id.slice(-1)
            //nu kan vi kalde shiftPage som skifter side
            shiftPage(nr)
        } )
    }
    
    shiftPage(currentPage)
}

function shiftPage(num){
if(num == "ArrowLeft"){
    num = currentPage - 1
}
if(num == "ArrowRight"){
    num = currentPage + 1
}


    if(isNaN(num) || num > pages.length || num == 0){
        return

    }

    select("#page" + currentPage).removeClass('visible')
    currentPage = num
    select("#page" + currentPage).addClass('visible')
    select("#menu" + menuNumber).removeClass('active')
    menuNumber = num
    select("#menu" + menuNumber).addClass('active')
}

function keyPressed(){
    shiftPage(key)
}