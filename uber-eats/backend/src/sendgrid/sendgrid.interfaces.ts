export interface SendGridModuleOptions {
  apiKey: string;
  domain: string;
  fromEmail: string;
  toEmail: string;
}

export interface SendGridEmailData {
  key: string;
  value: string;
}
