type FieldValidationResult = { result: boolean; error?: string };

function _checkFirstUpperCyrillicLat(input: string): boolean {
	let reg = /^[A-ZА-Я].*$/;
	return reg.test(input);
}

function _checkCyrillicLatTire(input: string): boolean {
	let reg = /^[а-яА-Яa-zA-Z\-]*$/;
	return reg.test(input);
}

function _checkLatTireDashNum(input: string): boolean {
	let reg = /^[a-zA-Z0-9_\-]*$/;
	return reg.test(input);
}

function _checkLength(input: string, min: number, max: number): boolean {
	if (input.length >= min && input.length <= max) {
		return true;
	}

	return false;
}

function _checkIfOnlyNumbers(input: string): boolean {
	let reg = /^[0-9]*$/;
	return reg.test(input);
}

function _checkIfFirstPlusAndOnlyNumbers(input: string): boolean {
	let reg = /^[\+]?[0-9]*$/;
	return reg.test(input);
}

function _checkHasNumbers(input: string): boolean {
	let reg = /^.*[0-9]+.*$/;
	return reg.test(input);
}

function _checkHasUpper(input: string): boolean {
	let reg = /^.*[A-ZА-Я]+.*$/;
	return reg.test(input);
}

function _checkIfEmpty(input: string): boolean {
	return input.length === 0;
}

export function checkName(input: string): FieldValidationResult {
	if (_checkFirstUpperCyrillicLat(input) && _checkCyrillicLatTire(input)) {
		return {
			result: true,
		};
	}

	return {
		result: false,
		error:
			'Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
	};
}

export function checkLogin(input: string): FieldValidationResult {
	if (
		!_checkIfOnlyNumbers(input) &&
		_checkLatTireDashNum(input) &&
		_checkLength(input, 3, 20)
	) {
		return {
			result: true,
		};
	}

	return {
		result: false,
		error:
			'От 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание).',
	};
}

export function checkMail(input: string): FieldValidationResult {
	let reg = /^[a-zA-Z0-9\-]+@[a-zA-Z]+\.[a-zA-Z]+$/;

	if (reg.test(input)) {
		return {
			result: true,
		};
	} else {
		return {
			result: false,
			error:
				'Латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы.',
		};
	}
}

export function checkPassword(input: string): FieldValidationResult {
	if (
		_checkLength(input, 8, 40) &&
		_checkHasNumbers(input) &&
		_checkHasUpper(input)
	) {
		return {
			result: true,
		};
	}

	return {
		result: false,
		error:
			'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
	};
}

export function checkPhone(input: string): FieldValidationResult {
	if (_checkLength(input, 10, 15) && _checkIfFirstPlusAndOnlyNumbers(input)) {
		return {
			result: true,
		};
	}

	return {
		result: false,
		error: 'От 10 до 15 символов, состоит из цифр, может начинается с плюса.',
	};
}

export function checkMessage(input: string): FieldValidationResult {
	if (!_checkIfEmpty(input)) {
		return {
			result: true,
		};
	}

	return {
		result: false,
		error: 'Не должно быть пустым',
	};
}
