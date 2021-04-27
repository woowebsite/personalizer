import { Button, Select, Typography, SelectProps } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import KeyCode from 'rc-util/lib/KeyCode';

interface TextEditable {
  defaultText?: string;
  btnText?: string;
  value?: any;
  onChange?: (value: any) => void;
  renderComponent: (value: any) => React.ReactElement;
}

const TextEditable: React.FC<TextEditable & SelectProps<any>> = ({
  btnText = 'Edit',
  value = {},
  defaultText = 'Text',
  defaultValue = null,
  onChange,
  ...others
}) => {
  // Define
  const lastKeyCode = React.useRef<number>();
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedText, setSelectedText] = useState(defaultText);
  const [isEditable, setEditable] = useState(false);

  // Effect
  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(defaultValue);
    }
  }, []);

  // Key events
  const onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = ({
    keyCode,
  }) => {
    lastKeyCode.current = keyCode;
  };

  const onKeyUp: React.KeyboardEventHandler<HTMLTextAreaElement> = ({
    keyCode,
    ctrlKey,
    altKey,
    metaKey,
    shiftKey,
  }) => {
    // Check if it's a real key
    if (
      lastKeyCode.current === keyCode &&
      !ctrlKey &&
      !altKey &&
      !metaKey &&
      !shiftKey
    ) {
      if (keyCode === KeyCode.ENTER) {
        confirmChange();
        end();
      } else if (keyCode === KeyCode.ESC) {
        cancel();
      }
    }
  };

  const onBlur: React.FocusEventHandler<HTMLTextAreaElement> = () => {
    confirmChange();
  };

  // Methods
  const confirmChange = () => {
    console.log('xxxxxxxxxxxxxx')
    setTimeout(() => {
      setEditable(false);
    }, 100);
  };
  const handleOnChange = (value, option) => {
    setTimeout(() => {
      setSelectedValue(value);
      setSelectedText(option.children);
    }, 100);
  };
  const end = () => {
    setEditable(false);
  };
  const cancel = () => {
    setEditable(false);
  };

  // render
  const renderEditInput = () => {
    return others.renderComponent({
      defaultValue,
      onKeyDown,
      onKeyUp,
      onBlur,
      handleOnChange,
    });
  };
  return (
    <>
      <span className={styles.text2combo}>
        {isEditable && renderEditInput()}
        {!isEditable && (
          <span
            className="font-weight-bold"
            onClick={() => setEditable((preState: boolean) => !preState)}
          >
            {selectedText}
          </span>
        )}
      </span>
      <Button
        type="link"
        onClick={() => setEditable((preState: boolean) => !preState)}
      >
        {btnText}
      </Button>
    </>
  );
};

export default TextEditable;
