import { Inject, Injectable } from '@nestjs/common';
import * as SendGrid from '@sendgrid/mail';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import {
  SendGridEmailData,
  SendGridModuleOptions,
} from './sendgrid.interfaces';

@Injectable()
export class SendGridService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: SendGridModuleOptions,
  ) {}

  private async sendEmail(
    to: string,
    from: string,
    templateId: string,
    data: SendGridEmailData[],
  ) {
    SendGrid.setApiKey(this.options.apiKey);
    const templateData = {};
    data.forEach((element) => {
      templateData[element.key] = element.value;
    });
    const msg = {
      to,
      from,
      templateId,
      dynamicTemplateData: templateData,
    };
    try {
      await SendGrid.send(msg);
    } catch (error) {
      console.log(error);
    }
  }

  sendVerificationEmail(email: string, code: string) {
    this.sendEmail(
      this.options.toEmail,
      this.options.fromEmail,
      'd-264c7a1fd23240c68f5f7e10eaf41156',
      [
        { key: 'email', value: email },
        { key: 'code', value: code },
      ],
    );
  }
}
