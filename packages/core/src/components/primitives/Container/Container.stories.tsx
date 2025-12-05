import { Meta, StoryObj } from '@storybook/react'

import { Flex } from '../Flex'

import { Container } from '.'
import * as styles from './Container.stories.css'

const meta = {
  title: 'utils/Container',
  component: Container,
} satisfies Meta<typeof Container>

type Story = StoryObj<typeof meta>

export default meta

export const positive_간격: Story = {
  args: {
    spacing: '250',
    negative: false,
  },
  render: ({ spacing, negative }) => (
    <Container className={styles.outer} negative={negative} spacing={spacing}>
      <div className={styles.inner}>
        <div className={styles.box}>Box</div>
      </div>
    </Container>
  ),
}

export const negative_간격: Story = {
  args: {
    spacing: '250',
    negative: true,
  },
  render: ({ spacing, negative }) => (
    <Container className={styles.outer} spacing={spacing} negative={negative}>
      <div className={styles.inner}>
        <div className={styles.box}>Box</div>
      </div>
    </Container>
  ),
}

export const 간격_방향: Story = {
  args: {
    spacing: {
      x: '250',
      y: '250',
    },
    negative: false,
  },
  render: ({ negative, spacing }) => (
    <Container className={styles.outer} negative={negative} spacing={spacing}>
      <div className={styles.inner}>
        <div className={styles.box}>Box</div>
      </div>
    </Container>
  ),
}

export const Flex_조합: Story = {
  args: {
    spacing: {
      left: '250',
      right: '250',
      top: '250',
      bottom: '250',
    },
    negative: false,
  },
  render: ({ spacing, negative }) => (
    <Container className={styles.outer} negative={negative} spacing={spacing}>
      <Flex columnGap='250' className={styles.inner}>
        <div className={styles.box}>Box</div>
        <div className={styles.box}>Box</div>
        <div className={styles.box}>Box</div>
      </Flex>
    </Container>
  ),
}
