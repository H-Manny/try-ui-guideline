// import './button.css';

export const createButton = ({
  // primary = false,
  variation = 'primary',
  size = 'medium',
  backgroundColor,
  label,
  onClick,
}) => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.innerText = label;
  btn.addEventListener('click', onClick);

  btn.className = ['btn', `btn-${variation}`].join(' ');

  // const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  // btn.className = ['storybook-button', `storybook-button--${size}`, mode].join(' ');

  btn.style.backgroundColor = backgroundColor;

  return btn;
};
