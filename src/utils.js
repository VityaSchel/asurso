import * as yup from 'yup'

export const aggregation = (baseClass, ...mixins) => {
  class base extends baseClass {
    constructor (...args) {
      super(...args)
      mixins.forEach((mixin) => {
        copyProps(this,(new mixin))
      })
    }
  }
  let copyProps = (target, source) => {  // this function copies all properties and symbols, filtering out some special ones
    Object.getOwnPropertyNames(source)
      .concat(Object.getOwnPropertySymbols(source))
      .forEach((prop) => {
        if (!prop.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/))
          Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop))
      })
  }
  mixins.forEach((mixin) => { // outside contructor() to allow aggregation(A,B,C).staticFunction() to be called etc.
    copyProps(base.prototype, mixin.prototype)
    copyProps(base, mixin)
  })
  return base
}

export const validateSchema = async (schema) => {
  for (let property of schema) {
    const [propertyName, value, validator] = property
    try { await validator.validate(value) } catch(e) { e.path = propertyName; throw e }
  }
}

export const dateValidator = yup.date().test('is Date', 'StartDate is not date', d => d instanceof Date).required()
