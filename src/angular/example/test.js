angular.module('test', ['json-schema-ui', 'pascalprecht.translate'])
    .config(['$translateProvider', 'schemaStateServiceProvider', function($translateProvider, schemaStateServiceProvider){
        schemaStateServiceProvider.configure({
            schemaEndpoint: '/example/schemas',
            dictionaryEndpoint: '/example/dictionaries',
            dictionaryParser: function(data){
                var result = {},
                    languages = ['en', 'de', 'ru'];
                languages.forEach(function(lang) {
                    var store = result[lang] = [];
                    data.forEach(function(item) {
                        var locales = item.locales || {};
                        store.push({
                            key: item.value,
                            label: locales[lang] || item.name
                        });
                    });
                });
                return result;
            },
            i18n: true
        });
        $translateProvider.translations('de', {
          'Input Label': "Die Beschriftung des Eingabefeldes",
          'Input Description': "Beschreibung des Eingabefeldes",
          'Date Label': "Tag Datumsfeld",
          'Date Description': "Datum Beschreibung des Feldes",
          'Select Label': "Tag Dropdown-Liste",
          'Select Description': "Beschreibung Dropdown-Liste",
          'Textarea Label': "Markieren Sie das Texteingabefeld",
          'Textarea Description': "Beschreibung des Texteingabebereich",
          'Checkbox Label': "Flaglabel",
          'Radio Label': "Schalter-Aufkleber",
          'Child1 Label': "Tag Nachkomme1",
          'Child2 Label': "Tag Nachkomme2",
          'Year Picker Label': "Label-Feld das Jahr zu wählen",
          'BUTTON_SAVE': "Behalten",
          'BUTTON_UPDATE': "Aktualisierung",
          'BUTTON_RESET': "Zurückstellen"
        });
        $translateProvider.translations('ru', {
          'Input Label': "Метка поля ввода",
          'Input Description': "Описание поля ввода",
          'Date Label': "Метка поля даты",
          'Date Description': "Описание поля даты",
          'Select Label': "Метка выпадающего списка",
          'Select Description': "Описание выпадающего списка",
          'Textarea Label': "Метка области ввода текста",
          'Textarea Description': "Описание области ввода текста",
          'Checkbox Label': "Метка флажка",
          'Radio Label': "Метка переключателя",
          'Child1 Label': "Метка потомка1",
          'Child2 Label': "Метка потомка2",
          'Year Picker Label': "Метка поля для выбора года",
          'BUTTON_SAVE': "Сохранить",
          'BUTTON_UPDATE': "Обновить",
          'BUTTON_RESET': "Сбросить"
        });
        $translateProvider.preferredLanguage('en');
        $translateProvider.useSanitizeValueStrategy('escaped');
    }])
    .directive('myDirective', function(){
        return {
            restrict: "E",
            replace: true,
            template: "<div><div>Custom directive</div><scm-field-input></scm-field-input></div>"
        }
    })
    .controller("MyController", function($scope, $translate){
        var fields = {
            input: {
                "type": "input",
                "path": "path.from.root.input",
                "view": {
                    "label": "Input Label",
                    "description": "Input Description"
                }
            },
            inputWithCustomModelData: {
                "type": "input",
                "path": "path.from.root.customModelInput@some.other.path",
                "model": {
                    "any": "data",
                    "is": {
                        "here": "there"
                    }
                },
                "view": {
                    "label": "Input With Custom Model",
                    "description": "Input With Custom Model Description"
                }
            },
            dynamicModelInput: {
                "type": "input",
                "path": "path.from.root.input.locales[subPath]",
                "view": {
                    "label": "Input Label",
                    "description": "Input Description"
                }
            },
            checkbox: {
                "type": "checkbox",
                "path": "path.from.root.checkbox",
                "value": "checked_value",
                "view": {
                    "label": "Checkbox Label"
                }
            },
            radio: {
                "type": "radio",
                "path": "path.from.root.radio",
                "source": "animals.json",
                "view": {
                    "label": "Radio Label"
                }
            },
            date: {
                "type": "date",
                "path": "path.from.root.date",
                "view": {
                    "label": "Date Label",
                    "description": "Date Description"
                }
            },
            dateYear: {
                "type": "date",
                "path": "path.from.root.dateYear",
                "view": {
                    "label": "Year Picker Label",
                    "minMode": "year"
                }
            },
            select: {
                "type": "select",
                "source": "countries.json",
                "path": "path.from.root.select",
                "view": {
                    "label": "Select Label",
                    "placeholder": "Select country",
                    "description": "Select Description"
                }
            },
            textarea: {
                "type": "textarea",
                "path": "path.from.root.textarea",
                "view": {
                    "label": "Textarea Label",
                    "description": "Textarea Description"
                }
            },
            array: {
                "type": "array",
                "complex": true,
                "path": "path.from.root.array@relative.model",
                "model": {
                    "some": "data is here"
                },
                "modelItem": {
                    "itemModelData": "123"
                },
                "fields": [{
                    "type": "input",
                    "path": "child1",
                    "view": {
                        "label": "Child1 Label"
                    }
                }, {
                    "type": "input",
                    "path": "child2",
                    "view": {
                        "label": "Child2 Label"
                    }
                }]
            },
            custom: {
                "directive": "my-directive",
                "path": "path.from.root.custom",
                "view": {
                    "description": "Custom Description"
                }
            }
        };
        $scope.selected = {
            locale: "en"
        };
        $scope.i18nSelected = {
            locale: "en"
        };
        $scope.languages = [
            {label: "English", key: "en"},
            {label: "Deutsch", key: "de"},
            {label: "Russian", key: "ru"}
        ];

        $scope.formData = {};
        $scope.externalSourceFormData = {};
        $scope.dynamicChangedModelData = {};
        $scope.readonlyFormData = {
            "path": {
                "from": {
                    "root": {
                        "input": "Readonly input value",
                        "select": "Readonly select value",
                        "checkbox": "checked_value",
                        "textarea": "Readonly textarea value",
                        "array": [{
                                "child1": "first item: child1",
                                "child2": "first item: child2"
                            },{
                                "child1": "second item: child1",
                                "child2": "second item: child2"
                            }
                        ]
                    }
                }
            }
        };
        $scope.fieldData = {};
        $scope.customData = {};

        $scope.fields = fields;
        $scope.formFields = [fields.input, fields.inputWithCustomModelData, fields.checkbox, fields.radio, fields.date, fields.dateYear, fields.select, fields.textarea, fields.array];
        $scope.dynamicChangedModelFields = [fields.dynamicModelInput];

        $scope.changeLocalization = function(key) {
            $translate.use(key);
        }
        $translate.use('en');
    });
