(function(){
    
    // Convert takes the sql text from mysqldump, and a toUppercase boolean value.
	// If toUpperCase is set to false then names will be converted to lower case.
    function convert(sql, toUpperCase) {
		
		// Make sure toUpperCase is a boolean. If it's not default to false.
		toUpperCase = (toUpperCase === true ||  toUpperCase === false) ? toUpperCase : false;
		
		// RegExp to Match the 'create' statment to get table names
		var matchCreateTable = new RegExp("create\\s+table\\s+`[^`]+`", "gi"),
		
		// Store matches for the create statments
			matchesForCreate = sql.match(matchCreateTable),
		
		// RegExp to Match the table names
			matchTableName = new RegExp("`[^`]+`"),
		
		// This will hold a map from the old names to the new tableNames
			nameMap = {},
		
		// RegExp to match the current name.
			matchToReplace = null,
		
		// RegExp to match drop statements.  Seemed useful to me to drop the new case, and 
			matchDropToDup = null,
		
		// Output string
			outStr = sql,
			
		// _These are used in the for loop_
			curStr = "",
			curIndex = 0,
			curTableName = "",
			newName ="";
		
		if( !matchesForCreate || matchesForCreate.length == 0){
			return
		}
		
		//Loop through all create statments to pull out the table names
		for(; curIndex < matchesForCreate.length; curIndex+=1 ){
			
			// Set the current create stament
			curStr = matchesForCreate[curIndex];
			
			//Set the current table name
			curTableName = curStr.match(matchTableName)[0];
			
			//Set the new table name.
			newName = curTableName[toUpperCase ? "toUpperCase" : "toLowerCase"]();
			
			//Create a mapping of all changed names.
			nameMap[curTableName] = newName;
			
			// Replace original table name with new tablename
			matchToReplace = new RegExp(curTableName, "gi");
			outStr = outStr.replace(matchToReplace, newName);
			
			// Drop both the new name, and the originalName
			matchDropToDup = new RegExp ("(DROP\\s+TABLE[^`]+`" + newName + "+`\\s*;)", "gi");
			//TODO MAKE THIS WORK
			//outStr = outStr.replace(matchDropToDup, "\1\n" + "xxxDROP TABLE IF EXISTS `" + curTableName + "`;");
		}
		
		return outStr;
    }
    
	//#PAGE LOGIC BELOW
    //- - - - - - - - - - - - - - - - - - 
	var timeForShowHide = 200,
		delayTime = 500,
		fadeOutTime = 300;
		
    // DOM LOAD
    // ----------
    $(function(){
        var $io = $('#io'),
            $convertbutton = $('#convertButton'),
			$qua = $('#qua'),
			$what = $('#what'),
			$whatButton = $('#whatButton'),
			$how = $('#how'),
			$howButton = $('#howButton'),
			$toUpper = $('#rUpper'),
			$status = $('#status');
        
        //Handle convert button clicked
        $convertbutton.bind('click', function(e){
			$status.css('visibility', 'visible');
			$status.fadeIn(0)
			
			$status.html('converting...');
			$status.attr('class', 'pending');
			
			try{
				$io.val(convert($io.val(), $toUpper.get(0).checked ));
				$status.text('Done!');
				$status	
					.attr('class', 'done')
					.delay(delayTime)
					.fadeOut(fadeOutTime);
			} catch (e) {
				if(typeof console !== 'undefined' && console !== null && console.log !== undefined && console.log !== null){
					console.log(e);
				}
				$status.html('Therewas an error. Check the console for more information.');
				$status.attr('class', 'error');
				return false;
			}
			
				
			return false;
        });
		
		//Show what
		$whatButton.click(
			function(e){
				if( $what.css('display') === 'none' ){
					$what.show(timeForShowHide);
				} else {
					$what.hide(timeForShowHide);
				}
			}
		);
		
		$howButton.click(
			function(e){
				if( $how.css('display') === 'none' ){
					$how.show(timeForShowHide);
				} else {
					$how.hide(timeForShowHide);
				}
			}
		);
		
		$qua.delegate('.desc .closeDesc', 'click', function(){
			$(this).parent().parent().hide(timeForShowHide);
		});
    });
    
}());