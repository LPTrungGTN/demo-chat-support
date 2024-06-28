import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

import { GptMessageRole } from '@/common/enums/gpt-message-role';

@Injectable()
export class GptService {
  private readonly apiKey = process.env.GPT_API_KEY;
  private readonly assistantId = process.env.GPT_ASSISTANT_ID;
  private openai: OpenAI;

  constructor() {
    if (!this.apiKey || !this.assistantId) {
      throw new Error('Required environment variables for GPT are not set');
    }
    this.openai = new OpenAI({ apiKey: this.apiKey });
  }

  public async getGptResponse(
    question: string,
    threadId: string,
  ): Promise<string> {
    try {
      await this.postMessage(threadId, question);
      const runResponse = await this.createRun(threadId);
      await this.waitForRunCompletion(threadId, runResponse.id);
      return this.collectResponses(threadId);
    } catch (error) {
      console.error('Error getting response from GPT:', error);
      throw error;
    }
  }

  public async createThread(): Promise<string> {
    const thread = await this.openai.beta.threads.create();
    return thread.id;
  }

  private async postMessage(threadId: string, content: string) {
    await this.openai.beta.threads.messages.create(threadId, {
      content,
      role: GptMessageRole.User,
    });
  }

  private async createRun(threadId: string) {
    return await this.openai.beta.threads.runs.create(threadId, {
      assistant_id: this.assistantId,
    });
  }

  private async waitForRunCompletion(threadId: string, runId: string) {
    let run = await this.openai.beta.threads.runs.retrieve(threadId, runId);
    while (run.status !== 'completed') {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      run = await this.openai.beta.threads.runs.retrieve(threadId, runId);
    }
  }

  private async collectResponses(threadId: string): Promise<string> {
    const messagesResponse =
      await this.openai.beta.threads.messages.list(threadId);
    const firstAssistantResponse = messagesResponse.data.find(
      (msg) => msg.role === GptMessageRole.Assistant,
    );

    if (!firstAssistantResponse) return '';

    return firstAssistantResponse.content
      .map((contentItem) =>
        contentItem.type === 'text' ? contentItem.text.value : '',
      )
      .join('\n');
  }
}
