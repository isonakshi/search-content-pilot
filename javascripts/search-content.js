// On-view-load initialization
function init() {
   
    $("#search").click(search);
    gadgets.window.adjustHeight();
   
}

// Perform a search and display the results
function search() {
    
    $("search-results").html("");
    gadgets.window.adjustHeight();
   /* var types = [];
    $("input:checked").each(function() {
        types.push(this.id);
    });*/
    var params = {
        //limit : $("#limit").val(),
        query : $("#query").val(),
        //sort : $("#sort-type").val(),
       // sortOrder : $("#sort-order").val()
        
        
    };

   
   /* if (types.length > 0) {
        params.type = types;
    }*/
    console.log("searching for " + JSON.stringify(params));
    osapi.jive.core.searches.searchContent(params).execute(function(response) {
       console.log("searching response is " + JSON.stringify(response));
       
        if (response.error) {
            alert(response.error.message);
        }
        else {
            var html = "";
			var blog="";
			var discussion="";
			var update="";
			var document="";
			var post="";
			
            var rows = response.data;
            var url="";
            var subject="";
            var contentSummary="";
            var author="";
            var avatar="";
           var myDate="";
            var likeCount="";
            var type="";
            var username="";
var str="";


            

            
            $.each(rows, function(index, row) {   
                    url=row.resources.html.ref;
                    subject=row.subject;
                    contentSummary=row.contentSummary;
                    author=row.author.name;
                    str=row.modificationDate.substr(0,10);
                  myDate=str; 
myDate=myDate.split("-"); 
dateM=myDate[1];


function monthConvert(d){
	
var monthStr = d.toString();
    switch (monthStr) {
        case 01:
    return "Jan";
    break;
  case 02:
   return "Feb";
    break;
  case 03:
    return "Mar";
    break;
  case 04:
    return "Apr";
break;
case 05:
    return "May";
    break;
  case 06:
    return "Jun";
    break;
  case 07:
    return "Jul";
    break;
  case 08:
    return "Aug";
break;
case 09:
    return "Sep";
    break;
  case 10:
    return "Oct";
    break;
  case 11:
    return "Nov";
    break;
  case 12:
    return "Dec";
break;
}
}
console.log(monthStr);
var finalMonth=monthConvert(dateM);

var newDate=finalMonth+" "+myDate[2]+","+myDate[0]; 


                    likeCount=row.likeCount;
                    type=row.type;
                    avatar=row.author.avatarURL;
                    username=row.author.username;
               
			   if(row.type=="discussion")
               {
                     
					discussion +='<ul>';
                    discussion +='<li class="discussion"/>';
                    discussion +='<li><a href="'+url+'">'+subject+'</a></li>';
                    discussion +='</ul>';
                    discussion +='<ul>';
                    discussion +='<li>&nbsp;</li>';
                    discussion +='<li>'+contentSummary+'</li>';
                    discussion +='</ul>';
                    discussion +='<ul>';
                    discussion +='<li><img src="'+ avatar + '" width=\'25px\' height=\'25px\' border=\'0\'/></li>';
                    discussion +='<li><a href=https://apps-onprem.jivesoftware.com/people/'+username+'>'+author+'</a></li>';
                    discussion +='<li>'+likeCount+'</li>';
                    discussion +='<li>'+newDate+'</li>';
                    discussion +='</ul>';
                  
               }
			  
            });
            
            
            html +=discussion;
			html +="<br>"+document;
			html +="<br>"+update;
			html +="<br>"+post;
			html +="<br>"+blog;
			
             console.log(html);
            $("#search-results").html(html);
            $("#search-info").show();
            gadgets.window.adjustHeight();
        }
    });
}
    


// Register our on-view-load handler
gadgets.util.registerOnLoadHandler(init);
