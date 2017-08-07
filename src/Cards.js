import React, { Component, cloneElement } from 'react'
import ReactDOM from 'react-dom'
import { DIRECTIONS } from './utils'

const remainingSpace = { top: 1, left: 1, right: 1, bottom: 1 };
class SwipeCards extends Component {
  constructor (props) {
    super(props)
    this.state = {
      index: 0,
      alertLeft: false,
      alertRight: false,
      alertTop: false,
      alertBottom: false,
      containerSize: { x: 0, y: 0 },
      remainingSpace: remainingSpace
    }
    this.removeCard = this.removeCard.bind(this)
    this.setSize = this.setSize.bind(this)
  }
  removeCard (side, cardId) {
    const { children, onEnd } = this.props
    setTimeout(() => this.setState({ [`alert${side}`]: false, remainingSpace }), 300)
    
    if (children.length === (this.state.index + 1) && onEnd) onEnd()

    this.setState({
      index: this.state.index + 1,
      [`alert${side}`]: true
    })
  }
  
  componentDidMount () {
    this.setSize()
    window.addEventListener('resize', this.setSize)
  }
   componentWillUnmount () {
    window.removeEventListener('resize', this.setSize)
  }

  setSize () {
    const container = ReactDOM.findDOMNode(this)
    const containerSize = {
      x: container.offsetWidth,
      y: container.offsetHeight
    }
    this.setState({ containerSize })
  }

  render () {
    const { index, containerSize } = this.state
    const { children, className, onSwipeTop, onSwipeBottom } = this.props
    if (!containerSize.x || !containerSize.y) return  <div className={className} />

    const _cards = children.reduce((memo, c, i) => {
      if (index > i) return memo
      const props = {
        key: i,
        containerSize,
        index: children.length - index,
        onPan: (remainingSpace) => this.setState({remainingSpace}),
        ...DIRECTIONS.reduce((m, d) => 
          ({ ...m, [`onOutScreen${d}`]: () => this.removeCard(d) }), {}),
        active: index === i
      }
      return [ cloneElement(c, props), ...memo ]
    }, [])

    return (
      <div className={className}>
        {DIRECTIONS.map(d => {
            const alertRender = this.props[`alert${d}`];
            if (typeof alertRender === 'function')
              return alertRender({...this.state.remainingSpace, key: d });

            return <div key={d} className={`${this.state[`alert${d}`]} alert-visible alert-${d.toLowerCase()} alert`}>
              { (typeof alertRender === 'string') && alertRender}
            </div>
        }
        )}
        <div id='cards'>
          {_cards}
        </div>
      </div>
    )
  }
}

export default SwipeCards