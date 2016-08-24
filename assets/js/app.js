$(document).ready(function() {
  var trashIcon = '<i class="fa fa-trash" aria-hidden="true"></i>';
  var counter = localStorage.length > 0 ? localStorage.length : 0;
  // click in todo item
  $('ul').on('click', 'li', function() {
    $(this).toggleClass('completed');
    var todo = JSON.parse(localStorage.getItem($(this)[0].id));
    // generate updated todo
    var updateTodo = {
      id: todo.id,
      text: todo.text,
      done: !todo.done
    };
    // save updated todo
    localStorage.setItem(todo.id, JSON.stringify(updateTodo));
  });

  // load all item from localStorage
  if (localStorage.length > 0) {
    for(var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      var value = JSON.parse(localStorage[key]);
      var todoClass = value.done ? 'completed' : '';
      $('ul').append("<li id='" + key + "' class='" + todoClass + "'><span class='remove'>" + trashIcon + "</span>" + value.text + "</li>");
    }
  }

  // remove todo item
  $('ul').on('click', '.remove', function(event) {
    var todo = $(this).parent();
    todo.animate({
      marginLeft: -400
    }, 500, function() {
      todo.remove();
      localStorage.removeItem(todo[0].id);
    });
    event.stopPropagation();
  });

  // show delete button
  $('ul').on('mouseenter', 'li', function() {
    $(this).animate({
      marginLeft: 0
    }, 300);
  });

  // hide delete button
  $('ul').on('mouseleave', 'li', function() {
    $(this).animate({
      marginLeft: -45
    }, 300);
  });

  $('input[type="text"]').keypress(function(event) {
    if (event.which === 13) {
      var todoText = $(this).val();
      var todoCounter = ++counter;
      $('ul').append("<li id='" + ++todoCounter + "'><span class='remove'>" + trashIcon + "</span>" + todoText + "</li>");
      $(this).val('');
      var todo = {
        id: ++counter,
        text: todoText,
        done: false
      };
      // save to localStorage
      localStorage.setItem(todo.id, JSON.stringify(todo));
    }
  });
});
