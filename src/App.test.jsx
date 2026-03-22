// src/App.test.jsx
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders counter button with initial count 0', () => {
    render(<App />)
    
    // 验证初始状态：按钮显示 "Count is 0"
    const button = screen.getByRole('button', { name: /count is 0/i })
    expect(button).toBeInTheDocument()
  })

  it('increments count when button is clicked', async () => {
    render(<App />)
    
    const button = screen.getByRole('button', { name: /count is \d+/i })
    
    // 初始是 0
    expect(button).toHaveTextContent('Count is 0')
    
    // 点击一次
    await fireEvent.click(button)
    expect(button).toHaveTextContent('Count is 1')
    
    // 再点击一次
    await fireEvent.click(button)
    expect(button).toHaveTextContent('Count is 2')
  })
})