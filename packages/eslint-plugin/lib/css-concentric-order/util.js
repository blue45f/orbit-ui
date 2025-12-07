const snakeToCamel = (str) => {
  return str.toLowerCase().replace(/[-_][a-z0-9]/g, (group) => group.slice(-1).toUpperCase())
}

module.exports = {
  snakeToCamel,
}
