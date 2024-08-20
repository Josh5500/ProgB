console.log('p5.js er loaded')
let pages //array med alle elementer med class = page

let currentPage = 1

function setup(){
    select('#page' + currentPage).addClass('visible')
    pages = selectAll('.page')
    
    
    //console.log(pages.length)

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