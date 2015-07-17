import marked from 'marked'

/**
 * This function takes the output of react-docgen and generates some compact markdown
 *
 * @param {string} reactDocGenId
 * @returns {string} HTMLElement
 * @author marcello3d
 * @author theogravity
 */
module.exports = function docgenToMarkdown (reactDocGenId) {

  var component = window.RSG.propMetas[reactDocGenId]

  if (!component) {
    console.error('no prop docs found for ' + reactDocGenId)
    return
  }

  return marked([
    '### Properties',
    '',
    Object.keys(component.props).map(propName => {
      let prop = component.props[propName]
      return (
        '`' + propName + ':' + prop.type.name + (prop.required ? '.isRequired' : '') + '` ' +
        (prop.description || '') +
        (prop.defaultValue && prop.defaultValue.value ? (' (default value: `' + prop.defaultValue.value + '`)') : '') +
        '\n\n'
      )
    }).join('\n')
  ].join('\n'), { sanitize: true })
}
