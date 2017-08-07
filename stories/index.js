import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Cards, { Card } from '../src/index'
import './style.css'

const data = ['Alexandre', 'Thomas', 'Lucien']

const customAlertLeft = ({left, right}) => <div
  className="alertLeft alert-visible alert-left alert"
  style={{transform: `translateX(${(Math.min(1- left, 1)*100)}%)`}}>
  No
</div>

const customAlertRight = ({left, right}) =>  <div
  className="alertRight alert-visible alert-right alert"
  style={{transform: `translateX(${(-Math.min(1 - right, 1)*100)}%)`}}>
  Yes
</div>


storiesOf('Tinder card', module)
  .add('simple', () => (
    <div>
      <h1>react swipe card</h1>
      <Cards onEnd={action('end')} className='master-root'>
        {data.map((item, key) => 
          <Card 
            key={key}
            onSwipeLeft={action('swipe left')} 
            onSwipeRight={action('swipe right')}>
            <h2>{item}</h2>
          </Card>
        )}
      </Cards>
    </div>
  ))
  .add('custom alert', () => (
    <div>
      <h1>react swipe card</h1>
      <Cards
        alertRight={customAlertRight}
        alertLeft={customAlertLeft}
        onEnd={action('end')}
        className='master-root'>
        {data.map((item, key) => 
          <Card
              key={key}
              onSwipeLeft={action('swipe left')}
              onSwipeRight={action('swipe right')}>
            <h2>{item}</h2>
          </Card>
        )}
      </Cards>
    </div>
  ))
  .add('all swipe directions', () => (
    <div>
      <h1>react swipe card</h1>
      <Cards onEnd={action('end')} className='master-root'>
        {data.map((item, key) => 
          <Card 
            key={key}
            onSwipeTop={action('swipe top')} 
            onSwipeBottom={action('swipe bottom')}
            onSwipeLeft={action('swipe left')} 
            onSwipeRight={action('swipe right')}>
            <h2>{item}</h2>
          </Card>
        )}
      </Cards>
    </div>
  ))