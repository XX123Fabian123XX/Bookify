const text = 'Book validation failed: numberPages: Cast to Number failed for value "200123123sd" (type string) at path "numberPages"'
let match = (text.match(/:.*:/));
const field = match[0].replace(/:/g, "").trim()
console.log(field)

match = text.match(/Cast to \w+/);
const datatype = match[0].split(" ").at(-1)
console.log(datatype)

match = text.match(/value.+?\s/);
const value = match[0].split('"')[1]
console.log(value)







