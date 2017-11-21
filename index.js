/**
 *  Parses the given URL into its different components.
 *
 *  TODO: Implement this function.
 *  NOTE: You may implement additional functions as you need, as long as this
 *    function behaves as specified in the instructions. Have fun! :)
 **/

function parse(url) {
   var parser = document.createElement('a');
   parser.href = unescape(url);

   var scheme = unescape(parser.protocol.replace(":",""));
   var username = unescape(parser.username);
   var password = unescape(parser.password);
   var host = unescape(parser.hostname);
   var port = unescape(parser.port);
   var path = unescape(parser.pathname);
   var fragment = unescape(parser.hash.replace("#",""));
   var hasQuery = unescape(parser.search);
   var query = unescape(parser.search);
   var k;
   var v;
   var keys = [];
   var values = [];
   var queree = null;
   var authority = {};
   var noscheme;

   username == "" ? username=null: "";
   password == "" ? password=null: "";
   host == ""? host=null:"";
   port == "" ? port = setport(scheme):"";

   if(url.includes("//"))
      noscheme = url.substring(url.indexOf("//")+2, url.length);
    else
      noscheme = url.substring(url.indexOf("/")+1, url.length);

   if(noscheme.includes("/")){
      path == ""? path="/":"";
   }
   else{ 
      if(noscheme != "")
          path = "";
    }
      
   fragment == ""? fragment=null:"";
   
   if(query.includes("?")){
      queree = {};
      k = query.substring(query.indexOf("?")+1, query.indexOf("="));
      query = query.substring(query.indexOf("=")+1, query.length);
      if(query.includes("&")){
        v = query.substring(0, query.indexOf("&"));
        query = query.substring(query.indexOf("&")+1, query.length);
      }
      else{
        v = query;
      }
      keys.push(k);
      values.push(v);
   }

   while(query.includes("=")){
      if(query.includes("&")){
        k = query.substring(0, query.indexOf("="));
        query = query.substring(query.indexOf("=")+1, query.length);
        keys.push(k);
        if(query.includes("&")){
          v = query.substring(0, query.indexOf("&"));
          values.push(v);
          query = query.substring(query.indexOf("&")+1, query.length);
        }
      }
      else{
        k = query.substring(0, query.indexOf("="));
        query = query.substring(query.indexOf("=")+1, query.length);
        v = query;
        keys.push(k);
        values.push(v);
      }
   }

   authority.username = username;
   authority.password = password;
   authority.host = host;
   authority.port = port;

   for(var i in keys){
      queree[keys[i]] = values[i];
   }
     
    return {
      scheme: scheme,
         path: path,
         authority: authority,
         query:queree,
         path: path,
         fragment: fragment
    };
}


function setport(string){
    switch(string){
        case "http": return '80';
        case "https": return '443';
        case "ftp": return '21';
        case "ssh": return '22';
        default: return null;
    }
}
