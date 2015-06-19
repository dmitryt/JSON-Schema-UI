(function(){
	'use strict';

	var ID = 'schemaUtils';

	angular.module('adstreamJsonSchemaUI')
	.factory(ID, [
		function schemaUtils() {

			function _isGroupVisible(group, hideEmptyFields, fieldChecker) {
				if (group.hidden || !group.fields || !group.fields.length) {
					return false;
				}
				return group.fields.some(function(f){
					return fieldChecker(f, hideEmptyFields);
				});
			}

			function _isFieldVisible(field, hideEmptyFields, mode) {
				var ctxKey = {
					view: 'v',
					edit: 'e'
				}[mode];

				var value;
				if (Array.isArray(field.value)) {
					value = field.value.length > 0;
				} else {
					value = Boolean(field.value);
				}

				if (hideEmptyFields && !value) {
					return false;
				}

				if (field.hidden === true || (field.view && field.view.deleted === true)) {
					return false;
				}

				if (field.view && field.view[ctxKey]) {
					var view = field.view[ctxKey];
					if (angular.isDefined(view.hidden)) {
						return !view.hidden;
					}
					if (angular.isDefined(view.visible)) {
						return view.visible;
					}
				}

				return true;
			}

			function isFieldVisibleForView(field, hideEmptyFields) {
				return _isFieldVisible(field, hideEmptyFields, 'view');
			}

			function isFieldVisibleForEdit(field, hideEmptyFields) {
				return _isFieldVisible(field, hideEmptyFields, 'edit');
			}

			function isGroupVisibleForView(group, hideEmptyFields) {
				return _isGroupVisible(group, hideEmptyFields, isFieldVisibleForView);
			}

			function isGroupVisibleForEdit(group, hideEmptyFields) {
				return _isGroupVisible(group, hideEmptyFields, isFieldVisibleForEdit);
			}

			function getObject(path, context) {
				var pts = path && path.split('.') || null, splcontainer, symb;
				if (!pts) {
					return false;
				}

				pts = pts.map(function (item) {
					if (!splcontainer && item.match(/^['"]/)) {
						splcontainer = item.substring(1);
						symb = item[0];
						if (item[ item.length - 1 ] === symb) {
							item = splcontainer.substring(0, splcontainer.length - 1);
							splcontainer = null;
							return item;
						}
						return null;
					} else if (splcontainer) {
						if (item[ item.length - 1 ] === symb) {
							item = splcontainer + '.' + item.substring(0, item.length - 1);
							splcontainer = null;
							return item;
						} else {
							splcontainer += '.' + item;
						}
						return null;
					} else {
						return item;
					}
				})
				.filter(function (item) {
					return Boolean(item);
				});

				while (pts.length && context) {
					context = context[pts.shift()];
					if (context === null || context === undefined) {
						return null;
					}
				}

				return context;
			}

			return {
				isGroupVisibleForView: isGroupVisibleForView,
				isFieldVisibleForView: isFieldVisibleForView,
				isGroupVisibleForEdit: isGroupVisibleForEdit,
				isFieldVisibleForEdit: isFieldVisibleForEdit,
				getObject: getObject
			};

		}
	]);

})();