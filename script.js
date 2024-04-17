
//FETCH PARA LA LISTA FIGURAS RETÓRICAS
function searchRhetoricFigure() {

    const searchTerm = document.getElementById('search-figure').value.toLowerCase();
    const selectedAuthor = document.getElementById('search-author').value;
  

    fetch('/figures.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (!data || data.length === 0) {
          throw new Error('Invalid or empty data received');
        }
  
  
        const filteredData = data.filter(item =>
            item.term === searchTerm.toLowerCase() &&
            item.author === selectedAuthor
        );
        
  

        displayResults(filteredData);
        console.log("This is the filteredData: ", filteredData);

      })
      .catch(error => console.error('Error fetching or processing data:', error));
}

 //FUNCIÓN PARA IMPRIMIR EN PANTALLA LOS RESULTADOS DE LA BÚSQUEDA 
function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
  
    if (results.length === 0) {
      console.log("Results received for display:", results); // Log the results received
      resultsDiv.innerHTML = 'No results found.';
      return;
    }
  
  

    results.forEach(result => {
      const resultElement = document.createElement('div');
      resultElement.innerHTML = `
        <h3>${result.term}</h3>
        <p><strong>Definición:</strong> ${result.definition}</p>
        <p><strong>Ejemplo:</strong> <q>${result.example}</q> </p>
        <p><strong>Fuentes:</strong></p>
        <ul>
        ${result.source.split('+').map(source => `<li>${source.trim()}</li>`).join('')}
      </ul>
      `;
      resultsDiv.appendChild(resultElement);
    });
}


// FETCH PARA LOS DATOS PRELIMINARES DE LA VISTA DE AUTORES
fetch('authors-preview.json')
    .then(response => response.json())
    .then(data => {
        
      
        const authorsData = data;

        
        populateAuthorsList(authorsData);
    })
    .catch(error => console.error('Error fetching JSON:', error));


    function populateAuthorsList(authorsData) {
    const listAuthorsSection = document.getElementById('list-authors-section');


    listAuthorsSection.innerHTML = '';

    const authorsListContainer = document.createElement('div');
    authorsListContainer.classList.add('authors-list');


    const authorsListHeading = document.createElement('h3');
    authorsListHeading.textContent = 'Biografías de las Autoridades';
    authorsListContainer.appendChild(authorsListHeading);


    const authorsList = document.createElement('ul');


    authorsData.forEach(author => {

        const authorItem = document.createElement('li');


        const authorName = document.createElement('h4');
        authorName.textContent =  author.name;

        const era = document.createElement('p');
        era.textContent = author.era;

        const origin = document.createElement('p');
        origin.textContent = author.origin;


        authorItem.appendChild(authorName);
        authorItem.appendChild(era);
        authorItem.appendChild(origin);


        authorsList.appendChild(authorItem);
    });


    authorsListContainer.appendChild(authorsList);


    listAuthorsSection.appendChild(authorsListContainer);
}
