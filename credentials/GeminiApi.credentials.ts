import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class GeminiApi implements ICredentialType {
	name = 'geminiApi';
	displayName = 'AI Studio Credentials API';
	documentationUrl = 'https://ai.google.dev/gemini-api/docs/api-key';
	
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Your API key from Google AI Studio (https://makersuite.google.com/app/apikey)',
			placeholder: 'AIza...',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			qs: {
				key: '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://generativelanguage.googleapis.com',
			url: '/v1beta/models',
			qs: {
				key: '={{$credentials.apiKey}}',
			},
		},
	};
}