var CONFIG = {
		    name: 'routine_plannerW.db',         //Name of the database
		    version: '1.0',           //Version of the database
		    size: 65536,              //Size of the database
		    schema: [                 //Database schema
		        {
		            name: 'exercise',     
		            fields: {         
		              id: 'INTEGER PRIMARY KEY',
		              name: 'TEXT',		              
		              description: 'TEXT',
		              picture: 'TEXT',
					  group_id: 'INTEGER'
		            }
		        },
		        {
		        	name: 'exerciseRoutine',
		        	fields: {
		        		id: 'INTEGER PRIMARY KEY',
		        		exercise_id: 'INTEGER',
		        		routine_id: 'INTEGER', 
		        		repetition_id: 'INTEGER'
		        	}
		        }, 
		        {
		        	name: 'routine',
		        	fields: {
		        		id: 'INTEGER PRIMARY KEY',
		        		name: 'TEXT',
		        		description: 'BLOB',
		        		startDate: 'DATE',
		        		endDate: 'DATE',
		        		trainer: 'TEXT',
		        		ready_to_use: 'BOOL',
						days_per_week: 'INTEGER',
						shown: 'BOOL DEFAUL false'
		        	}
		        },
		        {
		        	name: 'serie',
		        	fields: {
		        		id: 'INTEGER PRIMARY KEY',
		        		is_percentage: 'BOOL',
		        		recover_minutes_min: 'INTEGER',
		        		recover_minutes_max: 'INTEGER',
		        		initial_percentage_weight: 'FLOAT',
						day: 'INTEGER',
						comments: 'BLOB'
		        	}
		        },
		        {
		        	name: 'repetition',
		        	fields: {
		        		id: 'INTEGER PRIMARY KEY',
		        		repetitions: 'INTEGER',		        		
		        		initial_percentage: 'INTEGER',
		        		is_percentage: 'INTEGER',
		        		initial_weight: 'INTEGER',
		        		new_percentage: 'INTEGER',
						new_weight: 'INTEGER',
		        		rep_order: 'INTEGER',	
		        	}
		        },
				{
		        	name: 'configuration',
		        	fields: {
						id: 'INTEGER PRIMARY KEY',
		        		language_id: 'INTEGER',		        		
						phone: 'TEXT',
		        	}
		        },
				{
		        	name: 'language',
		        	fields: {
		        		id: 'INTEGER PRIMARY KEY',
						description: 'TEXT',
						prefix: 'TEXT',
		        	}
		        },
				{
		        	name: 'groups',
		        	fields: {
		        		id: 'INTEGER PRIMARY KEY',
						name: 'TEXT'						
		        	}
		        },
				{
		        	name: 'muscle',
		        	fields: {
		        		id: 'INTEGER PRIMARY KEY',
						name: 'TEXT',
						group_id: 'INTEGER'
		        	}
		        },
				{
		        	name: 'intensity',
		        	fields: {
		        		id: 'INTEGER PRIMARY KEY',
						intensity: 'TEXT',						
		        	}
		        },
				{
		        	name: 'exerciseMuscle',
		        	fields: {
		        		id: 'INTEGER PRIMARY KEY',
						intensity_id: 'INTEGER',
						exercise_id: 'INTEGER',
						muscle_id: 'INTEGER'
		        	}
		        }
		    ]
		};

		

// TODO This must dissapear
var exercises = [
    {
        id : 0,
        name : 'exercise 0',
        description: 'exercise 0 description',
        picture: image1,
		group_id: 0
    },{
        id : 1,
        name : 'exercise 1',
        description: 'exercise 1 description',
        picture: image2,
		group_id: 0
    }
];

var exerciseRoutines = [
    {
        id: 0,
		exercise_id: 0,
		routine_id: 0, 
		repetition_id: 0
    },{
        id: 1,
		exercise_id: 1,
		routine_id: 0, 
		repetition_id: 1
    }
];

var routines = [
    {
        id: 0,
		name: 'routine 0',
		description: 'description routine 0',
		startDate: 1368784611000,
		endDate: 1368784611000,
		trainer: 'trainer 0',
		ready_to_use: false,
		days_per_week: 1,
		shown: false
    },{
        id: 1,
		name: 'routine 1',
		description: 'description routine 1',
		startDate: 1368784611000,
		endDate: 1368784611000,
		trainer: 'trainer 1',
		ready_to_use: false,
		days_per_week: 1,
		shown: false
    }
];

var series = [
    {
        id: 0,
		is_percentage: false,
		recover_minutes_min: 1,
		recover_minutes_max: 1,
		initial_percentage_weight: 50,
		day: 1,
		comments: 'LALALA'
    },{
        id: 1,
		is_percentage: false,
		recover_minutes_min: 1,
		recover_minutes_max: 1,
		initial_percentage_weight: 20,
		day: 1,
		comments: 'LALALA'
    }
];

var repetitions = [
    {
        id: 0,
		repetitions: 1,		        		
		initial_percentage: 10,
		is_percentage: 1,
		initial_weight: 10,
		new_percentage: 5,
		rep_order: 1,
		new_weight: 10
    },{
        id: 1,
		repetitions: 2,		        		
		initial_percentage: 40,
		is_percentage: 2,
		initial_weight: 50,
		new_percentage: 10,
		rep_order: 2,
		new_weight: 10
    }
];

var languages = [
    {
        id: 0,
		description: 'English',
		prefix: 'en'
    },{
        id: 1,
		description: 'Spanish',
		prefix: 'es'
    }
];

var configuration = [
    {
		id: 0,
        language_id: 0,	
		phone: '666777888'
    }
];

var groups = [
    {
		id: 0,
        name: 'Group 0'			
    }
];

var muscle = [
    {
		id: 0,
        name: 'Group 0',
		group_id: 0
    }
];

var intensity = [
    {
		id: 0,
        intensity: 'Intensity'			
    }
];

var exerciseMuscle = [
    {
		id: 0,
        intensity_id: 0,
		exercise_id: 0,
		muscle_id: 0
    }
];
	
	function insertData() {
		Lungo.Data.Sql.insert('exercise', exercises);
		Lungo.Data.Sql.insert('routine', routines);
		Lungo.Data.Sql.insert('serie', series);
		Lungo.Data.Sql.insert('repetition', repetitions);
		Lungo.Data.Sql.insert('exerciseRoutine', exerciseRoutines);
		Lungo.Data.Sql.insert('language', languages);
		Lungo.Data.Sql.insert('configuration', configuration);
		Lungo.Data.Sql.insert('groups', groups);
		Lungo.Data.Sql.insert('muscle', muscle);
		Lungo.Data.Sql.insert('intensity', intensity);
		Lungo.Data.Sql.insert('exerciseMuscle', exerciseMuscle);
	}