import React from 'react'
import { render, screen } from "@testing-library/react"
import App from './App'
import { data } from './components/Episodes.test'

test('App renders without errors', ()=> {
    render(<App />)
});

test('App renders properly when fetching data', () => {
    render(<App isFetchingData={true} />)
    screen.getByText('Fetching data...')
})

test('App renders properly when not fetching', () => {
    const mockGetData = jest.fn()
    render(<App isFetchingData={false} getData={mockGetData} />)
})

