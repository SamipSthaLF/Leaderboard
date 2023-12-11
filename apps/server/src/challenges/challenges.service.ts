import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Challenge } from '@/challenges/entities/challenges.entity';
import { CreateChallengeDto } from '@/challenges/dto/create-challenges.dto';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectRepository(Challenge)
    private challengeRepository: Repository<Challenge>,
  ) {}

  /**
   * Create a new challenge.
   * @param {CreateChallengeDto} payload - The payload containing challenge information.
   * @returns {Promise<ChallengeEntity>} - The created challenge entity.
   */
  async create(payload: CreateChallengeDto) {
    const challengeEntity = this.challengeRepository.create(payload);
    return await this.challengeRepository.save(challengeEntity);
  }

  /**
   * Find all challenges.
   * @returns {Promise<ChallengeEntity[]>} - An array of all challenge entities.
   */
  async findAll() {
    return this.challengeRepository.find();
  }

  /**
   * Find a challenge by its ID.
   * @param {number} id - The ID of the challenge to find.
   * @returns {Promise<ChallengeEntity | undefined>} - The found challenge entity or undefined if not found.
   */
  async findByID(id: number) {
    return this.challengeRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * Update a challenge by its ID.
   * @param {number} id - The ID of the challenge to update.
   * @param {Partial<CreateChallengeDto>} payload - The partial data to update in the challenge.
   * @returns {Promise<UpdateResult>} - The result of the update operation.
   */
  async update(id: number, payload: Partial<CreateChallengeDto>) {
    return await this.challengeRepository.update({ id }, payload);
  }

  /**
   * Delete a challenge by its ID.
   * @param {number} id - The ID of the challenge to delete.
   * @returns {Promise<DeleteResult>} - The result of the delete operation.
   */
  async delete(id: number) {
    return await this.challengeRepository.delete({ id });
  }
}
