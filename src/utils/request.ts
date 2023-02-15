type RequestOptions = { [key: string]: any };
type HTTPMethod = (url: string, options?: RequestOptions) => Promise<unknown>;

const METHODS = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE',
};

function queryStringify(data: { [key: PropertyKey]: string | number }) {
	let newData = Object.keys(data).map((key) => `${key}=${data[key]}`);
	return `?${newData.join('&')}`;
}

export default class HTTPTransport {
	BASE_URL: string;

	constructor(baseUrl: string) {
		this.BASE_URL = baseUrl;
	}

	get: HTTPMethod = (url, options = {}) => {
		return this.request(
			`${this.BASE_URL}${url}`,
			{ ...options, method: METHODS.GET },
			options.timeout
		);
	};

	post: HTTPMethod = (url, options = {}) => {
		return this.request(
			`${this.BASE_URL}${url}`,
			{ ...options, method: METHODS.POST },
			options.timeout
		);
	};

	put: HTTPMethod = (url, options = {}) => {
		return this.request(
			`${this.BASE_URL}${url}`,
			{ ...options, method: METHODS.PUT },
			options.timeout
		);
	};

	delete: HTTPMethod = (url, options = {}) => {
		return this.request(
			`${this.BASE_URL}${url}`,
			{ ...options, method: METHODS.DELETE },
			options.timeout
		);
	};

	request = (url: string, options: RequestOptions = {}, timeout = 5000) => {
		const { headers = {}, method, data } = options;
		return new Promise(function (resolve, reject): void {
			if (!method) {
				reject('No method');
				return;
			}

			const xhr = new XMLHttpRequest();
			const isGet = method === METHODS.GET;

			xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

			xhr.withCredentials = true;

			Object.keys(headers).forEach((key) => {
				xhr.setRequestHeader(key, headers[key]);
			});

			xhr.onload = function () {
				resolve(xhr);
			};

			xhr.onabort = reject;
			xhr.onerror = reject;

			xhr.timeout = timeout;
			xhr.ontimeout = reject;

			if (isGet || !data) {
				xhr.send();
			} else {
				xhr.send(JSON.stringify(data));
			}
		});
	};
}
