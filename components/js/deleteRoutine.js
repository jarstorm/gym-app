				
		// Delete routine
		var showDeleteInfo = function(data){			
			Lungo.dom('#delete_routines_list').empty();					
		    for(var i = 0, len = data.rows.length; i < len; i++){
		        var name = data.rows.item(i).name;
		        var id = data.rows.item(i).id;		    			
				var deleteButtonText = jQuery.i18n.prop('delete_button_text');
		        Lungo.dom('#delete_routines_list').append('<li style=\"height: 38px;padding-top: 0px;padding-bottom: 0px;\"><div style=\"float:left;padding-top: 10px;\"><label>' + name + ' </label></div><div style=\"float:right;padding-top: 4px;\"><a class="button small right" id="'+id+'" name="'+name+'">' + deleteButtonText + '</div></a></li>');
		    }		    					
						 
			Lungo.dom('#delete_routines_list li a').on('singleTap',function(event){
				var id = event.srcElement.id;
				var name = event.srcElement.name;
				Lungo.Data.Storage.session("id", id);
				Lungo.Data.Storage.session("name", name);
				Lungo.Router.section("confirm_delete_routine");				
			});			 
		};		
		
		// Delete Routine
	Lungo.dom('#delete_routine').on('load', function(event){		
    	Lungo.Data.Sql.execute('SELECT * FROM routine', showDeleteInfo);		
	});
	
	// Confirm delete Routine
	Lungo.dom('#confirm_delete_routine').on('load', function(event){
		var id = Lungo.Data.Storage.session("id");
		var name = Lungo.Data.Storage.session("name");
    	
		var confirmDeletionText = jQuery.i18n.prop('confirm_routine_deletion_text');
		Lungo.dom('#confirm_delete_routine_p').text(confirmDeletionText + ' ' + name + "?");		
		
		Lungo.dom('#button_ok_confirm_delete_routine').on('singleTap', function(event){		
			Lungo.Data.Sql.execute('DELETE FROM routine where id=' + id);		
			Lungo.Data.Sql.execute('DELETE FROM exerciseRoutine where routine_id=' + id);					
			// TODO Delete exercises
			Lungo.Router.section("main");
		});
	});
	
	