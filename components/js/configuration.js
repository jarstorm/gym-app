// Update all components language
function updateComponentLanguage() {
	for(var i = 0, len = $$(".language").length; i < len; i++){
		var id = ($$(".language")[i]).id;
		if (($$(".language")[i]).children.length == 0) {
			($$(".language")[i]).textContent = jQuery.i18n.prop(id);	
		} else {		
			($$(".language")[i]).children[0].textContent = jQuery.i18n.prop(id);	
		}
	}	
}

// Update configuration language combo value
function updateComboValue(id) {
	Lungo.dom('#configuration_language_select')[0].selectedIndex = id;
}

// Update phone text field
function updatePhoneTextField(phone) {
	Lungo.dom("#configuration_phone")[0].value = phone;
}

// Update app language
function updateAppConfiguration() {
	Lungo.Data.Sql.select('configuration c INNER JOIN language l ON c.language_id = l.id', {'c.id': '0'}, function(data){
		var prefix = data[0].prefix;
		var id = data[0].language_id;
		var phone = data[0].phone;
		Lungo.Data.Cache.remove("prefix");
		Lungo.Data.Cache.set("prefix", prefix);
		jQuery.i18n.properties({
				name:'Messages', 
				path:'bundle/', 
				mode:'both',
				language: prefix, 				
			});
		updateComponentLanguage();			
		updateComboValue(id);
		updatePhoneTextField(phone);
	});
		
}

// Save configuration method
function saveConfiguration() {

	var select = Lungo.dom('#configuration_language_select');
	var language_id = select[0].options[select[0].selectedIndex].value;	
	var phone = Lungo.dom("#configuration_phone")[0].value;
	var new_configuration = {language_id: language_id, phone: phone};
	Lungo.Data.Sql.update('configuration', new_configuration, {id: '0'});

	// Update language cache value	
	updateAppConfiguration();		
			
	// Back to main window
	Lungo.Router.section("main");
}

function updateConfigurationData() {
	Lungo.Data.Sql.select('configuration c INNER JOIN language l ON c.language_id = l.id', {'c.id': '0'}, function(data){
		var prefix = data[0].prefix;
		var id = data[0].language_id;
		var phone = data[0].phone;			
		updateComboValue(id);
		updatePhoneTextField(phone);
	});
}
