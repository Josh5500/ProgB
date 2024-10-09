
function setup() {
    select('#searchButton').mousePressed(function () {
        hentTopPosts();
    });
}

async function hentTopPosts() {
    const breedName = select('#searchInput').value().toLowerCase(); 
    select('#page1 .right').html(''); //clear

    try {
    //fetch alle racer
        const breedResponse = await fetch('https://api.thecatapi.com/v1/breeds');
        const breeds = await breedResponse.json();

        

        // Find race på søgte navn. .toLowerCase for at hvis fx MAINE COON indtastes, rettes det til maine coon.
        const matchedBreed = breeds.find(breed => breed.name.toLowerCase() === breedName);

        if (!matchedBreed) {
            select('#page1 .right').html('Breed not found!');
            return;
        }

        //Find random billede ud fra id
        const breedId = matchedBreed.id;
        const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1`);
        const json = await response.json();

        if (json.length === 0) { //existerer der billeder?
            select('#page1 .right').html('Ingen billeder fundet af racen :C');
            return;
        }

        let imageUrl = json[0].url; //Hent billed url
        console.log(imageUrl);

        //Få billede til at passe
        let rightDiv = select('.right');
        rightDiv.style('background-image', `url(${imageUrl})`);
        rightDiv.style('background-size', 'cover');
        rightDiv.style('background-position', 'center'); 

        console.log('Breed:', matchedBreed.name);
        select('#page1 .right').html('Breed:'+ matchedBreed.name);
        
        let breedWeight = matchedBreed.weight.metric;
        console.log('Weigt: '+ breedWeight);

        let breedLife = matchedBreed.life_span;
        console.log('Life Span: '+ breedLife);

        let breedTemperament = matchedBreed.temperament;
        console.log('Life Span: '+ breedTemperament);

        select('#page1 .right').html(`
            <p>Breed: ${matchedBreed.name}
            Weight: ${breedWeight} kg
            Life Span: ${breedLife} years 
            Temperament: ${breedTemperament} <p>
            
        `);

    } catch (e) {
        console.log('Error fetching data', e);
        select('#page1 .right').html('Error fetching data');
    }
}

        
        
//function createPost(post){
    //vi laver først en reference til det HTML element vi vil sætte poster ind i 
    //let rightDiv = select('#page1 .right')
    //lad os give posten en container
   // let container = createDiv().addClass('post')
    //lad os give den en titel 
   // let title = createElement('h1', post.title)
    //hver gang jeg har lavet et element, skal det ind i containeren
  //  container.child(title)
    //vi laver et link til postet på nettet
   // let link = createA(post.url, 'læs mere..')
    //lægger det ind i container
   // container.child(link)
   // let comments = createP(post.comments)
  //  container.child(comments)


    //rightDiv.child(container)

//}   