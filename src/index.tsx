import React from 'react'

const BaseContext = React.createContext({})

/**
 *  Component : BaseContextProvider
 *
 * @author sl
 * @time  13/2/20
 * @param {{}}
 * @constructor
 *
 */
class BaseContextProvider<PROPS = {}, STATE = {}> extends React.Component<
  PROPS,
  STATE
> {
  getContextReturnValue() {
    return {}
  }

  getContext() {
    return BaseContext
  }

  render() {
    const contextReturn = this.getContextReturnValue()
    const Context = this.getContext()
    const { children } = this.props
    return <Context.Provider value={contextReturn}>{children}</Context.Provider>
  }
}

// @ts-ignore
interface ContextWrapConfig {
  props: {
    [index: string]: any
  }
}

export const baseContextWrap : any = (Provider: any) => {
  return (Component: any, config?: ContextWrapConfig) => (props: any) => (
    <Provider {...config} children={<Component {...props} />} />
  )
}

export function baseUseContext(context: any) {
  return function () {
    return React.useContext(context)
  }
}

export function baseWithContext(context: any, contextPassPropKey: any) {
  const Consumer = context.Consumer
  return (Component: any) => (props: any) => (
    <Consumer>
      {(contextValue: any) => (
        <Component {...{ ...props, [contextPassPropKey]: contextValue }} />
      )}
    </Consumer>
  )
}

export default BaseContextProvider
