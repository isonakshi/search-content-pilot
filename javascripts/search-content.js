// On-view-load initialization
function init() {
   
    $("#search").click(search);
    gadgets.window.adjustHeight();
   
}
/*Get Normal Date*/

 /* function getISOStrict(date) {
   
   if (Date.prototype.toISOString) {
        return date.toISOString().replace(/Z$/, "+0000");
    }

    function pad(number) {
        var r = String(number);
        if ( r.length === 1 ) {
            r = '0' + r;
        }
        return r;
    }

    return date.getUTCDate();
       + '-' + pad( date.getUTCMonth() + 1 )
        + '-' + pad( date.getUTCFullYear() );
        + 'T' + pad( date.getUTCHours() )
       + ':' + pad( date.getUTCMinutes() )
       + ':' + pad( date.getUTCSeconds() )
       + '.' + String( (date.getUTCMilliseconds()/1000).toFixed(3) ).slice( 2, 5 )
       + '+0000'; 
} */

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
			

            var modifiedDate="";
            


            var likeCount="";
            var type="";
            var username="";
            
            
            $.each(rows, function(index, row) {   
					url=row.resources.html.ref;
                    subject=row.subject;
                    contentSummary=row.contentSummary;
                    author=row.author.name;
                    modifiedDate=row.modificationDate.substr(0,10);
					console.log('modifiedDate'+ modifiedDate);
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
                    discussion +='<li>'+modifiedDate+'</li>';
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
