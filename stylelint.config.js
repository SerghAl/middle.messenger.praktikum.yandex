const sortOrderSmacss = require('stylelint-config-property-sort-order-smacss/generate');

module.exports = {
	plugins: ['stylelint-order'],
	rules: {
		'order/properties-order': [sortOrderSmacss({ emptyLineBefore: 'always' })],
	},
};
