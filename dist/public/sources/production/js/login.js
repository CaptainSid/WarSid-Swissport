//  1- make sure the page has  loaded successfully.

$(document).ready(function(){
	
	var users = [
		{ username:'user1', password:'pass'},
		{ username:'user2', password:'pass'}
	]


	var clickButton = $('#login');
	var username,password;

	
	// 2- wait for 'login' button click.
	$(clickButton).on('click',function(e){
		//e.preventDefault();

		// 3 - get username and password
		username = $('#user').val();
		password = $('#pwd').val();
		msg = $('#msg');


		var exist = false;
		for(var i =0;i<users.length;i++){
			if(users[i].username == username 
				&& users[i].password == password
			){
				exist = true;
			}
		}

		if(exist){
			window.location.href = "../acceuil.html";
			alert("ok");
			//$(msg).text('exist').removeClass('notexist').addClass('exist');

		}else{

			//$(msg).text('not exist').removeClass('exist').addClass('notexist');

		}

		 
	})

})
