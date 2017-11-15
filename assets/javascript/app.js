 
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

  
  // ========================================================

  // Generic function for displaying cartoon data 
  function renderButtons(){ 

    // Deletes the cartoons prior to adding new cartoons (this is necessary otherwise you will have repeat buttons)
    $('#buttonsView').empty();

    // Loops through the array of cartoons
    for (var i = 0; i < animals.length; i++){

      // Then dynamicaly generates buttons for each cartoon in the array

      // Note the jQUery syntax here... 
        var a = $('<button>') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
        a.addClass('animal'); // Added a class 
        a.addClass("btn btn-success"); // Added a class 
        a.addClass("btn btn-primary btn-lg");
        a.attr('data-name', animals[i]); // Added a data-attribute
        a.text(animals[i]); // Provided the initial button text
        $('#buttonsView').append(a); // Added the button to the HTML
    }
  }

  // ========================================================

  // This function handles events where one button is clicked
  $('#addanimal').on('click', function(){

    //clear container
    //$('#cartoonsView').html("");     

    // This line of code will grab the input from the textbox
    var animal = $('#animal-input').val().trim();

    // The cartoon from the textbox is then added to our array
    animals.push(animal);
    
    // Our array then runs which handles the processing of our cartoon array
    renderButtons();

    // We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
    return false;
  })

  // ========================================================

  // Generic function for displaying the cartoonInfo
  $(document).on('click', '.animal', displayanimalInfo);


  // ========================================================

  // This calls the renderButtons() function
  renderButtons();
  //displaycartoonInfo();
