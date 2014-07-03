// CHeck the values of step 1 of new routine
function checkValuesOfStep1() {
	var name = Lungo.dom('#new_routine_name')[0].value;
	var doneBy = Lungo.dom('#new_routine_done_by')[0].value;
	var from = Lungo.dom('#new_routine_from')[0].value;
	var to = Lungo.dom('#new_routine_to')[0].value;
	var description = Lungo.dom('#new_routine_description')[0].value;
	
	var error = "";
	
	if (name == null || "" == name) {
		error += "You must enter a name";
	}
	if (doneBy == null || "" == doneBy) {
		error += "<br>You must enter a done by";
	}
	if (from == null || "" == from) {
		error += "<br>You must enter a from";
	}
	if (to == null || "" == to) {
		error += "<br>You must enter a to";
	}
	if (description == null || "" == description) {
		error += "<br>You must enter a description";
	}
	var returnValue = 1;
	if (error != "") {
		showError(error);
		returnValue = 0;
	} 
	
	return returnValue;
}

// Store new routine setp 1
function storeNewRoutineStep1(){
	var name = Lungo.dom('#new_routine_name')[0].value;
	var doneBy = Lungo.dom('#new_routine_done_by')[0].value;
	var from = Lungo.dom('#new_routine_from')[0].value;
	var to = Lungo.dom('#new_routine_to')[0].value;
	var description = Lungo.dom('#new_routine_description')[0].value;
	
	var returnValue = checkValuesOfStep1();
	if (returnValue == 1) {
		var setp1 = {name: name, doneBy: doneBy, from: from, to: to, description: description, exercises: []};
		
		Lungo.Data.Cache.set("new_routine", setp1);
		
		
		Lungo.Router.section("new_routine_step_2");					
	}
}

// Update new routine step 2 --> exercises
function updateExerciseArea(exercises){
	Lungo.dom('#language_new_routine_exercises_list').empty();
	for(var i = 0, len = exercises.length; i < len; i++){
		var name = exercises[i].name;
		var description = exercises[i].description;						
		Lungo.dom('#language_new_routine_exercises_list').append('<li class="arrow">' + name + ' ' + description + '</li>');
	}	
}

// Add exercise
function storeNewRoutineAddExercise() {
	var cacheRoutine = Lungo.Data.Cache.get("new_routine");	
	
	var exerciseName = Lungo.dom('#add_exercise_name')[0].value;
	var exerciseDescription = Lungo.dom('#add_exercise_description')[0].value;
	
	var newExercise = {name: exerciseName, description: exerciseDescription, picture: ''};
	cacheRoutine.exercises.push(newExercise);	
	
	Lungo.Data.Cache.set("new_routine", cacheRoutine);
	
	updateExerciseArea(cacheRoutine.exercises);	
		
	Lungo.Router.section("new_routine_step_2");	
}

// Insert exercises
var insertRoutineExercises = function(routineResult){
	var lastInsertedRoutineId = routineResult.rows.item(0).id;
	var cachedValue = Lungo.Data.Cache.get("new_routine");	
	var length = cachedValue.exercises.length;
	for (var i = 0; i < length; i++) {
		var cachedExercise = cachedValue.exercises[i];
		Lungo.Data.Sql.insert('exercise', cachedExercise);		
	}
	
	// Link the exercises with the routine
	Lungo.Data.Sql.execute('SELECT * FROM exercise ORDER BY id DESC', function(result) {
		// Insert relations between new exercises and new routines
		for (var i = 0; i < length; i++) {
			var relation = {exercise_id: result.rows.item(i).id, routine_id: lastInsertedRoutineId};
			Lungo.Data.Sql.insert('exerciseRoutine', relation);		
		}
		
		Lungo.Router.section("main");	
	});
	
}

// Store a routine in the BBDD
function storeRoutine(routine) {
	Lungo.Data.Cache.set("new_routine", routine);	
	
	var newRoutine = {name: routine.name, description: routine.description};
	
	// Insert routine
	Lungo.Data.Sql.insert('routine', newRoutine);
	
	// Get the last routine inserted id
	Lungo.Data.Sql.execute('SELECT * FROM routine ORDER BY id DESC', insertRoutineExercises);
}
	
// Function to insert routine from the mobile APP in BBDD
function storeNewRoutineEnd() {
	var cachedValue = Lungo.Data.Cache.get("new_routine");	
	storeRoutine(cachedValue);
}


// Show percentage area (Add serie)
Lungo.dom('#language_add_exercise_percentage_radio').on('tap', function(event) {
	Lungo.dom('#new_exercise_percentage_div').show();
	Lungo.dom('#new_exercise_manual_div').hide();
});

// Show manual area (Add serie)
Lungo.dom('#language_add_exercise_manual_radio').on('tap', function(event) {
	Lungo.dom('#new_exercise_percentage_div').hide();
	Lungo.dom('#new_exercise_manual_div').show();
});

