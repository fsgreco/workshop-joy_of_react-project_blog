'use client';
import React from 'react';
import clsx from 'clsx';
import {
  Play,
  Pause,
  RotateCcw,
} from 'react-feather';
import { motion } from 'framer-motion';

import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './CircularColorsDemo.module.css';

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
];

function CircularColorsDemo() {
	const uniqueId = React.useId()
	const [ running, setRunning ] = React.useState(false)
  // TODO: This value should increase by 1 every second:
	const [ timeElapsed, setTimeElapsed ] = React.useState(0)
  //let timeElapsed = 0;
	React.useEffect(() => {
		const timer = setTimeout(() => { setTimeElapsed(t => t + 1) }, 1000)
		if (!running) {
			clearTimeout(timer)
		}	
		return () => clearTimeout(timer)
	}, [running, timeElapsed])

  // TODO: This value should cycle through the colors in the
  // COLORS array:
  //const selectedColor = COLORS[0];
	const [ selectedColor, setSelectedColor ] = React.useState(COLORS[0])
	React.useEffect(() => {
		const index = timeElapsed % COLORS.length
		setSelectedColor(COLORS[index])
	}, [timeElapsed])

	const resetFn = () => {
		setRunning(false)
		setTimeElapsed(0)
	}

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected =
            color.value === selectedColor.value;

          return (
            <li
              className={styles.color}
              key={index}
            >
              {isSelected && (
                <motion.div layoutId={uniqueId}
                  className={
                    styles.selectedColorOutline
                  }
									style={{zIndex:2}}
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected &&
                    styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
									zIndex: 1
                }}
              >
                <VisuallyHidden>
                  {color.label}
                </VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
					{ running ? (
						<button>
							<Pause onClick={() => setRunning(false)} /> 
							<VisuallyHidden>Pause</VisuallyHidden>
						</button>
					) : (
						<button>
							<Play onClick={() => setRunning(true)}/>
							<VisuallyHidden>Play</VisuallyHidden>
						</button>
					) }
          
          <button onClick={resetFn}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
