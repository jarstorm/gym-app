// Get created routines from the server
function getCreatedRoutines() {	
	var parseJson = function(result) {
	
		for (var i = 0; i < result.length; i++) {
			storeRoutine(result[i]);
		}
		
		var text = jQuery.i18n.prop('language_new_routine');
		var close = jQuery.i18n.prop('language_new_routine_close_button');						
		var title = jQuery.i18n.prop('new_routines_from_server_title');
		var description = jQuery.i18n.prop('new_routines_from_server_description');;
		var acceptButton = jQuery.i18n.prop('new_routines_from_server_accept');;
		var cancelButton = jQuery.i18n.prop('new_routines_from_server_cancel');;
		
		Lungo.Notification.confirm({
			icon: 'user',
			title: title,
			description: description,
			accept: {
				icon: 'checkmark',
				label: acceptButton,
				callback: function(){ Lungo.Router.section("main"); }
			},
			cancel: {
				icon: 'close',
				label: cancelButton,
				callback: function(){ 
					// Do nothing 
				}
			}
		});

		
	};
	var url = "http://prueba.lalala34.cloudbees.net/webresources/myresource/prueba/joselin12";
	var result = Lungo.Service.json(url, "", parseJson, "json");		
}

// Initialize function
function init() {
	Lungo.Data.Sql.init(CONFIG);	

	// Quitar esto para datos reales
	insertData();

	//Show loading screen
	Lungo.Notification.show();
	var t1 = new Date().getTime();
	var initialMinimumTimeout = 2000;
	Lungo.Data.Sql.execute('SELECT * FROM configuration', function(data){
		console.log(data);
		var phone = data.rows.item(0).phone;
		if (phone == null) {
			// Initialize the app			
			Lungo.dom("#div_initial_configuration_id").show();
		}
		else {
			initializeAppData();
		}		
		var elapsed = new Date().getTime() - t1;
		var timeout = elapsed > initialMinimumTimeout ? 0 : initialMinimumTimeout;		
		window.setTimeout("Lungo.Notification.hide()",timeout);		
	});	
			
}

function initializeAppData(){
	
	
	Lungo.Data.Sql.execute('SELECT * FROM routine', showInfo);			
	
	// Check for new routines each five minutes
	var miliseconds = 60 * 10 * 1000;
	
	window.setInterval('getCreatedRoutines()', miliseconds);
	
	// Initialize app configuration
	updateAppConfiguration();
	
	Lungo.Router.section("main");
}

// Store initial configuration
function storeInitialConfiguration() {
	var select = Lungo.dom('#initial_configuration_language_select');
	var language_id = select[0].options[select[0].selectedIndex].value;	
	var phone = Lungo.dom("#initial_configuration_phone")[0].value;
	var new_configuration = {language_id: language_id, phone: phone};
	
	if (phone == null || "" == phone || "Phone" == phone) {
		showError("You must insert a phone number");
	} else {
	
		Lungo.Data.Sql.update('configuration', new_configuration, {id: '0'});
		

		initializeAppData();
		Lungo.Router.section("main");
	}
}

// Add initial configuration phone listener
Lungo.dom("#initial_configuration_phone").on('tap', function(data) {
	Lungo.dom("#initial_configuration_phone").attr('value', '');	
});

Lungo.dom("#initial_configuration_phone").on('blur', function(data) {
	if (Lungo.dom("#initial_configuration_phone").attr('value') == null 
		|| Lungo.dom("#initial_configuration_phone").attr('value') == "") {
		Lungo.dom("#initial_configuration_phone").attr('value', 'Phone');	
	}
});