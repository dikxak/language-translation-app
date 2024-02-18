interface LanguageButtonProps {
  children: string;
  onClick: () => void;
}

const LanguageButton = ({
  children,
  onClick,
}: LanguageButtonProps): React.JSX.Element => (
  <button
    onClick={onClick}
    type="button"
    className="btn btn-tertiary btn-select"
  >
    {children}
  </button>
);

export default LanguageButton;
