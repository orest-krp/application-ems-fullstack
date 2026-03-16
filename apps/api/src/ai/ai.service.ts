import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  ServiceUnavailableException,
} from '@nestjs/common';
import Groq from 'groq-sdk';
import { PrismaService } from 'src/prisma.service';
import { AIQuery } from './ai.types';
import { Prisma } from 'generated/prisma/client';
import { ConfigService } from '@nestjs/config';
import { buildQueryPrompt } from './prompts/ai.query-prompt';
import { buildAnswerPrompt } from './prompts/ai.anser.prompt';

@Injectable()
export class AIService {
  private groq: Groq;
  private baseUrl: string;

  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
  ) {
    this.groq = new Groq({
      apiKey: this.configService.getOrThrow('ai_key'),
    });

    this.baseUrl = this.configService.getOrThrow('frontendUrl');
  }

  private isAIQuery(value: unknown): value is AIQuery {
    if (typeof value !== 'object' || value === null) {
      return false;
    }

    const query = value as Record<string, unknown>;

    if (query.model !== 'Event') {
      return false;
    }

    if (
      query.operation !== 'findMany' &&
      query.operation !== 'findFirst' &&
      query.operation !== 'count'
    ) {
      return false;
    }

    return true;
  }

  async ask(userId: string, question: string) {
    if (!question) {
      throw new BadRequestException('Question is required');
    }

    const query = await this.generateQuery(question, userId);

    const data = await this.executeQuery(query);

    const response = await this.generateAnswer(question, data);

    return { response };
  }

  private async generateQuery(
    question: string,
    userId: string,
  ): Promise<AIQuery> {
    try {
      const completion = await this.groq.chat.completions.create({
        model: 'openai/gpt-oss-20b',
        messages: [
          {
            role: 'system',
            content: buildQueryPrompt(question, userId),
          },
        ],
      });

      const raw = completion.choices[0]?.message?.content;

      if (!raw) {
        throw new InternalServerErrorException('AI did not return a query');
      }

      const cleaned = raw
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();

      let parsed: unknown;

      try {
        parsed = JSON.parse(cleaned);
      } catch {
        throw new InternalServerErrorException('Failed to parse AI query');
      }

      if (!this.isAIQuery(parsed)) {
        throw new InternalServerErrorException('Invalid AI query structure');
      }

      return parsed;
    } catch (err) {
      throw new ServiceUnavailableException(
        `Failed to generate AI query: ${err instanceof Error ? err.message : err}`,
      );
    }
  }

  private async executeQuery(query: AIQuery) {
    try {
      switch (query.operation) {
        case 'findMany':
          return this.prismaService.event.findMany(
            query.params as Prisma.EventFindManyArgs,
          );

        case 'findFirst':
          return this.prismaService.event.findFirst(
            query.params as Prisma.EventFindFirstArgs,
          );

        case 'count':
          return this.prismaService.event.count(
            query.params as Prisma.EventCountArgs,
          );

        default:
          throw new BadRequestException('Unsupported operation');
      }
    } catch (err) {
      throw new InternalServerErrorException(
        `Failed to execute database query: ${err instanceof Error ? err.message : err}`,
      );
    }
  }

  private async generateAnswer(
    question: string,
    data: unknown,
  ): Promise<string> {
    try {
      const completion = await this.groq.chat.completions.create({
        model: 'openai/gpt-oss-20b',
        messages: [
          {
            role: 'user',
            content: buildAnswerPrompt(question, data, this.baseUrl),
          },
        ],
      });

      return completion.choices[0]?.message?.content ?? 'No answer generated';
    } catch (err) {
      throw new ServiceUnavailableException(
        `AI answer generation failed: ${err instanceof Error ? err.message : err}`,
      );
    }
  }
}
