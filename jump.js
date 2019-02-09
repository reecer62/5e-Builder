//Simple function for moving between pages


		function jump(loc) {
			document.location.href = loc;
	
		}
		function jumpAndSave(loc,name,val) {
			localStorage.setItem(name,val);
			document.location.href = loc;
	
		}
