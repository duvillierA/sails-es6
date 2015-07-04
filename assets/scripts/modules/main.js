'use strict';

import $ from 'jquery';
import * as math from 'helpers/math.js';

let main = function () {
  console.log(
    'main',
    `2π = ${math.sum(math.pi, math.pi)}`,
    $('body')
  );
};

main();
