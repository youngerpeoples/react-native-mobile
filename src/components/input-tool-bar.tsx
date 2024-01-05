import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Keyboard, StyleProp, ViewStyle } from 'react-native'
import { Actions, ActionsProps, Composer, ComposerProps, IMessage, Send, SendProps, StylePropType } from 'react-native-gifted-chat'

const styles = StyleSheet.create({
  container: {
    borderTopWidth: StyleSheet.hairlineWidth,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'red',
  },
  primary: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  accessory: {
    height: 44,
  },
})

export interface InputToolbarProps<TMessage extends IMessage> {
  options?: { [key: string]: any }
  optionTintColor?: string
  containerStyle?: StyleProp<ViewStyle>
  primaryStyle?: StyleProp<ViewStyle>
  accessoryStyle?: StyleProp<ViewStyle>
  renderAccessory?(props: InputToolbarProps<TMessage>): React.ReactNode
  renderActions?(props: ActionsProps): React.ReactNode
  renderSend?(props: SendProps<TMessage>): React.ReactNode
  renderComposer?(props: ComposerProps): React.ReactNode
  onPressActionButton?(): void
}

const InputToolbar = <TMessage extends IMessage = IMessage>(
  props: InputToolbarProps<TMessage>,
) => {
  const [position, setPosition] = useState('absolute')
  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      () => setPosition('relative'),
    )
    const keyboardWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
      () => setPosition('absolute'),
    )
    return () => {
      keyboardWillShowListener?.remove()
      keyboardWillHideListener?.remove()
    }
  }, [])

  const { containerStyle, ...rest } = props
  const {
    renderActions,
    onPressActionButton,
    renderComposer,
    renderSend,
    renderAccessory,
  } = rest;

  return (
    <View style={[styles.container, { position }, containerStyle] as ViewStyle}>
      <View style={[styles.primary, props.primaryStyle]}>
        {renderActions?.(rest) ||
          (onPressActionButton && <Actions {...rest} />)}
        {renderComposer?.(props as ComposerProps) || <Composer {...props} />}
        {renderSend?.(props) || <Send {...props} />}
      </View>
      {renderAccessory && (
        <View style={[styles.accessory, props.accessoryStyle]}>
          {renderAccessory(props)}
        </View>
      )}
    </View>
  )
}

InputToolbar.propTypes = {
  renderAccessory: PropTypes.func,
  renderActions: PropTypes.func,
  renderSend: PropTypes.func,
  renderComposer: PropTypes.func,
  onPressActionButton: PropTypes.func,
  containerStyle: StylePropType,
  primaryStyle: StylePropType,
  accessoryStyle: StylePropType,
}
export default InputToolbar;