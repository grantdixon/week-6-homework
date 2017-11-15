 
  var animals = ['Dogs', 'Cats', 'Hamsters', 'Birds', 'Lizards', 'Squirrels', 
  'Sloths', 'Rabbits', 'Orcas', 'Turtles'];

  
  function displayanimalInfo(){

    
    $('#animalsView').empty();     

    var animal = $(this).attr('data-name');
    
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({url: queryURL, method: 'GET'})
       .done(function(response) {
           var results = response.data;

           for(var i=0; i < results.length; i++){


              if (results[i].rating == "r" || results[i].rating == "pg-13")
              {

              }
              else {
               

               console.log(response)
              

               var rating = results[i].rating;

               var p = $('<p>').text( "Rating: " + rating);

               var animalImage = $('<img>');
              
               animalImage.attr('src', results[i].images.fixed_height_still.url);
               animalImage.attr('data-still', results[i].images.fixed_height_still.url);
               animalImage.attr('data-animate', results[i].images.fixed_height.url);
               animalImage.attr('data-state', 'still');
               animalImage.addClass('animalImage');
               
             
               $('#animalsView').append(p);
               $('#animalsView').append(animalImage);


             
              }

           }

      $('.animalImage').on('click', function(){
       
          var state = $(this).attr('data-state'); 
            console.log(state);
         
            if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
           
      });

        
      });   

  }

  
  
  function renderButtons(){ 

    
    $('#buttonsView').empty();

   
    for (var i = 0; i < animals.length; i++){

      
      
        var a = $('<button>') 
        a.addClass('animal'); 
        a.addClass("btn btn-success");  
        a.addClass("btn btn-primary btn-lg");
        a.attr('data-name', animals[i]); 
        a.text(animals[i]); 
        $('#buttonsView').append(a); 
    }
  }

  
  $('#addanimal').on('click', function(){

    
    var animal = $('#animal-input').val().trim();

    
    animals.push(animal);
    
    
    renderButtons();

    
    return false;
  })

  
  $(document).on('click', '.animal', displayanimalInfo);


  
  renderButtons();
  
