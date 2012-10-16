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

   var current;
   function loadDiscussions() {
  console.log("loadDiscussions() started");
  showMessage("Loading private discussions for '" + user.name + "' ...");
  user.privateDiscussions.get({
    limit : 1000
  }).execute(function(response) {
    console.log("loadDiscussions() response = " + JSON.stringify(response));
    var html = '<ul>';
    discussions = response.data;
    $.each(discussions, function(index, disc) {
      html += '<li>';
      html += '<a href="#" class="discussion-select" data-index="' + index + '">' + disc.message.subject + '</a>';
      html += ' (' + disc.viewCount + ' views)';
      html += '</li>';
    });
    html += '</ul>';
    $("#discussions-list").html("").html(html);
    $(".discussion-select").click(function() {
      var index = $(this).attr("data-index");
      current = discussions[index];
      $(".discussion-subject").html("").html(current.message.subject);
      showDiscussion();
    });
    showOnly("discussions-div");
  });
}
 
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

if(row.type=="document"){
/* var documentID = (url.substring(url.lastIndexOf("/"))).substr(1);
console.log("documents Id " + documentID); */
var finalDocID = (url.substring(url.lastIndexOf("-"))).substr(1);
console.log("finalDocID Id " + finalDocID);
var request = osapi.jive.core.documents.get({id: finalDocID});
request.execute(function(response) {
console.log("searching documents response is " + JSON.stringify(response.data));
if (response.error) {
console.log("Error in get: "+response.error.message);
}
else
{
var request = response.data.container.get();
request.execute(function(response) {
if(!response.error) {
var container = response.data;
console.log("searching documents container response is " + JSON.stringify(response.data));
if(container instanceof osapi.jive.core.Group) {
console.log("Display Name" +container.displayName);
creationDate=container.creationDate;
if(container.displayName == "accenturetest")
{
console.log("I am here!");
document +='<ul>';
document +='<li class="document"/>';
document +='<a href="'+url+'">'+subject+'</a></li>';
document +='</ul>';

document +='<h5>';
document +='<ul>';
document +='<li>Created by<a href=https://apps-onprem.jivesoftware.com/people/'+username+'>'+author+'</a></li>';
document +='</ul>';

document +='<ul>';
document +='<b>';
document +='<li>'+contentSummary+'</li>';
document +='</b>';
document +='</ul>';

document +='<ul>';
document +='<li>Created:'+creationDate+'</li>';
document +='<li>Last Modified:'+modifiedDate+'</li>';
document +='<li>Replies:'+replyCount+'</li>';
document +='<li>Likes:'+likeCount+'</li>';
document +='</ul>';	
}
}

}

});

}
});
}
if(row.type=="discussion"){
var documentID = (url.substring(url.lastIndexOf("/"))).substr(1);
console.log("discussion Id " + documentID);
var discRequest= osapi.jive.core.discussion.answer.get();
discRequest.execute(function(response) {
console.log("Answer to the question is " + JSON.stringify(response.data));
if (response.error) {
alert("I need rework");
}
else {
	alert("success");
}

var request = osapi.jive.core.discussions.get({id: documentID});
request.execute(function(response) {
console.log("searching discussion response is " + JSON.stringify(response.data));
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