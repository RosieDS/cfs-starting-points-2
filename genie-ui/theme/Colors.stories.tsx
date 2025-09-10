import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { colors } from './colors'

const meta: Meta = {
  title: 'Theme/Colors',
  parameters: {
    layout: 'fullscreen'
  }
}

export default meta
type Story = StoryObj

const ColorPalette = ({
  colorName,
  colorValues
}: {
  colorName: string
  colorValues: Record<string, string>
}) => {
  return (
    <div>
      <h2 className="mb-4 mt-8 text-2xl font-bold capitalize">{colorName}</h2>
      <div className="flex flex-wrap gap-4">
        {Object.entries(colorValues).map(([shade, value]) => (
          <div
            key={`${colorName}-${shade}`}
            className="flex h-[100px] w-[100px] flex-col items-center justify-center rounded-lg shadow-sm"
            style={{ backgroundColor: value }}>
            <div
              className={`font-mono text-sm font-semibold ${
                parseInt(shade) > 400 ? 'text-white' : 'text-black'
              }`}>
              {value}
            </div>
            <div
              className={`mt-2 font-mono text-sm font-bold ${
                parseInt(shade) > 400 ? 'text-white' : 'text-black'
              }`}>
              {shade}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Special case for black and white
const BasicColors = () => {
  return (
    <div>
      <h2 className="mb-4 mt-8 text-2xl font-bold">White & Black</h2>
      <div className="flex gap-4">
        <div
          className="flex h-[100px] w-[100px] items-center justify-center rounded-lg shadow-sm"
          style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0E0E0' }}>
          <div className="font-mono text-sm font-semibold text-black">
            #FFFFFF
          </div>
        </div>
        <div
          className="flex h-[100px] w-[100px] items-center justify-center rounded-lg shadow-sm"
          style={{ backgroundColor: '#000000' }}>
          <div className="font-mono text-sm font-semibold text-white">
            #000000
          </div>
        </div>
      </div>
    </div>
  )
}

export const AllColors: Story = {
  render: () => (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold">Genie UI Color Palette</h1>
      <BasicColors />
      {Object.entries(colors).map(([colorName, colorValues]) => (
        <ColorPalette
          key={colorName}
          colorName={
            colorName === 'purple'
              ? 'Purple / Primary'
              : colorName === 'zinc'
                ? 'Zinc / Default'
                : colorName
          }
          colorValues={colorValues}
        />
      ))}
    </div>
  )
}
