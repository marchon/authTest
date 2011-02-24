// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#fff');


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#fff'
});

//
//  CREATE FIELD username
//
var userLabel = Titanium.UI.createLabel({
	color:'#fff',
	text:'User Name',
	top:10,
	left:30,
	width:100,
	height:'auto'
});

win1.add(userLabel);

var username = Titanium.UI.createTextField({
	hintText:'enter user name',
	height:35,
	top:35,
	left:30,
	width:250,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

win1.add(username);

//
//  CREATE FIELD password
//
var passwdLabel = Titanium.UI.createLabel({
	color:'#fff',
	text:'Password',
	top:75,
	left:30,
	width:100,
	height:'auto'
});

win1.add(passwdLabel);

var password = Titanium.UI.createTextField({
	hintText:'enter password',
	height:35,
	top:100,
	left:30,
	width:250,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

win1.add(password);

//
// CREATE BUTTON submit
//
var loginBtn = Titanium.UI.createButton({
	title:'Submit',
	top:170,
	left:30,
	height:30,
	width:250
});
win1.add(loginBtn);


//login stuff
var loginReq = Titanium.Network.createHTTPClient();

loginReq.onload = function()
{
	Ti.API.info('Variable login req = ' + loginReq);
    var json = this.responseText;
	Ti.API.info('Variable json = ' + json);
    var response = JSON.parse(json);
	Ti.API.info('Variable response = ' + response);
    if (response.logged == true)
    {
	 alert("Login Pass :)");
        username.blur();
        password.blur(); 
        Ti.App.fireEvent('grantEntrance', {
            name:response.name,
            email:response.email
        });
    }
    else
    {
		 alert("Login Fail :( ");
        alert(response.message);
    }
};
 
loginReq.onerror = function()
{
    alert("Network error");
};

/*
* Login Button Click Event
*/
loginBtn.addEventListener('click',function(e)
{
    if (username.value != '' && password.value != '')
    {
        loginReq.open("POST","http://swtorvids.com/chelsea/login.php");
        var params = {
            username: username.value,
            password: password.value
        };
        loginReq.send(params);
    }
    else
    {
        alert("Username/Password are required");
    }
});


// open tab group

win1.open();
