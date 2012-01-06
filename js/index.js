(function(){
    
    //Handle convert clicked
    function convert(sql, e) {
		var matchCreateTable = /create\s+table\s+.([^`]+)./gi,
            matchesForCreate = sql.match(matchCreateTable),
            tableNamesArray = [];
        debugger;
    }
        
    //DOM LOAD
    //----------
    $(function(){
        var io = $('#io'),
            $convertbutton = $('#convertButton');
        
        //Event Bindings
        $convertbutton.bind('click', function(e){
			convert($io.val(), e);
			return false;
        });
        
    });
    
}());