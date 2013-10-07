var rules = function(webot){
	webot.set({
        name:'test',
        description:"初始化",
        pattern: /1/i,
        handler: function(info , next ){
        	next(null,'get it');
        }
    });
}

module.exports = rules;