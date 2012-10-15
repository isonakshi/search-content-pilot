// On-view-load initialization
function init() {
   
    $("#search").click(search);
    gadgets.window.adjustHeight();
   
}
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
                    modifiedDate=row.modificationDate;
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
			  if(row.type=="document")
               {
                     
					document +='<ul>';
                    document +='<li class="document"/>';
                    document +='<li><a href="'+url+'">'+subject+'</a></li>';
                    document +='</ul>';
                    document +='<ul>';
                    document +='<li>&nbsp;</li>';
                    document +='<li>'+contentSummary+'</li>';
                    document +='</ul>';
                    document +='<ul>';
                    document +='<li><img src="'+ avatar + '" width=\'25px\' height=\'25px\' border=\'0\'/></li>';
                    document +='<li><a href=https://apps-onprem.jivesoftware.com/people/'+username+'>'+author+'</a></li>';
                    document +='<li>'+likeCount+'</li>';
                    document +='<li>'+modifiedDate+'</li>';
                    document +='</ul>';
                  
               }
			   if(row.type=="update")
               {
                     
					update +='<ul>';
                    update +='<li class="update"/>';
                    update +='<li><a href="'+url+'">'+subject+'</a></li>';
                    update +='</ul>';
                    update +='<ul>';
                    update +='<li>&nbsp;</li>';
                    update +='<li>'+contentSummary+'</li>';
                    update +='</ul>';
                    update +='<ul>';
                    update +='<li><img src="'+ avatar + '" width=\'25px\' height=\'25px\' border=\'0\'/></li>';
                    update +='<li><a href=https://apps-onprem.jivesoftware.com/people/'+username+'>'+author+'</a></li>';
                    update +='<li>'+likeCount+'</li>';
                    update +='<li>'+modifiedDate+'</li>';
                    update +='</ul>';
                  
               }
			   if(row.type=="post")
               {
                     
					post +='<ul>';
                    post +='<li class="post"/>';
                    post +='<li><a href="'+url+'">'+subject+'</a></li>';
                    post +='</ul>';
                    post +='<ul>';
                    post +='<li>&nbsp;</li>';
                    post +='<li>'+contentSummary+'</li>';
                    post +='</ul>';
                    post +='<ul>';
                    post +='<li><img src="'+ avatar + '" width=\'25px\' height=\'25px\' border=\'0\'/></li>';
                    post +='<li><a href=https://apps-onprem.jivesoftware.com/people/'+username+'>'+author+'</a></li>';
                    post +='<li>'+likeCount+'</li>';
                    post +='<li>'+modifiedDate+'</li>';
                    post +='</ul>';
                  
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
