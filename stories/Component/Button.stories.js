import { fn } from '@storybook/test';
import { createButton } from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'Example/Component/Button',
  tags: ['autodocs'],
  // docs: {
  //   autodocs: false
  // },

  /**
   * You can either use a function to create DOM elements or use a plain html string!
   *
   * @param {string} label - The label to be displayed on the button
   * @param {object} args - Additional arguments for button creation
   * @return {HTMLElement} The button element created
   */
  render: ({ label, ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    return createButton({ label, ...args });
  },
  argTypes: {
    backgroundColor: { control: 'color' },
    label: { control: 'text' },
    onClick: { action: 'onClick' },
    // primary: { control: 'boolean' },
    variation: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = {
  args: {
    // primary: true,
    label: 'ボタン',
    variation: 'primary',
  },
};

export const Secondary = {
  args: {
    label: 'Button',
    variation: 'secondary',
  },
};

export const Success = {
  args: {
    label: 'Button',
    variation: 'success',
  },
};

export const Large = {
  args: {
    size: 'large',
    label: 'Button',
  },
};

export const Small = {
  args: {
    size: 'small',
    label: 'Button',
  },
};
