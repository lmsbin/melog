export function Button({ children, onClick }: ButtonProps) {
	return <button onClick={onClick}>{children}</button>;
}
