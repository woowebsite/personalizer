import React, { useEffect, useState } from 'react';
import KeyCode from 'rc-util/lib/KeyCode';
import { SelectProps } from 'antd';

import Button from "components/Button";

import styles from './style.module.scss';
interface TextEditableProps {
  defaultText?: string;
  btnText?: string;
  value?: any;
  onChange?: (value: any) => void;
  renderComboBox?: (value: any) => React.ReactElement;
  renderInput?: (value: any) => React.ReactElement;
  showEdit?: boolean
}

const TextEditable: React.FC<TextEditableProps & SelectProps<any>> = ({
  btnText = 'Edit',
  value = {},
  defaultText = 'Text',
  defaultValue = null,
  onChange,
  style,
  showEdit=false,
  ...others
}) => {
  // Define
  const lastKeyCode = React.useRef<number>();
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedText, setSelectedText] = useState(defaultText);
  const [isEditable, setEditable] = useState(false);
  const ref = React.useRef<any>();

  // Effect
  useEffect(() => {
    if (defaultValue !== null) {
      setSelectedValue(defaultValue);
      onChange?.(defaultValue);
    }
  }, []);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [isEditable]);

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
    setTimeout(() => {
      setEditable(false);
    }, 100);
  };
  
  const end = () => {
    setEditable(false);
  };
  const cancel = () => {
    setEditable(false);
  };

  // EVENTS
  const handleInputChange = (value, option) => {
    setTimeout(() => {
      setSelectedValue(value);
      setSelectedText(option);
    }, 100);

    onChange?.(value);
  };

  const handleComboBoxChange = (value, option) => {
    const val = {
      value: value.value,
      name: value.label
    };
    setTimeout(() => {
      setSelectedValue(val);
      setSelectedText(option.children);
    }, 100);

    onChange?.(val);
  };

  // render
  const renderEditInput = () => {
    // render for input
    if(others.renderInput) {
      return others.renderInput({
        defaultValue: selectedValue,
        onKeyDown,
        onKeyUp,
        onBlur,
        handleOnChange: handleInputChange,
        ref
      });
    }

    // render for combobox
    if(others.renderComboBox) {
      return others.renderComboBox({
        defaultValue: selectedValue,
        onKeyDown,
        onKeyUp,
        onBlur,
        handleOnChange: handleComboBoxChange,
        ref
      });
    }
  };
  return (
    <div style={style}>
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
      {showEdit && 
      (<Button
        type="link"
        onClick={() => setEditable((preState: boolean) => !preState)}
        >
          {btnText}
        </Button>)
      }
    </div>
  );
};

export default TextEditable;
