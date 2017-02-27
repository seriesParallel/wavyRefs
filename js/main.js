$( document ).ready(function() {
   
      $("#x-out").click(function() {
      $("#promo-bg").css('display', 'none');        
      $("#promo-modal").css('display', 'none');
      $("#container").css("background","#21605F");      
      $("#single-links").css('display', 'flex');
      $("#single-links").css('justify-content','space-around'); 
      $("#single-links").show();
      });
    
      $("#forever-anchor").mouseover(function() {
        
        $("#container").css("background", "url(/refs/assets/forever-full.jpg)");
        $("#container").css("-webkit-background-size", "cover");
        $("#container").css("-moz-background-size", "cover");
        $("#container").css("-o-background-size", "cover");
        $("#container").css("background-size", "cover");
                console.log("PAIN ANCHOR");

      });

      $("#pain-anchor").mouseover(function() {
        $("#container").css("background", "url(/refs/assets/pain-goes-away-full.jpg)");
        $("#container").css("-webkit-background-size", "cover");
        $("#container").css("-moz-background-size", "cover");
        $("#container").css("-o-background-size", "cover");
        $("#container").css("background-size", "cover");
                console.log("PAIN ANCHOR");

      });
    
      $("#forever-anchor").click(function() {
        $( "#forever-modal" ).fadeIn( 1000, function() {
        $('#forever-modal').css("display", "inline");
          });
      });    
    
      $("#pain-anchor").click(function() {
        $( "#pain-modal" ).fadeIn( 1000, function() {
        $('#pain-modal').css("display", "inline");
          });
      });
    
      $("#spotlight-anchor").click(function() {
        $( "#spotlight-modal" ).fadeIn( 1000, function() {
        $('#spotlight-modal').css("display", "inline");
          });
      });    

      $("#spotlight-anchor").mouseover(function() {
        $("#container").css("background", "url(/refs/assets/spotlight-full.jpg)");
        $("#container").css("-webkit-background-size", "cover");
        $("#container").css("-moz-background-size", "cover");
        $("#container").css("-o-background-size", "cover");
        $("#container").css("background-size", "cover"); 
                console.log("PAIN ANCHOR");

      });
  
});