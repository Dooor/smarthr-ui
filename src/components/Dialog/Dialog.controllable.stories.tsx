import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import React, { useState } from 'react'
import styled from 'styled-components'

import { SecondaryButton } from '../Button'
import { RadioButtonLabel } from '../RadioButtonLabel'
import { ActionDialog, Dialog, MessageDialog } from '.'
import readme from './README.md'

const DialogController: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState('hoge')
  const [text, setText] = useState('')
  const onClickOpen = () => setIsOpen(true)
  const onClickClose = () => setIsOpen(false)
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.name)
  const onChangeText = (txt: string) => setText(txt)

  return (
    <div>
      <SecondaryButton
        onClick={onClickOpen}
        aria-haspopup="dialog"
        aria-controls="dialog-controllable-1"
      >
        Dialog
      </SecondaryButton>
      <Dialog
        isOpen={isOpen}
        onClickOverlay={onClickClose}
        onPressEscape={onClickClose}
        id="dialog-controllable-1"
        ariaLabel="Dialog"
      >
        <DialogControllerTitle>Dialog</DialogControllerTitle>
        <DialogControllerText>
          The value of isOpen must be managed by you, but you can customize content freely.
        </DialogControllerText>
        <DialogControllerBox>
          <li>
            <RadioButtonLabel
              name="hoge"
              label="hoge"
              checked={value === 'hoge'}
              onChange={onChangeValue}
            />
          </li>
          <li>
            <RadioButtonLabel
              name="fuga"
              label="fuga"
              checked={value === 'fuga'}
              onChange={onChangeValue}
            />
          </li>
          <li>
            <RadioButtonLabel
              name="piyo"
              label="piyo"
              checked={value === 'piyo'}
              onChange={onChangeValue}
            />
          </li>
          <li>
            <input name="test" value={text} onChange={(e) => onChangeText(e.currentTarget.value)} />
          </li>
        </DialogControllerBox>
        <DialogControllerBottom>
          <SecondaryButton onClick={onClickClose}>close</SecondaryButton>
        </DialogControllerBottom>
      </Dialog>
    </div>
  )
}

const MessageDialogController: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onClickOpen = () => setIsOpen(true)
  const onClickClose = () => setIsOpen(false)

  return (
    <div>
      <SecondaryButton
        onClick={onClickOpen}
        aria-haspopup="dialog"
        aria-controls="dialog-controllable-2"
      >
        MessageDialog
      </SecondaryButton>
      <MessageDialog
        isOpen={isOpen}
        title="MessageDialog"
        description={
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
            <br />
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
            <br />
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur.
            <br />
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
        }
        closeText="close"
        onClickClose={onClickClose}
        onClickOverlay={onClickClose}
        onPressEscape={onClickClose}
        id="dialog-controllable-2"
      />
    </div>
  )
}

const ActionDialogController: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = React.useState('hoge')
  const onClickOpen = () => setIsOpen(true)
  const onClickClose = () => setIsOpen(false)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.name)

  return (
    <div>
      <SecondaryButton
        onClick={onClickOpen}
        aria-haspopup="dialog"
        aria-controls="dialog-controllable-3"
      >
        ActionDialog
      </SecondaryButton>
      <ActionDialog
        isOpen={isOpen}
        title="ActionDialog"
        closeText="close"
        actionText="execute"
        actionTheme="primary"
        onClickAction={(closeDialog) => {
          action('executed')()
          setTimeout(closeDialog, 1000)
        }}
        onClickClose={onClickClose}
        onClickOverlay={onClickClose}
        onPressEscape={onClickClose}
        id="dialog-controllable-3"
      >
        <DialogControllerBox>
          <li>
            <RadioButtonLabel
              name="hoge"
              label="hoge"
              checked={value === 'hoge'}
              onChange={onChange}
            />
          </li>
          <li>
            <RadioButtonLabel
              name="fuga"
              label="fuga"
              checked={value === 'fuga'}
              onChange={onChange}
            />
          </li>
          <li>
            <RadioButtonLabel
              name="piyo"
              label="piyo"
              checked={value === 'piyo'}
              onChange={onChange}
            />
          </li>
        </DialogControllerBox>
      </ActionDialog>
    </div>
  )
}

storiesOf('Dialog', module)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('controllable', () => (
    <List>
      <li>
        <DialogController />
      </li>
      <li>
        <MessageDialogController />
      </li>
      <li>
        <ActionDialogController />
      </li>
    </List>
  ))

const List = styled.ul`
  margin: 0;
  padding: 16px;

  & > li {
    display: inline-block;
    margin: 8px;
  }
`
const DialogControllerTitle = styled.p`
  padding: 16px 24px;
  margin: 0;
  font-size: 18px;
  line-height: 1;
  border-bottom: 1px solid #d6d6d6;
`
const DialogControllerText = styled.p`
  padding: 16px 24px 0 24px;
  font-size: 14px;
`
const DialogControllerBox = styled.ul`
  margin: 0;
  padding: 16px 24px;
  width: 300px;
  list-style: none;

  & > li {
    padding: 0;
  }
`
const DialogControllerBottom = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 16px 24px;
  border-top: 1px solid #d6d6d6;

  & > *:not(:first-child) {
    margin-left: 16px;
  }
`
