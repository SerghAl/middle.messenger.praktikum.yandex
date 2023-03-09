/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.hbs$': '<rootDir>/node_modules/handlebars-jest',
		'.+\\.(css|scss|png|jpg|svg)$': 'jest-transform-stub',
	},
};
