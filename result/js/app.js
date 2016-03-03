"use strict";
var application;
{
    var xhr = new XMLHttpRequest();
    var url = '../data/data.json';
    
    xhr.open( 'GET', url, true );
    xhr.onreadystatechange = function() {
        if( this.readyState === 4 && this.status !== 404 ) {
            var dataObj = JSON.parse(this.responseText);
            
            application = new MainApp(dataObj,'default','default');
            application.run();
        }
    }
    xhr.send();
}