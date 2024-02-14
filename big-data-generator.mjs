import {randFullName, randNumber } from '@ngneat/falso';
import { writeFileSync } from "fs";

const array = [];

for (let i = 0; i < 1250000; i++) {
  array.push(JSON.stringify({ "_id": i, "item": randFullName(), "price": randNumber(), "quantity": randNumber() }));
}

writeFileSync("big-data.json", array.join('\n'));