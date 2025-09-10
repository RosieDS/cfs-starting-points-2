import type { Meta, StoryObj } from '@storybook/react'
import { Button, IconButton } from './Button'
import { Spacer } from '../../layout/spacer'
import { Plus } from 'lucide-react'
import { Fragment } from 'react'

const meta: Meta = {
  title: 'Components/Button/Gallery',
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj

const sizes = ['sm', 'md'] as const
const sizeMap = {
  xs: 'Extra Small',
  sm: 'Small',
  md: 'Medium'
}

const buttonText = 'Button label'
export const ButtonGallery: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '24px', padding: '24px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '150px 150px repeat(5, 1fr)',
          gap: '24px',
          alignItems: 'center'
        }}>
        {/* Header Row */}
        <div></div>
        <div></div>
        <div style={{ textAlign: 'left' }}>Min width fit</div>
        <div style={{ textAlign: 'left' }}>Disabled</div>
        <div style={{ textAlign: 'left' }}>Min width 128px</div>
        <div style={{ textAlign: 'left' }}>Min width 240px</div>
        <div style={{ textAlign: 'left' }}>Min width full</div>

        <div>Solid</div>
        {sizes.map(size => (
          <Fragment key={size}>
            {size !== 'sm' && <div></div>}
            <div>{sizeMap[size]}</div>
            <div>
              <Button size={size}>{buttonText}</Button>
            </div>
            <div>
              <Button size={size} isDisabled>
                {buttonText}
              </Button>
            </div>
            <div className="w-[140px] text-center outline-dashed outline-1 outline-zinc-400">
              <Button size={size} minWidth="md">
                {buttonText}
              </Button>
            </div>
            <div className="w-[260px] text-center outline-dashed outline-1 outline-zinc-400">
              <Button size={size} minWidth="lg">
                {buttonText}
              </Button>
            </div>
            <div className="w-[260px] text-center outline-dashed outline-1 outline-zinc-400">
              <Button size={size} minWidth="full">
                {buttonText}
              </Button>
            </div>
          </Fragment>
        ))}

        <SpacerRow />

        <div>Bordered</div>
        {sizes.map(size => (
          <Fragment key={size}>
            {size !== 'sm' && <div></div>}
            <div>{sizeMap[size]}</div>
            <div>
              <Button size={size} variant="bordered">
                {buttonText}
              </Button>
            </div>
            <div>
              <Button size={size} variant="bordered" isDisabled>
                {buttonText}
              </Button>
            </div>
            <div className="w-[140px] text-center outline-dashed outline-1 outline-zinc-400">
              <Button size={size} variant="bordered" minWidth="md">
                {buttonText}
              </Button>
            </div>
            <div className="w-[260px] text-center outline-dashed outline-1 outline-zinc-400">
              <Button size={size} variant="bordered" minWidth="lg">
                {buttonText}
              </Button>
            </div>
            <div className="w-[260px] text-center outline-dashed outline-1 outline-zinc-400">
              <Button size={size} variant="bordered" minWidth="full">
                {buttonText}
              </Button>
            </div>
          </Fragment>
        ))}

        <SpacerRow />

        <div>Light</div>
        {sizes.map(size => (
          <Fragment key={size}>
            {size !== 'sm' && <div></div>}
            <div>{sizeMap[size]}</div>
            <div>
              <Button size={size} variant="light">
                {buttonText}
              </Button>
            </div>
            <div>
              <Button size={size} variant="light" isDisabled>
                {buttonText}
              </Button>
            </div>
            <div className="w-[140px] text-center outline-dashed outline-1 outline-zinc-400">
              <Button size={size} variant="light" minWidth="md">
                {buttonText}
              </Button>
            </div>
            <div className="w-[260px] text-center outline-dashed outline-1 outline-zinc-400">
              <Button size={size} variant="light" minWidth="lg">
                {buttonText}
              </Button>
            </div>
            <div className="w-[260px] text-center outline-dashed outline-1 outline-zinc-400">
              <Button size={size} variant="light" minWidth="full">
                {buttonText}
              </Button>
            </div>
          </Fragment>
        ))}

        <SpacerRow />

        <div>Gradient</div>
        {sizes.map(size => (
          <Fragment key={size}>
            {size !== 'sm' && <div></div>}
            <div>{sizeMap[size]}</div>
            <div>
              <Button size={size} variant="gradient">
                {buttonText}
              </Button>
            </div>
            <div>
              <Button size={size} variant="gradient" isDisabled>
                {buttonText}
              </Button>
            </div>
            <div className="w-[140px] text-center outline-dashed outline-1 outline-zinc-400">
              <Button size={size} variant="gradient" minWidth="md">
                {buttonText}
              </Button>
            </div>
            <div className="w-[260px] text-center outline-dashed outline-1 outline-zinc-400">
              <Button size={size} variant="gradient" minWidth="lg">
                {buttonText}
              </Button>
            </div>
            <div className="w-[260px] text-center outline-dashed outline-1 outline-zinc-400">
              <Button size={size} variant="gradient" minWidth="full">
                {buttonText}
              </Button>
            </div>
          </Fragment>
        ))}

        <SpacerRow />

        <div>Gradient Solid</div>
        {sizes.map(size => (
          <Fragment key={size}>
            {size !== 'sm' && <div></div>}
            <div>{sizeMap[size]}</div>
            <div>
              <Button size={size} variant="gradientSolid">
                {buttonText}
              </Button>
            </div>
            <div>
              <Button size={size} variant="gradientSolid" isDisabled>
                {buttonText}
              </Button>
            </div>
            <div className="w-[140px] text-center outline-dashed outline-1 outline-zinc-400">
              <Button size={size} variant="gradientSolid" minWidth="md">
                {buttonText}
              </Button>
            </div>
            <div className="w-[260px] text-center outline-dashed outline-1 outline-zinc-400">
              <Button size={size} variant="gradientSolid" minWidth="lg">
                {buttonText}
              </Button>
            </div>
            <div className="w-[260px] text-center outline-dashed outline-1 outline-zinc-400">
              <Button size={size} variant="gradientSolid" minWidth="full">
                {buttonText}
              </Button>
            </div>
          </Fragment>
        ))}

        <SpacerRow />

        <div>Solid - Loading</div>
        {sizes.map(size => (
          <Fragment key={size}>
            {size !== 'sm' && <div></div>}
            <div>{sizeMap[size]}</div>
            <div>
              <Button size={size} isLoading>
                {buttonText}
              </Button>
            </div>
            <div>
              <Button size={size} isLoading isDisabled>
                {buttonText}
              </Button>
            </div>
            <div className="w-[140px] text-center outline-dashed outline-1 outline-zinc-400">
              <Button size={size} isLoading minWidth="md">
                {buttonText}
              </Button>
            </div>
            <div className="w-[260px] text-center outline-dashed outline-1 outline-zinc-400">
              <Button size={size} isLoading minWidth="lg">
                {buttonText}
              </Button>
            </div>
            <div className="w-[260px] text-center outline-dashed outline-1 outline-zinc-400">
              <Button size={size} isLoading minWidth="full">
                {buttonText}
              </Button>
            </div>
          </Fragment>
        ))}

        <SpacerRow />

        <div>Left Icon</div>
        {sizes.map(size => (
          <Fragment key={size}>
            {size !== 'sm' && <div></div>}
            <div>{sizeMap[size]}</div>
            <div>
              <Button size={size} startContent={<Plus />}>
                {buttonText}
              </Button>
            </div>
            <div>
              <Button size={size} startContent={<Plus />} isDisabled>
                {buttonText}
              </Button>
            </div>
            <div className="w-[140px] text-center outline-dashed outline-1 outline-zinc-400">
              <Button size={size} startContent={<Plus />} minWidth="md">
                {buttonText}
              </Button>
            </div>
            <div className="w-[260px] text-center outline-dashed outline-1 outline-zinc-400">
              <Button size={size} startContent={<Plus />} minWidth="lg">
                {buttonText}
              </Button>
            </div>
            <div className="w-[260px] text-center outline-dashed outline-1 outline-zinc-400">
              <Button size={size} startContent={<Plus />} minWidth="full">
                {buttonText}
              </Button>
            </div>
          </Fragment>
        ))}

        <SpacerRow />

        <div>Right Icon</div>
        {sizes.map(size => (
          <Fragment key={size}>
            {size !== 'sm' && <div></div>}
            <div>{sizeMap[size]}</div>
            <div>
              <Button size={size} variant="gradient" endContent={<Plus />}>
                {buttonText}
              </Button>
            </div>
            <div>
              <Button
                size={size}
                variant="gradient"
                endContent={<Plus />}
                isDisabled>
                {buttonText}
              </Button>
            </div>
            <div className="w-[140px] text-center outline-dashed outline-1 outline-zinc-400">
              <Button
                size={size}
                variant="gradient"
                endContent={<Plus />}
                minWidth="md">
                {buttonText}
              </Button>
            </div>
            <div className="w-[260px] text-center outline-dashed outline-1 outline-zinc-400">
              <Button
                size={size}
                variant="gradient"
                endContent={<Plus />}
                minWidth="lg">
                {buttonText}
              </Button>
            </div>
            <div className="w-[260px] text-center outline-dashed outline-1 outline-zinc-400">
              <Button
                size={size}
                variant="gradient"
                endContent={<Plus />}
                minWidth="full">
                {buttonText}
              </Button>
            </div>
          </Fragment>
        ))}

        <SpacerRow />

        <div>Left aligned</div>
        {sizes.map(size => (
          <Fragment key={size}>
            {size !== 'sm' && <div></div>}
            <div>{sizeMap[size]}</div>
            <div>
              <Button
                size={size}
                fullWidth
                alignment="left"
                startContent={<Plus />}
                variant="solid">
                {buttonText}
              </Button>
            </div>
            <div>
              <Button
                size={size}
                fullWidth
                alignment="left"
                startContent={<Plus />}
                variant="solid"
                isDisabled>
                {buttonText}
              </Button>
            </div>
            <div className="w-[140px] text-center outline-dashed outline-1 outline-zinc-400">
              <Button
                size={size}
                fullWidth
                alignment="left"
                startContent={<Plus />}
                variant="solid"
                minWidth="md">
                {buttonText}
              </Button>
            </div>
            <div className="w-[260px] text-center outline-dashed outline-1 outline-zinc-400">
              <Button
                size={size}
                fullWidth
                alignment="left"
                startContent={<Plus />}
                variant="solid"
                minWidth="lg">
                {buttonText}
              </Button>
            </div>
            <div className="w-[260px] text-center outline-dashed outline-1 outline-zinc-400">
              <Button
                size={size}
                fullWidth
                alignment="left"
                startContent={<Plus />}
                variant="solid"
                minWidth="full">
                {buttonText}
              </Button>
            </div>
          </Fragment>
        ))}

        <SpacerRow />

        <div>Right aligned</div>
        {sizes.map(size => (
          <Fragment key={size}>
            {size !== 'sm' && <div></div>}
            <div>{sizeMap[size]}</div>
            <div>
              <Button
                size={size}
                fullWidth
                alignment="right"
                endContent={<Plus />}
                variant="gradient">
                {buttonText}
              </Button>
            </div>
            <div>
              <Button
                size={size}
                fullWidth
                alignment="right"
                endContent={<Plus />}
                variant="gradient"
                isDisabled>
                {buttonText}
              </Button>
            </div>
            <div className="w-[140px] text-center outline-dashed outline-1 outline-zinc-400">
              <Button
                size={size}
                fullWidth
                alignment="right"
                endContent={<Plus />}
                minWidth="md">
                {buttonText}
              </Button>
            </div>
            <div className="w-[260px] text-center outline-dashed outline-1 outline-zinc-400">
              <Button
                size={size}
                fullWidth
                alignment="right"
                endContent={<Plus />}
                minWidth="lg">
                {buttonText}
              </Button>
            </div>
            <div className="w-[260px] text-center outline-dashed outline-1 outline-zinc-400">
              <Button
                size={size}
                fullWidth
                alignment="right"
                endContent={<Plus />}
                minWidth="full">
                {buttonText}
              </Button>
            </div>
          </Fragment>
        ))}

        <SpacerRow />

        <div>Icon only Solid Primary</div>
        {sizes.map(size => (
          <Fragment key={size}>
            {size !== 'sm' && <div></div>}
            <div>{sizeMap[size]}</div>
            <div>
              <IconButton size={size}>
                <Plus />
              </IconButton>
            </div>
            <div>
              <IconButton size={size} isDisabled>
                <Plus />
              </IconButton>
            </div>
            <Spacer />
            <Spacer />
            <Spacer />
          </Fragment>
        ))}

        <SpacerRow />

        <div>Icon only Solid Secondary</div>
        {sizes.map(size => (
          <Fragment key={size}>
            {size !== 'sm' && <div></div>}
            <div>{sizeMap[size]}</div>
            <div>
              <IconButton size={size} color="secondary">
                <Plus />
              </IconButton>
            </div>
            <div>
              <IconButton size={size} color="secondary" isDisabled>
                <Plus />
              </IconButton>
            </div>
            <Spacer />
            <Spacer />
            <Spacer />
          </Fragment>
        ))}

        <SpacerRow />

        <div>Icon only Light</div>
        {(['xs', 'sm', 'md'] as const).map(size => (
          <Fragment key={size}>
            {size !== 'xs' && <div></div>}
            <div>{sizeMap[size]}</div>
            <div>
              <IconButton size={size} variant="light">
                <Plus />
              </IconButton>
            </div>
            <div>
              <IconButton size={size} variant="light" isDisabled>
                <Plus />
              </IconButton>
            </div>
            <Spacer />
            <Spacer />
            <Spacer />
          </Fragment>
        ))}
      </div>
    </div>
  )
}

const SpacerRow = () =>
  Array.from({ length: 7 }, (_, index) => <Spacer key={index} />)
