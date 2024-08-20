console.log('p5.js er loaded')
let pages //array med alle elementer med class = page
let colors = ['red','green','blue','orange','cyan','grey','purple','lightblue']


let currentPage = 3

function setup(){
    select('#page' + currentPage).addClass('visible')
    pages = selectAll('.page')
    
    
    //console.log(pages.length)

    //lav en masse div'er vi kommer ind i page3
    for(c of colors){
        //console.log(c)
        let div = createDiv()
        div.style('background-color', c)
        select('#page3').child(div)
    }
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
}

function keyPressed(){
    shiftPage(key)
}