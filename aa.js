var sad = document.getElementsByTagName('*'),
    happy = [],
    halt = false;
    
// Select only the Like buttons.
// Convert the sad NodeList to a happy Array.
for (var i = 0; i < sad.length; i++) {
    if (sad[i] && (sad[i].title == 'Like this' || sad[i].title == 'Like this comment')) {
        happy.push(sad[i]);
    }
}

var happyDiv = document.createElement('div');
happyDiv.innerHTML = '<div id=\'happy\' style=\'background-color:#ddd;font-size:16px;text-

align:center;position:fixed;top:40px;right:40px;width:200px;height:150px;border:4px solid 

black;z-index:9999;padding-top:15px;\'>Like All By emptyzero <br> 

BlackHatworld<br><span>0</span> of '+happy.length+' items liked.<div id=\'happyStatus\' 

style=\'margin-top:30px;\'><a id=\'happyButton\' href=\'#\' style=\'display:block;\' onclick=

\'haltFn();\'>Stop it.</a></div></div>';
document.getElementsByTagName('body')[0].appendChild(happyDiv);

function happyFn(happy) {
    if (halt || !happy || !happy.length) {
        document.getElementById('happyStatus').innerHTML = 'Done!';
        return;
    }
    happy[0].click();
    happy[0].style.color='#FF0000';
    var countSpan = document.querySelector('#happy span');
    countSpan.innerHTML = parseInt(countSpan.innerHTML) + 1;
    
    // Wait for each Like to be processed before trying the next.
    // Facebook enforces this requirement.
    window.setTimeout(function() {
        happyFn(happy.splice(1));
    }, 5000);
}

function haltFn() {
    halt = true;
    return false; // prevent default event
}

happyFn(happy);
