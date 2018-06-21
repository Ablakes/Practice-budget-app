var UIController = (function () {
    var DOMstrings = {
        type: '.add__type',
        description: '.add__description',
        value: '.add__value',
        addBtn: '.add__btn',
        incomeList: '.income__list',
        expensesList: '.expenses__list'
    };

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.type).value,
                description: document.querySelector(DOMstrings.description).value,
                value: document.querySelector(DOMstrings.value).value,
            };
        },
        addListItem: function (obj, type) {
            //Create html
            var html, newHTML, element;

            if (type == 'inc') {
                html = '<div class="item clearfix" id="income-IDDD"><div class="item__description">DESCCC</div><div class="right clearfix"><div class="item__value">VALLL</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                element = DOMstrings.incomeList;
            } else if (type === 'exp') {
                html = '<div class="item clearfix" id="expense-IDDD"><div class="item__description">DESCCC</div><div class="right clearfix"><div class="item__value">VALLL</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                element = DOMstrings.expensesList;
            }

            //Sub in the correct info for class names and whatnot. 
            //WTF is happening here you ask? Well, we need to create a copy of the html for each new item. We can't alter the html variable because then we wouldn't be able to reuse it in this context. So, newHTML becomes the placeholder for each new item until it is pushed into the DOM.
            newHTML = html.replace('IDDD', obj.id);
            newHTML = newHTML.replace('DESCCC', obj.description);
            newHTML = newHTML.replace('VALLL', obj.value);

            // insert into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
        },
        getDOMstrings: function () {
            return DOMstrings;
        }
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
            return newItem;
        },

        testing: data

    }



})();



var controller = (function (budgetCtrl, UICtrl) {
    var DOM = UICtrl.getDOMstrings();

    function addEventListeners() {
        document.querySelector(DOM.addBtn).addEventListener('click', function () {
            ctrlAddItem();
            // console.log(budgetController.testing.allItems);
        });
        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13 /* event.which is for older browsers) */ ) {
                ctrlAddItem();

            };
        });
    };


    var ctrlAddItem = function () {
        var newItem;
        var input = UICtrl.getInput();
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        console.log(newItem);
        UICtrl.addListItem(newItem, input.type);
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