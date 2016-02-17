(function(){
	'use strict';

	var ID = 'schemaUtils';

	angular.module('json-schema-ui')
	.factory(ID, [
		function schemaUtils() {
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
				getObject: getObject
			};

		}
	]);

})();
