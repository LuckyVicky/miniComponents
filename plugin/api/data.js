let component = {}

function getData(key) {
  return component[key]
}

function setData(key, object) {
  component[key] = object
}

function updateData(objectKey, updateObject) {
  if (component[objectKey]) {
    component[objectKey] = Object.assign(component[objectKey], updateObject)
  } else {
    setData(objectKey, updateObject)
  }
}

module.exports = {
  getData: getData,
  setData: setData,
  updateData: updateData
}