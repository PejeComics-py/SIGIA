const form = document.querySelector("form")
const validateName = document.getElementById("fname")

function validate(field) {
	if(!field.validity.valid) {
		return false;
	}
	return true;
}
// Prevent from submiting 
form.addEventListener("submit", function(e) {
	e.preventDefault();

	const isValid = validate(validateName);

	if(isValid){
		console.log("success!");
	} else {
		console.log("error");
	}
})

