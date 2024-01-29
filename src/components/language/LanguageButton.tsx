interface LanguageButtonProps {
  children: string;
}

const LanguageButton = ({
  children,
}: LanguageButtonProps): React.JSX.Element => (
  <button type="button" className="btn btn-tertiary btn-select">
    {children}
  </button>
);

export default LanguageButton;
