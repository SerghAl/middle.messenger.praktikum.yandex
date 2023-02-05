declare module '*.hbs' {
	const templator: Function;
	export default templator;
}

declare module '*.css';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.txt';

type Props = { [key: PropertyKey]: any };
