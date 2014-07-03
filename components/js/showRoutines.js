// Append exercises to the list of exercises
function appendExercise(id, name, description, picture) {
	//var html = '<li><p id="show_routine_exercise_p'+ id +'"><span class="icon plus" ></span>' + name + 
	//	'</p><div style="display:none;" id="show_routine_exercise_div'+ id +'">' + description+ '<img alt="" src="'+picture+'"></img></div></li>';
	// TODO Contar las series
	var seriesCount = id;
	var html = '<li class="arrow exercise">' + name + '<small> ' + seriesCount + ' series</small></li>';
	
	Lungo.dom('#show_routine_list').append(html);	
}

// Show routine data
var showRoutineData = function(data){			
	var name = data.rows.item(0).name;
	var doneBy = data.rows.item(0).trainer;
	var from = dateFormatter(data.rows.item(0).startDate);
	var to = dateFormatter(data.rows.item(0).endDate);	
	var description = data.rows.item(0).description;
	
	Lungo.dom('#show_routine_data_name').text(name);
	Lungo.dom('#show_routine_data_done_by').text(doneBy);
	Lungo.dom('#show_routine_data_from').text(from);
	Lungo.dom('#show_routine_data_to').text(to);
	Lungo.dom('#show_routine_data_description').text(description);
};
		
// Show routine exercises
var showRoutineExercises = function(data){			
	
	// Append the exercises to the list
	for(var i = 0, len = data.rows.length; i < len; i++){
		var name = data.rows.item(i).name;
		var id = data.rows.item(i).id;		
		var description = data.rows.item(i).description;		
		var picture = data.rows.item(i).picture;		
		appendExercise(id, name, description, picture);				
	}
	
	// Listener to show elements info
	Lungo.dom('#show_routine_list li').on('tap',function(event){		
		if (event.srcElement.classList.contains('exercise') === true) {
			Lungo.Router.section("show_exercise_info");
		} else {
			var routineId = event.srcElement.attributes.value.value;
			Lungo.Data.Sql.execute('Select * FROM routine r WHERE r.id=' + routineId, showRoutineData);				
			Lungo.Router.section("show_routine_info");
		}
	});
	
	// Listener to edit exercises
	Lungo.dom('#show_routine_list li').on('hold',function(event){		
		if (event.srcElement.classList.contains('exercise') === true) {
			Lungo.Router.section("edit_exercise");
		}
	});
				
}

// Show	routine info
var showRoutineInfo = function(data) {
	var name = data.rows.item(0).name;
	var doneBy = data.rows.item(0).trainer;
	var from = dateFormatter(data.rows.item(0).startDate);
	var to = dateFormatter(data.rows.item(0).endDate);	
	var id = data.rows.item(0).id;
	
	//TODO Internacionalizar esto
	var smallText = 'Done by: '+ doneBy + ' From: '+from + ' To: ' + to;
	
	var html = "<li class='arrow dark' value='" + id + "'><p id='show_routine_details_p' value='" + id + "'>" + name + "</p><small><p id='show_routine_details_small_p' value='" + id + "'>" + smallText + "</p></small></li>";
	Lungo.dom('#show_routine_list').append(html);		
}		

// Show routines
var showInfo = function(data){			
	Lungo.dom('#show_routines_list').empty();					
	for(var i = 0, len = data.rows.length; i < len; i++){
		var name = data.rows.item(i).name;
		var id = data.rows.item(i).id;		    				
		var ready_to_use = data.rows.item(i).ready_to_use;	
		var shown = data.rows.item(i).shown;	
		
		var text = name;
		if (ready_to_use == "true") {
			text = text + "  (not complete)";
		}
		var liClass="arrow";
		if (shown == "true") {
			liClass = "arrow light";
		}
		Lungo.dom('#show_routines_list').append('<li id="'+id+'" class="'+ liClass+ '">' + text + '</li>');
	}		    
	
	// Listener to show routine info
	Lungo.dom('#show_routines_list li').on('singleTap',function(event){		
		var id = event.srcElement.getAttribute('id');											
		Lungo.dom('#show_routine_list').empty();
		Lungo.Data.Sql.execute('Select * FROM routine r WHERE r.id='+id, showRoutineInfo);				
		Lungo.Data.Sql.execute('Select e.* FROM exercise e INNER JOIN exerciseRoutine er ON er.exercise_id = e.id INNER JOIN routine r ON r.id = er.routine_id WHERE r.id='+id, showRoutineExercises);				
		Lungo.Router.section("show_routine");
	});
				 
};		
		
	// Main section
	Lungo.dom('#main').on('load', function(event){		
    	Lungo.Data.Sql.execute('SELECT * FROM routine', showInfo);
	});
					