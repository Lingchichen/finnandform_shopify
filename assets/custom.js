<!-- ============================================================================= -->
<!-- Ella Custom JS - Customize The Style For Layout -->
<!-- ============================================================================= -->

<!-- ============================================================================= -->
<!-- IMPORTANT DISCLAIMER -->
<!-- Please use only JS to style the layout. -->
<!-- ============================================================================= -->
const compareDates = (d1, d2) => {
  let date1 = new Date(d1).getTime();
  let date2 = new Date(d2).getTime();
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  if (date1 <= date2) {
    console.log(`${d1} is less than ${d2}`);
    var today = new Date();
    var tomorrow7 = new Date();
    var tomorrow14 = new Date();
    tomorrow7.setDate(today.getDate()+7);
    tomorrow14.setDate(today.getDate()+14);
    $("#delivery_date").html('<div class="top-title">In Stock.</div><div>ETA Time estimate "+`${tomorrow7.getFullYear()}/${tomorrow7.getMonth() + 1}/${tomorrow7.getDate()}` + " to " + `${tomorrow14.getFullYear()}/${tomorrow14.getMonth() + 1}/${tomorrow14.getDate()}`');
  } else if (date1 > date2) {
    var new_date = new Date(d1);
    var day_current = new_date.getDate();
    
    var month_name = new_date.toLocaleString('en', { month: 'long' })
  
    if( day_current <= 10) { //上旬
      console.log("<b>Estimate Arrival Date:</b> The First Ten Days 0f "+month_name);
      $("#delivery_date").html('<div class="top-title"><b>Estimate Arrival Date:</b></div> <div> The First Ten Days 0f '+month_name+'</div>');
    } else if(day_current > 10 && day_current <= 20) { //后半月
      console.log("Estimate Arrival Date: Later "+month_name);
      $("#delivery_date").html('<div class="top-title"><b>Estimate Arrival Date:</b></div> <div>The Middle Ten Days Of '+month_name + '</div>');
    }else if( day_current > 20 && day_current <= 31){
      $("#delivery_date").html('<div class="top-title"><b>Estimate Arrival Date:</b></div> <div>The Last Ten Days Of '+month_name+'</div>');
    }
    console.log(`${d1} is greater than ${d2}`);
  } 
};

function filterImages(current_variant_title){
  var current_images = [];
  for(var i in product_medias){
    if(product_medias[i].alt == current_variant_title ){
      current_images.push(product_medias[i]);
    }
  }

  
  $('.productView-nav').slick('unslick');
  $('.productView-nav').empty();

  var insert_slide_html = "";
  var real_title = current_variant_title.replaceAll(" / ","-").replaceAll(" ","-");
    for(var i in current_images){
      insert_slide_html += "<div class=\""+current_variant_title+" productView-image productView-image-square fit-unset\" data-index=\""+i+"\" style=\"display: block;\" tabindex=\"-1\" role=\"option\" aria-describedby=\"slick-slide0"+i+"\">\n" +
              "<div class=\"productView-img-container product-single__media\" data-media-id=\""+current_images[i].id+"\">\n" +
              "     <div class=\"media\" data-fancybox=\"images\" href=\""+current_images[i].src+"\">\n" +
              "     <img id=\"product-featured-image-"+current_images[i].id+"\" " +
              "       srcset=\""+current_images[i].src+"\" " +
              "       src=\""+current_images[i].src+"\" " +
              "       alt=\""+current_variant_title+"\" title=\""+current_variant_title+"\" sizes=\"auto\" loading=\"lazy\" data-sizes=\"auto\" data-main-image=\"\" data-index=\""+i+"\" data-cursor-image=\"\">\n" +
              "         </div>\n" +
              "           </div>\n" +
              "</div>"
    }
   $('.productView-nav').append(insert_slide_html);

   var navArrowsDesk = $('.productView-nav').data('arrows-desk'),
       navArrowsMobi = $('.productView-nav').data('arrows-mobi');
   $('.productView-nav').slick({
          fade: true,
          dots: false,
          arrows: navArrowsDesk,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          asNavFor: false,
          nextArrow: window.arrows.icon_next,
          prevArrow: window.arrows.icon_prev,
          rtl: window.rtl_slick,
          responsive: [
              {
                  breakpoint: 768,
                  settings: {
                      arrows: navArrowsMobi
                  }
              }
          ]
      }); 
  
  
}

$(document).ready(function(){
    console.log("document ready!");
    console.log(json_variant_dimensioninfo);

      if (window.innerWidth < 768 ){
        //filter the media image
          filterImages(current_variant.title);
      }else{
          var productPreViewImageClass = current_variant.title.replaceAll(" / ","-").replaceAll(" ","-");
          $(".productView-nav .productView-image").hide();
          $("."+productPreViewImageClass).show();
      }
   
    $(".productView-thumbnail-wrapper .productView-thumbnail").hide();
    
    URL = window.location.href; 
    //如果是产品页面的话 进行对应的操作
    if(URL.indexOf('/products/') > -1){
      var current_variant_id = current_variant;
      let current_date = "";
      let current_dimension = "";
      if( current_variant_id.id != undefined ){
        for(var i in json_variant){
          if(json_variant[i][current_variant_id.id]){
            current_date = json_variant[i][current_variant_id.id];
            
          }
          if(json_variant_dimensioninfo[i][current_variant_id.id]){
            current_dimension = json_variant_dimensioninfo[i][current_variant_id.id];
          }
        }
      }

      $("#dimensions_info").html(current_dimension);

      if(data_json_map[current_date] != undefined ){
      $("#delivery_date").html(data_json_map[current_date]);
        return;
      }
      const date = new Date();
  
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      // This arrangement can be altered based on how we want the date's format to appear.
      let currentDate = `${year}/${month}/${day}`;
      compareDates(current_date,currentDate);
      
    }
  })
  document.addEventListener("variant:changed", function(event) { // (1)
    console.log(12333);
    let current_date = "";
    let current_dimension = "";
    if( event.data.id != undefined ){
      if (window.innerWidth < 768 ){
        //filter the media image
        filterImages(event.data.title);
      }else{
        var productPreViewImageClass = event.data.title.replaceAll(" / ","-").replaceAll(" ","-");
        
        
        $(".productView-nav .productView-image").hide();
        $("."+productPreViewImageClass).show();
      }
      for(var i in json_variant){
        if(json_variant[i][event.data.id]){
          current_date = json_variant[i][event.data.id];
        }
        if(json_variant_dimensioninfo[i][event.data.id]){
          current_dimension = json_variant_dimensioninfo[i][event.data.id];
        }
      }

      console.log(current_dimension);
      if(current_dimension != ""){
      
       $("#dimensions_info").html($(current_dimension));
      }
    
    }
    
    if(data_json_map[current_date] != undefined ){
      $("#delivery_date").html(data_json_map[current_date]);
      return;
    }
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${year}/${month}/${day}`;
    compareDates(current_date,currentDate);
    console.log(json_variant);
  });