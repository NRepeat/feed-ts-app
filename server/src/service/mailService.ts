export interface MailService {
  sendActivationLink(to: string, link: string): Promise<void>;
}

export const mailService: MailService = {
  sendActivationLink: async (to, link) => {
  }
};