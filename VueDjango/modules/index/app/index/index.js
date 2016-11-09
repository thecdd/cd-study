require('./index.css');

function goMap(){
    window.location.href = window.globalConfig.root+'free-map/main/';
}

function goToDashboard(){
    window.location.href = window.globalConfig.root+'dashboard/main/';
}


window.goMap=goMap;
window.goToDashboard=goToDashboard;