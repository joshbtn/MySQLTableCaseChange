(function(){
    
    // Handle convert clicked
    function convert(sql, toUpperCase, e) {
		
		// Make sure toUpperCase is a boolean. If it's not default to false.
		toUpper = (toUpper === true ||  toUpper === false) ? toUpper : false;
		
		// RegExp to Match the 'create' statment to get table names
		var matchCreateTable = new RegExp("create\\s+table\\s+`[^`]+`", "gi"),
		
		// Store matches for the create statments
			matchesForCreate = sql.match(matchCreateTable),
		
		// RegExp to Match the table names
			matchTableName = new RegExp("`[^`]+`"),
		
		//This will hold the original table names		
            originalNames = [],
		
		//This will hold the new tableNames
			newNames = [],
		
		//These are used in the for loop
			curStr = "",
			curIndex = 0;
		
		//Loop through all create statments to pull out the table names
		for(; curIndex < matchesForCreate.length; curIndex+=1 ){
			
			//set the current create stament
			curStr = matchesForCreate[curIndex];
			
			
			originalNames.push(curStr.match(matchTableName)[0]);
			
			newNames.push( curStr.match(matchTableName)[0].toString()[toUpper ? "toUpperCase" : "toLowerCase"]() );
		}
		debugger;
    }
        
    //DOM LOAD
    //----------
    $(function(){
        var $io = $('#io'),
            $convertbutton = $('#convertButton');
        
        //Event Bindings
        $convertbutton.bind('click', function(e){
			convert($io.val(), e);
			return false;
        });
        
    });
    
}());