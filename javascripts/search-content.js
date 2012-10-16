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
    
 
    console.log("searching for " + JSON.stringify(params));
    osapi.jive.core.searches.searchContent(params).execute(function(response) {
       //console.log("searching response is " + JSON.stringify(response));
       
        if (response.error) {
            alert(response.error.message);
        }
        else {
var rows = response.data;

            var html = "";
var blog="";
var discussion="";
var update="";
var document="";
var post="";

            var url="";
            var subject="";
            var contentSummary="";
            var author="";
            var avatar="";
            var modifiedDate="";
            var likeCount="";
            var replyCount="";
            var type="";
            var username="";
            var creationDate="";
            var name="";
            var displayName="";
            
$.each(rows, function(index, row) {
url=row.resources.html.ref;
subject=row.subject;
contentSummary=row.contentSummary;
author=row.author.name;
modifiedDate=row.modificationDate;
likeCount=row.likeCount;
replyCount=row.replyCount;
type=row.type;
avatar=row.author.avatarURL;
username=row.author.username;

if(row.type=="discussion"){
var discID = (url.substring(url.lastIndexOf("/"))).substr(1);
console.log("discussion Id " + discID);
var request = osapi.jive.core.discussions.get({id: discID});
request.execute(function(response) {
   
console.log("Discussion Is " + JSON.stringify(response.data));
var myRequest= response.data.messages.get();
myRequest.execute(function(response){
if (response.error) {
            alert("Nothing");
        }
        else {
var answers = response.data;
var answered="";
$.each(answers, function(index, answer) {
answered=answer.helpful;
if (answer.helpful="true"){
console.log("Helpful Answer"+answer.id);
}
else{
console.log("Not Helpful"+answer.id);
}
});
}
});
if (response.error) {
console.log("Error in get: "+response.error.message);
}
else
{
   
var request = response.data.container.get();
request.execute(function(response) {
if(!response.error) {
var container = response.data;
console.log("searching discussion container response is " + JSON.stringify(response.data));
if(container instanceof osapi.jive.core.Group) {
console.log("Display Name" +container.displayName);
creationDate=container.creationDate;
if(container.displayName == "accenturetest")
{
console.log("I am here!");
discussion +='<ul>';
discussion +='<li class="document"/>';
discussion +='<a href="'+url+'">'+subject+'</a></li>';
discussion +='</ul>';

discussion +='<h5>';
discussion +='<ul>';
discussion +='<li>Created by<a href=https://apps-onprem.jivesoftware.com/people/'+username+'>'+author+'</a></li>';
discussion +='</ul>';

discussion +='<ul>';
discussion +='<b>';
discussion +='<li>'+contentSummary+'</li>';
discussion +='</b>';
discussion +='</ul>';

discussion +='<ul>';
discussion +='<li>Created:'+creationDate+'</li>';
discussion +='<li>Last Modified:'+modifiedDate+'</li>';
discussion +='<li>Replies:'+replyCount+'</li>';
discussion +='<li>Likes:'+likeCount+'</li>';
discussion +='</ul>';   
}
}

}

});

}
});
}

});
            
            
html +=discussion;
html +="<br>"+document;
html +="<br>"+update;
html +="<br>"+post;
html +="<br>"+blog;

// console.log(html);
$("#search-results").html(html);
$("#search-info").show();
gadgets.window.adjustHeight();
        }
    });
}
    


// Register our on-view-load handler
gadgets.util.registerOnLoadHandler(init);