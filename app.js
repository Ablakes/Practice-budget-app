var UIController = (function () {
    var DOMstrings = {
        type: '.add__type',
        description: '.add__description',
        value: '.add__value',
        addBtn: '.add__btn'
    };

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.type).value,
                description: document.querySelector(DOMstrings.description).value,
                value: document.querySelector(DOMstrings.value).value
            };
        },
        getDOMstrings: function () {
            return DOMstrings;
        },
    };


})();



var budgetController = (function () {
    //receive input, if exp add to exp array with an ID, if inc add to inc array with an ID
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }

    return {

        addItem: function (type, des, val) {
            var newItem, ID;

            // Set ID to one greater than the last item in array
            if (data.allItems.length === 0) {
                ID = 0;
            } else {
                ID = (data.allItems[type].length - 1) + 1;
            }

            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            data.allItems[type].push(newItem);
            // console.log(data.allItems.inc);
        },

        testing: data

    }



})();



var controller = (function (budgetCtrl, UICtrl) {
    var DOM = UICtrl.getDOMstrings();

    function addEventListeners() {
        document.querySelector(DOM.addBtn).addEventListener('click', function () {
            ctrlAddItem();
            console.log(budgetController.testing.allItems);
        });
        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13 /* event.which is for older browsers) */ ) {
                ctrlAddItem();

            };
        });
    };


    var ctrlAddItem = function () {
        var input = UICtrl.getInput();
        budgetCtrl.addItem(input.type, input.description, input.value);
    }

    return {
        init: function () {
            addEventListeners();
        }
    }
})(budgetController, UIController);

// Long story short, this line allows us to change the name of budgetController and UIcontroller to budgetCtrl and UICtrl
// This is were var budgetController is assigned to budgetCtrl.That way, we can access data from budgetController, but with a new variable name in the controller.This is a good practice because it makes the controller more independent - if we change the name of budgetController, we only have to change it once, where it's declared in this final line. If we just used the original variable name, we would have to change it everywhere in controller if the name changed.

controller.init();