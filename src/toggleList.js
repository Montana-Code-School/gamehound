function ToggleList(list){
	this.list = list ? list : []
}


// 
ToggleList.prototype.toggle = function(item){
	    var elementIndex = this.list.indexOf(item);
	    if(elementIndex === -1){ 
	    	return new ToggleList(this.list.concat(item));
		} else {
			var newArray = this.list.slice()
			newArray.splice(elementIndex, 1)
			return new ToggleList(newArray)
		}
}

ToggleList.prototype.addToTextList = function(newInput){
	return new ToggleList(this.list.concat(newInput));
}

ToggleList.prototype.removeTextFromList = function(textItem){
	var itemIndex = this.list.indexOf(textItem);
	var newArray = this.list.slice()
	newArray.splice(itemIndex,1)
	return new ToggleList(newArray)
}


module.exports = ToggleList