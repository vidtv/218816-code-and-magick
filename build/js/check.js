var getMessage = function(a,b) {
  if (typeof a === 'boolean') {
    if (a) {
      return 'Я попал в ' + b;
    }
    else return 'Я никуда не попал';
  }

  else if (typeof a === 'number') {
    return 'Я прыгнул на ' + a*100 + ' сантиметров';
  }

  else if (a instanceof Array && !(b instanceof Array)) {
    var numberOfSteps = 0;
    for (var i = 0; i < a.length; i++)
      numberOfSteps = numberOfSteps + a[i];
    return 'Я прошёл ' + numberOfSteps + ' шагов';
  }

  else if (a instanceof Array && b instanceof Array) {
    var distancePath = 0;
    for (var i = 0; i < a.length; i++)
      distancePath = distancePath + a[i]*b[i];
    return 'Я прошёл ' + distancePath + ' метров';
  }

  else return 'Неправильный тип входных параметров!';
}
