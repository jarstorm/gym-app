function showError(text) {
	var errorTimeOut = 5;
Lungo.Notification.error(
			"Error",                      //Title
			text,     //Description
			"cancel",                     //Icon
			errorTimeOut,                            //Time on screen
			null             //Callback function
			);
			}