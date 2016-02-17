(function(){
	'use strict';
	var ID = "schemaFieldsService";

	angular.module("json-schema-ui")
	.service(ID, [
		function schemaFieldsService() {
			return {
				getDirectiveByType: function(type) {
					return {
                        "input": "scm-field-input",
                        "textarea": "scm-field-textarea",
                        "select": "scm-field-select",
                        "date": "scm-field-date",
                        "checkbox": "scm-field-checkbox",
						"radio": "scm-field-radio",
                        "array": "scm-field-array"
                    }[type];
				}
			};
		}
	]);
})();
